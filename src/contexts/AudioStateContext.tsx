import React, { createContext, useContext, useEffect, useState } from 'react';
import { Sound } from '@/data/sounds';
import { toast } from '@/hooks/use-toast';
import { soundMixes } from '@/data/soundMixes';

import {
  audioStateManager,
  AudioState,
  TimerOption,
  ActiveSound,
  SoundMix
} from '@/lib/AudioStateManager';

interface AudioContextType {
  activeSounds: ActiveSound[];
  masterVolume: number;
  isPlaying: boolean;
  timer: TimerOption;
  timeRemaining: number | null;
  soundStates: Record<string, { volume: number; isPlaying: boolean }>;
  toggleSound: (sound: Sound) => void;
  setVolumeForSound: (soundId: string, volume: number) => void;
  setMasterVolume: (volume: number) => void;
  togglePlayPause: () => void;
  setTimer: (timer: TimerOption) => void;
  cancelTimer: () => void;
  updateVolume: (soundId: string, volume: number) => void;
  pauseAllSounds: () => void;
  playAllActiveSounds: () => void;
  applyMix: (mix: SoundMix) => void;
  saveCustomMix: (mix: SoundMix) => void;
  deleteCustomMix: (mixName: string) => void;
  getCustomMixes: () => SoundMix[];
  isCurrentMixPredefined: () => boolean;
  isCurrentMixSaved: () => boolean;
}

const AudioStateContext = createContext<AudioContextType | undefined>(undefined);

export const AudioStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [audioState, setAudioState] = useState<AudioState>(audioStateManager.getState());

  // Subscribe to state changes
  useEffect(() => {
    const unsubscribe = audioStateManager.subscribe(newState => {
      setAudioState(newState);
    });

    // Initialize audio context to prevent safari auto-play issues
    const unlockAudio = () => {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const silentBuffer = audioContext.createBuffer(1, 1, 22050);
      const source = audioContext.createBufferSource();
      source.buffer = silentBuffer;
      source.connect(audioContext.destination);
      source.start(0);
      
      document.removeEventListener('touchstart', unlockAudio);
      document.removeEventListener('click', unlockAudio);
    };
    
    document.addEventListener('touchstart', unlockAudio, false);
    document.addEventListener('click', unlockAudio, false);

    return () => {
      unsubscribe();
      document.removeEventListener('touchstart', unlockAudio);
      document.removeEventListener('click', unlockAudio);
      audioStateManager.cleanup();
    };
  }, []);

  // Wrapper functions with toast notifications
  const toggleSound = (sound: Sound) => {
    const isActive = audioState.activeSounds.some(as => as.sound.id === sound.id);
    
    // If not active and we already have 3 sounds, show toast and don't add
    if (!isActive && audioState.activeSounds.length >= 3) {
      toast({
        description: "Three create harmony, above 3 maahol is Chaos!",
      });
      return;
    }
    
    audioStateManager.toggleSound(sound);
    
    if (isActive) {
      toast({
        description: `${sound.name} has been removed`,
      });
    } else {
      toast({
        description: `${sound.name} is now playing`,
      });
    }
  };

  const setVolumeForSound = (soundId: string, volume: number) => {
    audioStateManager.setVolumeForSound(soundId, volume);
  };

  const setMasterVolume = (volume: number) => {
    audioStateManager.setMasterVolume(volume);
  };

  const togglePlayPause = () => {
    audioStateManager.togglePlayPause();
  };

  const setTimer = (timer: TimerOption) => {
    audioStateManager.setTimer(timer);
    
    if (timer === "endless") {
      toast({
        title: "Timer Disabled",
        description: "Playback will continue indefinitely",
      });
      return;
    }
    
    // Calculate minutes based on option
    let minutes = 0;
    switch (timer) {
      case "5min": minutes = 5; break;
      case "15min": minutes = 15; break;
      case "30min": minutes = 30; break;
      case "45min": minutes = 45; break;
      case "60min": minutes = 60; break;
      case "75min": minutes = 75; break;
      case "90min": minutes = 90; break;
    }
    
    toast({
      title: "Timer Set",
      description: `Playback will stop in ${minutes} minutes`,
    });
  };

  const cancelTimer = () => {
    audioStateManager.cancelTimer();
    
    toast({
      title: "Timer Cancelled",
      description: "Playback will continue indefinitely",
    });
  };

  const updateVolume = (soundId: string, volume: number) => {
    audioStateManager.setVolumeForSound(soundId, volume / 100); // Convert from 0-100 to 0-1
  };

  const pauseAllSounds = () => {
    audioStateManager.pauseAllSounds();
  };

  const playAllActiveSounds = () => {
    audioStateManager.playAllSounds();
  };

  const applyMix = (mix: SoundMix) => {
    console.log('%c[MIX] Starting to apply mix:', 'color: #4CAF50; font-weight: bold', mix.name);
    audioStateManager.applyMix(mix);
    
    toast({
      title: "Mix Applied",
      description: `${mix.name} mix has been applied`,
    });
  };

  const saveCustomMix = (mix: SoundMix) => {
    audioStateManager.saveCustomMix(mix);
    
    toast({
      title: "Mix Saved",
      description: `${mix.name} has been saved to your custom mixes`,
    });
  };

  const getCustomMixes = (): SoundMix[] => {
    return audioStateManager.getCustomMixes();
  };

  // Check if current mix matches any predefined or custom mix
  const isCurrentMixSaved = (): boolean => {
    if (audioState.activeSounds.length === 0) return false;
    
    // Helper function to check if a mix matches the current active sounds
    const doesMixMatch = (mix: SoundMix): boolean => {
      // If the number of sounds doesn't match, it's not the same mix
      if (mix.sounds.length !== audioState.activeSounds.length) return false;
      
      // Check if all sounds in the mix are in the active sounds with the same volume
      return mix.sounds.every(mixSound => {
        const activeSound = audioState.activeSounds.find(as => as.sound.id === mixSound.id);
        if (!activeSound) return false;
        
        // Compare volumes with a small tolerance for floating point differences
        return Math.abs(activeSound.volume - mixSound.volume) < 0.01;
      });
    };
    
    // Check against predefined mixes
    if (soundMixes.some(doesMixMatch)) return true;
    
    // Check against custom mixes
    const customMixes = audioStateManager.getCustomMixes();
    return customMixes.some(doesMixMatch);
  };
  
  // Alias for backward compatibility
  const isCurrentMixPredefined = isCurrentMixSaved;

  const deleteCustomMix = (mixName: string) => {
    audioStateManager.deleteCustomMix(mixName);
    
    toast({
      title: "Mix Deleted",
      description: `${mixName} has been removed from your custom mixes`,
    });
  };

  const contextValue: AudioContextType = {
    activeSounds: audioState.activeSounds,
    masterVolume: audioState.masterVolume,
    isPlaying: audioState.isPlaying,
    timer: audioState.timer,
    timeRemaining: audioState.timeRemaining,
    soundStates: audioState.soundStates,
    toggleSound,
    setVolumeForSound,
    setMasterVolume,
    togglePlayPause,
    setTimer,
    cancelTimer,
    updateVolume,
    pauseAllSounds,
    playAllActiveSounds,
    applyMix,
    saveCustomMix,
    deleteCustomMix,
    getCustomMixes,
    isCurrentMixPredefined,
    isCurrentMixSaved
  };

  return (
    <AudioStateContext.Provider value={contextValue}>
      {children}
    </AudioStateContext.Provider>
  );
};

export const useAudioState = () => {
  const context = useContext(AudioStateContext);
  if (context === undefined) {
    throw new Error("useAudioState must be used within an AudioStateProvider");
  }
  return context;
};
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type ProgressState = {
  currentScene: number;
  completedScenes: number[];
  activities: Record<string, boolean>;
  stars: number;
  muted: boolean;
  journeyCompleted: boolean;
  selectedCharacter: 'omar' | 'maryam' | null;
  setCurrentScene: (scene: number) => void;
  completeScene: (scene: number, key: string) => void;
  setMuted: (muted: boolean) => void;
  setSelectedCharacter: (character: 'omar' | 'maryam') => void;
  finishJourney: () => void;
  resetJourney: () => void;
};

const initialProgress = {
  currentScene: 0,
  completedScenes: [] as number[],
  activities: {} as Record<string, boolean>,
  stars: 0,
  journeyCompleted: false,
  selectedCharacter: null as 'omar' | 'maryam' | null,
};

const safeStorage = createJSONStorage(() => ({
  getItem: (name) => {
    try {
      return window.localStorage.getItem(name);
    } catch {
      return null;
    }
  },
  setItem: (name, value) => {
    try {
      window.localStorage.setItem(name, value);
    } catch {
      // The journey still works when storage is unavailable.
    }
  },
  removeItem: (name) => {
    try {
      window.localStorage.removeItem(name);
    } catch {
      // No action needed.
    }
  },
}));

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      ...initialProgress,
      muted: false,
      setCurrentScene: (currentScene) => set({ currentScene }),
      completeScene: (scene, key) =>
        set((state) => {
          if (state.completedScenes.includes(scene)) {
            return { currentScene: Math.max(state.currentScene, scene + 1) };
          }
          return {
            completedScenes: [...state.completedScenes, scene],
            activities: { ...state.activities, [key]: true },
            stars: state.stars + 1,
            currentScene: Math.max(state.currentScene, scene + 1),
          };
        }),
      setMuted: (muted) => set({ muted }),
      setSelectedCharacter: (selectedCharacter) => set({ selectedCharacter }),
      finishJourney: () => set({ journeyCompleted: true, currentScene: 10 }),
      resetJourney: () => set((state) => ({ ...initialProgress, muted: state.muted, selectedCharacter: state.selectedCharacter })),
    }),
    {
      name: 'rehla-wudu-progress',
      version: 2,
      storage: safeStorage,
      partialize: (state) => ({
        currentScene: state.currentScene,
        completedScenes: state.completedScenes,
        activities: state.activities,
        stars: state.stars,
        muted: state.muted,
        journeyCompleted: state.journeyCompleted,
        selectedCharacter: state.selectedCharacter,
      }),
      migrate: (persistedState) => ({
        ...initialProgress,
        ...(persistedState as Partial<ProgressState>),
        selectedCharacter: null,
      }),
    },
  ),
);

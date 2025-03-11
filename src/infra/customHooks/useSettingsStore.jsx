import { create } from "zustand"

export const useSettingsStore = create((set) => ({
  settings: { allowNotification: false },
  setAllowNotifications: (bool) => {
    set((state) => {
      return {
        ...state,
        settings: { ...state.settings, allowNotification: bool },
      }
    })
  },
}))

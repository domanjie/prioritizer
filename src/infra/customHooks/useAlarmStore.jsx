import { create } from "zustand"
import BeepSound from "../timerSounds/timer-audio-1.mp3"

var alarm = new Audio(BeepSound)
alarm.loop = true
alarm.volume = 0.5
const useAlarmStore = create((set, get) => ({
  alarm: alarm,
  setVolume: (vol) => {
    set((state) => {
      var newAlarm = state.alarm.cloneNode()
      newAlarm.volume = vol
      return { ...state, alarm: newAlarm }
    })
  },
}))
export default useAlarmStore

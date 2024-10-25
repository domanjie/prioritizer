import { useState } from "react"

class Timer {
  constructor(time) {
    this.initTime = this.time = time
    this.startTime = 0
    this.timElapsed = 0
    this.isRunning = false
  }

  adjustTimeElapsed() {
    if (this.isRunning) {
      this.timElapsed = Math.min(
        this.timElapsed + Date.now() - this.startTime,
        this.time
      )
      this.startTime = Date.now()
    }
    return this.timElapsed
  }

  start() {
    this.startTime = Date.now()
    this.isRunning = true
  }
  stop() {
    if (!this.isRunning) return
    this.adjustTimeElapsed()
    this.isRunning = false
  }
  reset() {
    this.time = this.initTime
    this.timElapsed = 0
    this.startTime = Date.now()
  }
  extend(time) {
    this.time += time
  }
  getTime() {
    return this.time - this.adjustTimeElapsed()
  }
}
export default Timer

class Timer {
  constructor(duration, timeElapsed = 0) {
    this.duration = duration
    this.timeElapsed = timeElapsed
    this.timeCheckpoint = 0
    this.isRunning = false
  }

  start() {
    this.timeCheckpoint = Date.now()
    this.isRunning = true
  }
  stop() {
    if (!this.isRunning) return
    this.updateTimeElapsed()
    this.isRunning = false
  }
  extend(duration) {
    this.duration += duration
  }
  getTimeLeft() {
    return this.duration - this.getTimeElapsed()
  }
  getTimeElapsed() {
    this.updateTimeElapsed()
    return this.timeElapsed
  }
  getDuration() {
    return this.duration
  }
  updateTimeElapsed() {
    if (this.isRunning) {
      this.timeElapsed = Math.min(
        this.timeElapsed + Date.now() - this.timeCheckpoint,
        this.duration
      )
      //update timeCheckpoint for next update
      this.timeCheckpoint = Date.now()
    }
  }
}
export default Timer

class Timer {
  constructor(time) {
    this.initTime = time
    this.startTime = 0
    this.timeElapsed = 0
    this.isRunning = false
  }
  start() {
    this.startTime = Date.now()
    this.isRunning = true
  }
  stop() {
    if (!this.isRunning) return
    this.updateTimeElapsed()
    this.isRunning = false
  }
  extend(time) {
    this.initTime += time
  }
  getTimeLeft() {
    return this.initTime - this.getTimeElapsed()
  }
  getTimeElapsed() {
    this.updateTimeElapsed()
    return this.timeElapsed
  }
  updateTimeElapsed() {
    if (this.isRunning) {
      this.timeElapsed = Math.min(
        this.timeElapsed + Date.now() - this.startTime,
        this.initTime
      )
      //update starTime for next update
      this.startTime = Date.now()
    }
  }
}
export default Timer

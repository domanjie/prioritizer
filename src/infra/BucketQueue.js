export default class BucketPriorityQueue {
  constructor(maxPriority) {
    this.queue = []
    this.highestPriority = -1
    this.maxPriority = maxPriority
  }
  insert(val, priority) {
    priority = parseInt(priority)
    this.checkBounds(priority)
    if (!this.queue[priority]?.length) {
      this.queue[priority] = [val]
      if (priority > this.highestPriority) this.highestPriority = priority
    } else {
      this.queue[priority].push(val)
    }
  }
  pool() {
    if (this.highestPriority === -1) return undefined
    const returnVal = this.queue[this.highestPriority]?.shift()
    this.adjustMaxPriority()
    return returnVal
  }
  changePriority(val, prevPriority, newPriority) {
    this.checkBounds(parseInt(prevPriority))
    this.checkBounds(parseInt(newPriority))
    this.queue[newPriority].push(val)
    this.queue[prevPriority] = this.queue[prevPriority].filter(
      (el) => el !== val
    )
    if (!this.queue[this.prevPriority].length) this.queue[prevPriority] = null
    this.adjustMaxPriority()
  }
  peek() {
    return this.queue[this.highestPriority][0]
  }
  checkBounds = (priority) => {
    if (priority < 1 || priority > this.maxPriority) {
      throw new Error(`priority:${priority} out of bounds`)
    }
  }
  adjustMaxPriority() {
    while (
      !this.queue[this.highestPriority]?.length &&
      this.highestPriority > -1
    ) {
      this.queue.length--
      this.highestPriority--
    }
  }
}

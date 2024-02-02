export default class Timeout {
  timeoutID: NodeJS.Timeout | null;
  resolve: Function | null;

  constructor() {
    this.timeoutID = null;
    this.resolve = null;
  }

  wait(ms: number) {
    return new Promise(resolve => {
      this.resolve = resolve;
      this.timeoutID = setTimeout(resolve, ms);
    });
  }

  cancel(): void {
    if (this.timeoutID && this.resolve) {
      clearTimeout(this.timeoutID);
      this.timeoutID = null;
      this.resolve();
      this.resolve = null;
    }
  }
}

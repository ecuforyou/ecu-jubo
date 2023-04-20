export class SlackMessageCache {
  constructor(public cache: Map<string, boolean>) {}

  has(ts: string): boolean {
    return this.cache.has(ts);
  }

  set(ts: string): void {
    this.cache.set(ts, true);
  }
  remove(ts: string): boolean {
    return this.cache.delete(ts);
  }
}

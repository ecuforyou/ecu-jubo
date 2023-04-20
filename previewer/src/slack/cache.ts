export class SlackMessageCache {
  constructor(public cache: Map<string, boolean>) {}

  has(ts: string): boolean {
    return this.cache.has(ts);
  }

  set(ts: string): void {
    console.log('cache set', ts);
    this.cache.set(ts, true);
  }
}

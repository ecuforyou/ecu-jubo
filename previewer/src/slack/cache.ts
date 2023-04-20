export class SlackMessageCache {
  constructor(public cache: Map<string, boolean>) {}
  set(ts: string): boolean {
    const result = this.cache.has(ts);
    if (!result) this.cache.set(ts, true);
    return result;
  }
  remove(ts: string): boolean {
    return this.cache.delete(ts);
  }
}

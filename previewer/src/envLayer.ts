export const PORT = process.env.PORT ?? 3001;
export const JUBOT_URL = process.env.URL ?? 'http://localhost:3000';
export const SAVE_PATH = 'public';
export const PREFIX = process.env.PREFIX ?? 'preview';
// 6 days = 6 * 24 * 60 * 60 * 1000 ms
export const GENERATE_PERIOD = process.env.GENERATE_PREIOD ?? '518400000';
export const JUBOT_AUTHORIZATION = process.env.JUBOT_AUTHORIZATION ?? '';
export const SLACK_SIGNING_SECRET = process.env.SLACK_SIGNING_SECRET ?? '';
export const SLACK_BOT_OAUTH_TOKEN = process.env.SLACK_BOT_OAUTH_TOKEN ?? '';
export const SLACK_BOT_ID = process.env.SLACK_BOT_ID ?? '';
export const SELF_URL = process.env.SELF_URL ?? 'http://localhost:3001';

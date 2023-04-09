export const PORT = process.env.PORT ?? 3001;
export const JUBOT_URL = process.env.URL ?? 'http://localhost:3000';
export const SAVE_PATH = process.env.SAVE_PATH ?? 'created';
export const PREFIX = process.env.PREFIX ?? 'preview';
// 6 days = 6 * 24 * 60 * 60 * 1000 ms
export const GENERATE_PERIOD = process.env.GENERATE_PREIOD ?? '518400000';

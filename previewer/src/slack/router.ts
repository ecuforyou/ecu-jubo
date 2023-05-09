import { Router } from 'express';
import { matcher } from './controller';
import { SLACK_BOT_ID } from '../envLayer';
import { SlackMessageCache } from './cache';
const slackRouter = Router();

const messageCache = new SlackMessageCache(new Map<string, boolean>());
slackRouter.post('/', async (req, res) => {
  const { user, ts } = req.body.event;
  res.end();
  if (user === SLACK_BOT_ID) {
    return;
  }

  if (!messageCache.has(ts)) {
    messageCache.set(ts);
    await matcher(req.body.event);
  }
});

export default slackRouter;

import { SLACK_BOT_ID, SLACK_SIGNING_SECRET } from '../envLayer';
import { SlackEventRequest } from './types';
import { createEventAdapter } from '@slack/events-api';
import { matcher } from './controller';
import { SlackMessageCache } from './cache';
import { Pptr } from '../pptr/browser';

const slackEvents = createEventAdapter(SLACK_SIGNING_SECRET, {
  waitForResponse: true,
});

const messageCache = new SlackMessageCache(new Map<string, boolean>());

slackEvents.on('message', async (event: SlackEventRequest) => {
  new Pptr();
  await Pptr.browser;

  const { user, text, ts } = event;
  if (user === SLACK_BOT_ID) return;

  /**
   * Should response within 3 seconds, but it's difficult in this cloud run structure.
   * So, use cache by ts.
   */
  if (!messageCache.has(ts)) {
    messageCache.set(ts);
    await matcher(event);
  }
});

export { slackEvents };

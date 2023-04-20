import { SLACK_BOT_ID, SLACK_SIGNING_SECRET } from '../envLayer';
import { SlackEventRequest } from './types';
import { createEventAdapter } from '@slack/events-api';
import { matcher } from './controller';

const slackEvents = createEventAdapter(SLACK_SIGNING_SECRET);
slackEvents.on('message', async (event: SlackEventRequest) => {
  const { user, text } = event;
  if (user === SLACK_BOT_ID) return;
  await matcher(text, event);
});

export { slackEvents };

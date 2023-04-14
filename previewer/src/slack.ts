import { createEventAdapter } from '@slack/events-api';
import { SLACK_SIGNING_SECRET } from './envLayer';

export const slackEvents = createEventAdapter(SLACK_SIGNING_SECRET);

slackEvents.on('message', (event) => {
  console.log(event);
});

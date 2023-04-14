import { createEventAdapter } from '@slack/events-api';
import {
  SLACK_CHANNEL_ID,
  SLACK_SIGNING_SECRET,
  SLACK_USER_OAUTH_TOKEN,
} from './envLayer';
import { WebClient } from '@slack/web-api';

export const slackEvents = createEventAdapter(SLACK_SIGNING_SECRET);

const client = new WebClient(SLACK_USER_OAUTH_TOKEN);
const channel = SLACK_CHANNEL_ID;
slackEvents.on('message', (event) => {
  const { user, text, ts: timestamp, channel } = event;
  client.chat.postMessage({ channel, text: text });
  client.reactions.add({ channel, name: 'thumbsup', timestamp });
});

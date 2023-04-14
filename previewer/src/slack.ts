import { createEventAdapter } from '@slack/events-api';
import { SLACK_SIGNING_SECRET, SLACK_USER_OAUTH_TOKEN } from './envLayer';
import { WebClient } from '@slack/web-api';

const slackEvents = createEventAdapter(SLACK_SIGNING_SECRET);

const client = new WebClient(SLACK_USER_OAUTH_TOKEN);

slackEvents.on('message', (event) => {
  console.log('event received', JSON.stringify(event));
  const { user, text, ts: timestamp, channel } = event;
  client.chat.postMessage({ channel, text: text });
  client.reactions.add({ channel, name: 'thumbsup', timestamp });
});

export { slackEvents };

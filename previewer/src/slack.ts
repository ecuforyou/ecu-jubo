import { createEventAdapter } from '@slack/events-api';
import {
  SLACK_SIGNING_SECRET,
  SLACK_BOT_OAUTH_TOKEN,
  SLACK_BOT_ID,
  JUBOT_URL,
} from './envLayer';
import { WebClient } from '@slack/web-api';
import { isEmpty } from 'lodash';
import { saveScreenshot } from './preview';
import fs from 'fs/promises';
import path from 'path';

const slackEvents = createEventAdapter(SLACK_SIGNING_SECRET);

const client = new WebClient(SLACK_BOT_OAUTH_TOKEN);
const previewRules = [/preview/g, /주보/g];

slackEvents.on('message', async (event) => {
  const { user, text, ts: timestamp, channel } = event;
  if (user === SLACK_BOT_ID) return;

  console.log(JSON.stringify(event));

  // TODO: match for every rules
  const matched = !isEmpty(previewRules.filter((rule) => rule.test(text)));
  if (matched) {
    client.reactions.add({
      token: SLACK_BOT_OAUTH_TOKEN,
      channel,
      name: 'thumbsup',
      timestamp,
    });
    try {
      const res = await fetch('/preview', { method: 'POST' });
      const filename = res.headers.get('filename') ?? 'preview';
      const file = Buffer.from(await res.arrayBuffer());
      await client.filesUploadV2({
        token: SLACK_BOT_OAUTH_TOKEN,
        channel_id: channel,
        file,
        filename: filename.split('/').slice(-1).toString(),
      });
    } catch (err) {
      client.reactions.add({
        token: SLACK_BOT_OAUTH_TOKEN,
        channel,
        name: 'interrobang',
        timestamp,
      });
    } finally {
      client.reactions.add({
        token: SLACK_BOT_OAUTH_TOKEN,
        channel,
        name: 'white_check_mark',
        timestamp,
      });
    }
    return;
  }

  // client.chat.postMessage({
  //   token: SLACK_BOT_OAUTH_TOKEN,
  //   channel,
  //   text: text,
  // });

  client.reactions.add({
    token: SLACK_BOT_OAUTH_TOKEN,
    channel,
    name: 'question',
    timestamp,
  });
});

class Rule {
  constructor(public regex: RegExp) {}
  match(text: string) {
    return this.regex.test(text);
  }
}

export { slackEvents };

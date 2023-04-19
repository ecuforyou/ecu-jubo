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

interface SlackEventRequest {
  [key: string]: string;
}
export class SlackClient extends WebClient {
  private event?: SlackEventRequest;
  constructor(oauthToken?: string) {
    super(oauthToken ?? SLACK_BOT_OAUTH_TOKEN);
  }

  setEvent(event: SlackEventRequest) {
    this.event = event;
    console.log(JSON.stringify(event));
  }

  /** timestamp is chat id */
  async uploadPreviewImage() {
    if (!this.event) return;

    const { channel } = this.event;
    try {
      const filename = await saveScreenshot(JUBOT_URL);
      const file = await fs.readFile(path.join(__dirname, '..', filename));
      await client.filesUploadV2({
        token: SLACK_BOT_OAUTH_TOKEN,
        channel_id: channel,
        file,
        filename: filename.split('/').slice(-1).toString(),
      });
    } catch (err) {
      this.addReaction('interrobang');
      throw JSON.stringify(err);
    }
  }

  async addReaction(name: string) {
    if (!this.event) return;

    const { channel, ts: timestamp } = this.event;
    return await client.reactions.add({
      token: SLACK_BOT_OAUTH_TOKEN,
      name,
      channel,
      timestamp,
    });
  }
}

const slackEvents = createEventAdapter(SLACK_SIGNING_SECRET, {
  waitForResponse: true,
});

const client = new SlackClient();
const previewRules = [/preview/g, /주보/g];

slackEvents.on('message', async (event: SlackEventRequest) => {
  const { user, text } = event;
  if (user === SLACK_BOT_ID) return;
  client.setEvent(event);

  // TODO: match for every rules
  const matched = !isEmpty(previewRules.filter((rule) => rule.test(text)));
  if (matched) {
    await client.addReaction('thumbsup');
    await client.uploadPreviewImage();
    return;
  }

  await client.addReaction('question');
});

export { slackEvents };

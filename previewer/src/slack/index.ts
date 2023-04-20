import {
  SLACK_BOT_OAUTH_TOKEN,
  JUBOT_URL,
  SLACK_BOT_ID,
  SLACK_SIGNING_SECRET,
} from '../envLayer';
import { WebClient } from '@slack/web-api';

import { saveScreenshot } from '../preview';
import fs from 'fs/promises';
import path from 'path';
import { SlackEventRequest } from './types';
import { createEventAdapter } from '@slack/events-api';
import { matcher } from './controller';

export class SlackClient extends WebClient {
  constructor(oauthToken?: string) {
    super(oauthToken ?? SLACK_BOT_OAUTH_TOKEN);
  }

  /** timestamp is chat id */
  async uploadPreviewImage(event: SlackEventRequest) {
    if (!event) return;

    const { channel } = event;
    try {
      const filename = await saveScreenshot(JUBOT_URL);
      const file = await fs.readFile(path.join(__dirname, '..', filename));
      await this.filesUploadV2({
        token: SLACK_BOT_OAUTH_TOKEN,
        channel_id: channel,
        file,
        filename: filename.split('/').slice(-1).toString(),
      });
    } catch (err) {
      await this.addReaction(event, 'interrobang');
      throw JSON.stringify(err);
    }
  }

  async addReaction(event: SlackEventRequest, name: string) {
    if (!event) return;

    const { channel, ts: timestamp } = event;
    return await this.reactions.add({
      token: SLACK_BOT_OAUTH_TOKEN,
      name,
      channel,
      timestamp,
    });
  }
}

/**
 * This works like router
 */
const slackEvents = createEventAdapter(SLACK_SIGNING_SECRET, {
  waitForResponse: true,
});
slackEvents.on('message', async (event: SlackEventRequest) => {
  const { user, text } = event;
  if (user === SLACK_BOT_ID) return;
  matcher(text, event);
});

export { slackEvents };

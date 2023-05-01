import { WebClient } from '@slack/web-api';
import { SLACK_BOT_OAUTH_TOKEN, JUBOT_URL } from '../envLayer';
import { saveScreenshot } from '../pptr/preview';
import { SlackEventRequest } from './types';
import fs from 'fs/promises';
import path from 'path';

export class SlackClient extends WebClient {
  constructor(oauthToken?: string) {
    super(oauthToken ?? SLACK_BOT_OAUTH_TOKEN);
  }

  async uploadPreviewImage(event: SlackEventRequest) {
    if (!event) return;

    const { channel } = event;
    try {
      const filename = await saveScreenshot(JUBOT_URL);
      const file = await fs.readFile(
        path.join(__dirname, '..', '..', filename)
      );
      await this.filesUploadV2({
        token: SLACK_BOT_OAUTH_TOKEN,
        channel_id: channel,
        file,
        filename: filename.split('/').slice(-1).toString(),
      });
    } catch (err) {
      console.log(JSON.stringify(err));
    }
    // this occurs error: 'already_reacted',
    // finally {
    //   await this.addReaction(event, 'white_check_mark');
    // }
  }

  /** timestamp is chat id */
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

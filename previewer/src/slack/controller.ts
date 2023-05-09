import { SELF_URL } from '../envLayer';
import { SlackClient } from './client';
import { Ruler } from './ruler';
import { SlackEventRequest } from './types';

/**
 * To use slackClient as singleton instance
 */
const client = new SlackClient();

async function programmeService(event: SlackEventRequest) {
  try {
    await client.addReaction(event, 'thumbsup');
  } catch (err) {
    console.log(JSON.stringify(err));
  }
  const response = await fetch(`${SELF_URL}/preview`, {
    method: 'POST',
  });
  const filename = response.headers.get('filename') ?? '';
  await client.uploadPreviewImage(event, filename);
}
const programmeController = new Ruler([/preview/g, /주보/g], programmeService);

/** TODO
 * set evangelization data with message
 * parse message
 * need to search school, counts, message(raw),
 * if school or counts can't be matched -> addReaction :question:
 * get size data -> set at new rows
 * data may be loss if setEvangelization repeatedly called in seconds (if get, get, set, set occurs)
 */
const splits = '\\s+|\\/|\\.|-|\\|';
const evangelizeRegex = new RegExp(
  `\\d{1,}(${splits})+\\d{1,}(${splits})+\\d{1,}`
);
async function evangelizeService(event: SlackEventRequest) {
  await client.addReaction(event, 'heavy_check_mark');
}
const evangelizeController = new Ruler([evangelizeRegex], evangelizeService);

/** TODO
 * set metadata by name
 * get metadata size
 * get metadata
 * parse metadata to json (with range)
 * if metadata exist -> update
 * if not exist -> add new
 */
async function setMetadataService(event: SlackEventRequest) {
  await client.addReaction(event, 'cherry_blossom');
}
const setMetadataController = new Ruler([/set/g], setMetadataService);

/** TODO
 * set skip flag weekly
 * after saturday, reset value
 * skip flag / counter should be regarded
 */
async function skipService(event: SlackEventRequest) {
  await client.addReaction(event, 'cherries');
}
const skipController = new Ruler([/skip/g, /스킵/g], skipService);

async function fallbackService(event: SlackEventRequest) {
  await client.addReaction(event, 'question');
}
const fallbackController = new Ruler([/.*/g], fallbackService);

export async function matcher(event: SlackEventRequest) {
  const command = event.text;
  const lists = [
    programmeController,
    evangelizeController,
    setMetadataController,
    skipController,
  ];

  const selected = lists.filter((controller) => controller.test(command))[0];
  if (selected) {
    await selected.run(event);
    return;
  }
  await fallbackController.run(event);
}

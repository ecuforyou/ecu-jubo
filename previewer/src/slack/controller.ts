import { SlackClient } from './client';
import { Ruler } from './ruler';
import { SlackEventRequest } from './types';

/**
 * To use slackClient as singleton instance
 */
const client = new SlackClient();

function programmeService(event: SlackEventRequest) {
  client
    .addReaction(event, 'thumbsup')
    .then(() => client.uploadPreviewImage(event));
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
function evangelizeService(event: SlackEventRequest) {
  client.addReaction(event, 'heavy_check_mark');
}
const splits = '\\s+|\\/|\\.|-|\\|';
const evangelizeController = new Ruler(
  [new RegExp(`\\d{1,}(${splits})+\\d{1,}(${splits})+\\d{1,}`)],
  evangelizeService
);

/** TODO
 * set metadata by name
 * get metadata size
 * get metadata
 * parse metadata to json (with range)
 * if metadata exist -> update
 * if not exist -> add new
 */
function setMetadataService(event: SlackEventRequest) {
  client.addReaction(event, 'cherry_blossom');
}
const setMetadataController = new Ruler([/set/g], setMetadataService);

/** TODO
 * set skip flag weekly
 * after saturday, reset value
 * skip flag / counter should be regarded
 */
function skipService(event: SlackEventRequest) {
  client.addReaction(event, 'cherries');
}
const skipController = new Ruler([/skip/g, /스킵/g], skipService);

function fallbackService(event: SlackEventRequest) {
  client.addReaction(event, 'question');
}
const fallbackController = new Ruler([/.*/g], fallbackService);

export function matcher(command: string, event: SlackEventRequest) {
  const lists = [
    programmeController,
    evangelizeController,
    setMetadataController,
    skipController,
  ];

  const selected = lists.filter((controller) => controller.test(command))[0];
  if (selected) {
    selected.run(event);
    return;
  }
  fallbackController.run(event);
}

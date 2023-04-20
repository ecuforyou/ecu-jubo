import { isEmpty } from 'lodash';
import { Job, SlackEventRequest } from './types';

export class Ruler {
  constructor(private regexps: RegExp[], private service?: Job) {}

  test(text: string) {
    return !isEmpty(this.regexps.filter((rule) => rule.test(text)));
  }

  async run(event: SlackEventRequest) {
    console.log(JSON.stringify(event));
    await this.service?.(event);
  }
}

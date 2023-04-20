export interface SlackEventRequest {
  [key: string]: string;
}
export type Job = (event: SlackEventRequest) => any | Promise<any>;

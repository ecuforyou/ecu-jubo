import dayjs from 'dayjs';
import { Request } from 'express';
import { GENERATE_PERIOD } from './envLayer';

export function previewShouldBeRegenerated(req: Request, filename: string) {
  if (!filename || req.body?.forceUpdate) return true;

  const created = getCreatedDateFromFileName(filename);
  const now = dayjs();
  const diff = now.diff(created);
  return diff > parseInt(GENERATE_PERIOD);
}

export function getCreatedDateFromFileName(filename: string) {
  const dateString = filename
    .split('.')
    .slice(0, -1)
    .join('')
    .split('-')
    .slice(1)
    .join('');
  const date = dayjs(dateString);
  return date;
}

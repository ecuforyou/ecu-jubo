import path from 'path';
import fs from 'fs';
import {
  AUTHORIZATION,
  CREDENTIAL,
  CREDENTIAL_FILE_NAME,
  SHEET_ID,
} from '../../envLayer';
import { google, sheets_v4 } from 'googleapis';
import { JWT } from 'google-auth-library';
import { NextApiRequest, NextApiResponse } from 'next';
import { log } from '@/util';

const CREDENTIAL_PATH = path.join(process.cwd(), CREDENTIAL_FILE_NAME);
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

interface Credentials {
  email: string;
  key: string;
  scopes: string[];
}

export class GoogleSheetAPI {
  static credentials?: Credentials;
  static client: JWT;
  static sheets: sheets_v4.Sheets;
  constructor() {
    if (GoogleSheetAPI.credentials) return this;
    fs.writeFileSync(CREDENTIAL_PATH, CREDENTIAL);
    const credentials = JSON.parse(
      fs.readFileSync(CREDENTIAL_PATH, { encoding: 'utf-8' })
    );

    GoogleSheetAPI.credentials = {
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: SCOPES,
    };
    GoogleSheetAPI.client = new JWT(GoogleSheetAPI.credentials);
    GoogleSheetAPI.sheets = google.sheets({
      version: 'v4',
      auth: GoogleSheetAPI.client,
    });
  }

  async getDatas(ranges: string[]) {
    const res = await GoogleSheetAPI.sheets.spreadsheets.values.batchGet({
      auth: GoogleSheetAPI.client,
      spreadsheetId: SHEET_ID,
      ranges,
    });

    return res.data.valueRanges;
  }

  /** range should be one cell like `sheetname!A2` */
  async setData(range: string, value: string) {
    await GoogleSheetAPI.sheets.spreadsheets.values.update({
      auth: GoogleSheetAPI.client,
      range,
      spreadsheetId: SHEET_ID,
      valueInputOption: 'raw',
      requestBody: { values: [[value]] },
    });
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.headers.authorization !== AUTHORIZATION)
    return res.status(404).json({ message: 'not allowed' });

  const api = new GoogleSheetAPI();
  let message = '';
  switch (req.method) {
    case 'GET':
      break;
    case 'POST':
      const { range, value } = req.body;
      await api.setData(range, value);
      message = `"${range}" has changed to "${value}"`;
      log(message);
      break;
  }
  return res.status(200).json({ message });
}

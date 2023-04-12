import path from 'path';
import fs from 'fs';
import { CREDENTIAL, CREDENTIAL_FILE_NAME, SHEET_ID } from '../../envLayer';
import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

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
  }
  async getData(range: string) {
    const auth = GoogleSheetAPI.client;
    const sheets = google.sheets({
      version: 'v4',
      auth,
    });
    const res = await sheets.spreadsheets.values.get({
      auth,
      spreadsheetId: SHEET_ID,
      range,
    });

    return res.data.values;
  }
}

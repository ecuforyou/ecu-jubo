import express from 'express';
import { PORT, JUBOT_URL, JUBOT_AUTHORIZATION, SAVE_PATH } from './envLayer';
import { saveScreenshot } from './pptr/preview';
import path from 'path';
import slackRouter from './slack/router';

const app = express();

app.use(express.json());
app.use(express.static(SAVE_PATH));

app.get('/preview', async (req, res) => {
  const filename = await saveScreenshot(JUBOT_URL);
  res.setHeader('filename', filename);
  res.sendFile(filename, { root: path.join(__dirname, '..') });
});

app.post('/set', async (req, res) => {
  const { range, value } = req.body;
  const response = await fetch(`${JUBOT_URL}/api/sheet`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${JUBOT_AUTHORIZATION}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ range, value }),
  });
  const { message } = await response.json();
  res.json({ status: response.status, message });
});

app.use('/slack', slackRouter);

/** TODO
 * called by google cloud function
 * if a few jobs should be called by cron job, matcher should be implemented
 */
app.post('/notify', async (req, res) => {
  console.log('req.body:', JSON.stringify(req.body));
  res.json({ message: 'notify called' });
});

app.listen(PORT, () => {
  console.log(`Previewer started on PORT: ${PORT}`);
});

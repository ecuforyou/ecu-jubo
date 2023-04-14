import express from 'express';
import { PORT, JUBOT_URL, JUBOT_AUTHORIZATION, SAVE_PATH } from './envLayer';
import { saveScreenshot } from './preview';
import path from 'path';
import { slackEvents } from './slack';

const app = express();
app.use(express.json());
app.use(express.static(SAVE_PATH));

app.post('/preview', async (req, res) => {
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

app.post('/slack', slackEvents.requestListener());

app.listen(PORT, () => {
  console.log(`Previewer started on PORT: ${PORT}`);
});

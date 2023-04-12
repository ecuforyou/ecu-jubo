import express from 'express';
import { PORT, JUBOT_URL } from './envLayer';
import { saveScreenshot } from './preview';
import path from 'path';

const app = express();

app.post('/preview', async (req, res) => {
  const filename = await saveScreenshot(JUBOT_URL);
  res.sendFile(filename, { root: path.join(__dirname, '..') });
});

app.listen(PORT, () => {
  console.log(`Previewer started on PORT: ${PORT}`);
});

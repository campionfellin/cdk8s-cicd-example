import * as express from 'express';

const app = express();

app.get('/', (req: any, res: any) => {
  console.log(req);
  res
    .status(200)
    .send('Hello, new world!')
    .end();
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

module.exports = app;

// server.js
import express from 'express'
const app = express();
const port = process.env.PORT || 5000;

// Define your routes and middleware here
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

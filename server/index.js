import express from "express";
import { database } from './database.js'

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', express.static('client'));

app.get('/getLeaderboard', async (request, response) => {
    const scores = await database.getTopTen();
    response.status(200).json(scores);
});

app.post('/submitScore', async (request, response) => {
    await database.submitScore(request.body);
    response.status(200).json({ status: 'success' });
});

app.all('*', async (request, response) => {
    response.status(404).send(`Not found: ${request.path}`);
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
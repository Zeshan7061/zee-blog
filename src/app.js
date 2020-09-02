import express from 'express';
import path from 'path';
import { MongoClient } from 'mongodb';
const app = express();

app.use(express.static(path.join(__dirname, '/build')));
app.use(express.json()).use(express.urlencoded({ extended: false }));

const articlesInfo = {
	'learn-react': {
		upvotes: 20,
		comments: [
			{
				username: 'Zeshan',
				text: 'i like this article',
			},
			{
				username: 'Ali',
				text: 'excellent explanation',
			},
		],
	},
	'Node JS': {
		upvotes: 39,
		comments: [
			{
				username: 'Umar',
				text: 'very informative!',
			},
			{
				username: 'Zeshan',
				text: 'yeah good work.',
			},
			{
				username: 'Ali',
				text: 'excellent explanation',
			},
		],
	},
};

app.post('/api/articles/:name/upvote', (req, res) => {
	const articleName = req.params.name;
	articlesInfo[articleName].upvotes++;

	res.status(200).json(articlesInfo[articleName]);
});

app.post('/api/articles/:name/add-comment', (req, res) => {
	const articleName = req.params.name;
	const { username, text } = req.body;

	articlesInfo[articleName].comments.push({
		username,
		text,
	});

	res.status(200).json(articlesInfo[articleName]);
});

app.get('/api/articles/:name', async (req, res, next) => {
	try {
		const articleName = req.params.name;

		res.status(200).json(articlesInfo[articleName]);
	} catch (error) {
		next(error);
	}
});

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/build/index.html'));
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, console.log('Server listing on port: ' + PORT));

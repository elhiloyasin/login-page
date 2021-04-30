const { urlencoded } = require('express');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRoute = require('./controllers/user');
const PORT = 5000;
const path = require('path');
require('dotenv').config();
const cors = require('cors');

//app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'userdemo', 'build')));
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'userdemo/build/'));
});

app.use('/user', userRoute);

mongoose.connect(
	process.env.DB_URL,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	},
	() => console.log('DB IS CONNECTED')
);

app.listen(PORT, () => console.log(`Connected to port ${PORT}`));

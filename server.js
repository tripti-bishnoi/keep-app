const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./config/db');

const app = express();

app.use(bodyParser.urlencoded({ extended : true }));

MongoClient.connect(db.url, (err, database)=> {
	if(err) {
		return console.log(err);
	}

	var db_database = database.db("tripti_app_db"); // Make sure you add the database name and not the collection name
	require('./app/routes')(app, db_database);

	app.listen(3000, ()=>{
		console.log(`We are live on 3000`);
	});
});

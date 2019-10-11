"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;
const Sequelize = require('sequelize');
const epilogue = require('epilogue'), ForbiddenError = epilogue.Errors.ForbiddenError;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
  res.send('<h1>Welcome!!</h1>');
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, './public/home.html'));
 });

app.listen(port, () => console.log(`My Blog App listening on port ${port}!`))

const database = new Sequelize({
    dialect: 'sqlite',
    storage: './db.sqlite',
    operatorsAliases: false,
});

const Post = database.define('posts', {
    title: Sequelize.STRING,
    content: Sequelize.TEXT,
});

epilogue.initialize({ app, sequelize: database });

const PostResource = epilogue.resource({
    model: Post,
    endpoints: ['/posts', '/posts/:id'],
});

PostResource.all.auth(function (req, res, context) {
    return new Promise(function (resolve, reject) {
        if (!req.isAuthenticated()) {
            res.status(401).send({ message: "Unauthorized" });
            resolve(context.stop);
        } else {
            resolve(context.continue);
        }
    })
});

// database.sync().then(() => {
//     oidc.on('ready', () => {
//         app.listen(port, () => console.log(`My Blog App listening on port ${port}!`))
//     });
// });

// oidc.on('error', err => {
//     // An error occurred while setting up OIDC
//     console.log("oidc error: ", err);
// });
/**
 * Copyright 2015 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const express = require('express');
const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');

const app = express();

let nlu;

if (process.env.NATURAL_LANGUAGE_UNDERSTANDING_IAM_APIKEY
  && process.env.NATURAL_LANGUAGE_UNDERSTANDING_IAM_APIKEY !== '') {
  nlu = new NaturalLanguageUnderstandingV1({
    version: '2018-04-05',
    url: process.env.NATURAL_LANGUAGE_UNDERSTANDING_URL || 'https://gateway.watsonplatform.net/natural-language-understanding/api',
    iam_apikey: process.env.NATURAL_LANGUAGE_UNDERSTANDING_IAM_APIKEY || '<iam_apikey>',
    iam_url: process.env.ASSISTANT_IAM_URL || 'https://iam.bluemix.net/identity/token',
  });
} else {
  nlu = new NaturalLanguageUnderstandingV1({
    version: '2018-04-05',
    url: process.env.NATURAL_LANGUAGE_UNDERSTANDING_URL || 'https://gateway.watsonplatform.net/natural-language-understanding/api',
    username: process.env.NATURAL_LANGUAGE_UNDERSTANDING_USERNAME || '<username>',
    password: process.env.NATURAL_LANGUAGE_UNDERSTANDING_PASSWORD || '<password>',
  });
}
// setup body-parser
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// Bootstrap application settings
require('./config/express')(app);


app.get('/', (req, res) => {
  res.render('index');
});

app.post('/api/analyze', (req, res, next) => {
  if (process.env.SHOW_DUMMY_DATA) {
    res.json(require('./payload.json'));
  } else {
    nlu.analyze(req.body, (err, results) => {
      if (err) {
        return next(err);
      }
      return res.json({ query: req.body.query, results });
    });
  }
});

// error-handler settings
require('./config/error-handler')(app);

module.exports = app;

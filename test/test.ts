import test = require('blue-tape');

import got = require('got');

got('todomvc.com')
    .then(response => {
        console.log(response.body);
    })
    .catch(error => {
        console.log(error.response.body);
    });

// Streams
got.stream('todomvc.com').pipe(fs.createWriteStream('index.html'));

// For POST, PUT and PATCH methods got.stream returns a WritableStream
fs.createReadStream('index.html').pipe(got.stream.post('todomvc.com'));

import test = require('blue-tape');
import got = require('got');
import http = require('http');
import { Promise } from 'es6-promise';

import {createServer, ServerDetails} from './helpers/server';

function setup() {
    return createServer().then((serverDetails) => {
        return new Promise<ServerDetails>(function(resolve, reject) {
            let s = serverDetails.server;

            s.on('/', (req: http.ServerRequest, res: http.ServerResponse) => {
                res.statusCode = 404;
                res.end();
            });

            s.on('/test', (req: http.ServerRequest, res: http.ServerResponse) => {
                res.end(req.url);
            });

            s.on('/?test=wow', (req: http.ServerRequest, res: http.ServerResponse) => {
                res.end(req.url);
            });
         
            s.listen(serverDetails.port, function() {
                resolve(serverDetails);
            });
        });
    });
}

test('init', function(t) {
    return setup().then(function(serverDetails) {
        return new Promise<any>(function() {
            t.assert(true);
        });

        // return got(serverDetails.url + '/test').then(function(response) {
        //     t.is(response.body, '/test');
        //     t.end();
        // });
    });
});

// test('options are optional', (t) => {
//     t.is((await got(`${s.url}/test`)).body, '/test');
// });

// test('accepts url.parse object as first argument', (t) => {
//     t.is((await got({hostname: s.host, port: s.port, path: '/test'})).body, '/test');
// });

// test('overrides querystring from opts', (t) => {
//     t.is((await got(`${s.url}/?test=doge`, {query: {test: 'wow'}})).body, '/?test=wow');
// });

// test('should throw with auth in url', (t) => {
//     try {
//         await got('https://test:45d3ps453@account.myservice.com/api/token');
//         t.fail('Exception was not thrown');
//     } catch (err) {
//         t.regex(err.message, /Basic authentication must be done with auth option/);
//     }
// });

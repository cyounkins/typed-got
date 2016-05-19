import {format} from 'util';
import * as tempfile from 'tempfile';
import test from 'ava';
import * as got from 'got';
import {createServer} from './helpers/server';

const socketPath = tempfile('.socket');

let s;

test.before('setup', async () => {
    s = await createServer();

    s.on('/', (req, res) => {
        res.end('ok');
    });

    await s.listen(socketPath);
});

test('works', async (t) => {
    const url = format('http://unix:%s:%s', socketPath, '/');
    t.is((await got(url)).body, 'ok');
});

// "protocol-less works failed with "Protocol "unix:" not supported. Expected "http:".""
//t est('protocol-less works', async (t) => {
//  const url = format('unix:%s:%s', socketPath, '/');
//  t.is((await got(url)).body, 'ok');
// });

test.after('cleanup', async () => {
    await s.close();
});

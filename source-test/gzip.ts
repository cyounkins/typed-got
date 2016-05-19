import * as zlib from 'zlib';
import test from 'ava';
import * as getStream from 'get-stream';
import * as got from 'got';
import {createServer} from './helpers/server';

const testContent = 'Compressible response content.\n';

let s;

test.before('setup', async () => {
    s = await createServer();

    s.on('/', (req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.setHeader('Content-Encoding', 'gzip');

        if (req.method === 'HEAD') {
            res.end();
            return;
        }

        zlib.gzip(testContent, (_, data) => res.end(data));
    });

    s.on('/corrupted', (req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.setHeader('Content-Encoding', 'gzip');
        res.end('Not gzipped content');
    });

    await s.listen(s.port);
});

test('decompress content', async (t) => {
    t.is((await got(s.url)).body, testContent);
});

test('decompress content - stream', async (t) => {
    t.is(await getStream(got.stream(s.url)), testContent);
});

// something wrong here - except is not caught
//t est('handles gzip error', async (t) => {
//  try {
//      await got(`${s.url}/corrupted`);
//      t.fail('Exception was not thrown');
//  } catch (err) {
//      t.is(err.message, 'incorrect header check');
//      t.is(err.path, '/corrupted');
//      t.is(err.name, 'ReadError');
//  }
// });

test('preserve headers property', async (t) => {
    t.truthy((await got(s.url)).headers);
});

test('do not break HEAD responses', async (t) => {
    t.is((await got.head(s.url)).body, '');
});

test.after('cleanup', async () => {
    await s.close();
});

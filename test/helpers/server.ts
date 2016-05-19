import http = require('http');
// import https = require('https');
// import pify = require('pify');
import getPort = require('get-port');
import { Promise } from 'es6-promise';

export var host = 'localhost';

export interface ServerDetails {
    server: http.Server;
    port: number;
    protocol: string;
    url: string;
}

export function createServer () {
    return getPort().then(function(port) {
        return new Promise<ServerDetails>(function(resolve, reject) {
            const s: http.Server = http.createServer((req: http.ServerRequest, resp: http.ServerResponse) => s.emit(req.url, req, resp));

            // s.host = host;
            // s.port = port;
            // s.url = `http://${host}:${port}`;
            // s.protocol = 'http';

            // s.listen = pify(s.listen, Promise);
            // s.close = pify(s.close, Promise);

            return {
                server: s,
                port: port,
                protocol: 'http',
                url: 'http://localhost:' + port,
            };
        });
    });
};

// exports.createSSLServer = function (opts) {
//     return getPort().then((port: Number) => {
//         const s = https.createServer(opts, (req: http.ServerRequest, resp: http.ServerResponse) => s.emit(req.url, req, resp));

//         s.listen = pify(s.listen, Promise);
//         s.close = pify(s.close, Promise);

//         return s;
//     });
// };

import http = require('http');
import node_stream = require('stream');
import { Promise } from 'es6-promise';

declare function got (url: string, options?: got.Options): Promise<got.Response>;
declare function got (options: got.Options): Promise<got.Response>;

declare namespace got {
    type RetriesFunc = (retries: Number, err: Error) => Number;

    export interface Options extends http.RequestOptions {
        body?:     string | Buffer | NodeJS.ReadableStream | Object;
        encoding?: string;
        json?:     boolean;
        query?:    string | Object;
        timeout?:  Number;
        retries?:  Number | RetriesFunc;
        followRedirect?: boolean;

        // Undocumented
        headers?: any;
        rejectUnauthorized?: boolean;
        strictSSL?: boolean;
        ca?: any;
    }

    // Could change this to condition on json option?
    interface Response extends http.IncomingMessage {
        body: string | Buffer | any;
    }

    export function get    (url: string, options?: got.Options): Promise<Response>;
    export function post   (url: string, options?: got.Options): Promise<Response>;
    export function put    (url: string, options?: got.Options): Promise<Response>;
    export function patch  (url: string, options?: got.Options): Promise<Response>;
    export function head   (url: string, options?: got.Options): Promise<Response>;
    // export function delete (url: string, options?: got.Options): Promise<Response>;

    interface Stream extends node_stream.Duplex {}

    export function stream (url: string, options?: got.Options): Stream;

    export namespace stream {
        export function get    (url: string, options?: got.Options): Stream;
        export function post   (url: string, options?: got.Options): Stream;
        export function put    (url: string, options?: got.Options): Stream;
        export function patch  (url: string, options?: got.Options): Stream;
        export function head   (url: string, options?: got.Options): Stream;
        // export function delete (url: string, options?: got.Options): Stream;
    }

    export class RequestError extends Error {
        message:       string;
        host:          string;
        hostname:      string;
        method:        string;
        path:          string;
    }
    export class ReadError extends Error {
        message:       string;
        host:          string;
        hostname:      string;
        method:        string;
        path:          string;
    }
    export class ParseError extends Error {
        statusCode:    Number;
        statusMessage: string;
        message:       string;
    }
    export class HTTPError extends Error {
        statusCode:    Number;
        statusMessage: string;
        message:       string;
    }
    export class MaxRedirectsError extends Error {
        statusCode:    Number;
        statusMessage: string;
        message:       string;
    }
}

export = got;

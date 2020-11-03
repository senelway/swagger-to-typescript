import { IncomingMessage } from 'http';
import ErrnoException = NodeJS.ErrnoException;

const fs = require('fs');
const gitDiff = require('git-diff');
const http = require('http');

import { ISwatts } from './types';

import openApi2 from './openApi2';
import openApi3 from './openApi3';

export default ({ API, regexpMethods, modificators, filePath }: ISwatts) => (
  http.get(API, (res: IncomingMessage) => {
    const { statusCode } = res;

    const onError = (e: Error) => e && console.log(e);

    const writeFile = (file: string | number) => {
      if (file) {
        fs.readFile(filePath, 'utf8', (err: ErrnoException, data: string) => {
          if (data) {
            console.log(
              gitDiff(data, file, { color: true, wordDiff: true, noHeaders: true })
              ||
              'no changes'
            );
          }
          fs.writeFile(filePath, file, onError);
        })
      }
    }

    if (statusCode === 200) {
      res.setEncoding('utf8');
      let rawData = '';
      res.on('data', (chunk: string) => { rawData += chunk; });
      res.on('end', () => {
        try {
          const parsedData = JSON.parse(rawData);

          if (parsedData.openapi.startsWith('3')) {
            const getFileV3 = openApi3({ regexpMethods, modificators })(parsedData);
            return writeFile(getFileV3);
          }
          if (parsedData.openapi.startsWith('2')) {
            const getFileV2 = openApi2({ regexpMethods, modificators })(parsedData);
            return writeFile(getFileV2);
          }
        } catch (e) {
          console.error(e.message);
        }
      });
    }
  })
)

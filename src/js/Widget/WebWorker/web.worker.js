/* eslint-disable no-use-before-define */
/* eslint-disable no-shadow */

import crypto from 'crypto-js';

let mode = 'md5';
let wordArray = null;

self.addEventListener('message', (e) => {
  if (e.data.type !== 'file' && wordArray === null) {
    mode = e.data.mode;
    self.postMessage({ type: 'error', message: 'Emply file' });
    return;
  }

  if (e.data.type === 'file') {
    const { file } = e.data;

    const reader = new FileReader();

    reader.addEventListener('load', () => {
      wordArray = crypto.lib.WordArray.create(reader.result);
      console.log(wordArray);
      const hash = calculateHash(mode, wordArray);
      console.log(hash);
      self.postMessage(hash);
    });

    reader.readAsArrayBuffer(file);
  }

  if (e.data.type === 'mode') {
    mode = e.data.mode;
    const hash = calculateHash(mode, wordArray);
    self.postMessage(hash);
  }
});

function calculateHash(mode, data) {
  let result = null;
  switch (mode) {
    case 'md5':
      result = crypto.MD5(data).toString(crypto.enc.Hex);
      break;
    case 'sha1':
      result = crypto.SHA1(data).toString(crypto.enc.Hex);
      break;
    case 'sha256':
      result = crypto.SHA256(data).toString(crypto.enc.Hex);
      break;
    case 'sha512':
      result = crypto.SHA512(data).toString(crypto.enc.Hex);
      break;
    default:
      break;
  }

  return result;
}

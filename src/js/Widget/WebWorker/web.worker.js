import crypto from 'crypto-js';

let mode = 'MD5';

self.addEventListener('message', (e) => {
    const file = e.data;

    const reader = new FileReader();

    reader.addEventListener('load', () => {

        const wordArray = crypto.lib.WordArray.create(reader.result);
        const hash = crypto.MD5(wordArray).toString(crypto.enc.Hex);
        self.postMessage(hash)
    })

    reader.readAsArrayBuffer(file);
})
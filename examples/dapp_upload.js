// This uploads a DApp to the Swarm network *without* using the filesystem.
// That allows a web application running on the browser to upload any DApp.
// This will output a hash that can be accessed on Mist & similar.

const swarm = require("./../src/swarm.js").at("http://swarm-gateways.net");

// The contents of index.html.
const indexHtml = new Buffer(
  `<html>
    <body>
      <h3><img src="ethereum_icon.png"/> Swarm.js example DApp!</h3>
      <p><a href="foo/test_text_1.txt">Test #1</a></p>
      <p><a href="foo/test_text_2.txt">Test #2</a></p>
    </body>
  </html>`);

// For binary data, we can just use a buffer.
// This is a 16x16 Ethereum icon png.
const ethereumIconPng = new Buffer([
  0x89,0x50,0x4e,0x47,0x0d,0x0a,0x1a,0x0a,0x00,0x00,0x00,0x0d,0x49,0x48,0x44,0x52,
  0x00,0x00,0x00,0x10,0x00,0x00,0x00,0x10,0x08,0x04,0x00,0x00,0x00,0xb5,0xfa,0x37,
  0xea,0x00,0x00,0x00,0xf7,0x49,0x44,0x41,0x54,0x28,0x91,0x63,0x60,0x40,0x01,0x0d,
  0x09,0x0e,0x8e,0x0c,0xb8,0xc1,0x2c,0xa1,0xce,0x9b,0xc6,0xcf,0xa3,0xf8,0x70,0x2a,
  0x98,0x90,0xd7,0xf9,0xdf,0xf0,0xbf,0x55,0x27,0x2e,0xfd,0x62,0x7d,0xff,0x40,0x0a,
  0x4c,0xdf,0x3a,0x2a,0x62,0x55,0xd0,0x77,0xac,0xe7,0x3f,0x48,0x81,0xf1,0x7f,0xcb,
  0xcd,0x58,0xa4,0x27,0xc6,0xf6,0xfc,0xe9,0xf9,0xdf,0x01,0x56,0x60,0xfc,0xdf,0x25,
  0x04,0xdd,0x78,0x9e,0x89,0x97,0xbb,0xfe,0x17,0xff,0x0f,0xf8,0x2f,0xfb,0x5f,0xeb,
  0xbf,0xd1,0x7f,0xf3,0xa7,0x81,0x42,0x28,0x0a,0x26,0x95,0x66,0xfd,0x77,0xf9,0x6f,
  0xf5,0xdf,0xec,0xbf,0xf0,0x7f,0xd1,0xff,0x12,0xff,0xd5,0xfe,0x5b,0xd4,0xa0,0x28,
  0xf0,0x5d,0x61,0xfa,0xd3,0xe2,0xbf,0xc5,0x7f,0x73,0xa0,0x02,0x11,0x10,0xfc,0xa6,
  0xba,0x0c,0x45,0xc1,0x7c,0x97,0xdc,0x76,0x8b,0xf5,0x96,0x50,0x05,0x12,0x6b,0x0c,
  0x5b,0x7c,0xfc,0x50,0x14,0x4c,0x15,0xea,0x3b,0xd7,0xbb,0xc6,0x2f,0xc4,0xfc,0x93,
  0xe8,0x2f,0xdd,0x04,0xcb,0x8d,0xa6,0x0f,0x82,0x84,0xd1,0x9c,0x39,0xc9,0xa3,0xe7,
  0x7f,0xff,0xab,0x96,0x74,0xc7,0x68,0xb3,0xe7,0xc6,0xff,0x5d,0x1d,0xb0,0x79,0xb4,
  0xbe,0xe7,0x7f,0xf7,0x5f,0x23,0xa0,0x27,0x6d,0x8b,0xb0,0x06,0x14,0x30,0xa8,0xf7,
  0x83,0x02,0xca,0x7c,0xaf,0x27,0x17,0x0e,0x05,0xd3,0x54,0x3b,0xdf,0x1a,0x7d,0x73,
  0x35,0xc0,0x21,0x0d,0x02,0x4d,0x05,0xb6,0xe1,0xa8,0x22,0x00,0xbf,0x45,0x6f,0x1b,
  0x57,0x23,0xc8,0x42,0x00,0x00,0x00,0x00,0x49,0x45,0x4e,0x44,0xae,0x42,0x60,0x82]);

// Some test .txt file.
const testText1 = new Buffer("test text #1");

// Other test .txt file.
const testText2 = new Buffer("test text #2");

// The DApp is just an object mapping routes to contents, which can be either
// strings or buffers. Mime types are inferred from the extension. You can also
// force them by using `{"type": "application/json", "content": "[1,2,3]"}`, for
// example. Notice the empty route also pointing to index.html.
const exampleDApp = {
  ""                     : {type: "text/html", data: indexHtml},
  "/index.html"          : {type: "text/html", data: indexHtml},
  "/ethereum_icon.png"   : {type: "image/png", data: ethereumIconPng},
  "/foo/test_text_1.txt" : {type: "text/plain", data: testText1},
  "/foo/test_text_2.txt" : {type: "text/plain", data: testText2}
}

// Now we just upload it.
swarm.upload(exampleDApp)
  .then(console.log)
  .catch(console.log);

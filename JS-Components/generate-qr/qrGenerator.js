const QRCode = require('qrcode');
const url = 'https://www.youtube.com/watch?v=d0Kuea3uzr0&list=PLMZdod-kiMhKBxYSWwp7uqHc7zJZbFnRf&index=18'
const run = async () => {
  const QR = await QRCode.toString(url ,{type:'terminal'});
  console.log(QR);

  

}
run()
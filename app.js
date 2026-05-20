const { createServer } = require('net');

const PORT = process.env.PORT || 3000;
const SECRET = 'ee' + Array(30).fill(0).map(() => Math.floor(Math.random()*16).toString(16)).join('');

console.log('✅ MTProto Proxy готов!');
console.log(`Порт: ${PORT}`);
console.log(`Secret: ${SECRET}`);

createServer((socket) => {
  let buffer = Buffer.alloc(0);
  socket.on('data', (data) => {
    buffer = Buffer.concat([buffer, data]);
    if (buffer.length >= 64) {
      socket.write(Buffer.from('ef000000', 'hex'));
    }
  });
}).listen(PORT, () => {
  console.log(`Сервер запущен: http://localhost:${PORT}`);
});

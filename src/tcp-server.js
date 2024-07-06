const net = require('net');
const { printPedido } = require('./services/print.service');

const TCP_PORT = 9090;

const tcpServer = net.createServer((socket) => {
  console.log('Cliente TCP conectado');

  socket.on('data', async (data) => {
    try {
      const pedido = JSON.parse(data.toString());

      if (!pedido) {
        socket.write('Pedido não fornecido');
        return;
      }

      const result = await printPedido(pedido);
      socket.write(result);
    } catch (error) {
      console.error(error);
      socket.write(error);
    }
  });

  socket.on('end', () => {
    console.log('Cliente TCP desconectado');
  });

  socket.on('error', (err) => {
    console.error(`Erro na comunicação TCP: ${err.message}`);
  });

  socket.on('timeout', () => {
    console.error('Conexão TCP expirou.');
    socket.end(); 
  });
});

tcpServer.listen(TCP_PORT, () => {
  console.log(`Servidor TCP rodando na porta ${TCP_PORT}`);
});

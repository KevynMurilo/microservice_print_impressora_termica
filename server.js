const tcpServer = require('./src/tcp-server');

const PORT = 9090;

tcpServer.listen(PORT, () => {
  console.log(`Servidor TCP rodando na porta ${PORT}`);
});

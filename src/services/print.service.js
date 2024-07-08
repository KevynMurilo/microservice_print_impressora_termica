const escpos = require('escpos');
const formatPedido = require('../utils/format-pedido');

escpos.USB = require('escpos-usb');

function printPedido(pedido) {
  return new Promise((resolve, reject) => {
    let device;
    let printer;

    try {
      device = new escpos.USB();
      printer = new escpos.Printer(device, { encoding: '860' });
    } catch (error) {
      return reject(`Erro ao conectar na impressora - ${error}`);
    }

    device.open((error) => {
      if (error) {
        return reject(`Erro ao abrir a conexão com a impressora: ${error}`);
      }

      const formattedText = formatPedido(pedido);

      printer
        .font('b')
        .align('lt')
        .size(1, 1)
        .text(formattedText)
        .cut()
        .close((err) => {
          if (err) {
            console.error('Erro ao fechar a conexão com a impressora:', err);
            return reject(`Erro ao fechar a conexão com a impressora: ${err}`);
          }
          resolve('Impressão realizada com sucesso');
        });
    });
  });
}

module.exports = { printPedido };

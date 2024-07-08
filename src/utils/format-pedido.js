function formatPedido(pedido) {
  let formattedText = '';

  const dataHora = new Date(pedido.hora_pedido);
  const data = dataHora.toLocaleDateString();
  const hora = dataHora.toLocaleTimeString();

  if (pedido.nome_cliente) {
    formattedText += `Cliente: ${pedido.nome_cliente}\n`;
  } else if (pedido.numero_mesa) {
    formattedText += `Mesa: ${pedido.numero_mesa}\n`;
  }

  formattedText += `Garçom: ${pedido.garcom.nome}\n`;
  formattedText += `Data: ${data}\n`;
  formattedText += `Hora: ${hora}\n\n`;
  formattedText += `------------------------\n`;

  pedido.itens.forEach((item, index) => {
    formattedText += `Item ${index + 1}:\n`;
    formattedText += `Produto: ${item.produto.nome}\n`;
    formattedText += `Quantidade: ${item.quantidade}\n`;
    if (item.adicionais.length > 0) {
      formattedText += `Adicionais:\n`;
      item.adicionais.forEach((adicional) => {
        formattedText += `  - ${adicional.itemAdicional.nome}: R$ ${adicional.itemAdicional.preco.toFixed(2)}\n`;
      });
    }
    if (item.observacoes) {
      formattedText += `Observações: ${item.observacoes}\n`;
    }
    formattedText += `------------------------\n`;
  });

  formattedText += `\n\n`;

  return formattedText;
}

module.exports = formatPedido;

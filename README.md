# Sistema de Impressão de Pedidos

Este projeto implementa um sistema para impressão de pedidos em impressoras térmicas utilizando Node.js e a biblioteca escpos.

## Estrutura do Projeto

O projeto está estruturado da seguinte forma:

```
./src
│
├── services
│   └── print.service.js      # Serviço para impressão de pedidos
│
├── utils
│   └── format.pedido.js      # Função utilitária para formatar dados do pedido
│
└── tcp-server.js             # Servidor TCP para recebimento e impressão de pedidos

```
## Componentes do Projeto

### `print.service.js`

O arquivo `print.service.js` contém o serviço `printPedido`, responsável por se conectar à impressora via USB e imprimir os detalhes formatados de um pedido.

#### Funcionalidades:

- **`printPedido(pedido: Object): Promise`**
  - **Descrição:** Esta função recebe um objeto `pedido` contendo informações como número da mesa, garçom, itens do pedido, entre outros. Ela se conecta à impressora térmica via USB utilizando a biblioteca `escpos` e imprime os detalhes formatados do pedido.
  - **Parâmetros:**
    - `pedido` (Object): Objeto JavaScript contendo as informações do pedido a ser impresso.
  - **Retorno:**
    - `Promise`: Retorna uma promessa que resolve com uma mensagem de sucesso ou rejeita com um erro, caso ocorra algum problema na impressão.

### `format.pedido.js`

O arquivo `format.pedido.js` exporta a função `formatPedido`, responsável por formatar os dados do pedido para impressão.

#### Funcionalidades:

- **`formatPedido(pedido: Object): String`**
  - **Descrição:** Esta função recebe um objeto `pedido` e formata suas informações em texto para serem impressas. Ela retorna uma string formatada com detalhes como número da mesa, garçom, data e hora do pedido, itens do pedido, entre outros.
  - **Parâmetros:**
    - `pedido` (Object): Objeto JavaScript contendo as informações do pedido a ser formatado.
  - **Retorno:**
    - `String`: Retorna uma string formatada com os detalhes do pedido pronta para impressão.

### `tcp-server.js`

O arquivo `tcp-server.js` implementa um servidor TCP que recebe pedidos JSON de um cliente e os envia para o serviço de impressão.

#### Funcionalidades:

- **Servidor TCP:**
  - **Descrição:** O servidor TCP é iniciado na porta `9090` e aguarda conexões de clientes. Quando um cliente se conecta, ele espera receber um pedido no formato JSON. Após receber o pedido, converte-o para um objeto JavaScript e utiliza o serviço `printPedido` para imprimir os detalhes do pedido na impressora.
  - **Eventos:**
    - `data`: Recebe os dados do cliente (pedido JSON), converte para objeto JavaScript e chama a função `printPedido`.
    - `end`: Indica que o cliente desconectou.
    - `error`: Captura e loga erros de comunicação TCP.
    - `timeout`: Lida com timeouts de conexão TCP.
  - **Parâmetros de Configuração:**
    - `TCP_PORT` (Number): Porta TCP na qual o servidor está configurado para escutar conexões.

## Como Utilizar

### Pré-requisitos

- Node.js instalado na máquina.
- Impressora térmica configurada e conectada via USB.

### Instalação de Dependências

1. Clone o repositório:

   ```
   git clone https://github.com/KevynMurilo/microservice_print_impressora_termica.git
   cd microservice_print_impressora_termica
   ```

2. Instale as dependências:

   ```
   npm install
   ```

### Execução do Servidor TCP

Para iniciar o servidor TCP e começar a receber e imprimir pedidos, execute o seguinte comando:

```
node src/tcp-server.js
```

### Exemplo de Uso

Você pode enviar um pedido JSON para o servidor TCP na porta `9090`. O pedido deve seguir o formato esperado pelo serviço de impressão. Abaixo está um exemplo de como enviar um pedido utilizando um cliente TCP:

```bash
# Exemplo de envio de pedido utilizando netcat (nc)
echo '{"numero_mesa": 1, "garcom": {"nome": "João Silva"}, "hora_pedido": "2024-07-06T14:30:00Z", "status": "pendente", "metodo_pagamento": "cartão", "itens": [{"produto": {"nome": "Café", "descricao": "Café expresso", "preco": 5.50}, "adicionais": [], "observacoes": "Sem açúcar"}]}' | nc localhost 9090
```

--------------------------------

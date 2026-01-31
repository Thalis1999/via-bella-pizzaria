const venom = require('venom-bot');

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

venom.create({
    session: 'via-bella',
    multidevice: true,
    logQR: true,
    headless: false, // Isso abrirá a janela do Chrome para você ver o processo
    useChrome: true, // Tenta usar o Chrome instalado no seu PC
    browserArgs: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage', // Ajuda a não travar a memória do PC
        '--disable-extensions'
    ]
})
.then((client) => start(client))
.catch((erro) => console.log("Erro no Venom:", erro));

async function start(client) {
  client.onMessage(async (message) => {
    const texto = message.body.toLowerCase();

    if (texto === 'oi' || texto === 'olá' || texto === 'menu') {
      await client.startTyping(message.from); // Simula digitação
      await delay(3000);

      await client.sendText(message.from,
        'Olá! Você está na *Via Bella Pizzaria* 🍕\n\n' +
        'Como posso te ajudar hoje?\n' +
        '*1* - Ver Cardápio Digital 📋\n' +
        '*2* - Horário de Funcionamento 🕒\n' +
        '*3* - Falar com um Atendente 👤'
      );
      await client.stopTyping(message.from);
    }

    if (message.body === '1') {
      await client.sendText(message.from, 'Aqui está nosso cardápio: https://Thalis1999.github.io/pizzariaViaBela/');
    }

    if (message.body === '2') {
      await client.sendText(message.from, 'Estamos abertos de Terça a Domingo, das 18h às 23h! 🕕');
    }
  });
}
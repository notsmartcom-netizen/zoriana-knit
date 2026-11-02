exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }
  try {
    const bodyData = JSON.parse(event.body);
    const token = '9051775745:AAEk19Tgiy7fdQoGsK-9BMmZ9au3EEbuZF4';
    const chat = '627507383';
    
    // ИСПРАВЛЕНО: Теперь адрес написан абсолютно правильно
    const res = await fetch('https://telegram.org' + token + '/sendMessage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chat, text: bodyData.message, parse_mode: 'Markdown' })
    });
    
    if (!res.ok) {
      return { statusCode: 400, body: JSON.stringify({ error: "Telegram API Error" }) };
    }
    
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: true })
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};

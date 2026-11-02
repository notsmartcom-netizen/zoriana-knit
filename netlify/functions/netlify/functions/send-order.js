exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { message } = JSON.parse(event.body);
    const botToken = '9051775745:AAEk19Tgiy7fdQoGsK-9BMmZ9au3EEbuZF4';
    const chatId = '627507383';

    const response = await fetch(`https://telegram.org{botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: 'Markdown' })
    });

    const data = await response.json();

    if (!response.ok || !data.ok) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: data.description || "Telegram API Error" })
      };
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: true })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};

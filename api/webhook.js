const TelegramBot = require('node-telegram-bot-api');

// تهيئة البوت بدون polling
const bot = new TelegramBot(process.env.TELEGRAM_TOKEN);

export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      // إخبار البوت بمعالجة التحديث القادم من تليجرام
      bot.processUpdate(req.body);
      
      // هنا تضع منطق الرد الخاص بك
      const msg = req.body.message;
      if (msg) {
        await bot.sendMessage(msg.chat.id, 'مرحباً! هذا رد آلي من البوت عبر Webhook.');
      }
      
      return res.status(200).send('OK');
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).send('Error');
  }
  res.status(200).send('Webhook is running');
}

import dotenv from 'dotenv';
dotenv.config();
import { Telegraf } from 'telegraf';
import { createClient } from '@supabase/supabase-js';

// 1. O'zgaruvchilarni .env dan olish
const token = process.env.TELEGRAM_BOT_TOKEN;
const adminId = process.env.TELEGRAM_ADMIN_ID;

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!token || !adminId) {
  console.error("Xatolik: TELEGRAM_BOT_TOKEN yoki TELEGRAM_ADMIN_ID .env faylida topilmadi.");
  process.exit(1);
}

// 2. Bot va Supabase ni ishga tushirish
const bot = new Telegraf(token);
const supabase = createClient(supabaseUrl, supabaseKey);

console.log("🤖 Telegram Bot ishga tushdi va xabarlarni kutmoqda...");

// 3. Supabase Realtime orqali 'feedbacks' jadvalini eshitib turish
supabase
  .channel('custom-insert-channel')
  .on(
    'postgres_changes',
    { event: 'INSERT', schema: 'public', table: 'feedbacks' },
    (payload) => {
      console.log('Yangi shikoyat tushdi!', payload.new);
      
      const newFeedback = payload.new;
      
      // Xabarni formati
      const messageToSend = `🚨 <b>Yangi Fikr / Shikoyat (Saytdan)!</b>\n\n` +
                            `📝 <b>Xabar:</b> ${newFeedback.message}\n` +
                            `👤 <b>Foydalanuvchi ID:</b> ${newFeedback.user_id || 'Anonim'}\n` +
                            `📅 <b>Sana:</b> ${new Date(newFeedback.created_at).toLocaleString('uz-UZ')}`;

      // Adminga jo'natish
      bot.telegram.sendMessage(adminId, messageToSend, { parse_mode: 'HTML' })
        .catch(err => console.error("Xabar jo'natishda xatolik:", err));
    }
  )
  .subscribe((status) => {
    if (status === 'SUBSCRIBED') {
      console.log("✅ Supabase bazasiga muvaffaqiyatli ulandi. Yangi shikoyatlar kutilmoqda...");
    }
  });

// 4. Foydalanuvchi botga bevosita yozganda javob qaytarish
bot.start((ctx) => {
  if (ctx.chat.id.toString() !== adminId) {
    ctx.reply("👋 Salom! Men BilimQuiz rasmiy botiman.\n\nAgar sayt ishlashida muammoga duch kelsangiz yoki taklifingiz bo'lsa, shu yerga yozib yuborishingiz mumkin. Adminlarimiz tez orada ko'rib chiqishadi!\n\nSaytimiz: https://bilimquiz.uz");
  }
});

bot.on('text', (ctx) => {
  const chatId = ctx.chat.id;
  const text = ctx.message.text || '';

  // Agar xabarni admin o'zi yozmayotgan bo'lsa
  if (chatId.toString() !== adminId) {
    ctx.reply("✅ Xabaringiz qabul qilindi. Tez orada ko'rib chiqamiz!");
    
    // Adminlarga forward qilish
    const forwardText = `📥 <b>Yangi xabar (Bot orqali):</b>\nKimdan: ${ctx.from?.first_name || 'Noma\'lum'}\nUsername: @${ctx.from?.username || 'yoq'}\n\n${text}`;
    bot.telegram.sendMessage(adminId, forwardText, { parse_mode: 'HTML' });
  }
});

// Botni ishga tushirish
bot.launch();

// Xatoliklarni ushlab qolish
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

// 5. Cloud xizmatlar (Render, Heroku kabi) uchun portni eshitish (shartli)
// Agar bot serverda ishlayotgan bo'lsa, xizmat o'chib qolmasligi uchun portni ochib qo'yamiz.
import http from 'http';
const PORT = process.env.PORT || 3000;
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Bot ishlamoqda!');
}).listen(PORT, () => {
  console.log(`Pinger server ${PORT}-portda ishga tushdi.`);
});

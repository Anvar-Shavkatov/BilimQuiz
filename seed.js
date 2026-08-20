import dotenv from 'dotenv';
dotenv.config();
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("VITE_SUPABASE_URL yoki VITE_SUPABASE_ANON_KEY topilmadi!");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const testData = [
  {
    subject_id: 'frontend',
    title: 'Frontend Asoslari (React & UI)',
    level: 'O\'rta',
    time_limit: 15,
    questions: [
      { text: "React'da state nima?", options: [{ id: 'a', text: 'Komponentning ichki xotirasi' }, { id: 'b', text: 'Tashqi API' }, { id: 'c', text: 'CSS klass' }, { id: 'd', text: 'Ma\'lumotlar bazasi' }], correct: 'a', expl: "State bu komponentning o'zgaruvchan ma'lumotlarini saqlovchi obyekt." },
      { text: "Virtual DOM nima?", options: [{ id: 'a', text: 'Haqiqiy DOMning ko\'chirmasi' }, { id: 'b', text: 'Brauzer oynasi' }, { id: 'c', text: 'CSS fayli' }, { id: 'd', text: 'Server arxitekturasi' }], correct: 'a', expl: "Virtual DOM bu haqiqiy DOM ning xotiradagi nusxasi bo'lib, ishlash tezligini oshiradi." },
      { text: "useEffect hooki qachon ishga tushadi?", options: [{ id: 'a', text: 'Renderdan keyin' }, { id: 'b', text: 'Faqat birinchi marta' }, { id: 'c', text: 'Tugma bosilganda' }, { id: 'd', text: 'Xatolik berganda' }], correct: 'a', expl: "useEffect odatda har bir render tugagach ishga tushadi (qaramliklarga qarab)." },
      { text: "Props nima uchun ishlatiladi?", options: [{ id: 'a', text: 'Komponentlararo ma\'lumot uzatish' }, { id: 'b', text: 'Serverga ulanish' }, { id: 'c', text: 'CSS yozish' }, { id: 'd', text: 'Ma\'lumotni saqlash' }], correct: 'a', expl: "Props ota komponentdan bola komponentga ma'lumot o'tkazish uchun ishlatiladi." },
      { text: "CSS Flexbox'da elementlarni o'rtaga joylash qaysi qoida bilan qilinadi?", options: [{ id: 'a', text: 'justify-content: center; align-items: center;' }, { id: 'b', text: 'text-align: center;' }, { id: 'c', text: 'float: center;' }, { id: 'd', text: 'margin: auto;' }], correct: 'a', expl: "Flexbox da gorizontal va vertikal o'rtaga joylash uchun shu qoidalar ishlatiladi." },
      { text: "React Router vazifasi nima?", options: [{ id: 'a', text: 'Sahifalararo o\'tishni ta\'minlash' }, { id: 'b', text: 'Fayllarni yuklash' }, { id: 'c', text: 'Dizayn qilish' }, { id: 'd', text: 'API yaratish' }], correct: 'a', expl: "React Router SPA (Single Page Application) larda sahifalarni boshqaradi." },
      { text: "Tailwind CSS ning asosiy yutug'i nima?", options: [{ id: 'a', text: 'Utility-first yondashuv' }, { id: 'b', text: 'Sekin ishlashi' }, { id: 'c', text: 'JS yozish shart emasligi' }, { id: 'd', text: 'Faqat React uchunligi' }], correct: 'a', expl: "Tailwind HTML klasslari orqali tezkor stil berish (utility-first) imkonini beradi." },
      { text: "HTML da <a> tegining vazifasi?", options: [{ id: 'a', text: 'Havola (link) yaratish' }, { id: 'b', text: 'Rasm qo\'yish' }, { id: 'c', text: 'Matnni qalin qilish' }, { id: 'd', text: 'Sarlavha' }], correct: 'a', expl: "Anchor tag (<a>) boshqa sahifalarga o'tish uchun ishlatiladi." },
      { text: "Babel qanday vazifani bajaradi?", options: [{ id: 'a', text: 'Yangi JS kodni eski brauzerlarga moslash' }, { id: 'b', text: 'Kodni formatlash' }, { id: 'c', text: 'Xatolarni qidirish' }, { id: 'd', text: 'Serverni ishga tushirish' }], correct: 'a', expl: "Babel zamonaviy ES6+ kodini hamma brauzerlar tushunadigan ES5 ga o'giradi." },
      { text: "Redux nima maqsadda ishlatiladi?", options: [{ id: 'a', text: 'Global stateni boshqarish' }, { id: 'b', text: 'UI komponentlar yaratish' }, { id: 'c', text: 'API so\'rovlar qilish' }, { id: 'd', text: 'Ma\'lumotlar bazasi' }], correct: 'a', expl: "Redux butun dastur bo'ylab state (holat) ni yagona joyda saqlash imkonini beradi." }
    ]
  },
  {
    subject_id: 'backend',
    title: 'Backend (Node.js & Ma\'lumotlar Bazasi)',
    level: 'Qiyin',
    time_limit: 20,
    questions: [
      { text: "Node.js bu nima?", options: [{ id: 'a', text: 'JS ni serverda ishlashiga imkon beruvchi muhit' }, { id: 'b', text: 'Yangi dasturlash tili' }, { id: 'c', text: 'Ma\'lumotlar bazasi' }, { id: 'd', text: 'CSS framework' }], correct: 'a', expl: "Node.js V8 dvigateli asosida ishlovchi JavaScript ishchi muhitidir." },
      { text: "Express.js nima uchun kerak?", options: [{ id: 'a', text: 'Server yaratishni osonlashtirish uchun' }, { id: 'b', text: 'Fayllarni o\'qish uchun' }, { id: 'c', text: 'Ma\'lumotlarni shifrlash' }, { id: 'd', text: 'Dizayn chizish' }], correct: 'a', expl: "Express Node.js uchun eng mashhur minimal veb freymvork hisoblanadi." },
      { text: "API nima?", options: [{ id: 'a', text: 'Application Programming Interface' }, { id: 'b', text: 'Advanced Protocol Internet' }, { id: 'c', text: 'Apple Programming Interface' }, { id: 'd', text: 'Automated Process Integration' }], correct: 'a', expl: "API ikki tizim o'zaro gaplashishi uchun qoidalar to'plamidir." },
      { text: "PostgreSQL qanday ma'lumotlar bazasi?", options: [{ id: 'a', text: 'Relyatsion (SQL)' }, { id: 'b', text: 'NoSQL' }, { id: 'c', text: 'Graf' }, { id: 'd', text: 'Fayl tizimi' }], correct: 'a', expl: "PostgreSQL kuchli ochiq kodli relyatsion (SQL) bazadir." },
      { text: "JWT qanday maqsadlarda ishlatiladi?", options: [{ id: 'a', text: 'Foydalanuvchi autentifikatsiyasi uchun' }, { id: 'b', text: 'Video yuklash uchun' }, { id: 'c', text: 'Kodni testlash uchun' }, { id: 'd', text: 'Ma\'lumotlarni bazaga yozish' }], correct: 'a', expl: "JSON Web Token (JWT) asosan autentifikatsiya va avtorizatsiyada ishlatiladi." },
      { text: "Middleware nima?", options: [{ id: 'a', text: 'So\'rov va javob o\'rtasidagi funksiya' }, { id: 'b', text: 'Ma\'lumotlar bazasi turi' }, { id: 'c', text: 'Frontend UI elementi' }, { id: 'd', text: 'OS yadrosi' }], correct: 'a', expl: "Express da middleware HTTP request va response obyektlari o'rtasida ishlovchi funksiyadir." },
      { text: "REST API ning asosiy metodlari qaysilar?", options: [{ id: 'a', text: 'GET, POST, PUT, DELETE' }, { id: 'b', text: 'READ, WRITE, EXECUTE' }, { id: 'c', text: 'START, STOP, PAUSE' }, { id: 'd', text: 'PUSH, PULL, COMMIT' }], correct: 'a', expl: "Bular REST arxitekturasining asosiy CRUD amallarini bajaruvchi HTTP metodlaridir." },
      { text: "NPM nima?", options: [{ id: 'a', text: 'Node Package Manager' }, { id: 'b', text: 'New Project Manager' }, { id: 'c', text: 'Node Program Maker' }, { id: 'd', text: 'Network Protocol Monitor' }], correct: 'a', expl: "Node.js uchun paketlarni (kutubxonalarni) boshqarish tizimi." },
      { text: "Callback Hell (Callback Do'zaxi) nima?", options: [{ id: 'a', text: 'Ketma-ket ichma-ich yozilgan callbacklar' }, { id: 'b', text: 'Tizimning buzilishi' }, { id: 'c', text: 'Server xatosi' }, { id: 'd', text: 'Virus turi' }], correct: 'a', expl: "Asinxron operatsiyalarni callback orqali yozganda paydo bo'ladigan murakkab kod tuzilishi." },
      { text: "SQL'da barcha ustunlarni tanlash uchun qaysi belgi ishlatiladi?", options: [{ id: 'a', text: '*' }, { id: 'b', text: '#' }, { id: 'c', text: '%' }, { id: 'd', text: '$' }], correct: 'a', expl: "SELECT * hamma ustunlarni bildiradi." }
    ]
  },
  {
    subject_id: 'javascript',
    title: 'JavaScript Asoslari',
    level: 'Oson',
    time_limit: 10,
    questions: [
      { text: "JavaScript da o'zgaruvchi e'lon qilish uchun qaysi kalit so'zlardan foydalaniladi?", options: [{ id: 'a', text: 'var, let, const' }, { id: 'b', text: 'int, string, bool' }, { id: 'c', text: 'define, set, let' }, { id: 'd', text: 'variable, val, const' }], correct: 'a', expl: "ES6 da o'zgaruvchilar asosan let va const bilan, eskidan esa var bilan e'lon qilinadi." },
      { text: "typeof operatori nima qaytaradi?", options: [{ id: 'a', text: 'Qiymatning ma\'lumot turini' }, { id: 'b', text: 'O\'zgaruvchi nomini' }, { id: 'c', text: 'Xatolikni' }, { id: 'd', text: 'Obyektni' }], correct: 'a', expl: "typeof qiymat string, number, object ekanligini bildiradi." },
      { text: "Massivning oxiriga element qo'shish uchun qaysi metod ishlatiladi?", options: [{ id: 'a', text: 'push()' }, { id: 'b', text: 'pop()' }, { id: 'c', text: 'shift()' }, { id: 'd', text: 'unshift()' }], correct: 'a', expl: "push() massiv oxiriga yangi element qo'shadi." },
      { text: "DOM so'zining kengaytmasi?", options: [{ id: 'a', text: 'Document Object Model' }, { id: 'b', text: 'Data Object Model' }, { id: 'c', text: 'Document Oriented Module' }, { id: 'd', text: 'Dynamic Output Method' }], correct: 'a', expl: "Veb sahifaning strukturasini ifodalovchi obyekt modeli." },
      { text: "setTimeout qanday ishlaydi?", options: [{ id: 'a', text: 'Ma\'lum vaqt o\'tgach funksiyani bajaradi' }, { id: 'b', text: 'Dasturni to\'xtatadi' }, { id: 'c', text: 'Har xil vaqtda qaytadan bajaradi' }, { id: 'd', text: 'Vaqtni o\'lchaydi' }], correct: 'a', expl: "Belgilangan millisekunddan keyin bitta funksiyani bir marta ishga tushiradi." },
      { text: "JSON.stringify() nima qiladi?", options: [{ id: 'a', text: 'Obyektni qatorga (stringga) aylantiradi' }, { id: 'b', text: 'Qatorni obyektga aylantiradi' }, { id: 'c', text: 'Massivni o\'chiradi' }, { id: 'd', text: 'Tarmoqqa jo\'natadi' }], correct: 'a', expl: "JS obyektini JSON formatidagi matnga o'tkazadi." },
      { text: "Promise larning nechta holati bor?", options: [{ id: 'a', text: '3 ta (Pending, Fulfilled, Rejected)' }, { id: 'b', text: '2 ta (True, False)' }, { id: 'c', text: '4 ta' }, { id: 'd', text: 'Cheksiz' }], correct: 'a', expl: "Promiselar kutilayotgan, bajarilgan yoki rad etilgan holatlarda bo'ladi." },
      { text: "=== va == o'rtasidagi farq?", options: [{ id: 'a', text: '=== ham qiymatni, ham turni tekshiradi' }, { id: 'b', text: 'Farqi yo\'q' }, { id: 'c', text: '== qattiqroq tekshiradi' }, { id: 'd', text: '=== faqat raqamlarni tekshiradi' }], correct: 'a', expl: "Qat'iy tenglik operatori === turlarni o'zgartirmay tekshiradi." },
      { text: "Closure nima?", options: [{ id: 'a', text: 'Ichki funksiyaning tashqi funksiya o\'zgaruvchilarini eslab qolishi' }, { id: 'b', text: 'Siklni to\'xtatuvchi buyruq' }, { id: 'c', text: 'Xatolarni yopish usuli' }, { id: 'd', text: 'Dizayn qoidasi' }], correct: 'a', expl: "JavaScript da funksiyalar o'zi yaratilgan muhitni yodda saqlaydi." },
      { text: "Array.map() qachon ishlatiladi?", options: [{ id: 'a', text: 'Massiv elementlarini o\'zgartirib yangi massiv yaratishda' }, { id: 'b', text: 'Faqat filtrlashda' }, { id: 'c', text: 'Elementlarni o\'chirishda' }, { id: 'd', text: 'Massiv uzunligini topishda' }], correct: 'a', expl: "map barcha elementlarga berilgan funksiyani qo'llab, yangi massiv qaytaradi." }
    ]
  }
];

async function seedDatabase() {
  console.log("Ma'lumotlar bazasiga testlarni kiritish boshlandi...");

  for (const quizData of testData) {
    // Check if it exists
    const { data: existing } = await supabase.from('quizzes').select('id').eq('subject_id', quizData.subject_id).limit(1);
    let quizId;
    
    if (existing && existing.length > 0) {
      console.log(`[${quizData.subject_id}] - Test allaqachon mavjud, yangilanmoqda yoki qoldirilmoqda.`);
      quizId = existing[0].id;
    } else {
      console.log(`[${quizData.subject_id}] - Yangi test yaratilmoqda...`);
      const { data: newQuiz, error: quizError } = await supabase
        .from('quizzes')
        .insert({
          title: quizData.title,
          subject_id: quizData.subject_id,
          level: quizData.level,
        })
        .select()
        .single();
        
      if (quizError) {
        console.error("Test yaratishda xato:", quizError);
        continue;
      }
      quizId = newQuiz.id;
    }
    
    // Insert questions
    console.log(`[${quizData.subject_id}] - Savollar qo'shilmoqda...`);
    // delete old ones first (optional)
    await supabase.from('questions').delete().eq('quiz_id', quizId);
    
    const questionsToInsert = quizData.questions.map((q, idx) => ({
      quiz_id: quizId,
      text: q.text,
      options: q.options,
      correct_option: q.correct,
      explanation: q.expl,
      order_num: idx + 1
    }));
    
    const { error: qError } = await supabase.from('questions').insert(questionsToInsert);
    if (qError) {
      console.error("Savollarni yaratishda xato:", qError);
    } else {
      console.log(`[${quizData.subject_id}] - 10 ta savol muvaffaqiyatli qo'shildi!`);
    }
  }
  
  console.log("Barcha testlar yuklandi. Baza tayyor!");
  process.exit(0);
}

seedDatabase();

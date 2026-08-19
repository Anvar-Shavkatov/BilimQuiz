export const MATH_QUIZ = {
  id: 'javascript',
  subjectId: 'javascript',
  title: 'JavaScript Asoslari',
  level: 'O\'rta',
  questions: [
    {
      id: 1,
      text: "Qaysi biri JavaScript-da o'zgaruvchi e'lon qilish usuli EMAS?",
      options: [
        { id: 'a', text: "var" },
        { id: 'b', text: "let" },
        { id: 'c', text: "const" },
        { id: 'd', text: "def" }
      ],
      correctOption: 'd',
      explanation: "'def' Python dasturlash tilida funksiya e'lon qilish uchun ishlatiladi, JavaScript-da emas."
    },
    {
      id: 2,
      text: "typeof null natijasi nima bo'ladi?",
      options: [
        { id: 'a', text: "'null'" },
        { id: 'b', text: "'undefined'" },
        { id: 'c', text: "'object'" },
        { id: 'd', text: "'number'" }
      ],
      correctOption: 'c',
      explanation: "JavaScript-da bu mashhur tarixiy xatolik (bug) hisoblanadi. typeof null har doim 'object' qaytaradi."
    },
    {
      id: 3,
      text: "Array.prototype.map() funksiyasining vazifasi nima?",
      options: [
        { id: 'a', text: "Massiv elementlarini qidiradi" },
        { id: 'b', text: "Yangi massiv yaratib, har bir element uchun berilgan funksiyani bajaradi" },
        { id: 'c', text: "Massivni teskari tartibda o'zgartiradi" },
        { id: 'd', text: "Massiv elementlari yig'indisini hisoblaydi" }
      ],
      correctOption: 'b',
      explanation: "map() har bir elementga funksiya qo'llab, to'liq yangi massiv qaytaradi."
    },
    {
      id: 4,
      text: "=== va == o'rtasidagi farq nima?",
      options: [
        { id: 'a', text: "Farqi yo'q" },
        { id: 'b', text: "== turlarni tekshiradi, === tekshirmaydi" },
        { id: 'c', text: "=== qiymat va turni (type) qat'iy tekshiradi, == esa turlarni avtomatik o'zgartirib tekshiradi" },
        { id: 'd', text: "Ikkalasi ham faqat raqamlar uchun ishlatiladi" }
      ],
      correctOption: 'c',
      explanation: "=== (Strict equality) qiymatni ham, turni ham tekshiradi (1 === '1' -> false). == faqat qiymatni tekshiradi (1 == '1' -> true)."
    },
    {
      id: 5,
      text: "Closure (Zamikaniye) nima?",
      options: [
        { id: 'a', text: "Funksiyaning o'zidan tashqaridagi o'zgaruvchilarga kirish imkoniyati" },
        { id: 'b', text: "Brauzerni yopish komandasi" },
        { id: 'c', text: "Xatoliklarni ushlaydigan blok" },
        { id: 'd', text: "HTML teglarni yopish" }
      ],
      correctOption: 'a',
      explanation: "Closure – bu funksiya va u e'lon qilingan leksik muhitning (scope) kombinatsiyasi."
    },
    {
      id: 6,
      text: "Promise-ning holatlari qaysilar?",
      options: [
        { id: 'a', text: "start, running, end" },
        { id: 'b', text: "pending, fulfilled, rejected" },
        { id: 'c', text: "wait, success, error" },
        { id: 'd', text: "open, read, close" }
      ],
      correctOption: 'b',
      explanation: "Promise-ning uchta holati bor: pending (kutilmoqda), fulfilled (bajarildi), rejected (rad etildi)."
    },
    {
      id: 7,
      text: "DOM nima?",
      options: [
        { id: 'a', text: "Data Object Model" },
        { id: 'b', text: "Document Object Model" },
        { id: 'c', text: "Document Orientation Mode" },
        { id: 'd', text: "Desktop Origin Module" }
      ],
      correctOption: 'b',
      explanation: "DOM (Document Object Model) - HTML yoki XML hujjatlarining strukturalangan ifodasidir."
    },
    {
      id: 8,
      text: "localStorage da ma'lumotlar qanday turda (type) saqlanadi?",
      options: [
        { id: 'a', text: "Object" },
        { id: 'b', text: "Array" },
        { id: 'c', text: "String" },
        { id: 'd', text: "Number" }
      ],
      correctOption: 'c',
      explanation: "localStorage da barcha ma'lumotlar faqat matn (String) ko'rinishida saqlanadi."
    },
    {
      id: 9,
      text: "async/await nima uchun ishlatiladi?",
      options: [
        { id: 'a', text: "Asinxron kodni sinxron ko'rinishda yozish uchun" },
        { id: 'b', text: "Veb-saytni tezlashtirish uchun" },
        { id: 'c', text: "CSS animatsiyalar yaratish uchun" },
        { id: 'd', text: "Ma'lumotlar bazasini o'chirish uchun" }
      ],
      correctOption: 'a',
      explanation: "async/await Promise-lar bilan ishlashni osonlashtiradi va kodni ketma-ket (sinxron) o'qiladigan qilib qo'yadi."
    },
    {
      id: 10,
      text: "JavaScript qaysi muhitda ishlashi mumkin?",
      options: [
        { id: 'a', text: "Faqat brauzerda" },
        { id: 'b', text: "Faqat serverda (Node.js)" },
        { id: 'c', text: "Brauzer, Server, Mobil ilovalar (React Native) va hokazo" },
        { id: 'd', text: "Faqat Windows operatsion tizimida" }
      ],
      correctOption: 'c',
      explanation: "JS hozirda nafaqat veb, balki Node.js orqali backend, React Native orqali mobil va Electron orqali desktop ilovalarda ham ishlaydi."
    }
  ]
};

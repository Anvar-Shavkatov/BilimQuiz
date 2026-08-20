import megaQuiz from './mega_quiz.json';

// Bu yerda biz local JSON bazamizni shakllantiramiz
// Agar foydalanuvchi tanlagan yo'nalish DB'da bo'lmasa, shu yerdan olinadi.
export const staticQuizzes: Record<string, any> = {
  'mega_quiz_100': {
    id: 'mega_quiz_100',
    title: megaQuiz.title,
    time_limit: 60, // 60 daqiqa
    questions: megaQuiz.questions
  },
  'it-basics': {
    id: 'it-basics',
    title: "IT Asoslari",
    time_limit: 10,
    questions: [
      megaQuiz.questions.find((q: any) => q.text.includes("Kompyuterning 'miyasi'")),
      megaQuiz.questions.find((q: any) => q.text.includes("Axborotning eng kichik")),
      megaQuiz.questions.find((q: any) => q.text.includes("Klaviatura kompyuterga")),
      megaQuiz.questions.find((q: any) => q.text.includes("Kompyuter xotirasidagi")),
      megaQuiz.questions.find((q: any) => q.text.includes("RAM (Random Access Memory)")),
      {
        id: 'it-6',
        text: "Monitor nima vazifani bajaradi?",
        options: [
          { id: 'a', text: "Axborotni chop etish" },
          { id: 'b', text: "Tasvirni ekranga chiqarish" },
          { id: 'c', text: "Ovoz chiqarish" },
          { id: 'd', text: "Ma'lumotni kiritish" }
        ],
        correct_option: 'b',
        explanation: "Monitor grafik va vizual ma'lumotlarni ko'rsatuvchi asosiy chiqish qurilmasidir.",
        order_num: 6
      },
      {
        id: 'it-7',
        text: "Sichqonchaning (Mouse) asosiy vazifasi nima?",
        options: [
          { id: 'a', text: "Kursor orqali obyektlarni boshqarish" },
          { id: 'b', text: "Matn yozish" },
          { id: 'c', text: "Internetga ulanish" },
          { id: 'd', text: "Kompyuterni yoqish" }
        ],
        correct_option: 'a',
        explanation: "Sichqoncha grafik interfeysda kursorni harakatlantirib, elementlarni tanlash va bosish uchun xizmat qiladi.",
        order_num: 7
      }
    ].filter(Boolean)
  },
  'ai-basics': {
    id: 'ai-basics',
    title: "Sun'iy Intellekt",
    time_limit: 15,
    questions: [
      megaQuiz.questions.find((q: any) => q.text.includes("Turing testi")),
      {
        id: 'ai-1',
        text: "Sun'iy intellekt (AI) nima?",
        options: [
          { id: 'a', text: "Faqat robotlar uchun mo'ljallangan dastur" },
          { id: 'b', text: "Mashinalarning inson kabi fikrlash va qaror qabul qilish qobiliyati" },
          { id: 'c', text: "Yangi turdagi internet brauzer" },
          { id: 'd', text: "Kompyuter xotirasining bir qismi" }
        ],
        correct_option: 'b',
        explanation: "AI (Sun'iy intellekt) kompyuterlarga inson intellektiga o'xshash mantiq, o'rganish va tahlil qilish imkonini beruvchi texnologiyadir.",
        order_num: 1
      },
      {
        id: 'ai-2',
        text: "Machine Learning (Mashinali o'rganish) nima?",
        options: [
          { id: 'a', text: "Kompyuterlarni o'qitish ustozi" },
          { id: 'b', text: "Algoritmlarning ma'lumotlar asosida mustaqil o'rganishi va takomillashishi" },
          { id: 'c', text: "Mashinalarni tuzatish jarayoni" },
          { id: 'd', text: "Faqat matematika bilan shug'ullanuvchi dastur" }
        ],
        correct_option: 'b',
        explanation: "Machine Learning AI ning bir qismi bo'lib, dasturlarga ochiq kodsiz, berilgan ma'lumotlar yordamida o'zini-o'zi o'qitish imkonini beradi.",
        order_num: 2
      },
      {
        id: 'ai-3',
        text: "ChatGPT kabi botlar qaysi texnologiyaga asoslangan?",
        options: [
          { id: 'a', text: "LLM (Katta til modellari)" },
          { id: 'b', text: "VR (Virtual Reallik)" },
          { id: 'c', text: "Blockchain" },
          { id: 'd', text: "IoT (Buyumlar interneti)" }
        ],
        correct_option: 'a',
        explanation: "ChatGPT Katta til modellari (Large Language Models - LLM) asosida ishlaydigan generativ sun'iy intellektdir.",
        order_num: 3
      },
      {
        id: 'ai-4',
        text: "AI ning asosiy kamchiligi nima bo'lishi mumkin?",
        options: [
          { id: 'a', text: "Elektr energiyasini ishlatmasligi" },
          { id: 'b', text: "Hissiyot va insoniy empatiyaning yo'qligi" },
          { id: 'c', text: "Ma'lumotlarni tez qayta ishlashi" },
          { id: 'd', text: "Tarmoqqa ulanishi" }
        ],
        correct_option: 'b',
        explanation: "Sun'iy intellekt mantiqiy vazifalarni zo'r bajarsa ham, hissiyotlar va haqiqiy insoniy tushunishga ega emas.",
        order_num: 4
      }
    ]
  },
  'automation': {
    id: 'automation',
    title: "Avtomatlashtirish",
    time_limit: 10,
    questions: [
      {
        id: 'auto-1',
        text: "Avtomatlashtirish (Automation) ning asosiy maqsadi nima?",
        options: [
          { id: 'a', text: "Inson aralashuvisiz jarayonlarni tez va xatosiz bajarish" },
          { id: 'b', text: "Faqat yirik zavodlarni qurish" },
          { id: 'c', text: "Kompyuterlarni buzish" },
          { id: 'd', text: "Dasturlash tilini o'zgartirish" }
        ],
        correct_option: 'a',
        explanation: "Avtomatlashtirish takrorlanuvchi va zerikarli ishlarni kompyuter va robotlarga topshirib, samaradorlikni oshiradi.",
        order_num: 1
      },
      {
        id: 'auto-2',
        text: "Smart Home (Aqlli uy) tizimlari qaysi texnologiyaga misol bo'ladi?",
        options: [
          { id: 'a', text: "O'yin texnologiyalariga" },
          { id: 'b', text: "Uy-ro'zg'or avtomatlashtirish (IoT) texnologiyalariga" },
          { id: 'c', text: "Faqat astronomiyaga" },
          { id: 'd', text: "Tibbiyot robotlariga" }
        ],
        correct_option: 'b',
        explanation: "Aqlli uy tizimlari Internet of Things (IoT) orqali qurilmalarni birlashtirib, uydagi jarayonlarni avtomatlashtiradi.",
        order_num: 2
      },
      {
        id: 'auto-3',
        text: "Qaysi ishni avtomatlashtirish eng qulay hisoblanadi?",
        options: [
          { id: 'a', text: "Ijodiy fikrlash talab qiladigan ishlarni" },
          { id: 'b', text: "Ko'p marta takrorlanadigan aniq qoidali ishlarni" },
          { id: 'c', text: "Ruhshunoslik va maslahat berishni" },
          { id: 'd', text: "San'at asarlarini yaratishni" }
        ],
        correct_option: 'b',
        explanation: "Robotlar va dasturlar algoritmlarga asoslangan takroriy ishlarni (ma'lumot kiritish, saralash) oson va aniq bajaradi.",
        order_num: 3
      }
    ]
  },
  'math-basics': {
    id: 'math-basics',
    title: "Matematika",
    time_limit: 15,
    questions: [
      {
        id: 'math-1',
        text: "2, 5, 10, 17, ? qatoridagi keyingi raqamni toping.",
        options: [
          { id: 'a', text: "24" },
          { id: 'b', text: "25" },
          { id: 'c', text: "26" },
          { id: 'd', text: "27" }
        ],
        correct_option: 'c',
        explanation: "Qatordagi farqlar toq sonlar: +3, +5, +7. Demak keyingisi 17 + 9 = 26.",
        order_num: 1
      },
      {
        id: 'math-2',
        text: "Aylananing uzunligi qanday formula bilan topiladi?",
        options: [
          { id: 'a', text: "S = πR²" },
          { id: 'b', text: "L = 2πR" },
          { id: 'c', text: "V = abc" },
          { id: 'd', text: "P = 2(a+b)" }
        ],
        correct_option: 'b',
        explanation: "Aylananing uzunligi (perimetri) L = 2πR formulasi yordamida hisoblanadi.",
        order_num: 2
      }
    ]
  },
  'history-uz': {
    id: 'history-uz',
    title: "O'zbekiston Tarixi",
    time_limit: 10,
    questions: [
      {
        id: 'hist-1',
        text: "Amir Temur nechanchi yilda tug'ilgan?",
        options: [
          { id: 'a', text: "1336-yil" },
          { id: 'b', text: "1441-yil" },
          { id: 'c', text: "1220-yil" },
          { id: 'd', text: "1501-yil" }
        ],
        correct_option: 'a',
        explanation: "Sohibqiron Amir Temur 1336-yil 9-aprelda Kesh (Shahrisabz) yaqinidagi Xo'ja Ilg'or qishlog'ida tug'ilgan.",
        order_num: 1
      },
      {
        id: 'hist-2',
        text: "Alisher Navoiyning mashhur 'Xamsa' asari nechta dostondan iborat?",
        options: [
          { id: 'a', text: "3 ta" },
          { id: 'b', text: "4 ta" },
          { id: 'c', text: "5 ta" },
          { id: 'd', text: "7 ta" }
        ],
        correct_option: 'c',
        explanation: "'Xamsa' so'zi arab tilida 'besh' degan ma'noni anglatadi va 5 ta dostondan iborat.",
        order_num: 2
      }
    ]
  },
  'physics': {
    id: 'physics',
    title: "Fizika",
    time_limit: 12,
    questions: [
      {
        id: 'phys-1',
        text: "Kuch qaysi birlikda o'lchanadi?",
        options: [
          { id: 'a', text: "Joul" },
          { id: 'b', text: "Vatt" },
          { id: 'c', text: "Nyuton" },
          { id: 'd', text: "Paskal" }
        ],
        correct_option: 'c',
        explanation: "Xalqaro birliklar sistemasida kuch Nyuton (N) da o'lchanadi.",
        order_num: 1
      }
    ]
  },
  'logic-iq': {
    id: 'logic-iq',
    title: "IQ Test",
    time_limit: 20,
    questions: [
      {
        id: 'iq-1',
        text: "Agar siz yugurish musobaqasida ikkinchi o'rindagi odamni quvib o'tsangiz, nechanchi o'rinda bo'lasiz?",
        options: [
          { id: 'a', text: "Birinchi o'rin" },
          { id: 'b', text: "Ikkinchi o'rin" },
          { id: 'c', text: "Uchinchi o'rin" },
          { id: 'd', text: "Oxirgi o'rin" }
        ],
        correct_option: 'b',
        explanation: "Ikkinchi o'rindagi odamni quvib o'tsangiz, uning o'rnini (ya'ni ikkinchi o'rinni) egallaysiz.",
        order_num: 1
      },
      {
        id: 'iq-2',
        text: "Otaning 5 ta qizi bor. Har bir qizning 1 ta akasi bor. Oila jami nechta farzanddan iborat?",
        options: [
          { id: 'a', text: "5 ta" },
          { id: 'b', text: "6 ta" },
          { id: 'c', text: "10 ta" },
          { id: 'd', text: "11 ta" }
        ],
        correct_option: 'b',
        explanation: "Barcha qizlar uchun bitta aka umumiydir. Shuning uchun 5 ta qiz + 1 ta o'g'il = 6 farzand.",
        order_num: 2
      }
    ]
  },
  'riddles': {
    id: 'riddles',
    title: "Qiziqarli Mantiq",
    time_limit: 10,
    questions: [
      {
        id: 'rid-1',
        text: "U o'zining ko'zi bo'lmasa ham yig'laydi. U nima?",
        options: [
          { id: 'a', text: "Chaqaloq" },
          { id: 'b', text: "Bulut" },
          { id: 'c', text: "Daraxt" },
          { id: 'd', text: "Shamol" }
        ],
        correct_option: 'b',
        explanation: "Bulut ko'zi bo'lmasa-da yomg'ir bo'lib 'yig'laydi'.",
        order_num: 1
      }
    ]
  },
  'finance-101': {
    id: 'finance-101',
    title: "Moliyaviy Savodxonlik",
    time_limit: 15,
    questions: [
      {
        id: 'fin-1',
        text: "Inflyatsiya nimani anglatadi?",
        options: [
          { id: 'a', text: "Pul qadrining oshishi" },
          { id: 'b', text: "Ishsizlikning kamayishi" },
          { id: 'c', text: "Pul qadrining pasayishi va narx-navoning oshishi" },
          { id: 'd', text: "Foyda solig'ining kamayishi" }
        ],
        correct_option: 'c',
        explanation: "Inflyatsiya tovar va xizmatlar narxining umumiy o'sishi, natijada pulning xarid qobiliyati pasayishi hisoblanadi.",
        order_num: 1
      },
      {
        id: 'fin-2',
        text: "Aktiv (Asset) nima?",
        options: [
          { id: 'a', text: "Sizning cho'ntagingizdan pul olib ketadigan narsa" },
          { id: 'b', text: "Sizning cho'ntagingizga pul olib keladigan narsa" },
          { id: 'c', text: "Faqatgina avtomobil va ko'chmas mulk" },
          { id: 'd', text: "Bankdan olingan qarz" }
        ],
        correct_option: 'b',
        explanation: "Robert Kiyosakining fikricha, aktiv - bu egasiga daromad keltiruvchi har qanday vosita (masalan ijara uyi, biznes, aksiyalar).",
        order_num: 2
      }
    ]
  },
  'business-startups': {
    id: 'business-startups',
    title: "Startap va Biznes",
    time_limit: 15,
    questions: [
      {
        id: 'bus-1',
        text: "B2B (Business-to-Business) modelining ma'nosi nima?",
        options: [
          { id: 'a', text: "Kompaniya o'z mahsulotini bevosita aholiga (shaxsga) sotadi" },
          { id: 'b', text: "Kompaniya o'z mahsuloti/xizmatini boshqa bir kompaniyaga sotadi" },
          { id: 'c', text: "Soliq to'lamaydigan tijorat turi" },
          { id: 'd', text: "Faqat onlayn do'kon orqali savdo qilish" }
        ],
        correct_option: 'b',
        explanation: "B2B modelida bitta biznes (masalan ulgurji yetkazib beruvchi) o'z mahsulotini boshqa bir biznesga (masalan do'konga) sotadi.",
        order_num: 1
      }
    ]
  }
};

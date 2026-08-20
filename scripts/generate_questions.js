import dotenv from 'dotenv';
dotenv.config();
import { GoogleGenAI } from '@google/genai';
import fs from 'fs/promises';

const geminiApiKey = process.env.VITE_GEMINI_API_KEY;

if (!geminiApiKey) {
  console.error("Missing VITE_GEMINI_API_KEY.");
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey: geminiApiKey });

const LEVELS = [
  { level: 'Oson', count: 30, desc: "Maktab o'quvchilari uchun umumiy bilimlar, oddiy mantiqiy savollar." },
  { level: 'O\'rta', count: 40, desc: "Qiziqarli faktlar, IT asoslari, dunyo tarixi va geografiyasi." },
  { level: 'Qiyin', count: 30, desc: "Murakkab IT muammolari, chuqur ilmiy va tarixiy faktlar, qiyin mantiqiy vazifalar." }
];

async function generateBatch(level, count, desc) {
  const prompt = `
    Sen JSON formatida test savollarini qaytaruvchi API-san. 
    Mavzu: Umumiy dunyoqarash, IT, qiziqarli faktlar va fan.
    Qiyinchilik darajasi: ${level}. ${desc}.
    Menga aynan ${count} ta har xil savol ber.
    
    Qaytaradigan ma'lumoting FAQAT JSON massiv bo'lishi shart (hech qanday markdown yoki izohlarsiz, faqat json).
    Struktura quyidagicha:
    [
      {
        "text": "Savol matni?",
        "options": [
          { "id": "a", "text": "Variant A" },
          { "id": "b", "text": "Variant B" },
          { "id": "c", "text": "Variant C" },
          { "id": "d", "text": "Variant D" }
        ],
        "correct": "a",
        "expl": "Nima uchun bu to'g'riligi haqida qisqacha izoh"
      }
    ]
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });
    
    let text = response.text;
    return JSON.parse(text);
  } catch (err) {
    console.error(`AI generation error for ${level}:`, err);
    return [];
  }
}

async function run() {
  console.log("Generating 100 questions via Gemini AI...");
  
  let allQuestions = [];
  
  for (const lvl of LEVELS) {
    console.log(`Generating ${lvl.count} ${lvl.level} questions...`);
    const qList = await generateBatch(lvl.level, lvl.count, lvl.desc);
    if (qList.length > 0) {
      allQuestions = allQuestions.concat(qList);
    }
    console.log(`Successfully generated ${qList.length} questions for ${lvl.level}.`);
  }
  
  console.log(`Total questions generated: ${allQuestions.length}`);
  
  if (allQuestions.length > 0) {
    const quizData = {
      title: '100 Qadam: Bilimlar Cho\'qqisi',
      subject_id: 'mega_quiz_100',
      level: 'Aralash (Oson -> Qiyin)',
      questions: allQuestions.map((q, idx) => ({
        text: q.text,
        options: JSON.stringify(q.options),
        correct_option: q.correct,
        explanation: q.expl,
        order_num: idx + 1
      }))
    };
    
    await fs.writeFile('src/data/mega_quiz.json', JSON.stringify(quizData, null, 2));
    console.log("Mega quiz saved to src/data/mega_quiz.json!");
  } else {
    console.log("No questions were generated.");
  }
  
  process.exit(0);
}

run();

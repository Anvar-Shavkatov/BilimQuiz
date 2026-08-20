import { GoogleGenAI } from '@google/genai';

// API kalitni .env faylidan o'qiymiz
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

// API kalit bo'lmasa xatolikni oldini olish uchun fallback
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

/**
 * Chatbot uchun javob qaytarish
 */
export async function getChatbotResponse(message: string): Promise<string> {
  if (!ai) return "Kechirasiz, Gemini API kaliti (VITE_GEMINI_API_KEY) o'rnatilmagan.";
  
  try {
    const prompt = `Sen "BilimQuiz" platformasining mehribon va yordamchi AI ustozi "BilimBot"san. Foydalanuvchi savoli: ${message}
Javobingni o'zbek tilida, qisqa va aniq qilib yoz. Agar kod yozish kerak bo'lsa, markdown formatida yoz.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
    });
    
    return response.text || "Kechirasiz, men javob bera olmadim.";
  } catch (error: any) {
    console.error("Gemini AI xatosi:", error);
    return "Tizimda xatolik yuz berdi. Iltimos keyinroq urinib ko'ring.";
  }
}

/**
 * AI Tutor - Xato javobni tushuntirish
 */
export async function getTutorExplanation(question: string, wrongAnswer: string, correctAnswer: string): Promise<string> {
  if (!ai) return "Kechirasiz, Gemini API kaliti (VITE_GEMINI_API_KEY) o'rnatilmagan.";

  try {
    const prompt = `O'quvchi test yechishda xato qildi. 
Savol: "${question}"
O'quvchining noto'g'ri javobi: "${wrongAnswer}"
To'g'ri javob: "${correctAnswer}"

Vazifang: O'quvchiga nima uchun uning javobi xato ekanini va nima uchun to'g'ri javob qandayligini o'zbek tilida do'stona tarzda tushuntirib ber. Juda uzun yozma, 2-3 ta qisqa gap bo'lsin.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
    });
    
    return response.text || "Xatoni tushuntirishda muammo yuzaga keldi.";
  } catch (error) {
    console.error("Gemini AI xatosi:", error);
    return "Tizimda xatolik yuz berdi.";
  }
}

/**
 * Avtomatik Quiz yaratish (JSON formatida)
 */
export async function generateQuizByTopic(topic: string): Promise<any[]> {
  if (!ai) throw new Error("API kalit o'rnatilmagan.");

  try {
    const prompt = `Sen mohir o'qituvchisan. "${topic}" mavzusida 10 ta test savolini tuzib ber. 
Faqatgina JSON array formatida qaytar (boshqa gaplarsiz, to'g'ridan-to'g'ri pars qilib olinadigan format). 
Har bir savol obyekti ushbu strukturada bo'lsin:
{
  "text": "Savol matni",
  "options": [
    { "id": "a", "text": "A javob matni" },
    { "id": "b", "text": "B javob matni" },
    { "id": "c", "text": "C javob matni" },
    { "id": "d", "text": "D javob matni" }
  ],
  "correct": "a", // to'g'ri javob id'si (a, b, c, d dan biri)
  "expl": "Nima uchun ushbu javob to'g'ri ekanligi haqida 1 ta qisqa tushuntirish"
}
Javoblar va savollar to'liq o'zbek tilida bo'lsin.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      }
    });

    const resultText = response.text || "[]";
    const parsedData = JSON.parse(resultText);
    return parsedData;
  } catch (error) {
    console.error("Gemini AI xatosi:", error);
    throw new Error("Testlarni yaratishda xatolik yuz berdi.");
  }
}

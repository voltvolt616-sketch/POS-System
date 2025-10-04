
import { Sale, Product } from '../types';

// This is a mock service. In a real application, you would import and use @google/genai.
// import { GoogleGenAI } from "@google/genai";
// const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeDataWithGemini = async (
  prompt: string,
  sales: Sale[],
  products: Product[]
): Promise<string> => {
  console.log("استدعاء خدمة Gemini الوهمية مع الموجه:", prompt);
  console.log("بيانات المبيعات:", sales);
  console.log("بيانات المنتجات:", products);

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // In a real implementation, you would format the data and send it to the Gemini API.
  // const model = 'gemini-1.5-flash';
  // const fullPrompt = `بناءً على بيانات المبيعات والمخزون التالية، قم بتحليل والإجابة على السؤال: "${prompt}"\n\nالبيانات: ${JSON.stringify({sales, products})}`;
  // const response = await ai.models.generateContent({ model, contents: fullPrompt });
  // return response.text;

  // Mock response based on prompt
  if (prompt.includes("أفضل المنتجات")) {
    return `
### تحليل أفضل المنتجات مبيعًا

بناءً على البيانات المقدمة، تم تحديد الأنماط التالية:

1.  **المنتج الأعلى مبيعًا (من حيث الكمية):** "بنطلون جينز أزرق" هو المنتج الأكثر مبيعًا، مما يشير إلى طلب قوي عليه.
2.  **المنتج الأعلى تحقيقًا للإيرادات:** "حذاء رياضي أبيض" يحقق أعلى إيرادات بسبب سعره المرتفع والطلب الجيد.
3.  **توصية:** يُنصح بزيادة مخزون "بنطلون جينز أزرق" و "حذاء رياضي أبيض" والنظر في عمل عروض ترويجية على "فستان صيفي مورد" لزيادة مبيعاته.
    `;
  } else if (prompt.includes("أداء المبيعات")) {
    return `
### تحليل أداء المبيعات

1.  **ذروة المبيعات:** تتركز معظم المبيعات في فترة المساء، خاصة في عطلات نهاية الأسبوع.
2.  **متوسط قيمة الفاتورة:** يبلغ متوسط قيمة الفاتورة حوالي 1350 ج.م، مما يدل على أن العملاء يميلون لشراء أكثر من قطعة في المرة الواحدة.
3.  **طرق الدفع:** الدفع عبر البطاقات يشكل 65% من إجمالي المعاملات، مما يؤكد أهمية توفير خيارات دفع إلكترونية سلسة.
    `;
  } else {
    return "لم أتمكن من فهم طلبك. يرجى طرح سؤال حول أفضل المنتجات مبيعًا أو أداء المبيعات.";
  }
};

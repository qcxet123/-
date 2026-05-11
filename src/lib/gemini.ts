import { GoogleGenAI } from "@google/genai";

let aiClient: GoogleGenAI | null = null;

function getAiClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is missing. Please set it in the Secrets panel.");
    }
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
}

export async function askSecurityExpert(prompt: string) {
  try {
    const ai = getAiClient();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: "أنت خبير في الأمن السيبراني والحماية الرقمية. اسمك 'مساعد حماية المجهول'. مهمتك هي تقديم نصائح أمنية دقيقة، شرح المخاطر الرقمية، وطرح حلول تقنية للحماية من الاختراق والسرقة الرقمية. ردودك يجب أن تكون ملهمة للثقة، تقنية ولكن مفهومة، ودائماً باللغة العربية.",
      },
    });
    return response.text;
  } catch (error) {
    console.error("AI Assistant Error:", error);
    return "عذراً، حدث خطأ أثناء محاولة معالجة طلبك. يرجى المحاولة لاحقاً.";
  }
}

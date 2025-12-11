import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are the "SmartSukuk Security Sentinel", an AI advisor for a Post-Quantum Cryptography (PQC) Blockchain Wallet. 
Your expertise lies in the intersection of Islamic Finance (Sukuk, Milkiyah, Shariah compliance) and Cybersecurity (Quantum threats, Shor's algorithm, Lattice-based cryptography).

Your goals:
1. Explain why "Harvest Now, Decrypt Later" is a threat to long-term ownership proofs (Milkiyah).
2. Advise on migrating from RSA/ECC to PQC algorithms like Kyber (Key Encapsulation) and Dilithium (Digital Signatures).
3. Ensure the user feels their assets are Halal and Secure.
4. Keep answers concise, professional, and reassuring.
`;

let chatSession: Chat | null = null;

export const initializeChat = (): Chat => {
  if (chatSession) return chatSession;

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });
    return chatSession;
  } catch (error) {
    console.error("Failed to initialize Gemini chat:", error);
    throw error;
  }
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  const chat = initializeChat();
  try {
    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text || "I apologize, I could not generate a response regarding security protocols at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "System Alert: Unable to connect to the Quantum Security Grid (API Error). Please try again later.";
  }
};
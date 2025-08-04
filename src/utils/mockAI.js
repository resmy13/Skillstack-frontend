// src/utils/mockAI.js
export async function getMockAIResponse(prompt) {
  // Simulate a short delay like a real API call
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Return a fake AI response
  return {
    text: `Mock AI response to: "${prompt}"`,
  };
}

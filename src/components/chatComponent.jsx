import React, { useState } from "react";
import { getAIResponse } from "../utils/aiService";

export default function ChatComponent() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const aiResponse = await getAIResponse(prompt);
      setResponse(aiResponse.text || aiResponse.content);
    } catch (err) {
      setResponse("Error getting AI response");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <textarea
        className="w-full border rounded p-2 mb-2"
        rows={4}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Type your question here..."
      />
      <button
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Thinking..." : "Ask AI"}
      </button>
      <div className="mt-4 p-4 border rounded bg-gray-100 min-h-[100px]">
        {response}
      </div>
    </div>
  );
}

// src/utils/aiService.js

import { getMockAIResponse } from "./mockAI";
import { getAIResponse as realGetAIResponse } from "./openAI";

const useMock = process.env.REACT_APP_USE_MOCK_AI === "true";

export const getAIResponse = useMock ? getMockAIResponse : realGetAIResponse;

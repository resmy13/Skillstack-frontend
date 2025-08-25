// src/utils/api.js
/*import axios from "axios";

// Create axios instance for API calls
const api = axios.create({
  baseURL: "http://localhost:5000/api", // Backend base URL
});

// Add request interceptor to include token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api; */
import axios from "axios";

const api = axios.create({
  baseURL: "// src/utils/api.js
/*import axios from "axios";

// Create axios instance for API calls
const api = axios.create({
  baseURL: "https://skilltracker-134z.onrender.com/api", // Backend base URL
});

// Add request interceptor to include token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api; */
import axios from "axios";

const api = axios.create({
  baseURL: "https://skilltracker-134z.onrender.com/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;


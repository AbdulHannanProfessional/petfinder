
export let apiUrl = null;
let mode = import.meta.env.MODE
if (mode === "development") {
    apiUrl = import.meta.env.VITE_PROD_API_URL
} else {
    apiUrl = import.meta.env.VITE_PROD_API_URL
}
const API_BASE_URL = "https://petfinder-2hai.onrender.com/api";

export default API_BASE_URL;

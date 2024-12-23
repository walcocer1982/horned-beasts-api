import axios from "axios";

const unsplashApi = axios.create({
  baseURL: process.env.UNSPLASH_API_URL,
  headers: {
    Authorization: `Client-ID ${process.env.UNSPLASH_API_KEY}`,
  },
});

export async function searchImages(query, per_page = 1) {
  try {
    const response = await unsplashApi.get("/search/photos", {
      params: { query, per_page },
    });

    return response.data.results[0]?.urls?.regular || "No image available.";
  } catch (error) {
    console.error("Error fetching from Unsplash:", error.message);
    return null;
  }
}

export async function getArticleDescription(title) {
    try {
      const response = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${title}`
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      return data.extract || "No description available.";
    } catch (error) {
      console.error("Error fetching from Wikipedia:", error);
      return null;
    }
  }
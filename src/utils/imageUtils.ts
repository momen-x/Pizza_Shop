// utils/imageUtils.ts
export const extractDirectImageUrl = (googleImageUrl: string): string => {
 
 if (!googleImageUrl || typeof googleImageUrl !== 'string') {
    return '../../public/assets/images/pizza1.jpeg'; // or any default image path
  }
  try {
    // Check if it's a Google Images URL
    if (googleImageUrl.includes("google.com/imgres")) {
      const url = new URL(googleImageUrl);
      const imgurl = url.searchParams.get("imgurl");
      if (imgurl) {
        return decodeURIComponent(imgurl);
      }
    }
    return googleImageUrl;
  } catch (error) {
    console.error("Error extracting image URL:", error);
    return googleImageUrl;
  }
};

// Alternative: More robust extraction
export const getValidImageUrl = (
  url: string,
  fallbackUrl: string = "/assets/images/pizza-placeholder.jpg"
): string => {
  try {
    if (url.includes("google.com/imgres")) {
      const urlParams = new URLSearchParams(url.split("?")[1]);
      const directUrl = urlParams.get("imgurl");
      return directUrl ? decodeURIComponent(directUrl) : fallbackUrl;
    }
    return url;
  } catch (error) {
    console.error("Invalid URL:", error);
    return fallbackUrl;
  }
};

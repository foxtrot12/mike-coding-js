/**
 * Generic function to fetch data from a specified URL with optional query parameters.
 *
 * @param url - The base URL to fetch data from.
 * @param params - Optional object containing query parameters as key-value pairs.
 * @returns A promise that resolves with the parsed JSON data of type T.
 * @throws An error if the network request fails or if the HTTP response status indicates an error.
 */
export async function fetchData<T>(
  url: string,
  params?: Record<string, string | number | boolean>
): Promise<T> {
  try {
    // Create a URL object from the base URL to easily manage query parameters.
    const urlObj = new URL(url);

    // If parameters are provided, append each key-value pair to the query string.
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        // The value is converted to a string to ensure compatibility.
        urlObj.searchParams.append(key, String(value));
      });
    }

    // Perform the fetch using the complete URL string.
    const response = await fetch(urlObj.toString());

    // Check if the HTTP status code indicates success.
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse and return the JSON response.
    const data: T = await response.json();
    return data;
  } catch (error) {
    // Log the error details then rethrow for further handling.
    if (error instanceof Error) {
      console.error(`Fetch error: ${error.message}`);
    } else {
      console.error("An unexpected error occurred.");
    }
    throw error;
  }
}

export function generateRandomString(length: number): string {
  const charset = "अआइईउऊऋॠऌॡएऐओऔकखगघचछजझटठडढणतथदधनपफबभमयरलवशषसहक्षत्रज्ञ";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    result += charset[randomIndex];
  }

  return result;
}

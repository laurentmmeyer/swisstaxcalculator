export const readFile = async (filePath: string): Promise<string> => {
  if (typeof window === 'undefined') {
    // Server-side: Use Node's fs/promises
    const { readFile } = await import('fs/promises');
    return readFile(filePath, 'utf-8');
  } else {
    // Client-side: Use fetch
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Failed to fetch file at ${filePath}`);
    }
    return response.text();
  }
};

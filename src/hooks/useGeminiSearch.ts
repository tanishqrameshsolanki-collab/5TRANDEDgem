
import { useState, useCallback } from 'react';
import { GoogleGenAI, Type } from '@google/genai';

// This interface is temporary, just for the Gemini result
export interface GeminiSearchResult {
  title: string;
  artist: string;
  spotifyId: string;
  youtubeId: string;
}

const searchSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      title: {
        type: Type.STRING,
        description: 'The title of the song.'
      },
      artist: {
        type: Type.STRING,
        description: 'The primary artist of the song.'
      },
      spotifyId: {
        type: Type.STRING,
        description: 'The official Spotify Track ID for the song.'
      },
      youtubeId: {
        type: Type.STRING,
        description: 'A valid YouTube video ID for the song, preferably the official music video or official audio.'
      },
    },
    required: ['title', 'artist', 'spotifyId', 'youtubeId']
  }
};

export const useGeminiSearch = (apiKey: string) => {
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const findSongIds = useCallback(async (query: string): Promise<GeminiSearchResult[]> => {
    if (!apiKey) {
        setError("Gemini API key is not set.");
        return [];
    }
    
    const ai = new GoogleGenAI({ apiKey, vertexai: true });
    setIsSearching(true);
    setError(null);
    try {
      const prompt = `You are an expert song identifier. Your task is to find songs matching the query: "${query}" and return their specific IDs for other services to use.
Return a list of 5 results.
For each song, you must provide:
1. 'title': The official song title.
2. 'artist': The main artist's name.
3. 'spotifyId': The official Spotify Track ID. This is crucial.
4. 'youtubeId': The official YouTube video ID for playback.

Ensure all fields are non-null and valid.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: { role: 'user', parts: [{ text: prompt }] },
        config: {
          responseMimeType: 'application/json',
          responseSchema: searchSchema,
        },
      });

      const jsonText = response.text.trim();
      const searchResults = JSON.parse(jsonText) as GeminiSearchResult[];
      return searchResults;
    } catch (e) {
      console.error("Error searching with Gemini:", e);
      setError("Sorry, I couldn't identify any songs. Please try a different search.");
      return [];
    } finally {
      setIsSearching(false);
    }
  }, [apiKey]);

  return { findSongIds, isSearching, error };
};

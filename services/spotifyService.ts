
import { Song } from '../types';

export class SpotifyService {
  private clientId: string;
  private clientSecret: string;

  constructor(clientId: string, clientSecret: string) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
  }

  public async exchangeCodeForToken(code: string, redirectUri: string): Promise<{ access_token: string, refresh_token: string, expires_in: number }> {
    if (!this.clientId || !this.clientSecret) {
        throw new Error("Spotify API credentials not configured.");
    }

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(this.clientId + ':' + this.clientSecret)
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectUri
      })
    });

    if (!response.ok) {
      const errorBody = await response.json();
      console.error("Spotify Token Exchange Error:", errorBody);
      throw new Error('Failed to exchange authorization code for token.');
    }

    return await response.json();
  }

  public async getUserProfile(accessToken: string): Promise<any> {
    const response = await fetch('https://api.spotify.com/v1/me', {
        headers: { 'Authorization': `Bearer ${accessToken}` }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch user profile from Spotify');
    }
    return await response.json();
  }

  public async getMultipleTrackDetails(trackIds: string[], accessToken: string): Promise<Partial<Song>[]> {
    if (trackIds.length === 0) return [];
    
    const response = await fetch(`https://api.spotify.com/v1/tracks?ids=${trackIds.join(',')}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch track details from Spotify');
    }

    const data = await response.json();
    
    return data.tracks.map((track: any) => {
        if (!track) return null;
        return {
            id: track.id,
            title: track.name,
            artist: track.artists.map((artist: any) => artist.name).join(', '),
            album: track.album.name,
            duration: Math.round(track.duration_ms / 1000),
            artwork: track.album.images[0]?.url || '',
        };
    }).filter((track: any) => track !== null);
  }
}

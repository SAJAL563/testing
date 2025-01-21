import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { broadcastId } = req.query;

  // Replace with the actual stream URL and refresh endpoint
  const streamUrl = `https://c2ee45b2888d.eu-west-1.playback.live-video.net/api/video/v1/eu-west-1.916749774596.channel.cv7OeduHYcU8.m3u8`;
  const refreshEndpoint = 'https://auth.endpoint.url/refresh';

  // Replace with the JWT tokens from your data
  let jwtToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIwMDgxNzU5ODYsInNJZCI6IjMwYWNjMThjLTY4MWQtNDk3OS04ZjFlLTVkNTQxNTQ5NDE1YiIsInJvbGVzIjpbXSwiZGV2aWNlIjoid2ViIiwic2ZDcmVhdGVkQXQiOjE2NDY2ODI0OTgsImlzVmVyaWZpZWQiOnRydWUsInVzZXJSb2xlcyI6e30sImlhdCI6MTczNjE1NjU1MywiZXhwIjoxNzQwMDQ0NTUzfQ.85rzzctjzWYsbGaxmG1PuJfmwdRlHdFIkdonkKCpjsI';
  const refreshToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIwMDgxNzU5ODYsInNJZCI6IjMwYWNjMThjLTY4MWQtNDk3OS04ZjFlLTVkNTQxNTQ5NDE1YiIsInJvbGVzIjpbXSwiZGV2aWNlIjoid2ViIiwic2ZDcmVhdGVkQXQiOjE2NDY2ODI0OTgsImlzVmVyaWZpZWQiOnRydWUsInVzZXJSb2xlcyI6e30sImlhdCI6MTczNjE1NjU1MywiZXhwIjoxNzQzOTMyNTUzfQ.OXUxfbI79R0c4j7GJUu5PSRAg5nMus3UkxxbCuX82SI';

  /**
   * Decode a JWT to extract its payload.
   */
  const decodeJwt = (token) => {
    try {
      const base64Payload = token.split('.')[1];
      return JSON.parse(Buffer.from(base64Payload, 'base64').toString());
    } catch (error) {
      console.error('Failed to decode JWT:', error);
      return null;
    }
  };

  /**
   * Refresh the access token using the refresh token.
   */
  const refreshAuthToken = async (refreshToken) => {
    try {
      const response = await fetch(refreshEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        throw new Error(`Failed to refresh token. Status: ${response.status}`);
      }

      const data = await response.json();
      return data.accessToken;
    } catch (error) {
      console.error('Error refreshing token:', error);
      return null;
    }
  };

  try {
    // Check if the token has expired
    const decodedToken = decodeJwt(jwtToken);
    const currentTime = Math.floor(Date.now() / 1000);

    if (decodedToken && decodedToken.exp < currentTime) {
      console.log('Token expired, refreshing...');
      const newToken = await refreshAuthToken(refreshToken);
      if (!newToken) {
        throw new Error('Failed to refresh token.');
      }
      jwtToken = newToken; // Update the token
    }

    console.log('Requesting stream URL:', streamUrl);

    // Fetch the HLS stream
    const response = await fetch(streamUrl, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'User-Agent': req.headers['user-agent'], // Optional but useful for debugging
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch stream. Status: ${response.status}`);
    }

    // Pipe the stream response
    res.setHeader('Content-Type', response.headers.get('Content-Type'));
    res.setHeader('Access-Control-Allow-Origin', '*');
    response.body.pipe(res);
  } catch (error) {
    console.error('Error fetching stream:', error.message);
    res.status(500).json({ error: 'Failed to proxy stream' });
  }
}

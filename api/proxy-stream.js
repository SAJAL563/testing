import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { broadcastId } = req.query;

  // Replace with the actual stream URL and refresh endpoint
  const streamUrl = `https://c2ee45b2888d.eu-west-1.playback.live-video.net/api/video/v1/eu-west-1.916749774596.channel.cv7OeduHYcU8.m3u8`;
  const refreshEndpoint = 'https://auth.endpoint.url/refresh';

  // Replace with the JWT tokens from your data
  let jwtToken =
    'eyJhbGciOiJFUzM4NCIsInR5cCI6IkpXVCJ9.eyJhd3M6Y2hhbm5lbC1hcm4iOiJhcm46YXdzOml2czpldS13ZXN0LTE6OTE2NzQ5Nzc0NTk2OmNoYW5uZWwvY3Y3T2VkdUhZY1U4IiwiZXhwIjoxNzM3NDQ4ODM3LCJhd3M6YWNjZXNzLWNvbnRyb2wtYWxsb3ctb3JpZ2luIjoiaHR0cHM6Ly90di5yb290ZXIuZ2csaHR0cHM6Ly93d3cucm9vdGVyLmdnLGh0dHBzOi8vZDJ0YjZuMjdzZ2p0N3ouY2xvdWRmcm9udC5uZXQsaHR0cHM6Ly9kMXh3N3B5Y3JhcWJhNy5jbG91ZGZyb250Lm5ldCxodHRwczovL2QxZTZ0cmtqYjl0ZnMzLmNsb3VkZnJvbnQubmV0IiwiYXdzOnN0cmljdC1vcmlnaW4tZW5mb3JjZW1lbnQiOnRydWUsImF3czp2aWV3ZXItaWQiOiIyMDA4MTc1OTg2IiwiYXdzOnZpZXdlci1zZXNzaW9uLXZlcnNpb24iOjE3Mzc0NDgyMzl9.O7gYxHMlednnStPz_pTlLOHrd9NMtUmXfpPN74Fx8gC8Gn4hhJcbq4dilqnEMA6goHZWsuTr3WR31O-9IX3ngc8ZZyCa4BLOwhqLB6DYwTEiWMl_7_Va_98BHA-00IzP';
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

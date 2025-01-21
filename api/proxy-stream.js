import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { broadcastId } = req.query;

  const streamUrl = `https://c2ee45b2888d.eu-west-1.playback.live-video.net/api/video/v1/eu-west-1.916749774596.channel.cv7OeduHYcU8.m3u8`;
  let jwtToken =
    'eyJhbGciOiJFUzM4NCIsInR5cCI6IkpXVCJ9.eyJhd3M6Y2hhbm5lbC1hcm4iOiJhcm46YXdzOml2czpldS13ZXN0LTE6OTE2NzQ5Nzc0NTk2OmNoYW5uZWwvY3Y3T2VkdUhZY1U4IiwiZXhwIjoxNzM3NDQ5MTAxLCJhd3M6YWNjZXNzLWNvbnRyb2wtYWxsb3ctb3JpZ2luIjoiaHR0cHM6Ly90di5yb290ZXIuZ2csaHR0cHM6Ly93d3cucm9vdGVyLmdnLGh0dHBzOi8vZDJ0YjZuMjdzZ2p0N3ouY2xvdWRmcm9udC5uZXQsaHR0cHM6Ly9kMXh3N3B5Y3JhcWJhNy5jbG91ZGZyb250Lm5ldCxodHRwczovL2QxZTZ0cmtqYjl0ZnMzLmNsb3VkZnJvbnQubmV0IiwiYXdzOnN0cmljdC1vcmlnaW4tZW5mb3JjZW1lbnQiOnRydWUsImF3czp2aWV3ZXItaWQiOiIyMDA4MTc1OTg2IiwiYXdzOnZpZXdlci1zZXNzaW9uLXZlcnNpb24iOjE3Mzc0NDg1MDN9.GTA9QUIpUsirhj0hktWJRjBvWZEFCJqqh-lpgCvJ7O_OIYa3Gmqw9LxMCxqGYk5usLZ8DinkbrxSWqxwiwc47B0HvwOkpZ62-wwZPWRVipRuhr2jaRTBJjX0NiBUQrF9';

  try {
    // Fetch the HLS stream
    const response = await fetch(streamUrl, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    if (!response.ok) {
      console.error(`Stream fetch failed with status ${response.status}`);
      throw new Error(`Stream fetch failed: ${response.statusText}`);
    }

    // Pipe the stream response
    res.setHeader('Content-Type', response.headers.get('Content-Type'));
    res.setHeader('Access-Control-Allow-Origin', '*');
    response.body.pipe(res);
  } catch (error) {
    console.error('Error occurred:', error.stack || error.message);
    res.status(500).json({ error: error.message || 'Failed to proxy stream' });
  }
}

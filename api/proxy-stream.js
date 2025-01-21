export default async function handler(req, res) {
  const { broadcastId } = req.query;

  // Define the stream URL dynamically using the broadcastId or set a default one
  const streamUrl = `https://c2ee45b2888d.eu-west-1.playback.live-video.net/api/video/v1/eu-west-1.916749774596.channel.cv7OeduHYcU8.m3u8`;

  // Define the authorization token
  const jwtToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIwMDgxNzU5ODYsInNJZCI6IjMwYWNjMThjLTY4MWQtNDk3OS04ZjFlLTVkNTQxNTQ5NDE1YiIsInJvbGVzIjpbXSwiZGV2aWNlIjoid2ViIiwic2ZDcmVhdGVkQXQiOjE2NDY2ODI0OTgsImlzVmVyaWZpZWQiOnRydWUsInVzZXJSb2xlcyI6e30sImlhdCI6MTczNjE1NjU1MywiZXhwIjoxNzQwMDQ0NTUzfQ.85rzzctjzWYsbGaxmG1PuJfmwdRlHdFIkdonkKCpjsI';

  try {
    // Make the request to the original HLS stream URL
    const response = await fetch(streamUrl, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'User-Agent': req.headers['user-agent'], // Pass user-agent for consistency
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch stream. Status: ${response.status}`);
    }

    // Pipe the response back to the client
    res.setHeader('Content-Type', response.headers.get('Content-Type'));
    res.setHeader('Access-Control-Allow-Origin', '*'); // CORS handling
    response.body.pipe(res);
  } catch (error) {
    console.error('Error fetching stream:', error);
    res.status(500).json({ error: 'Failed to proxy stream' });
  }
}

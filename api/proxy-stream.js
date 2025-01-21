import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { broadcastId } = req.query;

  // Construct the stream URL using the broadcastId.
  const streamUrl = `https://c2ee45b2888d.eu-west-1.playback.live-video.net/api/video/v1/eu-west-1.916749774596.channel.cv7OeduHYcU8.m3u8?token=eyJhbGciOiJFUzM4NCIsInR5cCI6IkpXVCJ9.eyJhd3M6Y2hhbm5lbC1hcm4iOiJhcm46YXdzOml2czpldS13ZXN0LTE6OTE2NzQ5Nzc0NTk2OmNoYW5uZWwvY3Y3T2VkdUhZY1U4IiwiZXhwIjoxNzM3NDQ5NDE3LCJhd3M6YWNjZXNzLWNvbnRyb2wtYWxsb3ctb3JpZ2luIjoiaHR0cHM6Ly90di5yb290ZXIuZ2csaHR0cHM6Ly93d3cucm9vdGVyLmdnLGh0dHBzOi8vZDJ0YjZuMjdzZ2p0N3ouY2xvdWRmcm9udC5uZXQsaHR0cHM6Ly9kMXh3N3B5Y3JhcWJhNy5jbG91ZGZyb250Lm5ldCxodHRwczovL2QxZTZ0cmtqYjl0ZnMzLmNsb3VkZnJvbnQubmV0IiwiYXdzOnN0cmljdC1vcmlnaW4tZW5mb3JjZW1lbnQiOnRydWUsImF3czp2aWV3ZXItaWQiOiIyMDA4MTc1OTg2IiwiYXdzOnZpZXdlci1zZXNzaW9uLXZlcnNpb24iOjE3Mzc0NDg4MTl9.ODE2IAbS4xnoaeUjZHGapl94apnhwVOfMR9acvyPKwAS7Eg8SYr4jrqw7nrEq1czoB2bsJZ64RuIXG9X0LGDGqhOE2SiHnQc0c5Y17yAedkkmLstfTbHeQqnzfIukIev`;

  // Define the headers exactly as specified
  const headers = {
    'accept': '*/*',
    'accept-language': 'en-MM,en-GB;q=0.9,en-US;q=0.8,en;q=0.7,hi;q=0.6',
    'cache-control': 'no-cache',
    'dnt': '1',
    'origin': 'https://www.rooter.gg',
    'pragma': 'no-cache',
    'priority': 'u=1, i',
    'referer': 'https://www.rooter.gg/',
    'sec-ch-ua': '"Not A(Brand";v="8", "Chromium";v="132", "Google Chrome";v="132"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'cross-site',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36',
  };

  try {
    // Fetch the stream from the URL with the provided headers
    const response = await fetch(streamUrl, { headers });

    // Check if the response is OK (200)
    if (!response.ok) {
      return res.status(response.status).send(`Failed to fetch stream: ${response.statusText}`);
    }

    // Stream the response directly to the client
    response.body.pipe(res);
  } catch (error) {
    console.error('Error fetching stream:', error);
    res.status(500).send('Error proxying the stream');
  }
}

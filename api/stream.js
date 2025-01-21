import { createProxyMiddleware } from 'http-proxy-middleware';

export default async function handler(req, res) {
  const streamUrl =
    'https://c2ee45b2888d.eu-west-1.playback.live-video.net/api/video/v1/eu-west-1.916749774596.channel.cv7OeduHYcU8.m3u8';

  const headers = {
    accept: '*/*',
    'accept-language': 'en-MM,en-GB;q=0.9,en-US;q=0.8,en;q=0.7,hi;q=0.6',
    dnt: '1',
    origin: 'https://www.rooter.gg',
    referer: 'https://www.rooter.gg/',
    'sec-ch-ua': '"Not A(Brand";v="8", "Chromium";v="132", "Google Chrome";v="132"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'cross-site',
    'user-agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36',
  };

  const response = await fetch(streamUrl, { headers });
  const body = await response.body;

  res.setHeader('Content-Type', response.headers.get('Content-Type') || 'application/x-mpegURL');
  body.pipe(res);
}

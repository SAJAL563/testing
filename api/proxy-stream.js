const fetch = require('node-fetch');

module.exports = async (req, res) => {
    const streamUrl = 'https://c2ee45b2888d.eu-west-1.playback.live-video.net/api/video/v1/eu-west-1.916749774596.channel.cv7OeduHYcU8.m3u8?token=eyJhbGciOiJFUzM4NCIsInR5cCI6IkpXVCJ9.eyJhd3M6Y2hhbm5lbC1hcm4iOiJhcm46YXdzOml2czpldS13ZXN0LTE6OTE2NzQ5Nzc0NTk2OmNoYW5uZWwvY3Y3T2VkdUhZY1U4IiwiZXhwIjoxNzM3NDUwOTU0LCJhd3M6YWNjZXNzLWNvbnRyb2wtYWxsb3ctb3JpZ2luIjoiaHR0cHM6Ly90di5yb290ZXIuZ2csaHR0cHM6Ly93d3cucm9vdGVyLmdnLGh0dHBzOi8vZDJ0YjZuMjdzZ2p0N3ouY2xvdWRmcm9udC5uZXQsaHR0cHM6Ly9kMXh3N3B5Y3JhcWJhNy5jbG91ZGZyb250Lm5ldCxodHRwczovL2QxZTZ0cmtqYjl0ZnMzLmNsb3VkZnJvbnQubmV0IiwiYXdzOnN0cmljdC1vcmlnaW4tZW5mb3JjZW1lbnQiOnRydWUsImF3czp2aWV3ZXItaWQiOiIyMDA4MTc1OTg2IiwiYXdzOnZpZXdlci1zZXNzaW9uLXZlcnNpb24iOjE3Mzc0NTAzNTZ9.Tw_Q3Z1YrJIIcp3Zq7CwMEOeD4_sAcuWWGyqF8_6kQVFGM8NZi4V0s66rssHPLXE1w-yIAvid41ORMzV9bbpZd_nyHeNarc-zzGWO0L4VsyVMaE6wveVoO5Ua4yf4izY';

    const headers = {
        'accept': '*/*',
        'accept-language': 'en-MM,en-GB;q=0.9,en-US;q=0.8,en;q=0.7,hi;q=0.6',
        'dnt': '1',
        'origin': 'https://www.rooter.gg',
        'priority': 'u=1, i',
        'referer': 'https://www.rooter.gg/',
        'sec-ch-ua': '"Not A(Brand";v="8", "Chromium";v="132", "Google Chrome";v="132"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36'
    };

    try {
        const response = await fetch(streamUrl, { headers });
        const body = response.body;
        res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
        body.pipe(res);
    } catch (error) {
        console.error('Error fetching stream:', error);
        res.status(500).send('Failed to fetch stream.');
    }
};

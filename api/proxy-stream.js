const fetch = require('node-fetch');

module.exports = async (req, res) => {
    const streamUrl = 'https://video-weaver.ord03.hls.live-video.net/v1/playlist/CpgGApYiv58Hq8Gsi6NE_iIw2C9ViUfoOmBSyYuo57CJfIkHCXdlTPOYsegLMJnAehwWqXADK_QmxWSEBU9CfucXDzoQuVPQjktTjqTT1-2Kjg0a5ORG3BBwCx8Ob1r7hHuIyvRh4hHrDRL00j7p_yDShAM0fin_79YeDtO7yPeHCnJJpBNLPfZ3ZoHlJ0SnPB_PSaYBzCCeIcvBQZHrTip4fOZFnr_s2N_zF4-dkCjfzqDY1Dls3NF6emRkzS57QylfJ-NB-GmiyfLT4NCEB6AcsoTQSDnkGksQgIUp0i49jP_beOxjww5qjti1AWiOJsWQfSz-en0TwfTp2B_9f1Ddo0VIvcgVuoytI3m6PYL5RMWm7gaKhYM3H45n7R3dD5tpWsBRtpVlxlCM0DotINl87CnAldP8JUn3qFIw9yYAuMOuUq7Qe10jpxpf2Eozo7d68mS3UYUOQJGsnF4gEs9X5AT_Ku5J_xnL49Gwpypn6HWD6YgEKl_7le1lqzFSmMECpB333EpAwqa_BfOTCW4JJkRobQTFRKCHCYlf7IDxDv9n8y8QzrzVbtWJMT6qyR3uk3QvIjHCV-hE5ebTHoI8Eijxr9Jkuv9MAdMRygD1NB9oW9M69Z6cG_xMnUResBGyuQ03PujpHvOK4J60FEwe6A9SeQpWZ5K2bZP7hGta3CLslZNSNRSINx0fWvw8PDy4t36CXNcNBwFbg3Y3iLiBZ6vSqbQkz9oXSC48NUKAbC1XgX6oUDzdmhFKMtH7azYn3dB1xrjdndDWZLl90pubVfdfnyslI8pprKTKnn5dj9NuBq_otw9xq7fHErKDklWOPkE1UJd39zsS9yS7tBZhIMQVxAogkaEYl0dPaCD4tgc8LDoaoKAoCVLvB3uyDJicM-6YfGm_gqmz4madBG-Vl8v4MhGaY2An-8q1pu7C3WNRHEE4T9nMe5OPLET0HXZSgR4U_eHGXitUci4TSKlw3t4cxjqUJTSIfSMebKEXcjM9ilOvfEJVbJ8Um27Wp2GT9siUXLH4oXKRh-o0JIOOQ15jkGRwG3fxGgyFSHWYM9JiLnIjYBEgASoJdXMtZWFzdC0xMOcJ.m3u8';

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

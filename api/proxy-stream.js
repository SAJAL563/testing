const fetch = require('node-fetch');

module.exports = async (req, res) => {
    const streamUrl = 'https://video-weaver.lax03.hls.live-video.net/v1/playlist/CogGU2rlw7LikSaTeRPmfrRzH7VmRqgx792vTcqm1bHKiXydZqQEFCvlhXDZOTF5r65URoNl4yZpSnFuMk9zlOhfJHq97NI3IKkO7TBSL_P9MhWlNGX0VwJLRuVPC2hACfvqMrXXqViGIi2DzqatH2CxbS6ayhF1Rfq2mxtcbr3r3MV2Z7fe8ZVpdBiMnGM20NtzyeBfOYLeb_uFOme7dFS8Hk3KkR5dUH3XcjEW8atx6h7AKPYQYs4ClFrU31f6NNNqKsuAathTaoQaKpJMM7h7Cm0mLwwKlM7XDQyACI4BCJjxW1m5e9NLdR6iMTpc3DdhI6byzcXaj2S-dQzfZcLg3ahWqix04IBjYVP9US_glYaV_FtgCJSvbgTkPludVi3AtbeFesk1T0ArE3o1ce7-OLv_kH7TtGp3yMXB7HkvJU29lsLvpxcXJYkjt2xtaYX7h11DoUu3I_jfX5h6SGX2nxEOzE2eJoP0UOTsf1RiwJ70RQD8jzelsrk1T5wvbxvQ86YGaC3SIMYrX42OIq5qWY9j2w_s06-TyBRvYSx7fWhv5RKxTNNaHQVinrfJ6t9fTnC4GCyHOm1_wEO76Zqwug29QomiwoFdcuOF1QNiucf48TBA19sPh0QBkqlORhu_RNleiU8pWWUAEIwzYu2zZuUDKH8F2EF44sftKWjk7vEppFICl1fIAAl_UWHRGPbfeYFzSD69mDIg0ERK4vB58h2qNi4PVdDtEJv41y94ID5H-OrpU98pYgvYRJR3I1v9AU1VER7RZnB3GWv_49-_yHQbg0SGYvG0ephpFo7xV74OpBnLx5bX0-IoG6h-IhpNmNcHuXyyE44g1c2JEdMBZNlSltgl_jqTEOWHF5eQEVh_RQGNp4E52ZIGdBEa37_r92nBAFYxRRg-ep-SVdqRpyQCqQEMhw4JaciGASBfvXPIFMm-1BxNt_U7MF2Cj9ayezf_UnpglUY30H3_FKITN1sdrODf5cdTpCsVNjQQxwew6XjQ-i6G9y-oehUyV6FUtto-f9lWdsoaDKNlTjRzykYgrmjoYSABKgl1cy13ZXN0LTIwtgs.m3u8';

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

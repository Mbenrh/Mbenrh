const fetch = require('node-fetch');

module.exports = async (req, res) => {
    const token = process.env.GITHUB_TOKEN; / 
    const username = req.query.username || 'Mbenrh';
    
    const statsResponse = await fetch(`https://github-readme-stats.vercel.app/api?username=${username}&include_all_commits=true&count_private=true`, {
        headers: {
            Authorization: `token ${token}`
        }
    });
    
    const langResponse = await fetch(`https://github-readme-stats.vercel.app/api/top-langs?username=${username}&include_all_commits=true&count_private=true`, {
        headers: {
            Authorization: `token ${token}`
        }
    });

    const stats = await statsResponse.text();
    const langStats = await langResponse.text();

    res.setHeader('Content-Type', 'text/plain');
    res.send(stats + '\n' + langStats);
};

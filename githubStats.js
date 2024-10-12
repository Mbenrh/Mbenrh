const fetch = require('node-fetch');

module.exports = async (req, res) => {
    const token = process.env.GITHUB_TOKEN;
    const username = req.query.username || 'Mbenrh';
    
    // Check if token is set
    if (!token) {
        return res.status(500).send('GitHub token is not set.');
    }

    try {
        // Correct fetch URLs
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

        // Check responses
        if (!statsResponse.ok) {
            console.error('Failed to fetch stats:', statsResponse.statusText);
            return res.status(statsResponse.status).send(`Error fetching stats: ${statsResponse.statusText}`);
        }
        
        if (!langResponse.ok) {
            console.error('Failed to fetch language stats:', langResponse.statusText);
            return res.status(langResponse.status).send(`Error fetching language stats: ${langResponse.statusText}`);
        }

        const stats = await statsResponse.text();
        const langStats = await langResponse.text();

        res.setHeader('Content-Type', 'text/plain');
        res.send(stats + '\n' + langStats);
    } catch (error) {
        console.error('Error fetching GitHub stats:', error);
        res.status(500).send('Internal Server Error');
    }
};

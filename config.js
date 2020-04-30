config = {
    discord_bot: "...", // Bot Discord TOKEN
    // twitter_user: ["1026491831398354946", "1034055823272685568", "1162134936578600960", "746754538284134400", "1055207007995813898"], // List of twitter users IDs
    twitter_user: ["44196397"], // List of twitter users IDs
    twitter_config: { // Twitter dev tools credentials
        consumer_key: '...', 
        consumer_secret: '...',
        access_token: '...',
        access_token_secret: '...',
        timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
        strictSSL: true,     // optional - requires SSL certificates to be valid.
    },
    twitter_tweet_url: "https://twitter.com/user/status/", // Twitter url for specific tweets
    images: { // List of images for the bot for use
        start: "https://media.giphy.com/media/Q3pp9Y6LxBvoI/giphy.gif",
        already: "https://media.giphy.com/media/a2fVCj2CudIiY/giphy.gif",
        test: "https://media.giphy.com/media/l46CwEYnbFtFfjZNS/giphy.gif"
    }
}


module.exports = config;


config = {
    // mode = "elon",
    mode = "shit",
    twitter: { // Twitter dev tools credentials
        consumer_key: '...', 
        consumer_secret: '...',
        access_token: '...',
        access_token_secret: '...',
        timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
        strictSSL: true,     // optional - requires SSL certificates to be valid.
    },
    twitter_url: "https://twitter.com/user/status/", // Twitter url for specific tweets
}


module.exports = config;


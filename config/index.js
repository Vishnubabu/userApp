module.exports = {
    server: {
        host: 3001
    },
    auth: {
        secret: 'sadf^YTyndskw#',
        cookie_name: 'auth',
        max_age: 31536000000
    },
    googleAPI: {
        endpoint: 'https://www.googleapis.com/books/v1/volumes?q=harry',
        cache_ttl: 24 * 60 * 60, // 1 day
        maxResults: 5
    }
}

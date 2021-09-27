let config = {
  db: process.env.DB || 'mongodb://localhost:27017/test',
  serverPort: process.env.PORT || 3000
}

module.exports = config;
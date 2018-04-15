module.exports = {
  PORT: process.env.PORT || 3000,
  MONGO_URI: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/dcryptio-api',
  FACEBOOK_API_TOKEN: process.env.FACEBOOK_API_TOKEN || '223580204894236|J0iJqYxeQ4ri6u45116-zClIdUE',
  FACEBOOK_API_BASE_URL: process.env.FACEBOOK_API_BASE_URL || 'https://graph.facebook.com/v2.11',
}

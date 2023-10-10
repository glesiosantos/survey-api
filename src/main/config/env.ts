export default {
  port: process.env.PORT || 3000,
  mongoUrl: process.env.MONGO_URL || 'mongodb://mongo:27017/surveydb',
  jwt_secret: process.env.JWT_SECRET || 'SurveyAPI2023'
}

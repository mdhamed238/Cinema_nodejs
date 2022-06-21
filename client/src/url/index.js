const baseUrl = (process.env.NODE_ENV === 'production') ? 'https://dashboard.heroku.com/apps/coolcinema' : 'localhost:5000';

export default baseUrl
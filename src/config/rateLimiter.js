const { RateLimiterMemory } = require('rate-limiter-flexible');

const rateLimiter = new RateLimiterMemory(
{
  points: 5,
  duration: 60, // per 30 seconds
});

const rateLimiterMiddleware = (req, res, next) => {
  const userId = req.headers['x-forwarded-for'];
  // Consume 1 point for each action
  rateLimiter.consume(userId) // or req.ip
    .then(() => {
      next();
    })
    .catch((rejRes) => {
      res.status(429).send('Too Many Requests');
    });
};
module.exports = rateLimiterMiddleware;
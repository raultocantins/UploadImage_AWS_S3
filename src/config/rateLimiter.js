const { RateLimiterMemory } = require('rate-limiter-flexible');

const rateLimiter = new RateLimiterMemory(
{
  points: 1,
  duration: 30, // per 30 seconds
});

const rateLimiterMiddleware = (req, res, next) => {
  const userId = getUserId();
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
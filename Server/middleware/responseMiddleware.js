// middlewares/formatResponseMiddleware.js

const formatResponseMiddleware = (req, res, next) => {
    const originalSend = res.send.bind(res); // Preserve the original `res.send` method
  
    res.send = (body) => {
      try {
        if (res.statusCode === 200) {
          // Parse body if it's a string
          if (typeof body === 'string') {
            try {
              body = JSON.parse(body);
            } catch (err) {
              body = { message: body }; // Wrap non-JSON string responses
            }
          }
  
          // Wrap response in `data` and add `success: true`
          body = {
            data: body,
            success: true,
          };
        }
  
        return originalSend(body); // Call the original `res.send` method
      } catch (error) {
        console.error('Error in response middleware:', error);
        return originalSend(body); // Send the original body in case of an error
      }
    };
  
    next();
  };
  
  module.exports = formatResponseMiddleware;
  
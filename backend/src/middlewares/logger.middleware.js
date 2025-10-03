/**
 * Middleware de logging personalizado
 * Registra todas las peticiones HTTP que llegan al servidor
 */
const logger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.url;
  
  console.log(`[${timestamp}] ${method} ${url}`);
  
  next();
};

module.exports = logger;

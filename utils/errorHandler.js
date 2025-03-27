const errorTitles = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Page Not Found',
  500: 'Internal Server Error',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
};

const renderErrorPage = (res, statusCode, message) => {
  const title = errorTitles[statusCode] || 'Error';

  const error = {
    statusCode,
    title,
    message,
  };

  res.status(statusCode).render('errors/error', { error });
};

module.exports = { renderErrorPage };

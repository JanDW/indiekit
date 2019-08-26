const fetch = require('node-fetch');
const normalizeUrl = require('normalize-url');

const {IndieKitError} = require(process.env.PWD + '/lib/errors');
const logger = require(process.env.PWD + '/lib/logger');

/**
 * Verifies that a token provides permissions to post to a publication.
 *
 * @exports verifyToken
 * @param {Object} accessToken IndieAuth access token
 * @param {Object} options Options
 * @return {Boolean} True if verifyToken autheticates publisher
 */
module.exports = async (accessToken, options) => {
  if (!accessToken) {
    throw new IndieKitError({
      status: 401,
      error: 'Unauthorized',
      error_description: 'No access token provided in request'
    });
  }

  const {me} = options;
  if (!me) {
    throw new IndieKitError({
      status: 400,
      error: 'Invalid request',
      error_description: 'Publication URL not configured'
    });
  }

  let status;
  let verifiedToken;
  try {
    const endpoint = options['token-endpoint'] || 'https://tokens.indieauth.com/token';
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    status = response.status;
    verifiedToken = await response.json();
  } catch (error) {
    throw new IndieKitError({
      error: error.name,
      error_description: error.message
    });
  }

  // Endpoint has responded, but with an error
  if (verifiedToken.error) {
    throw new IndieKitError({
      status,
      error: verifiedToken.error,
      error_description: verifiedToken.error_description
    });
  }

  // Endpoint has responded, but without a `me` value
  if (!verifiedToken.me) {
    throw new IndieKitError({
      status: 404,
      error: 'Not found',
      error_description: 'There was a problem with this access token'
    });
  }

  // Normalize publication and token URLs before comparing
  const verifiedTokenMe = normalizeUrl(verifiedToken.me);
  const publicationMe = normalizeUrl(me);
  const isAuthenticated = verifiedTokenMe === publicationMe;

  logger.debug('indieauth.verifyToken, verified token URL: %s', verifiedTokenMe);
  logger.debug('indieauth.verifyToken, publication URL: %s', publicationMe);

  // Publication URL does not match that provided by access token
  if (!isAuthenticated) {
    throw new IndieKitError({
      status: 403,
      error: 'Access denied',
      error_description: 'User does not have permission to perform request'
    });
  }

  return verifiedToken;
};

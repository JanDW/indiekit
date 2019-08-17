const {IndieKitError} = require(process.env.PWD + '/lib/errors');
const microformats = require(process.env.PWD + '/lib/microformats');
const publication = require(process.env.PWD + '/lib/publication');

/**
 * Returns an object containing information about this application.
 *
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 * @param {Function} next Express callback function
 * @returns {Promise} Express response object
 */
module.exports = async (req, res, next) => {
  const {pub} = req.app.locals;
  const {app} = req.app.locals;

  const endpointConfig = {
    categories: await publication.getCategories(pub),
    'media-endpoint': pub['media-endpoint'] || `${app.url}/media`,
    'post-types': publication.getPostTypes(pub),
    'syndicate-to': pub['syndicate-to']
  };

  const {query} = req;
  switch (query.q) {
    case 'config': {
      // Return endpoint configuration
      return res.json(endpointConfig);
    }

    case 'category': {
      // Return configured categories
      return res.json({
        categories: endpointConfig.categories
      });
    }

    case 'source': {
      if (query.url) {
        // Return source (as mf2 object) for given URL
        try {
          return res.json(
            await microformats.urlToMf2(query.url, query.properties)
          );
        } catch (error) {
          return next(error);
        }
      } else {
        // Return list of previously published posts
        return res.json(publication.getPosts());
      }
    }

    default: {
      // Return configured property if matches provided query
      if (typeof query.q === 'string' && endpointConfig[query.q]) {
        return res.json({
          [query.q]: endpointConfig[query.q]
        });
      }
    }
  }

  return next(new IndieKitError({
    status: 400,
    error: 'Invalid request',
    error_description: 'Request is missing required parameter, or there was a problem with value of one of the parameters provided'
  }));
};


const FEATURES = {
  features: {
    concepts: {},
    entities: {},
    keywords: {},
    categories: {},
    emotion: {},
    sentiment: {},
    semantic_roles: {},
  }
};


const parseJSON = (response) => {
  return response.json();
};

const handleErrors = (response) => {
  if (response.error) {
    throw response;
  }
  return response;
};

/**
 * Calls the NLU /analyze endpoint 
 *
 * @param  {Object} params The parameters
 * @return {Promise}       The request promise
 */
export const analyze = (params) =>
  fetch('/api/analyze', {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify(params),
  })
    .then(parseJSON)
    .then(handleErrors);


/**
 * Extend the `params` parameters with all the text
 * features before calling `analyze`.
 *
 * @param  {Object} params The parameters
 * @return {Promise}        The request promise
 */
export const analyzeWithAllFeatures = (params) => {
  const query = Object.assign({}, FEATURES, params);
  return analyze(query);
};

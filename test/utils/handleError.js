/*
 * This is a try-catch wrapper to ensure that asyncronous tests resolves
 */
function handleError(done, fn) {
  try { // boilerplate to be able to get the assert failures
    fn();
    done();
  } catch (error) {
    done(error);
  }
}

module.exports = handleError;

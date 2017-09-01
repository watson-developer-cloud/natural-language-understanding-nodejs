/* eslint no-undef: 0 */
/* eslint prefer-arrow-callback: 0 */
/**
* @file
*   Testing to verify the Natural Language Understanding demo is working properly
*/

// Define the suite of tests and give it the following properties:
// - Title, which shows up before any of the pass/fails.
// - Number of tests, must be changed as you add tests.
// - suite(), which contains all of your tests.
//
// @see http://casperjs.readthedocs.org/en/latest

casper.test.begin('Natural Language Understanding', 2, function suite(test) {
  const baseHost = 'http://localhost:3000';

  casper.start(baseHost, function start(result) {
    casper.test.comment('Starting Testing');

    test.assert(result.status === 200, 'Front page opens');
    test.assertEquals(this.getTitle(), 'Natural Language Understanding Demo', 'Title is found');
  });

  casper.run(function run() {
    test.done();
  });
});

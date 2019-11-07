/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-undef */

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

const nock = require('nock');
const test = require('ava');
const Publisher = require('../.');

const github = new Publisher({
  token: 'abc123',
  user: 'user',
  repo: 'repo'
});

test('Updates a file in a repository', async t => {
  // Mock request
  const scope = nock('https://api.github.com')
    .get(uri => uri.includes('foo.txt'))
    .reply(200, {
      content: 'Zm9vYmFy',
      sha: '\b[0-9a-f]{5,40}\b',
      name: 'foo.txt',
      path: 'bar/foo.txt'
    })
    .put(uri => uri.includes('foo.txt'))
    .reply(200, {
      commit: {
        message: 'Update message'
      }
    });

  // Setup
  const response = await github.updateFile('foo.txt', 'foo', 'Update message');

  // Test assertions
  t.is(response.status, 200);
  t.is(response.data.commit.message, 'Update message');
  scope.done();
});

test('Creates a file if original not found in repository', async t => {
  // Mock request
  const scope = nock('https://api.github.com')
    .get(uri => uri.includes('foo.txt'))
    .replyWithError('not found')
    .put(uri => uri.includes('foo.txt'))
    .reply(200, {
      commit: {
        message: 'Update message'
      }
    });

  // Setup
  const response = await github.updateFile('foo.txt', 'foo', 'Update message');

  // Test assertions
  t.is(response.status, 200);
  t.is(response.data.commit.message, 'Update message');
  scope.done();
});

test('Throws error updating a file in a repository', async t => {
  // Mock request
  const scope = nock('https://api.github.com')
    .get(uri => uri.includes('foo.txt'))
    .reply(200, {
      content: 'Zm9vYmFy'
    })
    .put(uri => uri.includes('foo.txt'))
    .replyWithError('unknown error');

  // Setup
  const error = await t.throwsAsync(github.updateFile('foo.txt', 'foo', {
    message: 'Update message'
  }));

  // Test assertions
  t.regex(error.message, /\bunknown error\b/);
  scope.done();
});

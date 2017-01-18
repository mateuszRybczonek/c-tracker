import { test } from 'qunit';
import moduleForAcceptance from '../helpers/module-for-acceptance';
import Pretender from 'pretender';

moduleForAcceptance('Acceptance | certificates', {
  afterEach() {
    server.shutdown();
  }
});

let server;

test('List certificates', function(assert) {
  server = new Pretender(function() {
    this.get('/certificates', function() {
      let response = {
        data: [
          {
            id: 1,
            type: 'certificates',
            attributes: {
              name: 'Test Cert',
              number: 'GUM-123',
              user: 'test@gmail.com',
              type: 'STCW',
              issueDate: new Date(2017, 1, 17),
              expiryDate: new Date(2027, 1, 17),
              updatedAt: new Date(2017, 1, 17),
              comment: 'let the force be with you',
            }
          }
        ]
      };
      return [200, {'Content-Type': 'application/json'}, JSON.stringify(response)];
    });
  });

  visit('/certificates');

  andThen(function() {
    assert.equal(find('#stcwCerts tr').length, 1, 'all STCW certs are rendered');
    assert.equal(find('#passports').length, 1, 'passports are rendered');
    assert.equal(find('#medicalCerts').length, 1, 'medical Certs are rendered');
    assert.equal(find('#endorsements').length, 1, 'endorsements are rendered');
  });
});

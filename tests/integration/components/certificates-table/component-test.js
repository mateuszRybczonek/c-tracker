import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('certificates-table', 'Integration | Component | certificates table', {
  integration: true
});

test('it renders certificates table', function(assert) {
  let certificate = Ember.Object.create({
    name: 'Jedi master license',
    number: 'GUM-123',
    user: 'test@gmail.com',
    type: 'STCW',
    issueDate: new Date(2017, 1, 17),
    expiryDate: new Date(2027, 1, 17),
    updatedAt: new Date(2017, 1, 17),
    comment: 'let the force be with you',
  });

  const dataProvider = [
    {
      titleMessage: 'no certificates',
      certificates: [],
      length: 0,
      noCertificateNotice: true,
      noCertificateNoticeMessage: ' rendered'
    },

    {
      titleMessage: 'certificates present',
      certificates: [ certificate ],
      length: 1,
      noCertificateNotice: false,
      noCertificateNoticeMessage: 'not rendered'
    },
  ];

  dataProvider.forEach(testCase => {
    this.setProperties({
      certificates: testCase.certificates,
      sortedCertificates: testCase.certificates,
    });

    this.render(hbs`
      {{certificates-table certificates=certificates title='My Jedi Certificates' id='jediCerts'}}
    `);
    assert.equal(
      this.$('#jediCerts').length > 0, true , `For ${testCase.titleMessage} - Table is rendered`
    );
    assert.equal(this.$('h2').text(), 'My Jedi Certificates', 'Proper title is rendered');
    assert.equal(this.$('.tbl-header').length > 0, true, 'Table header is rendered');
    assert.equal(this.$('.certificate').length,
      testCase.length,
      `${testCase.length} certificate is rendered`
    );
    assert.equal(
      this.$('#jediCerts .no-data:contains("You have no documents of that type")').length === 1,
      testCase.noCertificateNotice,
      `No certificate notice is ${testCase.noCertificateNoticeMessage}`
    );
  });
});

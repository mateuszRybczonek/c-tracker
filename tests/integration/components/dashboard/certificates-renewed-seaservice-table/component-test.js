import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { seaserviceStub, sessionStub } from 'library-app/tests/stubs/test-stubs';


moduleForComponent('dashboard/certificates-renewed-seaservice-table', 'Integration | Component | dashboard/certificates-renewed-seaservice-table', {
  integration: true
});

test('it renders certificates table', function(assert) {
  let certificate = Ember.Object.create({
    name: 'Jedi master license',
    number: 'GUM-123',
    user: 'test@gmail.com',
    type: 'STCW',
    issueDate: new Date(2012, 1, 17),
    expiryDate: new Date(2017, 1, 17),
    updatedAt: new Date(2015, 1, 17),
    comment: 'let the force be with you',
    renewedBasedOnSeaservice: true,
    daysOfServiceToRenew: 365,
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
    this.set('certificates', testCase.certificates);
    this.set('session', sessionStub);
    this.set('seaservices', [ seaserviceStub() ]);
    this.set('sortedCertificates', testCase.certificates);

    this.render(hbs`
      {{dashboard/certificates-renewed-seaservice-table
        certificates=certificates
        seaservices=seaservices
        session=session
      }}
    `);
    assert.equal(
      this.$('h3').length > 0, true , `For ${testCase.titleMessage} - Table is rendered`
    );
    assert.equal(this.$('.tbl-header').length > 0, true, 'Table header is rendered');
    assert.equal(this.$('.certificate').length,
      testCase.length,
      `${testCase.length} certificate is rendered`
    );
    assert.equal(
      this.$('.no-data:contains("No certificates to be renewed based on seaservice")').length === 1,
      testCase.noCertificateNotice,
      `No certificate notice is ${testCase.noCertificateNoticeMessage}`
    );
  });
});

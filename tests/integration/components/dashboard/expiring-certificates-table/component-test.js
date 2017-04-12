import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { certificateStub, sessionStub } from 'library-app/tests/stubs/test-stubs';

moduleForComponent('dashboard/expiring-certificates-table',
  'Integration | Component | dashboard/expiring-certificates-table', {
    integration: true
});

test('it renders certificates table', function(assert) {
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
      certificates: [ certificateStub() ],
      length: 1,
      noCertificateNotice: false,
      noCertificateNoticeMessage: 'not rendered'
    },
  ];

  dataProvider.forEach(testCase => {
    this.set('certificates', testCase.certificates);
    this.set('session', sessionStub);
    this.set('sortedCertificates', testCase.certificates);

    this.render(hbs`
      {{dashboard/expiring-certificates-table
        certificates=certificates
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
      this.$('.no-data:contains("No certificates expires within 60 days.")').length === 1,
      testCase.noCertificateNotice,
      `No certificate notice is ${testCase.noCertificateNoticeMessage}`
    );
  });
});

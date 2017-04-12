import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { certificateStub, sessionStub } from 'library-app/tests/stubs/test-stubs';


moduleForComponent('dashboard/expiring-certificates-table/item',
  'Integration | Component | dashboard/expiring-certificates-table/item', {
  integration: true
});

test('it renders expiring certificates table item', function(assert) {
  const expiryDate = (new Date(new Date().setDate(new Date().getDate() + 5)));

  this.set(
    'certificate',
    certificateStub()
  );
  this.set('certificate.expiryDate', new Date(new Date().setDate(new Date().getDate() + 5)));
  this.set('session', sessionStub);

  this.render(hbs`
    {{dashboard/expiring-certificates-table/item
      certificate=certificate
      session=session
    }}
  `);

  assert.equal(this.$('td').length, 3, 'with proper number of cells');
  assert.equal($(this.$('td')[0]).text().trim(), 'Test Cert', 'with proper certifcate name');
  assert.equal($(this.$('td')[1]).text().trim(), expiryDate, 'with proper expiryDate');
  assert.equal($(this.$('td')[2]).text().trim(), '5', 'with proper daysLeft');
});

import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { certificateStub, sessionStub } from '../../stubs/test-stubs';

moduleForComponent('certificate-item', 'Integration | Component | certificate item', {
  integration: true,

  beforeEach() {
    this.setProperties({
      certificate: certificateStub(new Date(2027, 1, 17)),
      session: sessionStub(),
    });
  }
});

test('it renders certificate properly', function(assert) {
  this.render(hbs`{{certificate-item certificate=certificate session=session}}`);

  assert.equal(this.$('td').length, 5, 'The right amount of cells is rendered');
  assert.equal($(this.$('td')[0]).text().trim(), 'Test Cert', 'Certificate name is rendered');
  assert.equal($(this.$('td')[1]).text().trim(), 'GUM-123', 'Certificate number is rendered');
  assert.equal($(this.$('td')[2]).text().trim(), '2017-02-17', 'Certificate issue date is rendered');
  assert.equal($(this.$('td')[3]).text().trim(), '2027-02-17', 'Certificate expiry date is rendered');
  assert.equal(this.$('.scan-preview').length, 1, 'scan preview icon is rendered');
  assert.equal(this.$('.scan-download').length, 1, 'scan download icon is rendered');
  assert.equal(this.$('.popover-certificate-details').length, 1, 'info icon is rendered');
  assert.equal(this.$('.edit-certificate').length, 1, 'edit icon is rendered');
  assert.equal(this.$('.delete-certificate').length, 1, 'delete icon is rendered');
});

test('it renders uploaded scan icons properly', function(assert) {
  this.set('imageUrl', 'http://fakeImageUrl');

  this.render(hbs`{{certificate-item certificate=certificate session=session imageUrl=imageUrl}}`);

  assert.equal(this.$('.scan-preview:disabled').length, 0, 'preview button is enabled when scan is uploaded');
  assert.equal(this.$('.scan-download:disabled').length, 0, 'preview button is enabled when scan is uploaded');

  this.set('imageUrl', null);

  assert.equal(this.$('.scan-preview:disabled').length, 1, 'preview button is disabled when no scan is uploaded');
  assert.equal(this.$('.scan-download:disabled').length, 1, 'preview button is enabled when scan is uploaded');
});

test('it marks certificate', function(assert) {
  this.set('daysToExpiry', null);

  this.render(hbs`{{certificate-item certificate=certificate session=session daysToExpiry=daysToExpiry}}`);

  const dataProvider = [
    {
      daysToExpiry: 60,
      resultClass: 'certificate',
      message: 'with no extra class if daysToExpiry > 60 days',
    }, {
      daysToExpiry: 30,
      resultClass: 'close-to-expiry',
      message: 'with "close-to-expiry" class if daysToExpiry < 60 days',
    }, {
      daysToExpiry: 'Expired',
      resultClass: 'expired',
      message: 'with "expired" class if daysToExpiry <= 0 days',
    },
  ];

  dataProvider.forEach(dataSet => {
    this.set('daysToExpiry', dataSet.daysToExpiry);
    assert.ok(this.$('tr').hasClass(dataSet.resultClass), dataSet.message);
  });
});

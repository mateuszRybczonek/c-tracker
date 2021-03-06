import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { certificateStub, sessionStub } from 'library-app/tests/stubs/test-stubs';

moduleForComponent('certificate-item-form', 'Integration | Component | certificate item form', {
  integration: true,
  beforeEach() {
    this.setProperties({
      session: sessionStub(),
    });
  }
});

test('it renders certificate-item-form properly', function(assert) {
  this.set('certificate', certificateStub(new Date(2027, 1, 17)));
  this.render(hbs`{{certificate-item-form certificate=certificate session=session}}`);

  assert.equal(
    this.$('.renewed-based-on-seaservice-switch').length,
    1,
    'with renewed-based-on-seaservice-switch'
  );
  assert.ok($(this.$('md-input-container:contains("Type")')), 'with type input');
  assert.equal($(this.$('md-input-container')[1]).text().trim(), "Name", 'with name input');
  assert.equal($(this.$('md-input-container')[2]).text().trim(), "Number", 'with number input');
  assert.equal(
    $(this.$('md-input-container')[3]).text().trim(),
    "Issue Date (dd/mm/yyyy)",
    'with issue date input'
  );
  assert.equal(
    $(this.$('md-input-container')[4]).text().trim(),
    "Expiry Date (dd/mm/yyyy)",
    'with expiry date input'
  );
  assert.ok($(this.$('md-input-container')[5]).hasClass('hidden'), 'with hidden user input');
  assert.ok($(this.$('md-input-container:contains("Comment (optional)")')), 'with comment input');
  assert.ok(this.$('.file-upload:contains("cloud-download")'), 'with proper upload icon input');
  assert.ok(this.$('.file-upload:contains("Upload file")'), 'with proper upload label');
  assert.equal(this.$('.save-button').length, 1, 'with save button');
});

test('it renders save button', function(assert) {
  const dataProvider = [
    {
      certificate: certificateStub(new Date(2027, 1, 17)),
      isInvalid: false,
      result: 0,
      message: 'enabled when certificate data is valid',
    },
    {
      certificate: certificateStub(new Date(2007, 1, 17)),
      isInvalid: true,
      result: 1,
      dataProvider: 'disabled when certificate data is invalid',
    },
  ];

  dataProvider.forEach(dataSet => {
    this.setProperties({
      certificate: dataSet.certificate,
      isInvalid: dataSet.isInvalid,
    });

    this.render(hbs`
      {{certificate-item-form certificate=certificate session=session isInvalid=isInvalid}}
    `);
    assert.equal(
      this.$('.save-button > button:disabled').length,
      dataSet.result,
      dataSet.message
    );
  });
});

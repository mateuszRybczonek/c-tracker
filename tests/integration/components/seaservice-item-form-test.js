import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { createSeaserviceModelStub, sessionStub } from 'library-app/tests/stubs/test-stubs';

moduleForComponent('seaservice-item-form', 'Integration | Component | seaservice item form', {
  integration: true,
  beforeEach() {
    this.setProperties({
      session: sessionStub(),
    });
  }
});

test('it renders seaservice-item-form properly', function(assert) {
  this.set('seaservice', createSeaserviceModelStub(new Date(2007, 1, 17), new Date(2027, 2, 17)));
  this.render(hbs`{{seaservice-item-form seaservice=seaservice session=session}}`);

  assert.equal($(this.$('md-input-container')[0]).text().trim(), "Employer", 'with employer input');
  assert.equal($(this.$('md-input-container')[1]).text().trim(), "Vessel's Name", 'with vessel name input');
  assert.equal($(this.$('md-input-container')[2]).text().trim(), "Vessel's Type", 'with vessel type input');
  assert.equal($(this.$('md-input-container')[3]).text().trim(), "GT", 'with GT input');
  assert.equal($(this.$('md-input-container')[4]).text().trim(), "Position", 'with position input');
  assert.equal($(this.$('md-input-container')[6]).text().trim(), "DP System", 'with DP system input');
  assert.equal($(this.$('md-input-container')[7]).text().trim(), "Time on DP (hours)", 'with time on DP input');
  assert.equal($(this.$('md-input-container')[8]).text().trim(), "Sign on (dd/mm/yyyy)", 'with sign on input');
  assert.equal($(this.$('md-input-container')[9]).text().trim(), "Sign off (dd/mm/yyyy)", 'with sign off input');
  assert.ok($(this.$('md-input-container:contains("Details")')), 'with vessel details input');
  assert.ok($(this.$('md-input-container:contains("Activities")')), 'with vessel activities input');
  assert.ok($(this.$('md-input-container:contains("DP Class")')), 'with DP class input');
  assert.ok($(this.$('md-input-container')[12]).hasClass('hidden'), 'with hidden user input');
  assert.equal(this.$('.save-button').length, 1, 'with save button');
});

test('it renders save button', function(assert) {
  const dataProvider = [
    {
      seaservice: createSeaserviceModelStub(new Date(2007, 1, 17), new Date(2007, 2, 17)),
      isInvalid: false,
      result: 0,
      message: 'enabled when seaservice data is valid',
    },
    {
      seaservice: createSeaserviceModelStub(new Date(2027, 1, 17), new Date(2027, 1, 1)),
      isInvalid: true,
      result: 1,
      dataProvider: 'disabled when seaservice data is invalid',
    },
  ];

  dataProvider.forEach(dataSet => {
    this.setProperties({
      seaservice: dataSet.seaservice,
      isInvalid: dataSet.isInvalid,
    });

    this.render(hbs`{{seaservice-item-form seaservice=seaservice session=session isInvalid=isInvalid}}`);

    assert.equal(
      this.$('.save-button > button:disabled').length,
      dataSet.result,
      dataSet.message
    );
  });
});

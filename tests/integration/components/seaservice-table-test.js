import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { seaserviceStub } from '../../stubs/test-stubs';

moduleForComponent('seaservice-table-form', 'Integration | Component | seaservice table', {
  integration: true
});

test('it renders seaservice table', function(assert) {
  let seaservice = seaserviceStub();

  const dataProvider = [
    {
      titleMessage: 'no seaservice',
      seaservice: [],
      length: 0,
      noSeaserviceNotice: true,
      noSeaserviceNoticeMessage: ' rendered'
    },

    {
      titleMessage: 'seaservice present',
      seaservice: [ seaservice ],
      length: 1,
      noSeaserviceNotice: false,
      noSeaserviceNoticeMessage: 'not rendered'
    },
  ];

  dataProvider.forEach(testCase => {
    this.set('seaservice', testCase.seaservice);
    this.set('sortedSeaservice', testCase.seaservice);

    this.render(hbs`
      {{seaservice-table
        seaservice=seaservice
      }}
    `);
    assert.equal(
      this.$().length > 0,
      true,
      `For ${testCase.titleMessage} - Table is rendered`
    );

    assert.equal(this.$('.tbl-header').length > 0, true, 'Table header is rendered');
    assert.equal(this.$('.seaservice').length,
      testCase.length,
      `${testCase.length} seaservices is rendered`
    );
    assert.equal(
      this.$('.no-data:contains("You have no seaservice registered")').length === 1,
      testCase.noSeaserviceNotice,
      `No certificate notice is ${testCase.noSeaserviceNoticeMessage}`
    );
  });
});

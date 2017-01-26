import { convertToLineBreaks } from 'frontend/utils/html-string-utils';
import { module, test } from 'qunit';

module('Unit | Utils | html-string-utils');

test('convertToLineBreaks replaces "\\n" with "<br>"', function(assert) {
  const dataProvider = [
    {
      text: 'test\ntest',
      result: 'test<br>test',
    },
    {
      text: 'test\ntest\ntest\ntest',
      result: 'test<br>test<br>test<br>test',
    },
    {
      text: 'test',
      result: 'test',
    },
    {
      text: '\n\n',
      result: '<br><br>',
    },
  ];

  dataProvider.forEach(testCase => {
    assert.equal(convertToLineBreaks(testCase.text), testCase.result);
  });
});

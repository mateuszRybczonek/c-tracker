import { convertToLineBreaks, removeTags } from 'frontend/utils/html-string-utils';
import { module, test } from 'qunit';

module('Unit | Utility | html-string-utils');

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

test('removeTags replaces "<.*?>" with ""', function(assert) {
  const dataProvider = [
    {
      text: 'test<http://www.airhelp.com> test',
      result: 'test test',
    },
    {
      text: 'test test',
      result: 'test test',
    },
    {
      text: '<http://www.airhelp.com><http://www.airhelp.com>',
      result: '',
    },

  ];

  dataProvider.forEach(testCase => {
    assert.equal(removeTags(testCase.text), testCase.result);
  });
});

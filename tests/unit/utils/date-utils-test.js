import { calculateDaysLeft, calculateDaysBetweenDates } from 'library-app/utils/date-utils';
import { module, test } from 'qunit';

module('Unit | Utils | date-utils');

test('calculateDaysLeft', function(assert) {
  const dataProvider = [
    {
      date: '2016-10-17T14:26:11.978Z',
      result: 'Expired',
      message: 'returns "Expired" for certificate with expiry date in the past',
    },
    {
      date: new Date(new Date().setDate(new Date().getDate() + 10)),
      result: '10',
      message: 'returns proper number of days left for certificate with expiry date in the future',
    },
    {
      date: new Date(),
      result: 'Expired',
      message: 'returns "Expired" for certificate with expiry date today',
    },
  ];

  dataProvider.forEach(testCase => {
    assert.equal(calculateDaysLeft(testCase.date), testCase.result, testCase.message);
  });
});

test('calculateDaysBetweenDates', function(assert) {
  const dataProvider = [
    {
      startDate: '2016-10-17T14:26:11.978Z',
      finishDate: '2016-10-27T14:26:11.978Z',
      result: 10,
      message: 'properly calulate days for startDate before finishDate',
    },
    {
      startDate: '2016-10-27T14:26:11.978Z',
      finishDate: '2016-10-17T14:26:11.978Z',
      result: -10,
      message: 'properly calulate days for startDate after finishDate',
    },
    {
      startDate: '2016-10-27T14:26:11.978Z',
      finishDate: '2016-10-27T14:26:11.978Z',
      result: 0,
      message: 'properly calulate days for startDate equal to finishDate',
    },
  ];

  dataProvider.forEach(testCase => {
    assert.equal(calculateDaysBetweenDates(testCase.finishDate, testCase.startDate),
      testCase.result,
      testCase.message);
  });
});

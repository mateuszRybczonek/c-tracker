import Ember from 'ember';
import { calculateDaysBetweenDates } from 'library-app/utils/date-utils';

const { Service } = Ember;

export default Service.extend({

  generateWorkHomeRatioPerYearStats(seaservices) {
    let workHomeRatioStats = [];
    const thisYear = new Date().getFullYear();

    for (var i = 4; i >= 0; i--) {
      this._createWorkHomeRatioStatsForYear(thisYear-i, workHomeRatioStats, seaservices);
    }

    return workHomeRatioStats;
  },

  seaserviceDaysPerYear(seaservices) {
    let seaserviceStats = [];
    const thisYear = new Date().getFullYear();

    for (var i = 4; i >= 0; i--) {
      this._createSeaserviceStatsForYear(thisYear-i, seaserviceStats, seaservices);
    }

    return seaserviceStats;
  },

  _createWorkHomeRatioStatsForYear(year, workHomeRatioStats, seaservices) {
    let seaserviceGivenYear = [];
    seaservices.map((seaservice) => {
      const signOn = new Date(seaservice.get('signOn'));
      const signOff = new Date(seaservice.get('signOff'));
      const firstDayOfTheYear = new Date(year,0,1);
      const lastDayOfTheYear = new Date(year,11,31);

      if ((signOn.getFullYear() === year) && (signOff.getFullYear() === year)) {
        seaserviceGivenYear.push(
          calculateDaysBetweenDates(signOff, signOn)
        );
      } else if ((signOn.getFullYear() !== year) && (signOff.getFullYear() === year)) {
        seaserviceGivenYear.push(
          calculateDaysBetweenDates(signOff, firstDayOfTheYear)
        );
      } else if ((signOn.getFullYear() === year) && (signOff.getFullYear() !== year)) {
        seaserviceGivenYear.push(
          calculateDaysBetweenDates(lastDayOfTheYear, signOn)
        );
      }
    });
    let result = Math.ceil(seaserviceGivenYear.reduce((a, b) => a + b, 0) / 3.65);
    workHomeRatioStats.push([year, result]);
  },

  _createSeaserviceStatsForYear(year, seaserviceStats, seaservices) {
    let seaserviceGivenYear = [];
    seaservices.map((seaservice) => {
      const signOn = new Date(seaservice.get('signOn'));
      const signOff = new Date(seaservice.get('signOff'));
      const firstDayOfTheYear = new Date(year,0,1);
      const lastDayOfTheYear = new Date(year,11,31);

      if ((signOn.getFullYear() === year) && (signOff.getFullYear() === year)) {
        seaserviceGivenYear.push(
          calculateDaysBetweenDates(signOff, signOn)
        );
      } else if ((signOn.getFullYear() !== year) && (signOff.getFullYear() === year)) {
        seaserviceGivenYear.push(
          calculateDaysBetweenDates(signOff, firstDayOfTheYear)
        );
      } else if ((signOn.getFullYear() === year) && (signOff.getFullYear() !== year)) {
        seaserviceGivenYear.push(
          calculateDaysBetweenDates(lastDayOfTheYear, signOn)
        );
      }
    });
    let result = Math.ceil(seaserviceGivenYear.reduce((a, b) => a + b, 0));
    seaserviceStats.push([year, result]);
  },
});

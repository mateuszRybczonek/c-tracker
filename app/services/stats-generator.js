import Ember from 'ember';
import { calculateDaysBetweenDates } from 'library-app/utils/date-utils';

const { Service } = Ember;

export default Service.extend({
  generateExperienceByPosition(seaservices) {
    let experienceByPositionArray = [];
    const positions = this._getPositionsFromSeaservice(seaservices);
    positions.forEach((position) => {
      let dpTimeArray = [];
      let daysArray = [];
      seaservices.forEach((seaservice) => {
        if(seaservice.get('position') === position) {
          const signOn = new Date(seaservice.get('signOn'));
          const signOff = new Date(seaservice.get('signOff'));
          dpTimeArray.push(seaservice.get('timeOnDP'));
          daysArray.push(calculateDaysBetweenDates(signOff, signOn));
        }
      });
      const totalDpTime = dpTimeArray.reduce((a, b) => a + b, 0);
      const totalDaysTime = daysArray.reduce((a, b) => a + b, 0);
      const experienceByPosition = {
        position: position,
        dpTime: totalDpTime,
        days: totalDaysTime,
      };
      experienceByPositionArray.push(experienceByPosition);
    });
    return experienceByPositionArray;
  },

  generateExperienceByDPClass(seaservices) {
    let experienceByDPClassArray = [];
    const dpClasses = [1,2,3];
    dpClasses.forEach((dpClass) => {
      let dpTimeArray = [];
      let daysArray = [];
      seaservices.forEach((seaservice) => {
        if(seaservice.get('dpClass') === dpClass) {
          const signOn = new Date(seaservice.get('signOn'));
          const signOff = new Date(seaservice.get('signOff'));
          dpTimeArray.push(seaservice.get('timeOnDP'));
          daysArray.push(calculateDaysBetweenDates(signOff, signOn));
        }
      });
      const totalDpTime = dpTimeArray.reduce((a, b) => a + b, 0);
      const totalDaysTime = daysArray.reduce((a, b) => a + b, 0);
      const experienceByDPClass = {
        dpClass: dpClass,
        dpTime: totalDpTime,
        days: totalDaysTime,
      };
      experienceByDPClassArray.push(experienceByDPClass);
    });
    return experienceByDPClassArray;
  },

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

  generateStayOnBoardStats(seaservices) {
    let seaserviceDays = [];
    let stayOnBoardStats = {};

    seaservices.map((seaservice) => {
      const signOn = new Date(seaservice.get('signOn'));
      const signOff = new Date(seaservice.get('signOff'));
      seaserviceDays.push(calculateDaysBetweenDates(signOff, signOn));
    });

    let totalStay = seaserviceDays.reduce(function(a, b) { return a + b; });
    let averageStay = totalStay / seaserviceDays.length;

    return stayOnBoardStats = {
      longestStay: Math.max.apply(this, seaserviceDays).toFixed(0),
      shortestStay:  Math.min.apply(this, seaserviceDays).toFixed(0),
      averageStay: averageStay.toFixed(0),
      totalStay: totalStay.toFixed(0),
    };
  },
  
  _getPositionsFromSeaservice(seaservices) {
    let positions = [];
    seaservices.forEach((seaservice) => {
      if (positions.indexOf(seaservice.get('position')) === -1) {
        positions.push(seaservice.get('position'));
      }
    });
    return positions;
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

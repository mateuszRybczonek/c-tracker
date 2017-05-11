import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({

  classNames: ['new-form'],

  dpClasses: [1, 2, 3],

  datesValid: computed('seaservice.signOn', 'seaservice.signOff', function() {
    const signOffAfterSignOn =
      this._toJSDate(this.get('seaservice.signOn')) <
      this._toJSDate(this.get('seaservice.signOff'));

    const signOnYear = this.get('seaservice.signOn').split("-")[0];
    const signOffYear = this.get('seaservice.signOff').split("-")[0];

    const validYears =
      (signOnYear <= 2100 && signOnYear >= 1900 && signOffYear <=2100 && signOffYear >= 1900);

    return (signOffAfterSignOn && validYears);
  }),

  dateValidation: [{
    message: 'Please provide date in a valid format (years range 1950-2099)',
    validate: (inputValue) => {
      let datePattern = /(19[5-9]\d|20[0-9]\d|2090)[/\-][0-9]{2}[/\-][0-9]{2}/;
      return datePattern.test(inputValue);
    },
  }],
  
  isValid: computed.and('seaservice.isValid', 'datesValid'),

  isInvalid: computed.not('isValid'),

  actions: {
    saveSeaservice(seaservice) {
      this.sendAction('action', seaservice);
    }
  },

  _toJSDate(dateString) {
    const [year, month, day] = dateString.split("-");
    return new Date(year, month - 1, day);
  },
});

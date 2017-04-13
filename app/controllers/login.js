import Ember from 'ember';
const { Controller } = Ember;

export default Controller.extend({
  exploreItems: [
    {
      icon: 'backup',
      title: 'Access',
      descriptionItems: [
        'Have access to your data anywhere you are.',
        'Use your mobile or desktop to access the data.'
      ],
    }, {
      icon: 'assignment',
      title: 'Control',
      descriptionItems: [
        'Keep track of your certificates and seaservice in simple and clear way.',
        "Get information about expiring certificates before it's too late.",
        'Know how many days more you need to renew your license based on seaservice.',
      ],
    }, {
      icon: 'assessment',
      title: 'Statistics',
      descriptionItems: [
        'Know how many days you spent onboard in the last year.',
        'Let the application calculate your DP hours, day on board, etc.',
        'Compare the amount of time spent onboard.',
      ],
    },
  ],
});

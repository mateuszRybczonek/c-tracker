import Ember from 'ember';

function createExpiringCertificatesModelStub(expiryDate) {
  return {
    expiryDate: expiryDate,
  };
}

function createSeaserviceModelStub(signOn, signOff) {
  return Ember.Object.create({
    signOn: signOn,
    signOff: signOff,
  });
}

function certificateStub(expiryDate) {
  return Ember.Object.create({
    id: 1,
    name: 'Test Cert',
    number: 'GUM-123',
    user: 'test@gmail.com',
    type: 'STCW',
    issueDate: new Date(2017, 1, 17),
    expiryDate,
    updatedAt: new Date(2017, 1, 17),
    comment: 'let the force be with you',
    renewedBasedOnSeaservice: false,
    daysOfServiceToRenew: null,
  });

}

function seaserviceStub() {
  return Ember.Object.create({
    id: 1,
    employer: 'Ensco plc',
    vesselName: 'Ensco DS-2',
    vesselType: 'Drillship',
    vesselGT: '29677',
    vesselDetails: 'Drillship',
    vesselActivities: 'Drilling',
    dpClass: '2',
    dpSystem: 'Converteam',
    timeOnDP: '420',
    position: '2nd Officer / SDPO',
    signOn: '2012-11-29',
    signOff: '2013-01-03',
  });
}

function sessionStub() {
  return {
    session: {
      currentUser: {
        email: 'test@gmail.com'
      }
    }
  };
}

export {
  createExpiringCertificatesModelStub,
  createSeaserviceModelStub,
  certificateStub,
  sessionStub,
  seaserviceStub
};

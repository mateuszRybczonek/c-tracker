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

export { createExpiringCertificatesModelStub, createSeaserviceModelStub };

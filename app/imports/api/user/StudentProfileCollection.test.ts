import { Meteor } from 'meteor/meteor';
import { expect } from 'chai';
import {} from 'mocha';
import { removeAllEntities } from '../base/BaseUtilities';
import { StudentProfiles } from './StudentProfileCollection';

/* tslint:disable:ter-prefer-arrow-callback no-unused-expression */

if (Meteor.isServer) {
  describe('StudentProfileCollection', function testSuite() {
    before(function setup() {
      removeAllEntities();
    });

    after(function tearDown() {
      removeAllEntities();
    });

    it('#define, #isDefined, #update, #removeIt, #dumpOne, #restoreOne', function test() {
      const username = 'amytaka@hawaii.edu';
      const firstName = 'Amy';
      const lastName = 'Takayesu';
      const picture = 'amy.jpg';
      const website = 'http://amytaka.github.io';
      const interests = [];
      const careerGoals = [];
      const level = 6;
      const declaredAcademicTerm = 'Spring-2017';
      const docID = StudentProfiles.define({
        username, firstName, lastName, picture, website, interests,
        careerGoals, level, declaredAcademicTerm,
      });
      expect(StudentProfiles.isDefined(docID)).to.be.true;
      const dumpObject = StudentProfiles.dumpOne(docID);
      StudentProfiles.removeIt(docID);
      expect(StudentProfiles.isDefined(docID)).to.be.false;
      StudentProfiles.restoreOne(dumpObject);
      const id = StudentProfiles.getID(username);
      expect(StudentProfiles.isDefined(id)).to.be.true;
      StudentProfiles.removeIt(id);
    });
  });
}

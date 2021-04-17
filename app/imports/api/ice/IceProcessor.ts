import { Meteor } from 'meteor/meteor';
import _ from 'lodash';
import SimpleSchema from 'simpl-schema';
import { Courses } from '../course/CourseCollection';
import { Ice } from '../../typings/radgrad';

export const iceLabels = {
  i: 'Innovation',
  c: 'Competency',
  e: 'Experience',
};

export const iceSchema = new SimpleSchema({
  i: {
    type: SimpleSchema.Integer,
    min: 0,
  },
  c: {
    type: SimpleSchema.Integer,
    min: 0,
  },
  e: {
    type: SimpleSchema.Integer,
    min: 0,
  },
});

/**
 * Polyfill definition of isInteger in case it's not defined.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger}
 * @type {*|Function}
 */
Number.isInteger = Number.isInteger ||
    function test(value) {
      return typeof value === 'number' &&
          isFinite(value) &&
          Math.floor(value) === value;
    };

/**
 * The competency points earned for each grade A, B, or C.
 * @memberOf api/ice
 */
export const gradeCompetency: { A: number; B: number; C: number; } = {
  A: 10,
  B: 6,
  C: 0,
};

/**
 * Returns true if the object passed conforms to the ICE object specifications.
 * Note this does not test to see if additional fields are present.
 * @param obj The object, which must be an object with fields i, c, and e.
 * @returns {boolean} True if all fields are present and are numbers.
 * @memberOf api/ice
 */
export const isICE = (obj: Ice): boolean => (((typeof obj) === 'object') && Number.isInteger(obj.i) && Number.isInteger(obj.c) && Number.isInteger(obj.e));

/**
 * Throws error if obj is not an ICE object.
 * @param obj The object to be tested for ICEness.
 * @throws { Meteor.Error } If obj is not ICE.
 * @memberOf api/ice
 */
export const assertICE = (obj) => {
  if ((obj === null) || (typeof obj !== 'object') || !(isICE(obj))) {
    throw new Meteor.Error(`${obj} was not an ICE object.`);
  }
};

/**
 * Returns an ICE object based upon the course slug and the passed grade.
 * Students only earn ICE competency points for 'interesting' courses. Interesting
 * courses are courses that have non other slugs.
 * If an A, then return 9 competency points.
 * If a B, then return 5 competency points.
 * Otherwise return zero points.
 * @param course The course slug. If it's the "uninteresting" slug, then disregard it.
 * @param grade The grade
 * @returns {{i: number, c: number, e: number}} The ICE object.
 * @memberOf api/ice
 */
export const makeCourseICE = (course: string, grade: string): Ice => {
  const i = 0;
  let c = 0;
  const e = 0;
  // Uninteresting courses get no ICE points.
  if (course === Courses.unInterestingSlug) {
    return { i, c, e };
  }
  // Courses get competency points only if you get an A or a B.
  if (_.includes(['B+', 'B', 'B-'], grade)) {
    c = gradeCompetency.B;
  } else
  if (_.includes(['A+', 'A', 'A-'], grade)) {
    c = gradeCompetency.A;
  }
  return { i, c, e };
};

/**
 * Returns an ICE object that represents the earned ICE points from the passed Course\Opportunity Instance Documents.
 * ICE values are counted only if verified is true.
 * @param docs An array of CourseInstance or OpportunityInstance documents.
 * @returns {{i: number, c: number, e: number}} The ICE object.
 * @memberOf api/ice
 */
export const getEarnedICE = (docs): Ice => {
  const total = { i: 0, c: 0, e: 0 };
  docs.forEach((instance) => {
    if (!(isICE(instance.ice))) {
      throw new Meteor.Error(`getEarnedICE passed ${instance} without a valid .ice field.`);
    }
    if (instance.verified === true) {
      total.i += instance.ice.i;
      total.c += instance.ice.c;
      total.e += instance.ice.e;
    }
    return null;
  });
  return total;
};

/**
 * Returns an ICE object that represents the total ICE points from the passed Course/Opportunity Instance Documents.
 * ICE values are counted whether or not they are verified.
 * @param docs An array of CourseInstance or OpportunityInstance documents.
 * @returns {{i: number, c: number, e: number}} The ICE object.
 * @memberOf api/ice
 */
export const getProjectedICE = (docs): Ice => {
  const total = { i: 0, c: 0, e: 0 };
  docs.forEach((instance) => {
    if (!(isICE(instance.ice))) {
      throw new Meteor.Error(`getProjectedICE passed ${instance} without a valid .ice field.`);
    }
    total.i += instance.ice.i;
    total.c += instance.ice.c;
    total.e += instance.ice.e;
    return null;
  });
  return total;
};

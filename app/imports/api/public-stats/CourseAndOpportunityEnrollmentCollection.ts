import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import * as _ from 'lodash';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';
import { Opportunities } from '../opportunity/OpportunityCollection';
import { Slugs } from '../slug/SlugCollection';
import { Courses } from '../course/CourseCollection';
import { CourseInstances } from '../course/CourseInstanceCollection';
import { OpportunityInstances } from '../opportunity/OpportunityInstanceCollection';
import { ICourseAndOpportunityEnrollmentDefine, ICourseAndOpportunityEnrollmentUpdate } from '../../typings/radgrad'; // eslint-disable-line

class CourseAndOpportunityEnrollmentCollection extends BaseCollection {
  constructor() {
    super('CourseAndOpportunityEnrollment', new SimpleSchema({
      itemID: SimpleSchema.RegEx.Id,
      itemSlug: String,
      itemCount: SimpleSchema.Integer,
    }));
    this.defineSchema = new SimpleSchema({
      itemSlug: String,
      itemCount: Number,
    });
    this.updateSchema = new SimpleSchema({
      itemCount: { type: Number, optional: true },
    });
  }

  /**
   * Defines the enrollment data for the given item.
   * @param itemSlug the slug for the Course or Opportunity
   * @param itemCount the number of students that have the course or opportunity in their plan.
   * @returns {any} The id of the record.
   */
  define({ itemSlug, itemCount }: ICourseAndOpportunityEnrollmentDefine) {
    const doc = this.collection.findOne({ itemSlug });
    if (doc) {
      return doc._id;
    }
    if (!Slugs.isDefined(itemSlug)) {
      throw new Meteor.Error(`${itemSlug} is not a defined slug.`);
    }
    const slug = Slugs.findDoc(itemSlug);
    const itemID = slug.entityID;
    return this.collection.insert({ itemID, itemSlug, itemCount });
  }

  /**
   * Updates the enrollment data for the given item.
   * @param docID the ID of the record.
   * @param itemCount the new itemCount.
   */
  update(docID: string, { itemCount }: ICourseAndOpportunityEnrollmentUpdate) {
    this.assertDefined(docID);
    const updateData: ICourseAndOpportunityEnrollmentUpdate = {};
    updateData.itemCount = itemCount;
    this.collection.update(docID, { $set: updateData });
  }

  /**
   * Removes the enrollment information.
   * @param docID the ID of the record.
   */
  removeIt(docID) {
    this.assertDefined(docID);
    // OK, clear to delete.
    super.removeIt(docID);
  }

  /**
   * Only ADMINs can update the records.
   * @param userId
   */
  assertValidRoleForMethod(userId) {
    this.assertRole(userId, [ROLE.ADMIN]);
  }

  /**
   * Returns an array of strings, each one representing an integrity problem with this collection.
   * Returns an empty array if no problems were found.
   * Checks itemID and itemSlug
   * @returns {Array} A (possibly empty) array of strings indicating integrity issues.
   */
  checkIntegrity() {
    const problems = [];
    this.find()
      .forEach(doc => {
        if (!Courses.isDefined(doc.itemID) && !Opportunities.isDefined(doc.itemID)) {
          problems.push(`Bad itemID. ${doc.itemID} is neither a Course or Opportunity ID.`);
        }
        if (!Slugs.isSlugForEntity(doc.itemSlug, Courses.getType()) &&
          !Slugs.isSlugForEntity(doc.itemSlug, Opportunities.getType())) {
          problems.push(`Bad itemSlug. ${doc.itemSlug} is neither a Course or Opportunity slug.`);
        }
      });
    return problems;
  }

  /**
   * Returns an object representing the CourseAndOpportunityEnrollment docID in a format acceptable to define().
   * @param docID The docID of a CourseAndOpportunityEnrollment item.
   * @returns { Object } An object representing the definition of docID.
   */
  dumpOne(docID: string): ICourseAndOpportunityEnrollmentDefine {
    const doc = this.findDoc(docID);
    const itemID = doc.itemID;
    const itemSlug = doc.itemSlug;
    const itemCount = doc.itemCount;
    return { itemID, itemSlug, itemCount };
  }

  upsertEnrollmentData() {
    if (Meteor.isServer) {
      const courses = Courses.findNonRetired();
      _.forEach(courses, (c) => {
        const itemID = c._id;
        const itemSlug = Slugs.getNameFromID(c.slugID);
        const items = CourseInstances.find({ courseID: itemID }).fetch();
        const itemCount = _.uniqBy(items, (i) => i.studentID).length;
        this.collection.upsert({ itemSlug }, { $set: { itemID, itemSlug, itemCount } });
      });
      _.forEach(Opportunities.findNonRetired(), (o) => {
        const itemID = o._id;
        const itemSlug = Slugs.getNameFromID(o.slugID);
        const items = OpportunityInstances.find({ opportunityID: itemID }).fetch();
        const itemCount = _.uniqBy(items, (i) => i.studentID).length;
        this.collection.upsert({ itemSlug }, { $set: { itemID, itemSlug, itemCount } });
      });
    }
  }
}

export const CourseAndOpportunityEnrollments = new CourseAndOpportunityEnrollmentCollection();

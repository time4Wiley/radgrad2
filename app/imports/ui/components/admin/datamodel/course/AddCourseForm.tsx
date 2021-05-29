import React from 'react';
import { Form, Header, Segment } from 'semantic-ui-react';
import { AutoForm, TextField, NumField, LongTextField, SubmitField, BoolField, ErrorsField } from 'uniforms-semantic';
import { SimpleSchema2Bridge } from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { defineMethod } from '../../../../../api/base/BaseCollection.methods';
import { Courses } from '../../../../../api/course/CourseCollection';
import MultiSelectField from '../../../form-fields/MultiSelectField';
import { Course, CourseDefine, Interest } from '../../../../../typings/radgrad';
import { courseNameToSlug, courseToName, docToName } from '../../../shared/utilities/data-model';
import { interestSlugFromName } from '../../../shared/utilities/form';
import RadGradAlerts from '../../../../utilities/RadGradAlert';

interface AddCourseFormProps {
  interests: Interest[];
  courses: Course[];
}
const RadGradAlert = new RadGradAlerts();
const AddCourseForm: React.FC<AddCourseFormProps> = ({ interests, courses }) => {
  let formRef;
  const handleAdd = (doc) => {
    // console.log('CoursePage.handleAdd(%o)', doc);
    const collectionName = Courses.getCollectionName();
    const definitionData: CourseDefine = doc; // create the definitionData may need to modify doc's values
    const docInterests = doc.interests.map(interestSlugFromName);
    if (doc.shortName) {
      definitionData.shortName = doc.shortName;
    } else {
      definitionData.shortName = doc.name;
    }
    definitionData.interests = docInterests;
    if (doc.prerequisites) {
      definitionData.prerequisites = doc.prerequisites.map(courseNameToSlug);
    }
    // console.log(collectionName, definitionData);
    defineMethod.callPromise({ collectionName, definitionData })
      .catch((error) => {
        RadGradAlert.failure('Failed adding User', error.message, 2500, error);
      })
      .then(() => {
        RadGradAlert.success('Add User Succeeded', '', 1500);
        formRef.reset();
      });
  };


  const interestNames = interests.map(docToName);
  const courseNames = courses.map(courseToName);
  const schema = new SimpleSchema({
    slug: String,
    name: String,
    shortName: { type: String, optional: true },
    creditHours: {
      type: SimpleSchema.Integer,
      optional: true,
      min: 1,
      max: 15,
      defaultValue: 3,
    },
    num: String,
    description: String,
    interests: Array,
    syllabus: { type: String, optional: true },
    'interests.$': {
      type: String,
      allowedValues: interestNames,
      // optional: true, CAM: not sure if we want this to be optional
    },
    prerequisites: { type: Array, optional: true },
    'prerequisites.$': { type: String, allowedValues: courseNames },
    repeatable: { type: Boolean, optional: true },
  });
  const formSchema = new SimpleSchema2Bridge(schema);
  return (
    <Segment padded>
      <Header dividing>Add Course</Header>
      {/* eslint-disable-next-line no-return-assign */}
      <AutoForm schema={formSchema} onSubmit={handleAdd} ref={(ref) => formRef = ref} showInlineError>
        <Form.Group widths="equal">
          <TextField name="slug" placeholder="dept_111" />
          <TextField name="name" placeholder="DEPT 111 Introduction to Science" />
        </Form.Group>
        <Form.Group widths="equal">
          <TextField name="shortName" placeholder="DEPT 111 Introduction to Science" />
          <NumField name="creditHours" />
          <TextField name="num" placeholder="DEPT 111" />
        </Form.Group>
        <LongTextField name="description" />
        <TextField name="syllabus" placeholder="https://dept.foo.edu/dept_111/syllabus.html" />
        <Form.Group widths="equal">
          <MultiSelectField name="interests" placeholder="Select Interest(s)" />
          <MultiSelectField name="prerequisites" placeholder="Select Prerequisite(s)" />
        </Form.Group>
        <BoolField name="repeatable" />
        <SubmitField className="mini basic green" value="Add" />
        <ErrorsField />
      </AutoForm>
    </Segment>
  );
};

export default AddCourseForm;

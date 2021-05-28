import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Header, Segment } from 'semantic-ui-react';
import { AutoForm, ErrorsField, NumField, SelectField, SubmitField } from 'uniforms-semantic';
import { SimpleSchema2Bridge } from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import moment from 'moment';
import { defineMethod } from '../../../../../api/base/BaseCollection.methods';
import { AcademicYearInstances } from '../../../../../api/degree-plan/AcademicYearInstanceCollection';
import { profileToUsername } from '../../../shared/utilities/data-model';
import RadGradAlerts from '../../../../utilities/RadGradAlert';

interface AddAcademicYearInstanceProps {
  students: Meteor.User[];
}

const AddAcademicYearInstanceForm: React.FC<AddAcademicYearInstanceProps> = ({ students }) => {
  const RadGradAlert = new RadGradAlerts();
  const studentNames = students.map(profileToUsername);
  const schema = new SimpleSchema({
    student: {
      type: String,
      allowedValues: studentNames,
    },
    year: { type: SimpleSchema.Integer, min: 2009, max: 2050, defaultValue: moment().year() },
  });
  const formSchema = new SimpleSchema2Bridge(schema);
  let formRef;
  const handleAdd = (doc) => {
    const collectionName = AcademicYearInstances.getCollectionName();
    const definitionData = doc;
    defineMethod.callPromise({ collectionName, definitionData })
      .catch((error) => { RadGradAlert.failure('Add failed', error.message, 2500, error);})
      .then(() => {
        RadGradAlert.success('Add succeeded', 1500);
        formRef.reset();
      });
  };

  return (
    <Segment padded>
      <Header dividing>Add Academic Year Instance</Header>
      {/* eslint-disable-next-line no-return-assign */}
      <AutoForm schema={formSchema} onSubmit={handleAdd} ref={(ref) => formRef = ref} showInlineError>
        <NumField name="year" />
        <SelectField name="student" />
        <SubmitField className="mini basic green" value="Add" />
        <ErrorsField />
      </AutoForm>
    </Segment>
  );
};

export default AddAcademicYearInstanceForm;

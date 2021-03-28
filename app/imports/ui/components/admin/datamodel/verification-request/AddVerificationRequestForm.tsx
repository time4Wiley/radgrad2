import _ from 'lodash';
import React from 'react';
import { Form, Header, Segment } from 'semantic-ui-react';
import SimpleSchema from 'simpl-schema';
import { AutoForm, SelectField, BoolField, SubmitField } from 'uniforms-semantic';
import { SimpleSchema2Bridge } from 'uniforms-bridge-simple-schema-2';
import { defineMethod } from '../../../../../api/base/BaseCollection.methods';
import {
  AcademicTerm,
  Opportunity,
  OpportunityInstance,
  StudentProfile,
  VerificationRequestDefine,
} from '../../../../../typings/radgrad';
import { AcademicTerms } from '../../../../../api/academic-term/AcademicTermCollection';
import {
  academicTermNameToSlug,
  academicTermToName,
  docToName,
  opportunityInstanceNameToId, opportunityInstanceNameToTermSlug, opportunityInstanceNameToUsername,
  opportunityInstanceToName, opportunityNameToSlug, profileNameToUsername,
  profileToName,
} from '../../../shared/utilities/data-model';
import { VerificationRequests } from '../../../../../api/verification/VerificationRequestCollection';
import { defineCallback } from '../utilities/add-form';

interface AddVerificationRequestFormProps {
  students: StudentProfile[];
  academicTerms: AcademicTerm[];
  opportunities: Opportunity[];
  opportunityInstances: OpportunityInstance[];
}

const AddVerificationRequestForm: React.FC<AddVerificationRequestFormProps> = ({ students, academicTerms, opportunities, opportunityInstances }) => {
  const termNames = academicTerms.map(academicTermToName);
  const currentTermName = AcademicTerms.toString(AcademicTerms.getCurrentTermID(), false);
  const opportunityNames = opportunities.map(docToName);
  const opportunityInstanceNames = opportunityInstances.map(opportunityInstanceToName);
  const studentNames = students.map(profileToName);
  const schema = new SimpleSchema({
    student: { type: String, allowedValues: studentNames, optional: true },
    status: {
      type: String,
      optional: true,
      allowedValues: [VerificationRequests.OPEN, VerificationRequests.ACCEPTED, VerificationRequests.REJECTED],
    },
    academicTerm: { type: String, optional: true, allowedValues: termNames, defaultValue: currentTermName },
    opportunityInstance: { type: String, optional: true, allowedValues: opportunityInstanceNames },
    opportunity: { type: String, optional: true, allowedValues: opportunityNames },
    retired: { type: Boolean, optional: true },
  });
  const formSchema = new SimpleSchema2Bridge(schema);

  let formRef;
  const handleModelChange = (model) => {
    console.log(model);
  };

  const handleAdd = (doc) => {
    // console.log('VerificationRequests.handleAdd()', doc);
    const collectionName = VerificationRequests.getCollectionName();
    const definitionData: VerificationRequestDefine = {};
    definitionData.status = doc.status;
    if (doc.opportunityInstance) {
      definitionData.opportunityInstance = opportunityInstanceNameToId(doc.opportunityInstance);
      definitionData.student = opportunityInstanceNameToUsername(doc.opportunityInstance);
      definitionData.academicTerm = opportunityInstanceNameToTermSlug(doc.opportunityInstance);
      // definitionData.academicTerm = AcademicTerms.
    } else {
      if (doc.student) {
        definitionData.student = profileNameToUsername(doc.student);
      }
      if (doc.opportunity) {
        definitionData.academicTerm = academicTermNameToSlug(doc.academicTerm);
        definitionData.opportunity = opportunityNameToSlug(doc.opportunity);
      }
    }
    if (_.isBoolean(doc.retired)) {
      definitionData.retired = doc.retired;
    }
    // console.log(collectionName, definitionData);
    defineMethod.call({ collectionName, definitionData }, defineCallback(formRef));

  };

  return (
    <Segment padded>
      <Header dividing>Add Verification Request</Header>
      {/* eslint-disable-next-line no-return-assign */}
      <AutoForm schema={formSchema} onSubmit={handleAdd} ref={(ref) => formRef = ref} showInlineError onChangeModel={handleModelChange}>
        <Form.Group widths="equal">
          <SelectField name="student" placeholder="Choose the student" />
          <SelectField name="status" placeholder="Choose the status" />
        </Form.Group>
        <Form.Group widths="equal">
          <SelectField name="opportunityInstance" />
          <SelectField name="opportunity" />
          <SelectField name="academicTerm" />
        </Form.Group>
        <BoolField name="retired" />
        <SubmitField className="mini basic green" value="Add" disabled={false} inputRef={undefined} />
      </AutoForm>
    </Segment>
  );
};

export default AddVerificationRequestForm;

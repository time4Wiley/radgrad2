import React from 'react';
import { Button, Form, Header, Segment } from 'semantic-ui-react';
import { AutoForm, SelectField, AutoField, BoolField, NumField, TextField, SubmitField } from 'uniforms-semantic';
import { SimpleSchema2Bridge } from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import _ from 'lodash';
import { IAcademicTerm } from '../../../../../typings/radgrad';
import BaseCollection from '../../../../../api/base/BaseCollection';
import { academicTermIdToName, academicTermToName } from '../../../shared/utilities/data-model';
import { iceSchema } from '../../../../../api/ice/IceProcessor';
import { CourseInstances } from '../../../../../api/course/CourseInstanceCollection';

interface IUpdateCourseInstanceFormProps {
  terms: IAcademicTerm[];
  collection: BaseCollection;
  id: string;
  formRef: React.RefObject<unknown>;
  handleUpdate: (doc) => any;
  handleCancel: (event) => any;
  itemTitleString: (item) => React.ReactNode;
}

const UpdateCourseInstanceForm: React.FC<IUpdateCourseInstanceFormProps> = ({ terms, collection, id, formRef, handleUpdate, handleCancel, itemTitleString }) => {
  const model = collection.findDoc(id);
  model.academicTerm = academicTermIdToName(model.termID);
  model.creditHours = model.creditHrs;
  // console.log(model);
  const termNames = _.map(terms, academicTermToName);
  const schema = new SimpleSchema({
    academicTerm: {
      type: String,
      allowedValues: termNames,
    },
    ice: iceSchema,
    verified: { type: Boolean, optional: true },
    fromRegistrar: { type: Boolean, optional: true },
    creditHours: {
      type: SimpleSchema.Integer,
      optional: true,
    },
    grade: {
      type: String,
      allowedValues: CourseInstances.validGrades,
      optional: true,
    },
    note: { type: String, optional: true },
    retired: { type: Boolean, optional: true },
  });
  const formSchema = new SimpleSchema2Bridge(schema);
  return (
    <Segment padded>
      <Header dividing>
        Update
        {collection.getType()}
        :
        {itemTitleString(model)}
      </Header>
      <AutoForm
        schema={formSchema}
        onSubmit={handleUpdate}
        ref={formRef}
        showInlineError
        model={model}
      >
        <Form.Group widths="equal">
          <SelectField name="academicTerm" />
          <AutoField name="ice" />
        </Form.Group>
        <Form.Group widths="equal">
          <BoolField name="verified" />
          <BoolField name="fromRegistrar" />
        </Form.Group>
        <Form.Group>
          <NumField name="creditHours" />
          <SelectField name="grade" />
          <TextField name="note" />
        </Form.Group>
        <BoolField name="retired" />
        <SubmitField inputRef={undefined} value="Update" disabled={false} className="" />
        <Button onClick={handleCancel}>Cancel</Button>
      </AutoForm>
    </Segment>
  );
};

export default UpdateCourseInstanceForm;

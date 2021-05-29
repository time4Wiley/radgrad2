import React from 'react';
import { Button, Form, Header, Segment } from 'semantic-ui-react';
import { AutoForm, TextField, SelectField, LongTextField, BoolField, SubmitField, ErrorsField } from 'uniforms-semantic';
import { SimpleSchema2Bridge } from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { InterestTypes } from '../../../../../api/interest/InterestTypeCollection';
import { Slugs } from '../../../../../api/slug/SlugCollection';
import { docToName } from '../../../shared/utilities/data-model';
import { InterestType } from '../../../../../typings/radgrad';
import BaseCollection from '../../../../../api/base/BaseCollection';

interface UpdateInterestFormProps {
  interestTypes: InterestType[];
  collection: BaseCollection;
  id: string;
  handleUpdate: (doc) => any;
  handleCancel: (event) => any;
  itemTitleString: (item) => React.ReactNode;
}

const UpdateInterestForm: React.FC<UpdateInterestFormProps> = ({
  interestTypes,
  collection,
  id,
  handleCancel,
  handleUpdate,
  itemTitleString,
}) => {
  const interestTypeNames = interestTypes.map(docToName);
  const model = collection.findDoc(id);
  model.slug = Slugs.getNameFromID(model.slugID);
  model.interestType = InterestTypes.findDoc(model.interestTypeID).name;
  const schema = new SimpleSchema({
    name: { type: String, optional: true },
    slug: { type: String, optional: true },
    picture: { type: String, optional: true },
    interestType: {
      type: String,
      allowedValues: interestTypeNames,
      defaultValue: interestTypeNames[0],
      optional: true,
    },
    description: { type: String, optional: true },
    retired: { type: Boolean, optional: true },
  });
  const formSchema = new SimpleSchema2Bridge(schema);
  return (
    <Segment padded>
      <Header dividing>
        Update
        {collection.getType()}:{itemTitleString(model)}
      </Header>
      <AutoForm schema={formSchema} onSubmit={handleUpdate} showInlineError model={model}>
        <Form.Group widths="equal">
          <TextField name="slug" disabled />
          <TextField name="name" />
          <SelectField name="interestType" />
        </Form.Group>
        <TextField placeholder='https://mywebsite.com/picture.png' name='picture' />
        <LongTextField name="description" />
        <BoolField name="retired" />
        <SubmitField inputRef={undefined} value="Update" disabled={false} className="mini basic green" />
        <Button onClick={handleCancel} basic color="green" size="mini">Cancel</Button>
        <ErrorsField />
      </AutoForm>
    </Segment>
  );
};

export default UpdateInterestForm;

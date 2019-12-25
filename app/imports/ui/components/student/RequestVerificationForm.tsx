import React from 'react';
import { Header } from 'semantic-ui-react';
import { AutoForm, LongTextField, SubmitField } from 'uniforms-semantic';
import SimpleSchema from 'simpl-schema';

interface IRequestVerificationFormProps {
  handleOnModelChange: (model) => any;
}

const RequestVerificationForm = (props: IRequestVerificationFormProps) => {
  const schema = new SimpleSchema({
    documentation: String,
  });
  return (
    <div>
      <Header dividing={true}>Request Verification</Header>
      <AutoForm schema={schema} onSubmit={props.handleOnModelChange}>
        <LongTextField name='documentation' placeholder='Describe your participation in this opportunity.'/>
        <SubmitField inputRef={undefined} value={'Request verification'} disabled={false} className={''}/>
      </AutoForm>
    </div>
  );
};

export default RequestVerificationForm;

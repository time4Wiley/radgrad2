import { withTracker } from 'meteor/react-meteor-data';
import React, { useState } from 'react';
import SimpleSchema from 'simpl-schema';
import { SimpleSchema2Bridge } from 'uniforms-bridge-simple-schema-2';
import { AutoForm, SelectField, SubmitField } from 'uniforms-semantic';
import { Interests } from '../../../../api/interest/InterestCollection';
import { Interest } from '../../../../typings/radgrad';
import RadGradHeader from '../../../components/shared/RadGradHeader';
import RadGradSegment from '../../../components/shared/RadGradSegment';
import { docToName } from '../../../components/shared/utilities/data-model';
import Task6EditDescription from './Task6EditDescription';

interface Task6ComponentProps {
  interests: Interest[];
}

const Task6Component: React.FC<Task6ComponentProps> = ({ interests }) => {

  const [myInterest, updateInterest] = useState(null);

  const handleSubmit = (doc) => {
    const selectedInterest = interests.find(interest => doc.interest === interest.name);
    updateInterest(selectedInterest);
  };

  const interestNames = interests.map(docToName);
  const schema = new SimpleSchema({
    interest: {
      type: String,
      allowedValues: interestNames,
    },
  });
  const formSchema = new SimpleSchema2Bridge(schema);

  return (
    <RadGradSegment header={<RadGradHeader title='TASK 6: EDIT THE DESCRIPTION' icon='pencil' dividing />}>
      <AutoForm schema={formSchema} onSubmit={handleSubmit} showInlineError>
        <SelectField name="interest" placeholder="(Select interest)"/>
        <SubmitField className="mini basic green" value="Display Description" />
      </AutoForm>

      {myInterest ? <div style={{ marginTop: '1rem' }}>
        <Task6EditDescription interest={myInterest} />
      </div> : null}
    </RadGradSegment>
  );
};

export default withTracker(() => {
  const interests = Interests.findNonRetired();
  return {
    interests,
  };
})(Task6Component);
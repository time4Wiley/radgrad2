import React, { useState } from 'react';
import { Checkbox } from 'semantic-ui-react';
import RadGradHeader from '../../components/shared/header/RadGradHeader';
import RadGradSegment2 from '../../components/shared/RadGradSegment2';

const StudentSegmentExamplesPageExampleThree: React.FC = () => {
  const [checkState, setCheckState] = useState(true);
  const handleToggleChange = () => setCheckState(!checkState);
  const checkStateValue = checkState ? 'Checked' : 'Not Checked';

  const rightside = <Checkbox onChange={handleToggleChange} checked={checkState} label='Show all'/>;
  const header = <RadGradHeader title='Example Three'  icon='user' rightside={rightside} />;
  return (
    <RadGradSegment2 header={header}>
      <p>This is an example of a RadGrad segment with a dynamic right-side component: a checkbox.</p>

      <p>The value of the checkbox is available within the segment component and can be used to control the data that appears in the segment. For example, the value of the checkbox is: {checkStateValue}.</p>
    </RadGradSegment2>
  );
};

export default StudentSegmentExamplesPageExampleThree;

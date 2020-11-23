import React from 'react';
import { Segment, Tab } from 'semantic-ui-react';
import AdvisorAcademicPlanViewerWidget from './AdvisorAcademicPlanViewerWidget';
import AdvisorAPBuilderWidget from './AdvisorAPBuilderWidget';
import { IAcademicPlan, IPlanChoiceDefine, IAcademicTerm } from '../../../../typings/radgrad';

interface IAdvisorAcademicPlanTabsProps {
  choices: IPlanChoiceDefine[],
  terms: IAcademicTerm[],
  plans: IAcademicPlan[],
}

const AdvisorAcademicPlanTabs = (props: IAdvisorAcademicPlanTabsProps): JSX.Element => {
  // console.log(props);
  // console.log(props.plans);
  const { plans, terms, choices } = props;
  const panes = [
    {
      menuItem: 'Viewer',
      render: () => (
        <Tab.Pane><AdvisorAcademicPlanViewerWidget plans={plans} /></Tab.Pane>
      ),
    },
    {
      menuItem: 'Builder',
      render: () => (
        <Tab.Pane><AdvisorAPBuilderWidget choices={choices} terms={terms} /></Tab.Pane>
      ),
    },
  ];
  return (
    <Segment padded>
      <Tab panes={panes} />
    </Segment>
  );
};

export default AdvisorAcademicPlanTabs;

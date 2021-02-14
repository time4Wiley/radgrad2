import { Meteor } from 'meteor/meteor';
import React from 'react';
import Markdown from 'react-markdown';
import { useParams, useRouteMatch } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Grid, Header, Segment } from 'semantic-ui-react';
import { CareerGoals } from '../../../api/career/CareerGoalCollection';
import { HelpMessages } from '../../../api/help/HelpMessageCollection';
import LandingExplorerMenuBar from '../../components/landing/explorer/LandingExplorerMenuBar';
import { CareerGoal, HelpMessage } from '../../../typings/radgrad';
import { Slugs } from '../../../api/slug/SlugCollection';
import LandingExplorerMenuContainer from '../../components/landing/explorer/LandingExplorerMenu';
import { Interests } from '../../../api/interest/InterestCollection';
import withListSubscriptions from '../../layouts/utilities/SubscriptionListHOC';
import LandingInterestList from '../../components/landing/LandingInterestList';
import * as Router from '../../components/shared/utilities/router';
import HelpPanelWidget from '../../components/shared/HelpPanelWidget';
import BackToTopButton from '../../components/shared/BackToTopButton';
import PageLayout from '../PageLayout';

interface CareerGoalExplorerProps {
  careerGoal: CareerGoal;
  helpMessages: HelpMessage[];
}

const headerPaneTitle = 'The Career Goal Explorer';
const headerPaneBody = `
Career Goals are curated by the faculty to represent a good selection of the most promising career paths. Most career goals encompass several job titles. 

Registered users can add Career Goals to their profile which enables RadGrad to improve its ability to recommend extracurricular activities (called "Opportunities" in RadGrad). 

This page provides an overview of the Career Goals currently available in RadGrad. 
`;

const LandingCareerGoalExplorerPage: React.FC<CareerGoalExplorerProps> = ({ careerGoal, helpMessages }) => {
  const match = useRouteMatch();
  return (
    <div>
      <LandingExplorerMenuBar />
    <PageLayout id="career-goal-browser-view-page" headerPaneTitle={headerPaneTitle} headerPaneBody={headerPaneBody}>
    <div id="landing-career-goal-explorer-page">

      <Grid stackable>
        <Grid.Column width={3}>
          <LandingExplorerMenuContainer />
        </Grid.Column>

        <Grid.Column width={11}>
          <Segment padded style={{ overflow: 'auto', maxHeight: 750 }}>
            <Header as="h4" dividing>
              <span>{careerGoal.name}</span>
            </Header>
            <b>Description:</b>
            <Markdown escapeHtml source={careerGoal.description} renderers={{ link: (localProps) => Router.renderLink(localProps, match) }} />
            {careerGoal.interestIDs.length > 0 ? <LandingInterestList interestIDs={careerGoal.interestIDs} /> : 'N/A'}
          </Segment>
        </Grid.Column>
        <Grid.Column width={1} />
      </Grid>

      <BackToTopButton />
    </div>
    </PageLayout>
    </div>
  );
};

const LandingCareerGoalExplorerContainer = withTracker(() => {
  const { careergoal } = useParams();
  // console.log(Slugs.find().fetch());
  const id = Slugs.getEntityID(careergoal, 'CareerGoal');
  return {
    careerGoal: CareerGoals.findDoc(id),
    currentUser: Meteor.user() ? Meteor.user().username : '',
  };
})(LandingCareerGoalExplorerPage);

export default withListSubscriptions(LandingCareerGoalExplorerContainer, [CareerGoals.getPublicationName(), Slugs.getPublicationName(), Interests.getPublicationName(), HelpMessages.getPublicationName()]);

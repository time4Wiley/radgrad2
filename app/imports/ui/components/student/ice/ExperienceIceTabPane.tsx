import React from 'react';
import { Grid, Header, Segment } from 'semantic-ui-react';
import { AcademicTerms } from '../../../../api/academic-term/AcademicTermCollection';
import {
  OpportunityInstance,
  ProfileInterest,
  ProfileOpportunity,
} from '../../../../typings/radgrad';
import { STUDENT_VERIFICATION, URL_ROLES } from '../../../layouts/utilities/route-constants';
import { ButtonLink } from '../../shared/button/ButtonLink';
import StudentRecommendedOpportunityItem from '../shared/StudentRecommendedOpportunityItem';
import PageIceCircle from './PageIceCircle';
import { getRecommendedOpportunitiesExperience } from './utilities/recommended';

interface ExperienceIceTabPaneProps {
  username: string;
  profileInterests: ProfileInterest[];
  profileOpportunities: ProfileOpportunity[];
  opportunityInstances: OpportunityInstance[];
  projectedICE: number;
  earnedICE: number;
}

const ExperienceIceTabPane: React.FC<ExperienceIceTabPaneProps> = ({
  username,
  projectedICE,
  earnedICE,
  profileOpportunities,
  profileInterests,
  opportunityInstances,
}) => {
  let unVerifiedOIs = opportunityInstances.filter((oi) => !oi.verified);
  const currentAcademicTermNum = AcademicTerms.getCurrentAcademicTermDoc().termNumber;
  unVerifiedOIs = unVerifiedOIs.filter((oi) => AcademicTerms.findDoc(oi.termID).termNumber < currentAcademicTermNum);
  const interestIDs = profileInterests.map((pi) => pi.interestID);
  const recommended = getRecommendedOpportunitiesExperience(interestIDs, projectedICE);
  return (
    <Segment basic>
      <Grid stackable>
        <Grid.Row>
          <Grid.Column textAlign='left' width={4}>
            <PageIceCircle earned={earnedICE} planned={projectedICE} type="exp" />
          </Grid.Column>
          <Grid.Column width={12}>
            <Header as="h3" className="ice-experience-color">
              EXPERIENCE
            </Header>
            <p>You earn experience points by completing opportunities that provide &#8220;real world experience&#8220;, such
              as <strong>internships</strong> or <strong>business plan competitions</strong>.</p>
            <p>You have <strong>{earnedICE}</strong> verified experience points. This appears as a number in the center of the circle. It is also represented by the darkly colored portion of the circle. You have <strong>{projectedICE}</strong> unverified experience points. This appears as
              the lightly colored portion of the circle.</p>
            {unVerifiedOIs.length > 0 ? <p>You have {unVerifiedOIs.length} opportunit{unVerifiedOIs.length > 1 ? 'ies' : 'y'} without verification requests. Visit the Verification Page to request verification. <ButtonLink
              url={`/${URL_ROLES.STUDENT}/${username}/${STUDENT_VERIFICATION}`} label='Verification Page' size='mini' /></p> : ''}
            {projectedICE < 100 ? <div><p>You don&quot;t have enough innovative opportunities in your degree experience plan. Here are some recommended opportunities:</p>
            <Grid stackable>
              {recommended.map((opp) => <StudentRecommendedOpportunityItem opportunityID={opp._id} key={opp._id} />)}
            </Grid></div> : ''}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

export default ExperienceIceTabPane;

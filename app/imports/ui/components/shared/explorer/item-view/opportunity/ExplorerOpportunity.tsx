import moment from 'moment';
import React from 'react';
import Markdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import { Divider, Grid, Segment } from 'semantic-ui-react';
import { Reviews } from '../../../../../../api/review/ReviewCollection';
import { ROLE } from '../../../../../../api/role/Role';
import { Teasers } from '../../../../../../api/teaser/TeaserCollection';
import { PROFILE_ENTRY_TYPE } from '../../../../../../api/user/profile-entries/ProfileEntryTypes';
import { StudentProfiles } from '../../../../../../api/user/StudentProfileCollection';
import { AcademicTerm, BaseProfile, Interest, Opportunity, OpportunityType, Profile, Review } from '../../../../../../typings/radgrad';
import StudentExplorerReviewWidget from '../../../../student/explorer/StudentExplorerReviewWidget';
import IceHeader from '../../../IceHeader';
import DeleteItemButton from '../../../manage/DeleteItemButton';
import EditOpportunityButton from '../../../manage/opportunity/EditOpportunityButton';
import UserLabel from '../../../profile/UserLabel';
import RadGradHeader from '../../../RadGradHeader';
import TeaserVideo from '../../../TeaserVideo';
import FutureParticipation from '../../FutureParticipation';
import ExplorerReviewWidget from '../ExplorerReviewWidget';

interface ExplorerOpportunitiesWidgetProps {
  opportunity: Opportunity;
  itemReviews: Review[];
  completed: boolean;
  profile: Profile;
  sponsors: BaseProfile[];
  terms: AcademicTerm[];
  interests: Interest[];
  opportunityTypes: OpportunityType[];
  opportunities: Opportunity[];
}

const review = (opportunity: Opportunity, profile): Review => {
  const user = StudentProfiles.findByUsername(profile);
  const reviews = Reviews.findNonRetired({
    studentID: user.userID,
    revieweeID: opportunity._id,
  });
  if (reviews.length > 0) {
    return reviews[0];
  }
  return null;
};

const teaserUrlHelper = (opportunity: Opportunity): string => {
  const oppTeaser = Teasers.findNonRetired({ targetSlugID: opportunity.slugID });
  if (oppTeaser.length > 1) { // TODO do we need this?
    return undefined;
  }
  return oppTeaser && oppTeaser[0] && oppTeaser[0].url;
};

const ExplorerOpportunity: React.FC<ExplorerOpportunitiesWidgetProps> = ({ opportunity, opportunityTypes, opportunities, terms, interests, sponsors, completed, itemReviews, profile }) => {
  const segmentStyle = { backgroundColor: 'white' };
  const fiveMarginTopStyle = { marginTop: '5px' };
  const compactRowStyle = { paddingTop: 2, paddingBottom: 2 };
  const { username } = useParams();
  const hasTeaser = Teasers.findNonRetired({ targetSlugID: opportunity.slugID }).length > 0;
  const isStudent = profile.role === ROLE.STUDENT;
  const isSponsor = profile.userID === opportunity.sponsorID;
  const showManageButtons = isSponsor || profile.role === ROLE.ADMIN;
  const dateStrings = [];
  if (opportunity.eventDate1) {
    dateStrings.push(moment(opportunity.eventDate1).format('MM/DD/YYYY'));
  }
  if (opportunity.eventDate2) {
    dateStrings.push(moment(opportunity.eventDate2).format('MM/DD/YYYY'));
  }
  if (opportunity.eventDate3) {
    dateStrings.push(moment(opportunity.eventDate3).format('MM/DD/YYYY'));
  }
  if (opportunity.eventDate4) {
    dateStrings.push(moment(opportunity.eventDate4).format('MM/DD/YYYY'));
  }
  // console.log(profile.userID, opportunity._id, opportunity.name);
  return (
    <div id="explorerOpportunityWidget">
      <Segment padded className="container" style={segmentStyle}>
        {hasTeaser ? <TeaserVideo id={teaserUrlHelper(opportunity)} /> : ''}
        <Grid stackable style={fiveMarginTopStyle}>
          <Grid.Row>
            <Markdown allowDangerousHtml source={opportunity.description} />
          </Grid.Row>
          <Grid.Row style={compactRowStyle}>
            <strong>Dates:</strong>&nbsp;{opportunity.eventDate1 ? dateStrings.join(', ') : 'N/A'}
          </Grid.Row>
          <Grid.Row>
            <IceHeader ice={opportunity.ice} size='large' />
          </Grid.Row>
          <Grid.Row style={compactRowStyle}>
            <strong>Sponsor:</strong> &nbsp; <UserLabel username={opportunity.sponsorID}/>
          </Grid.Row>
          {showManageButtons ? <Grid.Row><EditOpportunityButton opportunity={opportunity} sponsors={sponsors} terms={terms} interests={interests} opportunityTypes={opportunityTypes}/> <DeleteItemButton item={opportunity} type={PROFILE_ENTRY_TYPE.OPPORTUNITY} /></Grid.Row> : ''}
        </Grid>
      </Segment>

      <Segment textAlign="center">
        <RadGradHeader title='students participating by semester' dividing={false} />
        <Divider />
        <FutureParticipation item={opportunity} />
      </Segment>

      {isStudent ? (
        <Segment>
          <StudentExplorerReviewWidget itemToReview={opportunity} userReview={review(opportunity, username)} completed={completed} reviewType="opportunity" itemReviews={itemReviews} />
        </Segment>
      ) : (
        <Segment><ExplorerReviewWidget itemReviews={itemReviews} reviewType="opportunity" /></Segment>
      )}
    </div>
  );
};

export default ExplorerOpportunity;

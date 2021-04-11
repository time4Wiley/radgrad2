import { withTracker } from 'meteor/react-meteor-data';
import { useParams } from 'react-router-dom';
import React from 'react';
import { Grid } from 'semantic-ui-react';
import { ProfileCourses } from '../../../api/user/profile-entries/ProfileCourseCollection';
import { ProfileOpportunities } from '../../../api/user/profile-entries/ProfileOpportunityCollection';
import RadGradSegment from '../../components/shared/RadGradSegment';
import StudentIceTabs from '../../components/student/ice/StudentIceTabs';
import {
  Ice,
  CourseInstance,
  ProfileInterest,
  OpportunityInstance,
  ProfileCourse,
  ProfileOpportunity,
} from '../../../typings/radgrad';
import { StudentProfiles } from '../../../api/user/StudentProfileCollection';
import { Users } from '../../../api/user/UserCollection';
import { ProfileInterests } from '../../../api/user/profile-entries/ProfileInterestCollection';
import { CourseInstances } from '../../../api/course/CourseInstanceCollection';
import { OpportunityInstances } from '../../../api/opportunity/OpportunityInstanceCollection';
import PageLayout from '../PageLayout';

interface StudentIcePageProps {
  username: string;
  earnedICE: Ice;
  projectedICE: Ice;
  profileCourses: ProfileCourse[];
  profileInterests: ProfileInterest[];
  profileOpportunities: ProfileOpportunity[];
  courseInstances: CourseInstance[];
  opportunityInstances: OpportunityInstance[];
}

const headerPaneTitle = 'Innovation, Competency, Experience?';
const headerPaneBody = `
Gaining **Innovation**, **Competency**, and **Experience** (ICE) are more important to RadGrad than your GPA, because they are also more important to future employers and graduate programs. 

You earn Innovation and Experience points by completing Opportunities. You earn Competency points by completing Courses.

This page provides a breakdown of these three components of a successful undergraduate experience.
`;
const headerPaneImage = 'header-ice.png';


const StudentIcePage: React.FC<StudentIcePageProps> = ({
  username,
  earnedICE,
  projectedICE,
  profileCourses,
  profileInterests,
  profileOpportunities,
  courseInstances,
  opportunityInstances,
}) => (
  <PageLayout id="student-ice-points-page" headerPaneTitle={headerPaneTitle} headerPaneBody={headerPaneBody}
              headerPaneImage={headerPaneImage}>
    <Grid stackable>
      <Grid.Row>
        <Grid.Column width={16} stretched>
          <RadGradSegment title='your ice points'>
            <StudentIceTabs username={username} earnedICE={earnedICE} projectedICE={projectedICE}
                            profileCourses={profileCourses}
                            profileInterests={profileInterests} profileOpportunities={profileOpportunities}
                            courseInstances={courseInstances}
                            opportunityInstances={opportunityInstances} />
          </RadGradSegment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </PageLayout>
);

const StudentHomeIcePageContainer = withTracker(() => {
  const { username } = useParams();
  const studentID: string = Users.getProfile(username).userID;
  const earnedICE: Ice = StudentProfiles.getEarnedICE(username);
  const projectedICE: Ice = StudentProfiles.getProjectedICE(username);
  const profileInterests: ProfileInterest[] = ProfileInterests.findNonRetired({ userID: studentID });
  const profileCourses: ProfileCourse[] = ProfileCourses.findNonRetired({ studentID });
  const profileOpportunities: ProfileOpportunity[] = ProfileOpportunities.findNonRetired({ studentID });
  const courseInstances: CourseInstance[] = CourseInstances.findNonRetired({ studentID });
  const opportunityInstances: OpportunityInstance[] = OpportunityInstances.findNonRetired({ studentID });
  return {
    username,
    earnedICE,
    projectedICE,
    profileCourses,
    profileInterests,
    profileOpportunities,
    courseInstances,
    opportunityInstances,
  };
})(StudentIcePage);

export default StudentHomeIcePageContainer;

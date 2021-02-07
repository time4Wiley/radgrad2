import { withTracker } from 'meteor/react-meteor-data';
import { useParams } from 'react-router-dom';
import React from 'react';
import { Grid} from 'semantic-ui-react';
import StudentPageMenu from '../../components/student/StudentPageMenu';
import BackToTopButton from '../../components/shared/BackToTopButton';
import StudentIceWidget from '../../components/student/ice/StudentIceWidget';
import { Ice, CourseInstance, FavoriteInterest, OpportunityInstance } from '../../../typings/radgrad';
import { StudentProfiles } from '../../../api/user/StudentProfileCollection';
import { Users } from '../../../api/user/UserCollection';
import { FavoriteInterests } from '../../../api/favorite/FavoriteInterestCollection';
import { CourseInstances } from '../../../api/course/CourseInstanceCollection';
import { OpportunityInstances } from '../../../api/opportunity/OpportunityInstanceCollection';
import HeaderPane from '../../components/shared/HeaderPane';

interface StudentIcePageProps {
  earnedICE: Ice;
  projectedICE: Ice;
  favoriteInterests: FavoriteInterest[];
  courseInstances: CourseInstance[];
  opportunityInstances: OpportunityInstance[];
}
const StudentIcePage: React.FC<StudentIcePageProps> = ({  earnedICE, projectedICE, favoriteInterests, courseInstances, opportunityInstances }) => (
  <div id="student-ice-points-page">
    <StudentPageMenu />
    <HeaderPane
      title="ICE Page"
      line1="Gaining Innovation, Competency, and Experience are more important in RadGrad than your GPA."
      line2="This page provides a breakdown of these three components of a successful undergraduate experience."
    />
      <Grid stackable style={{marginRight: '10px', marginLeft: '10px'}}>
        <Grid.Row>
          <Grid.Column width={16} stretched>
            <StudentIceWidget earnedICE={earnedICE} projectedICE={projectedICE} favoriteInterests={favoriteInterests} courseInstances={courseInstances} opportunityInstances={opportunityInstances} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <BackToTopButton />
  </div>
);

const StudentHomeIcePageContainer = withTracker(() => {
  const { username } = useParams();
  const studentID: string = Users.getProfile(username).userID;
  const earnedICE: Ice = StudentProfiles.getEarnedICE(username);
  const projectedICE: Ice = StudentProfiles.getProjectedICE(username);
  const favoriteInterests: FavoriteInterest[] = FavoriteInterests.findNonRetired({ userID: studentID });
  const courseInstances: CourseInstance[] = CourseInstances.findNonRetired({ studentID });
  const opportunityInstances: OpportunityInstance[] = OpportunityInstances.findNonRetired({ studentID });
  return {
    earnedICE,
    projectedICE,
    favoriteInterests,
    courseInstances,
    opportunityInstances,
  };
})(StudentIcePage);

export default StudentHomeIcePageContainer;

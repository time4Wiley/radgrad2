import React from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { useParams } from 'react-router-dom';
import { HelpMessages } from '../../../api/help/HelpMessageCollection';
import AdvisorPageMenuWidget from '../../components/advisor/AdvisorPageMenuWidget';
import AdvisorStudentSelectorWidget from '../../components/advisor/home/AdvisorStudentSelectorWidget';
import AdvisorUpdateStudentWidget from '../../components/advisor/home/AdvisorUpdateStudentWidget';
import AdvisorLogEntryWidget from '../../components/advisor/home/AdvisorLogEntryWidget';
import AdvisorStarUploadWidget from '../../components/advisor/home/AdvisorStarUploadWidget';
import HelpPanelWidget from '../../components/shared/HelpPanelWidget';
import { StudentProfiles } from '../../../api/user/StudentProfileCollection';
import { Interests } from '../../../api/interest/InterestCollection';
import { CareerGoals } from '../../../api/career/CareerGoalCollection';
import { AdvisorLogs } from '../../../api/log/AdvisorLogCollection';
import { IAdvisorLog, ICareerGoal, IHelpMessage, IInterest, IStudentProfile } from '../../../typings/radgrad';
import BackToTopButton from '../../components/shared/BackToTopButton';
import { RootState } from '../../../redux/types';

export interface IFilterStudents {
  selectedUsername: string;
  usernameDoc: IStudentProfile;
  interests: IInterest[];
  careerGoals: ICareerGoal[];
  advisorLogs: IAdvisorLog[];
  helpMessages: IHelpMessage[];
}

const mapStateToProps = (state: RootState) => ({
  selectedUsername: state.advisor.home.selectedUsername,
});

const renderSelectedStudentWidgets = (props: IFilterStudents, username: string) => {
  if (props.selectedUsername === '') {
    return undefined;
  }
  return (
    <Grid.Row>
      <Grid.Column width={1} />
      <Grid.Column width={9} stretched>
        <AdvisorUpdateStudentWidget
          usernameDoc={props.usernameDoc}
          studentCollectionName={StudentProfiles.getCollectionName()}
          careerGoals={props.careerGoals}
          interests={props.interests}
        />
      </Grid.Column>

      <Grid.Column width={5} stretched>
        <AdvisorLogEntryWidget
          usernameDoc={props.usernameDoc}
          advisorLogs={props.advisorLogs}
          advisorUsername={username}
        />
        <AdvisorStarUploadWidget
          usernameDoc={props.usernameDoc}
          advisorUsername={username}
        />

      </Grid.Column>
      <Grid.Column width={1} />
      <BackToTopButton />
    </Grid.Row>
  );
};

// TODO deconstruct props
const AdvisorHomePage: React.FC<IFilterStudents> = (props) => {
  const { username } = useParams();
  return (
    <div id="advisor-home-page">
      <AdvisorPageMenuWidget />
      <div className="pusher">
        <Grid stackable>
          <Grid.Row>
            <Grid.Column width={1} />
            <Grid.Column width={14}><HelpPanelWidget helpMessages={props.helpMessages} /></Grid.Column>
            <Grid.Column width={1} />
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={1} />
            <Grid.Column width={14}>
              <AdvisorStudentSelectorWidget
                careerGoals={props.careerGoals}
                interests={props.interests}
                advisorUsername={username}
              />
            </Grid.Column>
            <Grid.Column width={1} />
          </Grid.Row>
          {renderSelectedStudentWidgets(props, username)}
        </Grid>
      </div>
    </div>
  );
};

const AdvisorHomePageTracker = withTracker((props) => {
  const usernameDoc = StudentProfiles.findByUsername(props.selectedUsername);
  const userID = usernameDoc ? usernameDoc.userID : '';
  // const students = StudentProfiles.findNonRetired({ isAlumni: false }, { sort: { lastName: 1, firstName: 1 } });
  // const alumni = StudentProfiles.findNonRetired({ isAlumni: true }, { sort: { lastName: 1, firstName: 1 } });
  const helpMessages = HelpMessages.findNonRetired({});
  return {
    usernameDoc: usernameDoc,
    interests: Interests.findNonRetired(),
    careerGoals: CareerGoals.findNonRetired(),
    advisorLogs: AdvisorLogs.findNonRetired({ studentID: userID }, { sort: { createdOn: -1 } }),
    // students,
    // alumni,
    helpMessages,
  };
})(AdvisorHomePage);

export default connect(mapStateToProps)(AdvisorHomePageTracker);

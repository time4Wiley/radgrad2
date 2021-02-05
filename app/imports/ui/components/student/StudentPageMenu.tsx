import React from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { Grid, Menu } from 'semantic-ui-react';
import { StudentProfiles } from '../../../api/user/StudentProfileCollection';
import { StudentProfile } from '../../../typings/radgrad';
import { CHECKLISTS, DEGREEPLANNER, EXPLORER_TYPE, HOME, ICE, LEVELS, NEWS, STUDENT_PRIVACY, STUDENT_REVIEWS, STUDENT_VERIFICATION, URL_ROLES } from '../../layouts/utilities/route-constants';
import FirstMenu from '../shared/FirstMenu';
import { getUsername } from '../shared/utilities/router';

const StudentPageMenu: React.FC = () => {
  const match = useRouteMatch();
  const username = getUsername(match);
  const profile: StudentProfile = StudentProfiles.getProfile(username);
  const earnedIce = StudentProfiles.getEarnedICE(username);
  const projectedIce = StudentProfiles.getProjectedICE(username);
  const divStyle = { marginBottom: 30 };
  return (
    <div style={divStyle}>
      <FirstMenu profile={profile} displayLevelAndIce earnedICE={earnedIce} projectedICE={projectedIce} />
      <div className="radgrad-menu" id="menu">
        <Menu attached="top" borderless inverted stackable secondary pointing id="secondMenu">
          <Grid stackable doubling columns={13} container textAlign="center">
            <Grid.Column>
              <Menu.Item id="student-menu-checklists" as={NavLink} exact to={`/${URL_ROLES.STUDENT}/${username}/${CHECKLISTS}`}>
                Checklists
              </Menu.Item>
            </Grid.Column>
            <Grid.Column>
              <Menu.Item id="student-menu-interests" as={NavLink} exact to={`/${URL_ROLES.STUDENT}/${username}/${EXPLORER_TYPE.HOME}/${EXPLORER_TYPE.INTERESTS}`}>
                Interests
              </Menu.Item>
            </Grid.Column>
            <Grid.Column>
              <Menu.Item id="student-menu-career-goals" as={NavLink} exact to={`/${URL_ROLES.STUDENT}/${username}/${EXPLORER_TYPE.HOME}/${EXPLORER_TYPE.CAREERGOALS}`}>
                Careers
              </Menu.Item>
            </Grid.Column>
            <Grid.Column>
              <Menu.Item id="student-menu-courses" as={NavLink} exact to={`/${URL_ROLES.STUDENT}/${username}/${EXPLORER_TYPE.HOME}/${EXPLORER_TYPE.COURSES}`}>
                Courses
              </Menu.Item>
            </Grid.Column>
            <Grid.Column>
              <Menu.Item id="student-menu-opportunities" as={NavLink} exact to={`/${URL_ROLES.STUDENT}/${username}/${EXPLORER_TYPE.HOME}/${EXPLORER_TYPE.OPPORTUNITIES}`}>
                Opportunities
              </Menu.Item>
            </Grid.Column>
            <Grid.Column>
              <Menu.Item id="student-menu-degree-planner" as={NavLink} exact to={`/${URL_ROLES.STUDENT}/${username}/${DEGREEPLANNER}`}>
                Planner
              </Menu.Item>
            </Grid.Column>
            <Grid.Column>
              <Menu.Item id="student-menu-verification" as={NavLink} exact to={`/${URL_ROLES.STUDENT}/${username}/${STUDENT_VERIFICATION}`}>
                Verification
              </Menu.Item>
            </Grid.Column>
            <Grid.Column>
              <Menu.Item id="student-menu-privacy" as={NavLink} exact to={`/${URL_ROLES.STUDENT}/${username}/${STUDENT_PRIVACY}`}>
                Privacy
              </Menu.Item>
            </Grid.Column>
            <Grid.Column>
              <Menu.Item id="student-menu-ice-points" as={NavLink} exact to={`/${URL_ROLES.STUDENT}/${username}/${HOME}/${ICE}`}>
                ICE
              </Menu.Item>
            </Grid.Column>
            <Grid.Column>
              <Menu.Item id="student-menu-levels" as={NavLink} exact to={`/${URL_ROLES.STUDENT}/${username}/${HOME}/${LEVELS}`}>
                Levels
              </Menu.Item>
            </Grid.Column>
            <Grid.Column>
              <Menu.Item id="student-menu-reviews" as={NavLink} exact to={`/${URL_ROLES.STUDENT}/${username}/${STUDENT_REVIEWS}`}>
                Reviews
              </Menu.Item>
            </Grid.Column>
            <Grid.Column>
              <Menu.Item id="student-menu-news" as={NavLink} exact to={`/${URL_ROLES.STUDENT}/${username}/${NEWS}`}>
                News
              </Menu.Item>
            </Grid.Column>
            <Grid.Column>
              <Menu.Item id="student-sign-out" as={NavLink} exact to="/signout">
                Logout
              </Menu.Item>
            </Grid.Column>
          </Grid>
        </Menu>
      </div>
    </div>
  );
};

export default StudentPageMenu;

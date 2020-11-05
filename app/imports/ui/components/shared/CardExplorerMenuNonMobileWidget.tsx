import { createMedia } from '@artsy/fresnel';
import React from 'react';
import { Menu, Header, Button, Icon } from 'semantic-ui-react';
import { withRouter, Link } from 'react-router-dom';
import { RadGradProperties } from '../../../api/radgrad/RadGradProperties';
import { IInterest } from '../../../typings/radgrad';
import { EXPLORER_TYPE } from '../../../startup/client/route-constants';
import ExplorerMenuNonMobileItem from './ExplorerMenuNonMobileItem';
import {
  explorerInterfaces, IExplorerTypes,
  isType,
} from './explorer-helper-functions';
import { buildRouteName, isUrlRoleFaculty, isUrlRoleStudent } from './RouterHelperFunctions';
import '../../../../client/style.css';

const AppMedia = createMedia({
  breakpoints: {
    mobile: 320,
    tablet: 768,
    computer: 992,
    largeScreen: 1200,
    widescreen: 1920,
  },
});

const mediaStyles = AppMedia.createMediaStyle();
const { Media, MediaContextProvider } = AppMedia;

interface ICardExplorerMenuNonMobileWidgetProps {
  menuAddedList: { item: explorerInterfaces, count: number }[];
  menuCareerList: { item: IInterest, count: number }[] | undefined;
  // eslint-disable-next-line react/no-unused-prop-types
  type: IExplorerTypes;
  match: {
    isExact: boolean;
    path: string;
    url: string;
    params: {
      username: string;
    }
  };
}

const CardExplorerMenuNonMobileWidget = (props: ICardExplorerMenuNonMobileWidgetProps) => {
  const { menuAddedList, menuCareerList, type } = props;
  const adminEmail = RadGradProperties.getAdminEmail();
  const isStudent = isUrlRoleStudent(props.match);
  const isFaculty = isUrlRoleFaculty(props.match);

  const addFacultyOpportunityButtonStyle: React.CSSProperties = { marginTop: '5px' };

  return (
    <React.Fragment>
      <style>{mediaStyles}</style>
      {/* ####### The Menu underneath the Dropdown for NON mobile  ####### */}
      {/* The following components are rendered ONLY for STUDENTS: Academic Plans, Courses, and Opportunities. However,
            FACULTY have a 'Suggest a Opportunity / Career Goal' mailto link. */}
      <MediaContextProvider>
        <Media at="tablet">
          {(isType(EXPLORER_TYPE.ACADEMICPLANS, type) && isStudent) ?
            (

              <Menu vertical text className="cardMenu">
                <Header as="h4" className="cardMenu_header">
                  <Icon name="graduation cap" size="mini" />
                  <Header.Content>MY ACADEMIC PLAN</Header.Content>
                </Header>
                {
                  menuAddedList.map((listItem) => (
                    <ExplorerMenuNonMobileItem
                      listItem={listItem}
                      type={EXPLORER_TYPE.ACADEMICPLANS}
                      key={listItem.item._id}
                      match={props.match}
                    />
                  ))
                }
              </Menu>
            )
            : ''}

          {(isType(EXPLORER_TYPE.COURSES, type) && isStudent) ?
            (
              <React.Fragment>
                <Menu vertical text className="cardMenu">
                  <Header as="h4" className="cardMenu_header">
                    <Icon name="book" size="mini" />
                    <Header.Content>MY COURSES</Header.Content>
                  </Header>
                  {
                    menuAddedList.map((listItem) => (
                      <ExplorerMenuNonMobileItem
                        listItem={listItem}
                        type={EXPLORER_TYPE.COURSES}
                        key={listItem.item._id}
                        match={props.match}
                      />
                    ))
                  }
                </Menu>
              </React.Fragment>
            )
            : ''}

          {isType(EXPLORER_TYPE.OPPORTUNITIES, type) ?
            (
              <React.Fragment>
                <a href={`mailto:${adminEmail}?subject=New Opportunity Suggestion`}>Suggest a new Opportunity</a>
                {isFaculty ?
                  (
                    <Button
                      as={Link}
                      to={buildRouteName(props.match, '/manage-opportunities')}
                      size="small"
                      style={addFacultyOpportunityButtonStyle}
                    >
                      Add a Faculty Opportunity
                    </Button>
                  )
                  : ''}
                {isStudent ?
                  (
                    <Menu vertical text className="cardMenu">
                      <Header as="h4" className="cardMenu_header">
                        <Icon name="handshake" size="mini" />
                        <Header.Content>MY OPPORTUNITIES</Header.Content>
                      </Header>
                      {
                        menuAddedList.map((listItem) => (
                          <ExplorerMenuNonMobileItem
                            listItem={listItem}
                            type={EXPLORER_TYPE.OPPORTUNITIES}
                            key={listItem.item._id}
                            match={props.match}
                          />
                        ))
                      }
                    </Menu>
                  )
                  : ''}
              </React.Fragment>
            )
            : ''}

          {/* Components renderable to STUDENTS and FACULTY. But if we are FACULTY, make sure we
                don't map over menuAddedList or else we get undefined error. */}
          {isType(EXPLORER_TYPE.INTERESTS, type) ?
            (
              <Menu vertical text className="cardMenu">
                <Button
                  icon
                  positive
                  className="cardMenu_btn"
                  href={`mailto:${adminEmail}?subject=New Interest Suggestion`}
                >
                  <Icon name="edit" />
                  &nbsp;&nbsp;Suggest a NEW Interest</Button>
                <Header as="h4" className="cardMenu_header">
                  <Icon name="favorite" size="mini" />
                  <Header.Content>MY INTERESTS</Header.Content>
                </Header>
                {
                  menuAddedList.map((listItem) => (
                    <ExplorerMenuNonMobileItem
                      listItem={listItem}
                      type={EXPLORER_TYPE.INTERESTS}
                      key={listItem.item._id}
                      match={props.match}
                    />
                  ))
                }

                <Header as="h4" dividing>SUGGESTED CAREER GOAL INTERESTS</Header>
                {
                  menuCareerList.map((listItem) => (
                    <ExplorerMenuNonMobileItem
                      listItem={listItem}
                      type={EXPLORER_TYPE.INTERESTS}
                      key={listItem.item._id}
                      match={props.match}
                    />
                  ))
                }
              </Menu>
            )
            : ''}

          {isType(EXPLORER_TYPE.CAREERGOALS, type) ?
            (
              <Menu vertical text className="cardMenu">
                <Button
                  icon
                  positive
                  className="cardMenu_btn"
                  href={`mailto:${adminEmail}?subject=New Career Goal Suggestion`}
                >
                  <Icon name="edit" />
                  &nbsp;&nbsp;Suggest a NEW Career Goal</Button>
                <Header as="h4" className="cardMenu_header">
                  <Icon name="briefcase" size="mini" />
                  <Header.Content>MY CAREER GOALS</Header.Content>
                </Header>
                {menuAddedList.map((listItem) => (
                  <ExplorerMenuNonMobileItem
                    listItem={listItem}
                    type={EXPLORER_TYPE.CAREERGOALS}
                    key={listItem.item._id}
                    match={props.match}
                  />
                ))}
              </Menu>
            )
            : ''}
        </Media>
      </MediaContextProvider>
    </React.Fragment>
  );
};

export const CardExplorerMenuNonMobileWidgetContainer = withRouter(CardExplorerMenuNonMobileWidget);

export default CardExplorerMenuNonMobileWidgetContainer;

import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import * as React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { Dropdown, Header, Image, Menu } from 'semantic-ui-react';
import RadGradLogoText from '../../components/shared/RadGradLogoText';
import RadGradLoginButtons from '../../components/landing/RadGradLoginButtons';

interface INavBarProps {
  currentUser: string;
}

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class LandingNavBar extends React.Component<INavBarProps, object> {

  public render() {
    const menuStyle = { marginBottom: '10px' };
    const imageStyle = { width: '45px' };
    return (
      <Menu style={menuStyle} attached="top" borderless={true} size="small">
        <Menu.Item as={NavLink} activeClassName="" exact={true} to="/">
          <Image style={imageStyle} circular={true} src="/images/radgrad_logo.png"/>
          <div className="mobile hidden item">
            <RadGradLogoText/>
          </div>
        </Menu.Item>
        <Menu.Item as={NavLink} exact={true} to="#landing-section-9" position="right">GUIDED TOURS</Menu.Item>
        <Menu.Item>
          {this.props.currentUser === '' ? (
            <div>
              <RadGradLoginButtons/>
              <Dropdown text="Login" pointing="top right" icon={'user'}>
                <Dropdown.Menu>
                  <Dropdown.Item icon="user" text="Sign In" as={NavLink} exact={true} to="/signin"/>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          ) : (
            <Dropdown text={this.props.currentUser} pointing="top right" icon={'user'}>
              <Dropdown.Menu>
                <Dropdown.Item icon="sign out" text="Sign Out" as={NavLink} exact={true} to="/signout"/>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Menu.Item>
      </Menu>
    );
  }
}

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const LandingNavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(LandingNavBar);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(LandingNavBarContainer);

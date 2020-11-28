import { withTracker } from 'meteor/react-meteor-data';
import * as React from 'react';
import { Grid } from 'semantic-ui-react';
import { useRouteMatch } from 'react-router-dom';
import { HelpMessages } from '../../../api/help/HelpMessageCollection';
import { IHelpMessage } from '../../../typings/radgrad';
import * as Router from '../../components/shared/utilities/router';
import { URL_ROLES } from '../../layouts/utilities/route-constants';
import AdminPageMenuWidget from '../../components/admin/AdminPageMenuWidget';
import AdvisorPageMenuWidget from '../../components/advisor/AdvisorPageMenuWidget';
import FacultyPageMenuWidget from '../../components/faculty/FacultyPageMenuWidget';
import StudentPageMenuWidget from '../../components/student/StudentPageMenuWidget';
import HelpPanelWidget from '../../components/shared/HelpPanelWidget';
import PageTrackingMenu from '../../components/shared/page-tracking/PageTrackingMenu';
import PageTrackingComparisonWidget from '../../components/shared/page-tracking/PageTrackingComparisonWidget';
import BackToTopButton from '../../components/shared/BackToTopButton';

interface IPageTrackingComparisonPageProps {
  helpMessages: IHelpMessage[];
}

const PageTrackingComparisonPage: React.FC<IPageTrackingComparisonPageProps> = ({ helpMessages }) => {
  const match = useRouteMatch();
  const renderPageMenuWidget = (): JSX.Element => {
    const role = Router.getRoleByUrl(match);
    switch (role) {
      case URL_ROLES.ADMIN:
        return <AdminPageMenuWidget />;
      case URL_ROLES.ADVISOR:
        return <AdvisorPageMenuWidget />;
      case URL_ROLES.FACULTY:
        return <FacultyPageMenuWidget />;
      case URL_ROLES.STUDENT:
        return <StudentPageMenuWidget />;
      default:
        console.error('renderPageMenuWidget(): Unable to render the correct menu widget for the current role');
        return undefined;
    }
  };

  return (
    <React.Fragment>
      {renderPageMenuWidget()}

      <Grid stackable>
        <Grid.Row>
          <Grid.Column width={1} />
          <Grid.Column width={14}><HelpPanelWidget helpMessages={helpMessages} /></Grid.Column>
          <Grid.Column width={1} />
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={1} />
          <Grid.Column width={3}>
            <PageTrackingMenu type="comparison" />
          </Grid.Column>

          <Grid.Column width={11} stretched>
            <PageTrackingComparisonWidget />
          </Grid.Column>
          <Grid.Column width={1} />
        </Grid.Row>
      </Grid>

      <BackToTopButton />
    </React.Fragment>
  );
};

const PageTrackingComparisonPageContainer = withTracker(() => {
  const helpMessages = HelpMessages.findNonRetired({});
  return {
    helpMessages,
  };
})(PageTrackingComparisonPage);

export default PageTrackingComparisonPageContainer;

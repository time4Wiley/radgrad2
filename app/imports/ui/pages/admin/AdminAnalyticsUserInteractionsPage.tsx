import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import { Grid } from 'semantic-ui-react';
import { StudentProfiles } from '../../../api/user/StudentProfileCollection';
import AdminPageMenu from '../../components/admin/AdminPageMenu';
import AdminAnalyticsMenuWidget from '../../components/admin/analytics/AdminAnalyticsMenuWidget';
import AdminAnalyticsUserInteractionsWidget, { AdminAnalyticsUserInteractionsWidgetProps } from '../../components/admin/analytics/user-interactions/AdminAnalyticsUserInteractionsWidget';

const AdminAnalyticsUserInteractionsPage: React.FC<AdminAnalyticsUserInteractionsWidgetProps> = ({ students }) => {
  const paddedStyle = {
    paddingTop: 20,
  };
  return (
    <div id="analytics-user-interactions-page">
      <AdminPageMenu />
      <Grid container stackable style={paddedStyle} columns={1}>
        <Grid.Column>
          <Grid>
            <Grid.Column width={3}>
              <AdminAnalyticsMenuWidget />
            </Grid.Column>
            <Grid.Column width={13}>
              <AdminAnalyticsUserInteractionsWidget students={students} />
            </Grid.Column>
          </Grid>
        </Grid.Column>
      </Grid>
    </div>
  );
};

const con = withTracker(() => {
  const students = StudentProfiles.find({ isAlumni: false }).fetch();
  return {
    students,
  };
})(AdminAnalyticsUserInteractionsPage);
export default con;

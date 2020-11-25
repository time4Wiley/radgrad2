import React from 'react';
import { Card, Icon, Message } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { Link, useParams, useRouteMatch } from 'react-router-dom';
import _ from 'lodash';
import { IOpportunity } from '../../../../typings/radgrad';
import { FavoriteOpportunities } from '../../../../api/favorite/FavoriteOpportunityCollection';
import * as Router from '../../shared/utilities/router';
import { Opportunities } from '../../../../api/opportunity/OpportunityCollection';
import FavoriteOpportunityCard from './FavoriteOpportunityCard';
import { EXPLORER_TYPE } from '../../../layouts/utilities/route-constants';
import { Users } from '../../../../api/user/UserCollection';

interface IFavoriteOpportunitiesWidgetProps {
  studentID: string;
  opportunities: IOpportunity[];
}

const FavoriteOpportunitiesWidget = (props: IFavoriteOpportunitiesWidgetProps) => {
  const match = useRouteMatch();
  const hasFavorites = props.opportunities.length > 0;
  return (
    <div>
      {hasFavorites ?
        (
          <Card.Group itemsPerRow={1}>
            {_.map(props.opportunities, (o) => (
              <FavoriteOpportunityCard key={o._id} opportunity={o} studentID={props.studentID} />))}
          </Card.Group>
        )
        :
        (
          <Message>
            <Message.Header>No Favorite Opportunities</Message.Header>
            <p>You can favorite opportunities in the explorer.</p>
            <Link to={Router.buildRouteName(match, `/${EXPLORER_TYPE.HOME}/${EXPLORER_TYPE.OPPORTUNITIES}`)}>
              View in Explorer <Icon name="arrow right" />
            </Link>
          </Message>
        )}
    </div>
  );
};

export default withTracker((props) => {
  const { username } = useParams();
  const studentID = Users.getProfile(username).userID;
  const favorites = FavoriteOpportunities.findNonRetired({ studentID });
  const opportunities = _.map(favorites, (f) => Opportunities.findDoc(f.opportunityID));
  return {
    studentID,
    opportunities,
  };
})(FavoriteOpportunitiesWidget);

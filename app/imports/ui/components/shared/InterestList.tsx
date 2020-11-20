import React from 'react';
import { Label, SemanticSIZES } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import * as Router from './utilities/router';
import { docToName, itemToSlugName } from './utilities/data-model';
import { MatchingInterests } from '../../../api/interest/MatchingInterests';
import { EXPLORER_TYPE } from '../../layouts/utilities/route-constants';

interface IInterestListProps {
  item: {
    interestIDs: string[];
  }
  size: SemanticSIZES;
  match: {
    isExact: boolean;
    path: string;
    url: string;
    params: {
      username: string;
    }
  };
}

const InterestList = (props: IInterestListProps) => {
  const { match, size, item } = props;
  console.log(item);
  const matchingUserInterests = MatchingInterests.matchingUserInterests(Router.getUsername(match), item);
  const matchingCareerInterests = MatchingInterests.matchingCareerGoalInterests(Router.getUsername(match), item);
  const otherInterests = MatchingInterests.notMatchingInterests(Router.getUsername(match), item);
  console.log(matchingUserInterests);
  return (
    <Label.Group size={size}>
      {
        matchingUserInterests.map((interest) => {
          const interestSlug = itemToSlugName(interest);
          return (
            <Label
              as={Link}
              key={interest._id}
              to={Router.buildRouteName(match, `/${EXPLORER_TYPE.HOME}/${EXPLORER_TYPE.INTERESTS}/${interestSlug}`)}
              size={size}
            >
              <i className="fitted star icon" /> {docToName(interest)}
            </Label>
          );
        })
      }

      {
        matchingCareerInterests.map((interest) => {
          const interestSlug = itemToSlugName(interest);
          return (
            <Label
              as={Link}
              key={interest._id}
              to={Router.buildRouteName(match, `/${EXPLORER_TYPE.HOME}/${EXPLORER_TYPE.INTERESTS}/${interestSlug}`)}
              size={size}
            >
              <i className="fitted suitcase icon" />
              {' '}
              {docToName(interest)}
            </Label>
          );
        })
      }

      {
        otherInterests.map((interest) => {
          const interestSlug = itemToSlugName(interest);
          return (
            <Label
              as={Link}
              key={interest._id}
              to={Router.buildRouteName(match, `/explorer/interests/${interestSlug}`)}
              size={size}
              color="grey"
            >
              {docToName(interest)}
            </Label>
          );
        })
      }
    </Label.Group>
  );
};

export default withRouter(InterestList);

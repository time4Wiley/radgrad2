import React from 'react';
import { Header, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Interests } from '../../../api/interest/InterestCollection';
import { EXPLORER_TYPE } from '../../layouts/utilities/route-constants';
import { Slugs } from '../../../api/slug/SlugCollection';
import { Interest } from '../../../typings/radgrad';

interface WithInterestsProps {
  interestIDs: string[];
}

const getSlugName = (interest: Interest) => Slugs.getNameFromID(interest.slugID);

const LandingInterestList: React.FC<WithInterestsProps> = ({ interestIDs }) => {
  const interests: Interest[] = interestIDs.map((id) => Interests.findDoc(id));
  const labelStyle = { marginBottom: '2px' };
  return (
    <React.Fragment>
      <Header as="h4" dividing>
        Related Interests
      </Header>
      {interests.map((interest) => (
        <Label as={Link} key={interest._id} to={`/${EXPLORER_TYPE.HOME}/${EXPLORER_TYPE.INTERESTS}/${getSlugName(interest)}`} color="grey" style={labelStyle}>
          {interest.name}
        </Label>
      ))}
    </React.Fragment>
  );
};

export default LandingInterestList;

import React, { useState } from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import Markdown from 'react-markdown';
import _ from 'lodash';
import { FavoriteInterests } from '../../../../api/favorite/FavoriteInterestCollection';
import { IUserProfileCard } from '../../../../typings/radgrad';
import { defaultProfilePicture } from '../../../../api/user/BaseProfileCollection';
import { ROLE } from '../../../../api/role/Role';
import InterestList from '../InterestList';
import ExplorerUsersWidget from './ExplorerUsersWidget';

const UserProfileCard = (props: IUserProfileCard) => {
  const [isActiveState, setIsActive] = useState(false);

  const isRole = (compareRole: string, ...otherRoles: string[]): boolean => props.item.role === compareRole || _.includes(otherRoles, props.item.role);

  const openInNewTab = () => {
    const win = window.open(props.item.website, '_blank', 'noopener,noreferrer');
    win.focus();
  };

  const toggleFullSize = () => {
    setIsActive(!isActiveState);
  };

  if (!(props.item)) return undefined;
  const p = props.item;
  const favIDs = FavoriteInterests.find({ userID: p.userID }).fetch();
  p.interestIDs = _.map(favIDs, (f) => f.interestID);
  // console.log(favIDs, p);
  const level = p.level;
  let sharedUsername;
  if (isRole(ROLE.STUDENT, ROLE.ALUMNI)) {
    sharedUsername = p.shareUsername ? (
      <React.Fragment>
        {p.username}
        <br />
      </React.Fragment>
    ) : undefined;
  }

  const cardStyle: React.CSSProperties = {
    textAlign: 'left',
  };
  const usernameStyle: React.CSSProperties = {
    wordWrap: 'break-word',
  };

  return (
    <Card fluid style={cardStyle}>
      <Card.Content>
        <Image src={p.picture ? p.picture : defaultProfilePicture} floated="right" size="tiny" />
        <Card.Header>{`${p.firstName} ${p.lastName}`}</Card.Header>
        <Card.Meta>
          {level > 0 ? (
            <Image
              style={{ padding: '5px' }}
              size="mini"
              src={`/images/level-icons/radgrad-level-${level}-icon.png`}
            />
          ) : undefined}
          {isRole(ROLE.ADVISOR, ROLE.FACULTY) ? (
            <div style={usernameStyle}>
              {p.username}
              <br />
            </div>
          ) : undefined}
          {sharedUsername}
          <br />
        </Card.Meta>
        {p.website ? (
          <Button
            basic
            compact
            color="green"
            size="small"
            content="WEBSITE"
            onClick={openInNewTab}
          />
        ) : undefined}
      </Card.Content>
      <Card.Content extra>
        <InterestList item={p} size="mini" />
        {isRole(ROLE.ADVISOR, ROLE.FACULTY) ? (
          <Markdown source={p.aboutMe} />
        ) : undefined}
      </Card.Content>
      <Button onClick={toggleFullSize} content="View Profile" />
      <ExplorerUsersWidget
        userProfile={props.item}
        isActive={isActiveState}
        handleClose={toggleFullSize}
      />
    </Card>
  );
};

export default UserProfileCard;

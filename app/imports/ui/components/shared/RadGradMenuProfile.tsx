import React from 'react';
import { Image } from 'semantic-ui-react';
import RadGradMenuLevel from './RadGradMenuLevel';
import MenuIceCircle from './MenuIceCircle';
import { IBaseProfile, Ice } from '../../../typings/radgrad';
import { radgradMenuProfile } from './shared-widget-names';

export interface IRadGradMenuProfileProps {
  profile: IBaseProfile;
  displayLevelAndIce: boolean;
  earnedICE?: Ice;
  projectedICE?: Ice;
}

const RadGradMenuProfile: React.FC<IRadGradMenuProfileProps> = ({ profile, displayLevelAndIce, earnedICE, projectedICE }) => {

  const level = profile.level;
  const divStyle = { borderLeft: '1px solid rgba(34,36,38,.07)', paddingTop: '5px' };
  const flexStyle = { display: 'flex', paddingTop: '5px', paddingRight: '13px', marginTop: '3px' };
  const imageStyle = { width: '50px', borderRadius: '2px' };
  // const nameStyle = { lineHeight: '20px', paddingLeft: '10px', marginTop: '0px' };
  const pictureSrc = (profile.picture) ? profile.picture : '/images/default-profile-picture.png';
  return (
    <div style={flexStyle} id={`${radgradMenuProfile}`}>
      {displayLevelAndIce ? (
        <div style={flexStyle}>
          <RadGradMenuLevel level={level} />
          <MenuIceCircle earned={earnedICE.i} planned={projectedICE.i} type="innov" />
          <MenuIceCircle earned={earnedICE.c} planned={projectedICE.c} type="comp" />
          <MenuIceCircle earned={earnedICE.e} planned={projectedICE.e} type="exp" />
        </div>
      ) : ''}
      <div className="mobile hidden item radgrad-menu-profile radgrad-brand-font" style={divStyle}>
        <Image src={pictureSrc} style={imageStyle} />
      </div>
    </div>
  );
};

// const RadGradMenuProfileContainer = withTracker((props) => {
//   const profile = Users.getProfile(props.userName);
//   const displayLevelAndIce = profile.role === ROLE.STUDENT;
//   // console.log('profile %o userIsInRole %o', profile, displayLevelAndIce);
//   let earnedICE;
//   let projectedICE;
//   if (displayLevelAndIce) {
//     earnedICE = StudentProfiles.getEarnedICE(props.userName);
//     projectedICE = StudentProfiles.getProjectedICE(props.userName);
//   }
//
//   return {
//     profile,
//     displayLevelAndIce,
//     earnedICE,
//     projectedICE,
//   };
// })(RadGradMenuProfile);
export default RadGradMenuProfile;

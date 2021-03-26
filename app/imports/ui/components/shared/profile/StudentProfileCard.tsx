import React, {useEffect, useState} from 'react';
import _ from 'lodash';
import {getPublicProfileData, PublicProfileData} from '../../../../api/user/StudentProfileCollection.methods';
import ProfileCard from './ProfileCard';
import {StudentProfile} from '../../../../typings/radgrad';

export interface StudentProfileCardProps {
  studentProfile: StudentProfile;
  fluid?: boolean;
}

const StudentProfileCard: React.FC<StudentProfileCardProps> = ({studentProfile, fluid= true}) => {
  const {username, firstName, lastName} = studentProfile;
  const name = `${firstName} ${lastName}`;
  const [data, setData] = useState<PublicProfileData>({});
  useEffect(() => {
    function fetchData() {
      getPublicProfileData.callPromise({username})
        .then(result => setData(result))
        .catch(error => { console.error(error); setData({});});
    }
    // Only fetch data if its hasn't been fetched before.
    _.isEmpty(data) || fetchData();
  });

  return (
    <ProfileCard email={username} name={name} careerGoals={data.careerGoals} interests={data.interests} courses={data.courses} ice={data.ice} image={data.picture} level={data.level} opportunities={data.opportunities} website={data.website} key={username} fluid={fluid}/>
  );
};

export default StudentProfileCard;

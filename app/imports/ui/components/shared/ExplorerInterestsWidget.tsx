import * as React from 'react';
import {withRouter, Link} from 'react-router-dom';
import {Container, Header, Button, Grid, Image, Popup, Divider} from 'semantic-ui-react';
import {Interests} from "../../../api/interest/InterestCollection";
import {_} from 'meteor/erasaur:meteor-lodash';
import Swal from 'sweetalert2';
import {StudentProfiles} from "../../../api/user/StudentProfileCollection";
import {CourseInstances} from "../../../api/course/CourseInstanceCollection";
import {FacultyProfiles} from "../../../api/user/FacultyProfileCollection";
import {MentorProfiles} from "../../../api/user/MentorProfileCollection";
import {Courses} from "../../../api/course/CourseCollection"
import {Opportunities} from "../../../api/opportunity/OpportunityCollection";
import {OpportunityInstances} from "../../../api/opportunity/OpportunityInstanceCollection";
import {updateMethod} from '../../../api/base/BaseCollection.methods';
import {Users} from "../../../api/user/UserCollection";
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import {IProfile} from "../../../typings/radgrad";

//find and import simple schema

interface IExplorerInterestsWidgetProps {
  type: string;
  match: {
    isExact: boolean,
    path: string,
    url: string,
    params: {
      username: string;
      interest: string;
    }
  }
}

// don't know if we'll need this because state may not change
interface IExplorerInterestsWidgetState {

}

class ExplorerInterestsWidget extends React.Component <IExplorerInterestsWidgetProps, IExplorerInterestsWidgetState> {
  constructor(props: any) {
    super(props);
    console.log(props);
  }

  /**
   * returns the doc of interest based on url
   * @constructor
   */
  private getInterestDoc = () => {
    const splitUrl = this.props.match.url.split('/');
    const splitSlug = splitUrl[splitUrl.length - 1];
    return (Interests.findDocBySlug(splitSlug));
    //Interests.findIdBySlug(slug)
  };

  private getRoleByUrl = (): string => {
    const role = this.props.match.url.split('/')[1];
    return role;
  };


/*
  private studentsParticipating = (item) => {
    let participation = [];
    const interestID = item._id;
    const students = StudentProfiles.findNonRetired();
    _.map(students, (num) => {
      _.filter(num.interestIDs, (interests)=> {
        if(interests == interestID){
          participation.push(num);
          console.log(num.username);
        }
      })
    });
    return participation.length;
  };
*/


  /**
   * return how many users participate in interest based on role
   *  match the interest w/ the interest in a user profile
   */

  private participation = (role) => {
    let interested = [];
    switch (role) {
      case 'student':
        const students = StudentProfiles.findNonRetired();
        _.map(students, (num) => {
          _.filter(num.interestIDs, (interests) => {
            if(interests == this.getInterestDoc()._id){
              interested.push(num);
            }
          })
        });
      /*  for (let a = 0; a < students.length; a++) {
          for (let i = 0; i < students[a].interestIDs.length; i++) {
            if (students[a].interestIDs[i] === this.GetInterestDoc()._id) {
              interested.push(students[a]);
            }
          }
        }*/
        return interested;
      case 'faculty':
        const faculty = FacultyProfiles.findNonRetired();
        for (let a = 0; a < faculty.length; a++) {
          for (let i = 0; i < faculty[a].interestIDs.length; i++) {
            if (faculty[a].interestIDs[i] === this.getInterestDoc()._id) {
              interested.push(faculty[a]);
            }
          }
        }
        return interested;
      case 'mentor':
        const mentor = MentorProfiles.findNonRetired();
        for (let a = 0; a < mentor.length; a++) {
          for (let i = 0; i < mentor[a].interestIDs.length; i++) {
            if (mentor[a].interestIDs[i] === this.getInterestDoc()._id) {
              interested.push(mentor[a]);
            }
          }
        }
        return interested;
      case 'alumni':
        const alumni = StudentProfiles.findNonRetired({'isAlumni': true});
        for (let a = 0; a < alumni.length; a++) {
          for (let i = 0; i < alumni[a].interestIDs.length; i++) {
            if (alumni[a].interestIDs[i] === this.getInterestDoc()._id) {
              interested.push(alumni[a]);
            }
          }
        }
        return interested;
    }
  };


  private GetRelatedCourses = () => {
    let courses = [];
    const courseInstances = Courses.find().fetch();

    _.map(courseInstances, (num) => {
      _.filter(num.interestIDs, (interests) => {
        if(interests == this.getInterestDoc()._id){
          courses.push(num);
        }
      })
    });
   /* for (let a = 0; a < courseInstances.length; a++) {
      for (let i = 0; i < courseInstances[a].interestIDs.length; i++) {
        if (courseInstances[a].interestIDs[i] === this.getInterestDoc()._id) {
          courses.push(courseInstances[a]);
        }
      }
    }*/
    return courses;
  };


  /**
   *
   * @param courses
   * @constructor
   */
  private GetAssociationRelatedCourses = (courses, role) => {
    let inPlanIDs = [];
    let completedIDs = [];
    if (role != 'student') {

      let relatedCourses = {
        completed: ['none'],
        inPlan: ['none'],
        notInPlan: ['none']
      };

      return relatedCourses;
    } else {
      const inPlanInstance = CourseInstances.findNonRetired({
        'studentID':
        StudentProfiles.findDoc(this.props.match.params.username).userID, 'verified': false,
      });
      _.map(inPlanInstance, (value) => {
        inPlanIDs.push(value.courseID);
      });

      const completedInstance = CourseInstances.findNonRetired({
        'studentID':
        StudentProfiles.findDoc(this.props.match.params.username).userID, 'verified': true
      });
      _.map(completedInstance, (value) => {
        completedIDs.push(value.courseID);
      });

      let relatedIDs = [];
      //shows all ids for related courses
      _.map(courses, (value) => {
        relatedIDs.push(value._id)
      });
      const relatedInPlanIDs = _.intersection(relatedIDs, inPlanIDs);
      const relatedCompletedIDs = _.intersection(relatedIDs, completedIDs);
      const relatedNotInPlanIDs = _.difference(relatedIDs, relatedInPlanIDs, relatedCompletedIDs);

      let relatedCourses = {
        completed: relatedCompletedIDs,
        inPlan: relatedInPlanIDs,
        notInPlan: relatedNotInPlanIDs
      };
      return relatedCourses;
    }
  };

  private GetRelatedOpportunities = () => {
    let opportunities = [];
    const opportunityInstances = Opportunities.find().fetch();
    for (let a = 0; a < opportunityInstances.length; a++) {
      for (let i = 0; i < opportunityInstances[a].interestIDs.length; i++) {
        if (opportunityInstances[a].interestIDs[i] === this.getInterestDoc()._id) {
          opportunities.push(opportunityInstances[a]);
        }
      }
    }
    return opportunities;
  };

  private GetAssociationRelatedOpportunities = (opportunities, role) => {
    let inPlanIDs = [];
    let completedIDs = [];

    if (role != 'student') {
      let relatedOpportunities = {
        completed: ['none'],
        inPlan: ['none'],
        notInPlan: ['none']
      };
      return relatedOpportunities;
    } else {
      const inPlanInstance = OpportunityInstances.findNonRetired({
        'studentID':
        StudentProfiles.findDoc(this.props.match.params.username).userID, 'verified': false,
      });
      _.map(inPlanInstance, (value) => {
        inPlanIDs.push(value.opportunityID);
      });

      const completedInstance = OpportunityInstances.findNonRetired({
        'studentID':
        StudentProfiles.findDoc(this.props.match.params.username).userID, 'verified': true
      });
      _.map(completedInstance, (value) => {
        completedIDs.push(value.opportunityID);
      });
      let relatedIDs = [];
      //shows all ids for related courses
      _.map(opportunities, (value) => {
        relatedIDs.push(value._id)
      });

      const relatedInPlanIDs = _.intersection(relatedIDs, inPlanIDs);
      const relatedCompletedIDs = _.intersection(relatedIDs, completedIDs);
      const relatedNotInPlanIDs = _.difference(relatedIDs, relatedInPlanIDs, relatedCompletedIDs);

      let relatedOpportunities = {
        completed: relatedCompletedIDs,
        inPlan: relatedInPlanIDs,
        notInPlan: relatedNotInPlanIDs
      };
      return relatedOpportunities;
    }
  };


  private GenerateCourseRoute = (document) => {
    const variableSlug = Courses.findSlugByID(document._id);
    let username = this.props.match.params.username;
    let role = this.props.match.url.split('/')[1];
    let partialSlug = [];
    partialSlug.push(role);
    partialSlug.push(username);
    partialSlug.push('explorer');
    partialSlug.push('courses');
    partialSlug.push(variableSlug);
    const fullSlug = `/${partialSlug.toString().split(',').join('/')}`;
    return fullSlug;
  };

  private GenerateOpportunityRoute = (document) => {
    const variableSlug = Opportunities.findSlugByID(document._id);
    let username = this.props.match.params.username;
    let role = this.props.match.url.split('/')[1];
    let partialSlug = [];
    partialSlug.push(role);
    partialSlug.push(username);
    partialSlug.push('explorer');
    partialSlug.push('opportunities');
    partialSlug.push(variableSlug);
    const fullSlug = `/${partialSlug.toString().split(',').join('/')}`;
    return fullSlug;
  };

  /**
   * ToDo ask Gian about this or Moore when he gets back
   */
  private handleClick = () => {

    console.log('handle click');
    console.log('find doc', StudentProfiles.findDoc(this.props.match.params.username));
    switch (this.checkInterestStatus()) {
      case 'remove from interests':
        const newInterestsAfterRemove = this.removeInterest();
        console.log('handle click remove', newInterestsAfterRemove);
        const updateDataRemove: any = {
          id: Users.getProfile(this.props.match.params.username)._id,
          interests: newInterestsAfterRemove
        };
        const collectionNameRemove = this.getCollectionName();
        console.log(collectionNameRemove);

        updateMethod.call({collectionName: collectionNameRemove, updateData: updateDataRemove}, (error) => {
          if (error) {
            Swal.fire({
              title: 'Update failed',
              text: error.message,
              type: 'error',
            });
            console.error('Error in updating. %o', error);
          } else {
            Swal.fire({
              title: 'Update succeeded',
              type: 'success',
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
        break;
      case 'add to interests':
        const newInterestsAfterAdd = this.addInterest();
        console.log('handle click add', newInterestsAfterAdd);
        const updateDataAdd: any = {
          id: Users.getProfile(this.props.match.params.username)._id,
          interests: newInterestsAfterAdd
        };
        console.log('this is the updateData', updateDataAdd);
        const collectionNameAdd = this.getCollectionName();
        console.log('this is the collection name: ', collectionNameAdd);

        updateMethod.call({collectionName: collectionNameAdd, updateData: updateDataAdd}, (error) => {
          if (error) {
            Swal.fire({
              title: 'Update failed',
              text: error.message,
              type: 'error',
            });
            console.error('Error in updating. %o', error);
          } else {
            Swal.fire({
              title: 'Update succeeded',
              type: 'success',
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
        break;
    }
  };


  private addInterest = () => {

    const user = Users.getProfile(this.props.match.params.username);
    const interestIDsOfUser = user.interestIDs;
    const interestID = this.getInterestDoc()._id;
    const currentInterestID = [interestID];
    let dataValue;
    let updateValue;
    dataValue = [interestIDsOfUser, currentInterestID];
    updateValue = _.flatten(dataValue);
    console.log(updateValue);
    return updateValue;

  };


  private removeInterest = () => {
    const interestID = this.getInterestDoc()._id;
    let updateValue;
    switch (this.getRoleByUrl()) {
      case 'student':
        console.log('remove interest student');
        //specify the type of the profile
        const studentProfile: IProfile = StudentProfiles.findDoc(this.props.match.params.username);
        let interestIDsOfUser: string[] = studentProfile.interestIDs;
        updateValue = _.without(interestIDsOfUser, interestID);
        return updateValue;
      case 'faculty':
        console.log('remove interest faculty');
        interestIDsOfUser = FacultyProfiles.findDoc(this.props.match.params.username).interestIDs;
        updateValue = _.without(interestIDsOfUser, interestID);
        console.log(updateValue);
        return updateValue;
      case 'alumni':
        console.log('remove interest alumni');
        interestIDsOfUser = StudentProfiles.findDoc({
          username: this.props.match.params.username,
          isAlumni: true
        }).interestIDs;
        updateValue = _.without(interestIDsOfUser, interestID);
        return updateValue;
      case 'mentor':
        console.log('remove interest mentor');
        interestIDsOfUser = MentorProfiles.findDoc(this.props.match.params.username).interestIDs;
        updateValue = _.without(interestIDsOfUser, interestID);
        return updateValue;
    }
  };

  private getUpdateDataID = () => {
    switch (this.getRoleByUrl()) {
      case 'student':
        return StudentProfiles.findDoc(this.props.match.params.username)._id;
      case 'faculty':
        return FacultyProfiles.findDoc(this.props.match.params.username)._id;
      case 'alumni':
        return StudentProfiles.findDoc({
          username: this.props.match.params.username,
          isAlumni: true
        })._id;
      case 'mentor':
        return MentorProfiles.findDoc(this.props.match.params.username)._id;
    }
  };

  private getCollectionName = () => {
    switch (this.getRoleByUrl()) {
      case 'student':
        return StudentProfiles.getCollectionName();
      case 'faculty':
        return FacultyProfiles.getCollectionName();
      case 'alumni':
        return StudentProfiles.getCollectionName();
      case 'mentor':
        return MentorProfiles.getCollectionName();
    }
  };

  private checkInterestStatus = () => {
    //check if this interest is in student's interest's
    //get the interest ID
    let interestIDsofUser: string[];
    const currentInterest = this.getInterestDoc()._id;
    switch (this.getRoleByUrl()) {
      case 'student':
        const studentProfile: IProfile = StudentProfiles.findDoc(this.props.match.params.username);
        interestIDsofUser = studentProfile.interestIDs;
        let currentInterestIDStudent = [currentInterest];
        let iDsinCommonStudent = _.intersection(currentInterestIDStudent, interestIDsofUser);
        if (iDsinCommonStudent.length == 1) {
          return 'remove from interests';
        } else {
          return 'add to interests';
        }
      case 'faculty':
        console.log(`this is a ${this.props.match.url.split('/')[1]}`);
        const facultyProfile: IProfile = FacultyProfiles.findDoc(this.props.match.params.username);
        console.log(FacultyProfiles.findDoc(this.props.match.params.username));
        interestIDsofUser = facultyProfile.interestIDs;
        let currentInterestIDFaculty = [currentInterest];
        let iDsinCommonFaculty = _.intersection(currentInterestIDFaculty, interestIDsofUser);
        if (iDsinCommonFaculty.length == 1) {
          return 'remove from interests';
        } else {
          return 'add to interests';
        }
      case 'alumni':
        console.log(`this is a ${this.props.match.url.split('/')[1]}`);
        const alumniProfile: IProfile = StudentProfiles.findDoc({
          username: this.props.match.params.username,
          'isAlumni': true
        });
        interestIDsofUser = alumniProfile.interestIDs;
        let currentInterestIDAlumni = [currentInterest];
        let iDsinCommonAlumni = _.intersection(currentInterestIDAlumni, interestIDsofUser);
        if (iDsinCommonAlumni.length == 1) {
          return 'remove from interests';
        } else {
          return 'add to interests';
        }
      case 'mentor':
        console.log(`this is a ${this.props.match.url.split('/')[1]}`);
        const mentorProfile: IProfile = MentorProfiles.findDoc(this.props.match.params.username);
        interestIDsofUser = mentorProfile.interestIDs;
        let currentInterestIDMentor = [currentInterest];
        let iDsinCommonMentor = _.intersection(currentInterestIDMentor, interestIDsofUser);
        if (iDsinCommonMentor.length == 1) {
          return 'remove from interests';
        } else {
          return 'add to interests';
        }
    }
  };

  public render() {
    const interestDoc = this.getInterestDoc();
    const interestName = interestDoc.name;
    const interestDescription = interestDoc.description;
    const relatedCourses = this.GetAssociationRelatedCourses(this.GetRelatedCourses(), this.props.match.url.split('/')[1]);
    const relatedOpportunities = this.GetAssociationRelatedOpportunities(this.GetRelatedOpportunities(), this.props.match.url.split('/')[1]);
    const interestedStudents = this.participation('student');
    const interestedFaculty = this.participation('faculty');
    const interestedAlumni = this.participation('alumni');
    const interestedMentor = this.participation('mentor');

    /**
     * ToDo polish this UI
     * ToDo add functionality for button
     */
    return (
      <Container>
        <Grid padded stackable>
          <Grid.Row>
            <Grid.Column>
              <Container textAlign='left'>
                <Segment>
                  <Header>{interestName}<Button
                    attatched='top'
                    floated='right'
                    size='mini'
                    content={this.checkInterestStatus()}
                    onClick={this.handleClick}/></Header>
                  <Divider/>
                  <div>
                    <b>Description: </b>
                  </div>
                  <div>
                    <p>{interestDescription}</p>
                  </div>
                </Segment>
              </Container>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid divided='vertically' stackable>
              <Grid.Row>
                <Grid.Column width={8}>
                  <Container fluid>
                    <Grid padded='horizontally' columns={1} stackable>
                      <Grid.Row>
                        <Grid.Column>
                          <Container>
                            <Segment>
                              <Header>Related Courses</Header>
                              <Divider/>
                              <Grid columns='equal'>
                                <Grid.Row columns={3} divided>
                                  <Grid.Column>
                                    <Container textAlign='center'>
                                      <div>
                                        <Header as='h4'><i className='green checkmark icon'></i>Completed</Header>
                                        {
                                          _.map(relatedCourses.completed, (value, index) =>
                                            <Container key={index} textAlign='center'>
                                              <Link
                                                to={this.GenerateCourseRoute(Courses.findDoc(value))}>{Courses.findDoc(value).name}</Link>
                                            </Container>)
                                        }</div>
                                    </Container>
                                  </Grid.Column>
                                  <Grid.Column>
                                    <Container textAlign='center'>
                                      <div>
                                        <Header as='h4'><i className='yellow warning sign icon'></i>In Plan</Header>
                                        {
                                          _.map(relatedCourses.inPlan, (value, index) =>
                                            <Container key={index} textAlign='center'>
                                              <Link
                                                to={this.GenerateCourseRoute(Courses.findDoc(value))}>{Courses.findDoc(value).name}</Link>
                                            </Container>)
                                        }</div>
                                    </Container>
                                  </Grid.Column>
                                  <Grid.Column>
                                    <Container textAlign='center'>
                                      <div>
                                        <Header as='h4'><i className='red warning circle icon'></i>Not In Plan</Header>
                                        {
                                          _.map(relatedCourses.notInPlan, (value, index) =>
                                            <Container key={index} textAlign='center'>
                                              <Link
                                                to={this.GenerateCourseRoute(Courses.findDoc(value))}>{Courses.findDoc(value).name}</Link>
                                            </Container>)
                                        }</div>
                                    </Container>
                                  </Grid.Column>
                                </Grid.Row>
                              </Grid>
                            </Segment>
                          </Container>
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row>
                        <Grid.Column>
                          <Container fluid>
                            <Segment>
                              <Header>Related Opportunities</Header>
                              <Divider/>
                              <Grid padded columns='equal'>
                                <Grid.Row columns={3} divided>
                                  <Grid.Column>
                                    <Container textAlign='center'>
                                      <div>
                                        <Header as='h4'><i className='green checkmark icon'></i>Completed</Header>
                                        {
                                          _.map(relatedOpportunities.completed, (value, index) =>
                                            <Container key={index} textAlign='center'>
                                              <Link
                                                to={this.GenerateOpportunityRoute(Opportunities.findDoc(value))}>{Opportunities.findDoc(value).name}</Link>
                                            </Container>)
                                        }</div>
                                    </Container>
                                  </Grid.Column>
                                  <Grid.Column>
                                    <Container textAlign='center'>
                                      <div>
                                        <Header as='h4'><i className='yellow warning sign icon'></i>In Plan</Header>
                                        {
                                          _.map(relatedOpportunities.inPlan, (value, index) =>
                                            <Container key={index} textAlign='center'>
                                              <Link
                                                to={this.GenerateOpportunityRoute(Opportunities.findDoc(value))}>{Opportunities.findDoc(value).name}</Link>
                                            </Container>)
                                        }</div>
                                    </Container>
                                  </Grid.Column>
                                  <Grid.Column>
                                    <Container textAlign='center'>
                                      <div>
                                        <Header as='h4'><i className='red warning circle icon'></i>Not In Plan</Header>
                                        {
                                          _.map(relatedOpportunities.notInPlan, (value, index) =>
                                            <Container key={index} textAlign='center'>
                                              <Link
                                                to={this.GenerateOpportunityRoute(Opportunities.findDoc(value))}>{Opportunities.findDoc(value).name}</Link>
                                            </Container>)
                                        }</div>
                                    </Container>
                                  </Grid.Column>
                                </Grid.Row>
                              </Grid>
                            </Segment>
                          </Container>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Container>
                </Grid.Column>
                <Grid.Column width={4}>
                  <Grid>
                    <Grid.Row centered>
                      <Grid.Column>
                        <Container fluid>
                          <Segment>
                            <Header textAlign='center'>Students <b>{this.participation('student').length}</b></Header>
                            <Divider/>
                            <Container textAlign='center'>
                              <Image.Group size='mini'>
                                {interestedStudents.map((student, index) =>
                                  <Popup
                                    key={index}
                                    trigger={<Image src={student.picture} circular size='mini'></Image>}
                                    content='names'
                                  />)
                                }
                              </Image.Group>
                            </Container>
                          </Segment>
                        </Container>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column>
                        <Container fluid>
                          <Segment>
                            <Header textAlign='center'>Faculty Members <b>{this.participation('faculty').length}</b>
                            </Header>
                            <Divider/>

                            <Container textAlign='center'>
                              <Image.Group size='mini'>
                                {interestedFaculty.map((faculty, index) => <Popup
                                  key={index}
                                  trigger={<Image src={faculty.picture} circular></Image>}
                                  content={faculty.name}
                                />)
                                }
                              </Image.Group>
                            </Container>
                          </Segment>
                        </Container>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column>
                        <Container>
                          <Segment>
                            <Header textAlign='center'>Alumni <b>{this.participation('alumni').length}</b>
                            </Header>
                            <Divider/>
                            <Container textAlign='center'>
                              <Image.Group size='mini'>
                                {interestedAlumni.map((alumni, index) => <Popup
                                  key={index}
                                  trigger={<Image src={alumni.picture} circular></Image>}
                                  content='names'
                                />)
                                }
                              </Image.Group>
                            </Container>
                          </Segment>
                        </Container>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column>
                        <Container>
                          <Segment>
                            <Header textAlign='center'>Mentors <b>{this.participation('mentor').length}</b>
                            </Header>
                            <Divider/>
                            <Container textAlign='center'>
                              <Image.Group size='mini'>
                                {interestedMentor.map((mentors, index) => <Popup
                                  key={index}
                                  trigger={<Image src={mentors.picture} circular></Image>}
                                  content='names'
                                />)
                                }
                              </Image.Group>
                            </Container>
                          </Segment>
                        </Container>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
              </Grid.Row>
              <Grid.Row>

              </Grid.Row>

            </Grid>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default withRouter(ExplorerInterestsWidget);

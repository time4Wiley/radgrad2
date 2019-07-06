import * as React from 'react';
import { Grid, Segment, Header, Button, Divider, Image } from 'semantic-ui-react';
import * as Markdown from 'react-markdown';
import * as _ from 'lodash';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter } from 'react-router-dom';
import InterestList from './InterestList';
import { Users } from '../../../api/user/UserCollection';
import { defaultProfilePicture } from '../../../api/user/BaseProfileCollection';
import { updateMethod } from '../../../api/base/BaseCollection.methods';
import { StudentProfiles } from '../../../api/user/StudentProfileCollection';
import { IProfile } from '../../../typings/radgrad'; // eslint-disable-line
import { getUsername, renderLink } from './RouterHelperFunctions';

interface IExplorerCareerGoalsWidgetProps {
  name: string;
  descriptionPairs: any;
  item: { [key: string]: any };
  socialPairs: any;
  match: {
    isExact: boolean;
    path: string;
    url: string;
    params: {
      username: string;
    }
  };
  profile: IProfile;
}

class ExplorerCareerGoalsWidget extends React.Component<IExplorerCareerGoalsWidgetProps> {
  constructor(props) {
    super(props);
  }

  private toUpper = (string) => string.toUpperCase();

  private isLabel = (descriptionPairLabel, comp) => descriptionPairLabel === comp;

  private userPicture = (user) => {
    const picture = Users.getProfile(user).picture;
    return picture || defaultProfilePicture;
  }

  private userStatus = (careerGoal) => {
    let ret = false;
    const profile = Users.getProfile(getUsername(this.props.match));
    if (_.includes(profile.careerGoalIDs, careerGoal._id)) {
      ret = true;
    }
    return ret;
  }

  private handleAdd = (event) => {
    event.preventDefault();
    const profile = Users.getProfile(getUsername(this.props.match));
    const id = this.props.item._id;
    const studentItems = profile.careerGoalIDs;
    const collectionName = StudentProfiles.getCollectionNameForProfile(profile);
    const updateData: any = {};
    updateData.id = profile._id;
    studentItems.push(id);
    updateData.careerGoals = studentItems;
    updateMethod.call({ collectionName, updateData }, (error) => {
      if (error) {
        console.log('Error updating career goals', error);
      }
    });
  }

  private handleDelete = (event) => {
    event.preventDefault();
    const profile = Users.getProfile(getUsername(this.props.match));
    const id = this.props.item._id;
    let studentItems = profile.careerGoalIDs;
    const collectionName = StudentProfiles.getCollectionNameForProfile(profile);
    const updateData: { [key: string]: any } = {};
    updateData.id = profile._id;
    studentItems = _.without(studentItems, id);
    updateData.careerGoals = studentItems;
    updateMethod.call({ collectionName, updateData }, (error) => {
      if (error) {
        console.log('Error updating career goals', error);
      }
    });
  }

  public render(): React.ReactElement<any> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    const marginStyle = {
      marginTop: 5,
    };

    const imageStyle = {
      marginBottom: 7,
      marginLeft: 3.5,
      marginRight: 3.5,
    };

    const divPadding = {
      marginTop: 0,
      padding: 0,
    };
    const { name, descriptionPairs, socialPairs, item, match } = this.props;
    const upperName = this.toUpper(name);
    const userStatus = this.userStatus(item);

    return (
      <Grid container={true} stackable={true} style={marginStyle}>
        <Grid.Column width={16}>
          <Segment>
            <Segment basic clearing={true} vertical>
              <Grid.Row verticalAlign={'middle'}>
                {
                  userStatus ?
                    <Button onClick={this.handleDelete} size={'mini'} color={'green'} floated={'right'} basic={true}>DELETE
                      FROM CAREER
                      GOALS</Button>
                    :
                    <Button size={'mini'} onClick={this.handleAdd} color={'green'} floated={'right'} basic={true}>ADD TO
                      CAREER GOALS</Button>
                }
                <Header floated={'left'}>{upperName}</Header>
              </Grid.Row>
            </Segment>
            <Divider style={divPadding}/>
            <Grid.Column>
              {descriptionPairs.map((descriptionPair, index) => (
                <React.Fragment key={index}>
                  {
                    this.isLabel(descriptionPair.label, 'Description') ?
                      <React.Fragment>
                        <b>{descriptionPair.label}:<br/></b>
                        {
                          descriptionPair.value ?
                            <Markdown escapeHtml={false} source={descriptionPair.value}
                                      renderers={{ link: (props) => renderLink(props, match) }}/>
                            :
                            'N/A'
                        }
                      </React.Fragment>
                      : ''
                  }
                  {
                    this.isLabel(descriptionPair.label, 'Interests') ?
                      <div style={{ marginTop: '5px' }}>
                        <InterestList item={item} size='mini' align={'vertical'}/>
                      </div>
                      : ''
                  }
                </React.Fragment>
              ))
              }
            </Grid.Column><br/>
            <Divider/>
            <Grid stackable={true} celled={'internally'} columns={'equal'}>
              {socialPairs.map((socialPair, index) => (
                <React.Fragment key={index}>
                  <Grid.Column textAlign={'center'} style={divPadding}>
                    <h5>{this.toUpper(socialPair.label)} - {socialPair.amount}</h5>
                    {socialPair.value.map((user, index2) => (
                      <Image src={this.userPicture(user)} circular size='mini' verticalAlign={'middle'} key={index2}
                             style={imageStyle}/>
                    ))}
                  </Grid.Column>
                </React.Fragment>
              ))}
            </Grid>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

const ExplorerCareerGoalsWidgetContainer = withTracker((props) => {
  const profile = Users.getProfile(props.match.params.username);

  return {
    profile,
  };
})(ExplorerCareerGoalsWidget);
export default withRouter(ExplorerCareerGoalsWidgetContainer);

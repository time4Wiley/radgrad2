// @ts-ignore
import React from 'react';
import { Accordion, Icon, Grid, Tab, Button, Modal } from 'semantic-ui-react';
import { StudentProfiles } from '../../../api/user/StudentProfileCollection';
import { profileIDToFullname } from '../shared/data-model-helper-functions';
import { IBehavior } from './AdminAnalyticsStudentSummaryWidget';

interface IStudentSummaryTabProps {
  startDate: string;
  endDate: string;
  behaviors: IBehavior[];
}

interface IStudentSummaryTabState {
  activeIndex: number;
}

class StudentSummaryTab extends React.Component<IStudentSummaryTabProps, IStudentSummaryTabState> {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  }

  private percent = (count) => ((count / StudentProfiles.findNonRetired({ isAlumni: false }).length) * 100).toFixed(0);

  public render() {
    const { activeIndex } = this.state;
    const paddedLabelStyle = {
      display: 'inline',
      color: '#6FBE44',
      paddingLeft: 5,
    };
    const paddingStyle = {
      padding: 2,
    };
    const textAlignStyle = {
      textAlign: 'left',
    };
    return (
      <Tab.Pane>
        {this.props.behaviors.map((b, index) => {
          const key = `${b.type}-${index}`;
          return (
            <Accordion key={key}>
              <div>
                <Accordion.Title
                  active={activeIndex === index}
                  index={index}
                  onClick={this.handleClick}
                >
                  <Grid>
                    <Grid.Column width={1}>
                      <Icon name="dropdown" />
                    </Grid.Column>
                    <Grid.Column width={4}>
                      Behavior:
                      <div style={paddedLabelStyle}>{b.type}</div>
                    </Grid.Column>
                    <Grid.Column width={3}>
                      Users:
                      <div style={paddedLabelStyle}>{b.count}</div>
                      <div style={paddedLabelStyle}>{`(${this.percent(b.count)} %)`}</div>
                    </Grid.Column>
                    <Grid.Column width={8}>
                      Description:
                      <div style={paddedLabelStyle}>{b.description}</div>
                    </Grid.Column>
                  </Grid>
                </Accordion.Title>
                <Accordion.Content
                  active={activeIndex === index}
                >
                  <Grid stackable padded>
                    {b.users.map((u) => (
                      <Grid.Column width={3} style={paddingStyle} key={u}>
                        <Modal trigger={<Button color="grey" size="tiny" basic fluid style={textAlignStyle} value={u}>{u}</Button>}>
                          <Modal.Header>
                            {profileIDToFullname(u)}
                            &apos;s timeline from&nbsp;
                            {this.props.startDate}
                            &nbsp;to&nbsp;
                            {this.props.endDate}
                          </Modal.Header>
                          <Modal.Content>
                            blah&nbsp;
                            {u}
                          </Modal.Content>
                        </Modal>
                      </Grid.Column>
                      ))}
                  </Grid>
                </Accordion.Content>
              </div>
            </Accordion>
          );
        })}
      </Tab.Pane>
    );
  }
}

export default StudentSummaryTab;

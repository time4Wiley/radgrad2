import * as React from 'react';
import { _ } from 'meteor/erasaur:meteor-lodash';
import { ZipZap } from 'meteor/udondan:zipzap';
import { moment } from 'meteor/momentjs:moment';
import { Button, Grid, Header, Icon, Label, Popup, Segment, Table } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { IAcademicTerm, ICourse } from '../../../typings/radgrad'; // eslint-disable-line
import { AcademicTerms } from '../../../api/academic-term/AcademicTermCollection';
import { Courses } from '../../../api/course/CourseCollection';
import { CourseScoreboard } from '../../../startup/client/collections';

interface ICourseScoreboardWidgetProps {
  courses: ICourse[],
  terms: IAcademicTerm[];
  scores: any[];
}

const databaseFileDateFormat = 'YYYY-MM-DD-HH-mm-ss';

class CourseScoreboardWidget extends React.Component<ICourseScoreboardWidgetProps> {
  constructor(props) {
    super(props);
    // console.log('CourseScoreboardWidget props=%o', props);
  }

  private getCourseScore = (courseID, termID) => {
    const id = `${courseID} ${termID}`;
    const scoreItem = _.find(this.props.scores, (p) => p._id === id);
    // console.log(scoreItem, courseID, termID);
    if (scoreItem) {
      return scoreItem.count;
    }
    return 0;
  };

  private saveAsCSV = () => {
    let result = '';
    const headerArr = ['Course'];
    _.forEach(this.props.terms, (term) => headerArr.push(AcademicTerms.getShortName(term._id)));
    result += headerArr.join(',');
    result += '\r\n';
    _.forEach(this.props.courses, (o) => {
      result += `${o.name},`;
      _.forEach(this.props.terms, (t) => {
        const id = `${o._id} ${t._id}`;
        const scoreItem: any = CourseScoreboard.findOne({ _id: id });
        result += scoreItem ? `${scoreItem.count},` : '0,';
      });
      result += '\r\n';
    });
    const zip = new ZipZap();
    const dir = 'course-scoreboard';
    const fileName = `${dir}/${moment().format(databaseFileDateFormat)}.csv`;
    zip.file(fileName, result);
    zip.saveAs(`${dir}.zip`);
  };

  public render(): React.ReactElement<any> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    const scrollBody: React.CSSProperties = {
      display: 'inline-block',
      height: 500,
      overflowY: 'scroll',
      width: '100%',
    };
    return (
      <Segment>
        <Header>Future Course Scoreboard</Header>
        <Grid padded={'vertically'}>
          <Grid.Row>
            <Table celled={true} fixed={true}>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell width={1}>Course</Table.HeaderCell>
                  {_.map(this.props.terms, (term) => (<Table.HeaderCell width={1} key={term._id}
                                                                        collapsing={true}>{AcademicTerms.getShortName(term._id)}</Table.HeaderCell>))}
                </Table.Row>
              </Table.Header>
            </Table>
            <div style={scrollBody}>
              <Table celled={true} fixed={true} columns={10}>
                <Table.Body>
                  {_.map(this.props.courses, (c, index) => (
                    <Table.Row key={index}>
                      <Table.Cell width={1}><Popup content={c.shortName} trigger={<Label>{c.num}</Label>}/></Table.Cell>
                      {_.map(this.props.terms, (t) => {
                        const score = this.getCourseScore(c._id, t._id);
                        return (
                          <Table.Cell width={1} key={`${c._id}${t._id}`} negative={score > 0}
                                      collapsing={true}>{score > 10 ?
                            <Icon name='attention'/> : ''}{score}</Table.Cell>
                        );
                      })}
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={1}/>
            <Button basic={true} color={'green'} onClick={this.saveAsCSV}>Save as CSV</Button>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}

const CourseScoreboardWidgetContainer = withTracker(() => {
  const courses = Courses.findNonRetired({ num: { $ne: 'other' } }, { sort: { num: 1 } });
  const currentTerm = AcademicTerms.getCurrentAcademicTermDoc();
  const terms = AcademicTerms.findNonRetired({ termNumber: { $gte: currentTerm.termNumber } }, { sort: { termNumber: 1 } });
  const scores = CourseScoreboard.find().fetch();
  return {
    courses,
    terms,
    scores,
  };
})(CourseScoreboardWidget);

export default CourseScoreboardWidgetContainer;

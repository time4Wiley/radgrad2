import * as React from 'react';
import { Table, Header } from 'semantic-ui-react';
import { _ } from 'meteor/erasaur:meteor-lodash';
import { getFutureEnrollmentMethod } from '../../../api/course/CourseCollection.methods';
import { RadGradSettings } from '../../../api/radgrad/RadGradSettingsCollection';

interface IFutureCourseEnrollmentWidgetState {
  data?: {
    courseID: string;
    enrollmentData: (string | number)[][]; // tslint:disable-line: array-type
  };
}

interface IFutureCourseEnrollmentWidgetProps {
  courseID: string;
}

class FutureCourseEnrollmentWidget extends React.Component<IFutureCourseEnrollmentWidgetProps, IFutureCourseEnrollmentWidgetState> {
  constructor(props) {
    super(props);
    this.state = {};
    getFutureEnrollmentMethod.call(props.courseID, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        console.log(result);
        this.setState({ data: result });
      }
    });
  }

  public render() {
    const { data } = this.state;
    if (data) {
      console.log(data.enrollmentData);
      const quarterP = RadGradSettings.findOne({}).quarterSystem;
      return (
        <div>
          <Header as="h4">Future Enrollment:</Header>
          <Table celled={true}>
            <Table.Body>
              {quarterP ? <Table.Row>
                <Table.Cell>{data.enrollmentData[0].join(': ')}</Table.Cell>
                <Table.Cell>{data.enrollmentData[1].join(': ')}</Table.Cell>
                <Table.Cell>{data.enrollmentData[2].join(': ')}</Table.Cell>
                <Table.Cell>{data.enrollmentData[3].join(': ')}</Table.Cell>
              </Table.Row> : <Table.Row>
                <Table.Cell>{data.enrollmentData[0].join(': ')}</Table.Cell>
                <Table.Cell>{data.enrollmentData[1].join(': ')}</Table.Cell>
                <Table.Cell>{data.enrollmentData[2].join(': ')}</Table.Cell>
              </Table.Row>}
              {quarterP ? <Table.Row>
                <Table.Cell>{data.enrollmentData[4].join(': ')}</Table.Cell>
                <Table.Cell>{data.enrollmentData[5].join(': ')}</Table.Cell>
                <Table.Cell>{data.enrollmentData[6].join(': ')}</Table.Cell>
                <Table.Cell>{data.enrollmentData[7].join(': ')}</Table.Cell>
              </Table.Row> : <Table.Row>
                <Table.Cell>{data.enrollmentData[3].join(': ')}</Table.Cell>
                <Table.Cell>{data.enrollmentData[4].join(': ')}</Table.Cell>
                <Table.Cell>{data.enrollmentData[5].join(': ')}</Table.Cell>
              </Table.Row>}
              {quarterP ? <Table.Row>
                <Table.Cell>{data.enrollmentData[8].join(': ')}</Table.Cell>
                <Table.Cell>{data.enrollmentData[9].join(': ')}</Table.Cell>
                <Table.Cell>{data.enrollmentData[10].join(': ')}</Table.Cell>
                <Table.Cell>{data.enrollmentData[11].join(': ')}</Table.Cell>
              </Table.Row> : <Table.Row>
                <Table.Cell>{data.enrollmentData[6].join(': ')}</Table.Cell>
                <Table.Cell>{data.enrollmentData[7].join(': ')}</Table.Cell>
                <Table.Cell>{data.enrollmentData[8].join(': ')}</Table.Cell>
              </Table.Row>}
            </Table.Body>
          </Table>
        </div>
      );
    }
    return '';
  }
}

export default FutureCourseEnrollmentWidget;

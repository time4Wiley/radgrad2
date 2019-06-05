import * as React from 'react';
import {Segment, Header, Form, Label} from 'semantic-ui-react';
import {withTracker} from "meteor/react-meteor-data";
import {StudentProfiles} from "../../../api/user/StudentProfileCollection";
import {AdvisorLogs} from "../../../api/log/AdvisorLogCollection";


class AdvisorLogEntryWidget extends React.Component {
  
  public render() {
    
    return (
      <Segment padded={true}>
        <Header as="h4" dividing={true}>ADVISOR LOG</Header>
        <Form widths={'equal'}>
          <Form.TextArea label={'Comments'}/>
          <Form.Button content={'ADD COMMENTS'} type={'Submit'}/>
        </Form>
        <br/>
        <p style={{
          marginTop: '15px',
          display: 'block',
          margin: '0 0 .28571429rem 0',
          color: '#696969',
          fontSize: '.92857143em',
          fontWeight: 700,
          textTransform: 'none'
        }}>Past Advisor Logs</p>
        <div style={{"height":"200px"}}>
          <div style={{"height":"100%","overflowY":"auto"}}>
            {AdvisorLogs.findNonRetired({}).map(
              ele => <Segment><strong>{ele.createdOn.toDateString()}: </strong>{ele.text}</Segment>
            )}
          </div>
        </div>
      </Segment>
    );
  }
}

export default AdvisorLogEntryWidget;
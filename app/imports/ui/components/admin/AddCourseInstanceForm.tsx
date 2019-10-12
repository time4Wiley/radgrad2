import * as React from 'react';
import { _ } from 'meteor/erasaur:meteor-lodash';
import { Form, Header, Segment } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import NumField from 'uniforms-semantic/NumField';
import SelectField from 'uniforms-semantic/SelectField';
import SubmitField from 'uniforms-semantic/SubmitField';
import SimpleSchema from 'simpl-schema';
import { withTracker } from 'meteor/react-meteor-data';
import { IAcademicTerm, ICourse, IStudentProfile } from '../../../typings/radgrad'; // eslint-disable-line
import { AcademicTerms } from '../../../api/academic-term/AcademicTermCollection';
import { Courses } from '../../../api/course/CourseCollection';
import { StudentProfiles } from '../../../api/user/StudentProfileCollection';
import { CourseInstances } from '../../../api/course/CourseInstanceCollection';
import { academicTermToName, courseToName, profileToName } from '../shared/AdminDataModelHelperFunctions';

interface IAddCourseInstanceFormProps {
  terms: IAcademicTerm[];
  courses: ICourse[];
  students: IStudentProfile[];
  formRef: any;
  handleAdd: (doc) => any;
}

const AddCourseInstanceForm = (props: IAddCourseInstanceFormProps): React.ReactElement<any> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined => {
  const termNames = _.map(props.terms, academicTermToName);
  const currentTermName = AcademicTerms.toString(AcademicTerms.getCurrentTermID(), false);
  const courseNames = _.map(props.courses, courseToName);
  const studentNames = _.map(props.students, profileToName);
  const schema = new SimpleSchema({
    term: {
      type: String,
      allowedValues: termNames,
      defaultValue: currentTermName,
    },
    course: {
      type: String,
      allowedValues: courseNames,
      defaultValue: courseNames[0],
    },
    student: {
      type: String,
      allowedValues: studentNames,
      defaultValue: studentNames[0],
    },
    creditHours: {
      type: SimpleSchema.Integer,
      optional: true,
    },
    grade: {
      type: String,
      allowedValues: CourseInstances.validGrades,
    },
  });
  // console.log(termNames, courseNames, studentNames);
  return (
    <Segment padded={true}>
      <Header dividing={true}>Add Course Instance</Header>
      <AutoForm schema={schema} onSubmit={props.handleAdd} ref={props.formRef} showInlineError={true}>
        <Form.Group widths="equal">
          <SelectField name="term"/>
          <SelectField name="course"/>
        </Form.Group>
        <Form.Group widths="equal">
          <SelectField name="student"/>
          <NumField name="creditHours"/>
          <SelectField name="grade"/>
        </Form.Group>
        <SubmitField className="basic green" value="Add"/>
      </AutoForm>
    </Segment>
  );
};

const AddCourseInstanceFormContainer = withTracker(() => {
  const terms = AcademicTerms.find({}, { sort: { termNumber: 1 } }).fetch();
  const courses = Courses.find().fetch();
  const students = StudentProfiles.find({}, { sort: { lastName: 1 } }).fetch();
  return {
    terms,
    courses,
    students,
  };
})(AddCourseInstanceForm);

export default AddCourseInstanceFormContainer;

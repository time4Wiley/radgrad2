import React from 'react';
import { Card, Grid } from 'semantic-ui-react';
import { useRouteMatch } from 'react-router-dom';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Course, CourseInstance } from '../../../../typings/radgrad';
import { AcademicTerms } from '../../../../api/academic-term/AcademicTermCollection';
import { Slugs } from '../../../../api/slug/SlugCollection';
import { ViewInExplorerButtonLink } from '../../shared/button/ViewInExplorerButtonLink';
import FutureParticipationButton from '../../shared/FutureParticipationButton';
import IceHeader from '../../shared/IceHeader';
import { makeCourseICE } from '../../../../api/ice/IceProcessor';
import { cardStyle, contentStyle, getDraggablePillStyle } from './utilities/styles';
import NamePill from './NamePill';
import { EXPLORER_TYPE } from '../../../layouts/utilities/route-constants';
import { Courses } from '../../../../api/course/CourseCollection';

interface ProfileCourseCardProps {
  course: Course;
  studentID: string;
  courseInstances: CourseInstance[];
}

const ProfileCourseCard: React.FC<ProfileCourseCardProps> = ({ course, courseInstances, studentID }) => {
  const match = useRouteMatch();
  const instances = courseInstances.filter((i) => i.courseID === course._id);
  const terms = instances.map((i) => AcademicTerms.findDoc(i.termID));
  // Sort by ascending order
  terms.sort((a, b) => a.year - b.year);
  const termNames = terms.map((t) => AcademicTerms.getShortName(t._id)).join(', ');
  const slug = Slugs.findDoc(course.slugID).name;
  const ice = instances.length > 0 ? makeCourseICE(slug, instances[instances.length - 1].grade) : { i: 0, c: 0, e: 0 };
  const droppableID = `${course._id}`;
  const courseName = Courses.getName(course._id);

  return (
    <Card style={cardStyle}>
      <Card.Content style={contentStyle}>
        <IceHeader ice={ice} />
        <Card.Header>
          <h4>{courseName}</h4>
        </Card.Header>
      </Card.Content>
      <Card.Content style={contentStyle}>
        {instances.length > 0 ? (
          <React.Fragment>
            <b>Scheduled:</b> {termNames}
          </React.Fragment>
        ) : (
          <b>Not In Plan (Drag to move)</b>
        )}
        <Droppable droppableId={droppableID}>
          {(provided) => (
            <div ref={provided.innerRef}>
              <Draggable key={slug} draggableId={slug} index={0}>
                {(prov, snap) => (
                  <div ref={prov.innerRef} {...prov.draggableProps} {...prov.dragHandleProps} style={getDraggablePillStyle(snap.isDragging, prov.draggableProps.style)}>
                    <NamePill name={course.num} />
                  </div>
                )}
              </Draggable>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </Card.Content>
      <Card.Content style={contentStyle}>
        <FutureParticipationButton item={course} />
      </Card.Content>
      <Card.Content style={contentStyle}>
        <ViewInExplorerButtonLink match={match} type={EXPLORER_TYPE.COURSES} item={course} size="mini" />
      </Card.Content>
    </Card>
  );
};

export default ProfileCourseCard;

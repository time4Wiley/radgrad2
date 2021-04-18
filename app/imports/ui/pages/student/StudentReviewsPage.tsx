import React from 'react';
import { Header } from 'semantic-ui-react';
import { PAGEIDS } from '../../utilities/PageIDs';
import PageLayout from '../PageLayout';

const headerPaneTitle = 'Pay it forward with reviews';
const headerPaneBody = `
Providing reviews helps future students make the most of their courses and opportunities.

And, providing reviews is important to reaching higher Levels in RadGrad. 
`;
const headerPaneImage = 'header-review.png';

const StudentReviewsPage: React.FC = () => (
  <PageLayout id={PAGEIDS.STUDENT_REVIEWS} headerPaneTitle={headerPaneTitle} headerPaneBody={headerPaneBody} headerPaneImage={headerPaneImage}>
    <Header>Student Reviews Page Placeholder</Header>
  </PageLayout>
);

export default StudentReviewsPage;

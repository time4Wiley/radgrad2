import React from 'react';
import PageLayout from '../../PageLayout';

const headerPaneTitle = "Caliana's Onboarding Sandbox";
const headerPaneBody = 'Page for display of onboarding component development practice';
const headerPaneImage = 'header-onboarding.png';

const SandBoxCalianaPage: React.FC = () => (
  <PageLayout id="sandbox-onboard-caliana" headerPaneTitle={headerPaneTitle} headerPaneBody={headerPaneBody} headerPaneImage={headerPaneImage}>
    Components go here.
  </PageLayout>
);

export default SandBoxCalianaPage;

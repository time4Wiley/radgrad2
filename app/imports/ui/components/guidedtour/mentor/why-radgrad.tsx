import * as React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { Container, Grid, Header, Image, List, Segment } from 'semantic-ui-react';
import styles from '../../../pages/landing/guidedtour-style';

const WhyRadGrad = () => (
  <div>
    <Grid container={true}>
      <Grid.Row centered={true}>
        <Grid.Column width={'eight'}>
          <Image rounded={true} size="large" src="/images/guidedtour/guidedtour-why-radgrad.png"/>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row centered={true}>
        <Grid.Column width={'twelve'} textAlign={'center'}>
          <div style={styles.p}>
            <Header style={styles.h1}>Why Use RadGrad?</Header>
            <p>So, you're a high tech professional, with not enough hours in the day for all your responsibilities. Here's why you still might want to get involved with RadGrad:</p>
            <List as="ul">
              <List.Item style={styles.li}>Do you have a list of "things I wish I'd known when I was a student?" RadGrad gives you the chance to let today's students know about it.</List.Item>
              <List.Item style={styles.li}>You can "pay it forward" in gratitude for the mentoring you received as a student.</List.Item>
              <List.Item style={styles.li}>RadGrad is designed in a question-answer format that enables you to reach the most students possible for your time investment.</List.Item>
              <List.Item style={styles.li}>If your company offers internships, RadGrad can be an effective way to promote them to students.</List.Item>
            </List>
            <p>Before continuing with this Guided Tour, please check out the Student Guided Tour first. This Mentor Guided Tour builds off the one for students.</p>
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>
);

export default WhyRadGrad;

/**
 * This object holds all the routes for RadGrad2. The keys are the Roles the values are an array of route information.
 * Route information consists of a path, the path to the component, a Component to render.
 */
import AdminHomePage from '../../pages/admin/AdminHomePage';
import AdminDataModelPage from '../../pages/admin/AdminDataModelPage';
import AdminDatabasePage from '../../pages/admin/AdminDatabasePage';
import AdminModerationPage from '../../pages/admin/AdminModerationPage';
import AdminAnalyticsPage from '../../pages/admin/AdminAnalyticsPage';
import AdminAnalyticsNewsletterPage from '../../pages/admin/AdminAnalyticsNewsletterPage';
import AdminAnalyticsOverheadAnalysisPage from '../../pages/admin/AdminAnalyticsOverheadAnalysisPage';
import AdminAnalyticsStudentSummaryPage from '../../pages/admin/AdminAnalyticsStudentSummaryPage';
import AdminAnalyticsUserInteractionsPage from '../../pages/admin/AdminAnalyticsUserInteractionsPage';
import LandingHomePage from '../../pages/landing/LandingHomePage';
import AdminDumpDatabasePage from '../../pages/admin/AdminDumpDatabasePage';
import AdminCheckDatabaseIntegrityPage from '../../pages/admin/AdminCheckDatabaseIntegrityPage';
import AdminDataModelAcademicTermsPage from '../../pages/admin/AdminDataModelAcademicTermsPage';
import AdminDataModelAcademicYearsPage from '../../pages/admin/AdminDataModelAcademicYearsPage';
import AdminDataModelCareerGoalsPage from '../../pages/admin/AdminDataModelCareerGoalsPage';
import AdminDataModelUsersPage from '../../pages/admin/AdminDataModelUsersPage';
import AdminDataModelCourseInstancesPage from '../../pages/admin/AdminDataModelCourseInstancesPage';
import AdminDataModelCoursesPage from '../../pages/admin/AdminDataModelCoursesPage';
import AdminDataModelFeedsPage from '../../pages/admin/AdminDataModelFeedsPage';
import AdminDataModelFeedbackInstancesPage from '../../pages/admin/AdminDataModelFeedbackInstancesPage';
import AdminDataModelHelpMessagesPage from '../../pages/admin/AdminDataModelHelpMessagesPage';
import AdminDataModelInterestsPage from '../../pages/admin/AdminDataModelInterestsPage';
import AdminDataModelInterestTypesPage from '../../pages/admin/AdminDataModelInterestTypesPage';
import AdminDataModelOpportunitiesPage from '../../pages/admin/AdminDataModelOpportunitiesPage';
import AdminDataModelOpportunityInstancesPage from '../../pages/admin/AdminDataModelOpportunityInstancesPage';
import AdminDataModelOpportunityTypesPage from '../../pages/admin/AdminDataModelOpportunityTypesPage';
import AdminDataModelReviewsPage from '../../pages/admin/AdminDataModelReviewsPage';
import AdminDataModelSlugsPage from '../../pages/admin/AdminDataModelSlugsPage';
import AdminDataModelTeasersPage from '../../pages/admin/AdminDataModelTeasersPage';
import AdminDataModelVerificationRequestsPage from '../../pages/admin/AdminDataModelVerificationRequestsPage';
import AdvisorHomePage from '../../pages/advisor/AdvisorHomePage';
import AdvisorManageStudentsPage from '../../pages/advisor/AdvisorManageStudentsPage';
import AdvisorModerationPage from '../../pages/advisor/AdvisorModerationPage';
import AlumniHomePage from '../../pages/alumni/AlumniHomePage';
import CareerGoalBrowserViewPage from '../../pages/shared/browser-view/CareerGoalBrowserViewPage';
import CommunityPage from '../../pages/shared/CommunityPage';
import CourseBrowserViewPage from '../../pages/shared/browser-view/CourseBrowserViewPage';
import CareerGoalViewPage from '../../pages/shared/item-view/CareerGoalViewPage';
import CourseViewPage from '../../pages/shared/item-view/CourseViewPage';
import ExplorerHomePagePage from '../../pages/shared/ExplorerHomePage';
import ExplorerOpportunitiesPage from '../../pages/shared/ExplorerOpportunitiesPage';
import FacultyPrivacyPage from '../../pages/faculty/FacultyPrivacyPage';
import FacultyVerificationPage from '../../pages/faculty/FacultyVerificationPage';
import FacultyHomePage from '../../pages/faculty/FacultyHomePage';
import FacultyManageOpportunitiesPage from '../../pages/faculty/FacultyManageOpportunitiesPage';
import InterestBrowserViewPage from '../../pages/shared/browser-view/InterestBrowserViewPage';
import InterestViewPage from '../../pages/shared/item-view/InterestViewPage';
import LandingCareerGoalsExplorerPage from '../../pages/landing/LandingCareerGoalsCardExplorerPage';
import LandingCareerGoalExplorerPage from '../../pages/landing/LandingCareerGoalExplorerPage';
import LandingCoursesExplorerPage from '../../pages/landing/LandingCoursesCardExplorerPage';
import LandingCourseExplorerPage from '../../pages/landing/LandingCourseExplorerPage';
import LandingInterestsExplorerPage from '../../pages/landing/LandingInterestsCardExplorerPage';
import LandingInterestExplorerPage from '../../pages/landing/LandingInterestExplorerPage';
import LandingOpportunitiesExplorerPage from '../../pages/landing/LandingOpportunitiesCardExplorerPage';
import LandingOpportunityExplorerPage from '../../pages/landing/LandingOpportunityExplorerPage';
import ManageVerificationsPage from '../../pages/shared/ManageVerificationsPage';
import OpportunityViewPage from '../../pages/shared/item-view/OpportunityViewPage';
import ReviewModerationPage from '../../pages/shared/ReviewModerationPage';
import ScoreboardPage from '../../pages/shared/ScoreboardPage';
import StudentHomePage from '../../pages/student/StudentHomePage';
import StudentDegreePlannerPage from '../../pages/student/StudentDegreePlannerPage';
import StudentIcePage from '../../pages/student/StudentIcePage';
import StudentLevelsPage from '../../pages/student/StudentLevelsPage';
import StudentPrivacyPage from '../../pages/student/StudentPrivacyPage';
import StudentReviewsPage from '../../pages/student/StudentReviewsPage';
import StudentVerificationPage from '../../pages/student/StudentVerificationPage';

import {
  ANALYTICS,
  COMMUNITY,
  DATAMODEL,
  DEGREEPLANNER,
  EXPLORER,
  EXPLORER_PARAM,
  EXPLORER_TYPE,
  HOME,
  ICE,
  LEVELS,
  MANAGE_REVIEWS,
  MANAGE_STUDENTS,
  MANAGE_VERIFICATIONS,
  MODERATION,
  PRIVACY,
  SCOREBOARD,
  STUDENT_REVIEWS,
  STUDENT_VERIFICATION,
  URL_ROLES,
  USERNAME,
} from './route-constants';

// TODO: Scoreboard -> Forecast,

export const routes = {
  ADMIN: [
    { path: `/${URL_ROLES.ADMIN}/${USERNAME}/${HOME}`, component: AdminHomePage },
    { path: `/${URL_ROLES.ADMIN}/${USERNAME}/${DATAMODEL.HOME}`, component: AdminDataModelPage },
    { path: `/${URL_ROLES.ADMIN}/${USERNAME}/${DATAMODEL.ACADEMIC_TERMS}`, component: AdminDataModelAcademicTermsPage },
    { path: `/${URL_ROLES.ADMIN}/${USERNAME}/${DATAMODEL.ACADEMIC_YEAR_INSTANCES}`, component: AdminDataModelAcademicYearsPage },
    { path: `/${URL_ROLES.ADMIN}/${USERNAME}/${DATAMODEL.CAREERGOALS}`, component: AdminDataModelCareerGoalsPage },
    { path: `/${URL_ROLES.ADMIN}/${USERNAME}/${DATAMODEL.COURSE_INSTANCES}`, component: AdminDataModelCourseInstancesPage },
    { path: `/${URL_ROLES.ADMIN}/${USERNAME}/${DATAMODEL.COURSES}`, component: AdminDataModelCoursesPage },
    { path: `/${URL_ROLES.ADMIN}/${USERNAME}/${DATAMODEL.FEEDS}`, component: AdminDataModelFeedsPage },
    { path: `/${URL_ROLES.ADMIN}/${USERNAME}/${DATAMODEL.FEEDBACK_INSTANCES}`, component: AdminDataModelFeedbackInstancesPage },
    { path: `/${URL_ROLES.ADMIN}/${USERNAME}/${DATAMODEL.HELP_MESSAGES}`, component: AdminDataModelHelpMessagesPage },
    { path: `/${URL_ROLES.ADMIN}/${USERNAME}/${DATAMODEL.INTERESTS}`, component: AdminDataModelInterestsPage },
    { path: `/${URL_ROLES.ADMIN}/${USERNAME}/${DATAMODEL.INTEREST_TYPES}`, component: AdminDataModelInterestTypesPage },
    { path: `/${URL_ROLES.ADMIN}/${USERNAME}/${DATAMODEL.OPPORTUNITIES}`, component: AdminDataModelOpportunitiesPage },
    { path: `/${URL_ROLES.ADMIN}/${USERNAME}/${DATAMODEL.OPPORTUNITY_INSTANCES}`, component: AdminDataModelOpportunityInstancesPage },
    { path: `/${URL_ROLES.ADMIN}/${USERNAME}/${DATAMODEL.OPPORTUNITY_TYPES}`, component: AdminDataModelOpportunityTypesPage },
    { path: `/${URL_ROLES.ADMIN}/${USERNAME}/${DATAMODEL.REVIEWS}`, component: AdminDataModelReviewsPage },
    { path: `/${URL_ROLES.ADMIN}/${USERNAME}/${DATAMODEL.SLUGS}`, component: AdminDataModelSlugsPage },
    { path: `/${URL_ROLES.ADMIN}/${USERNAME}/${DATAMODEL.TEASERS}`, component: AdminDataModelTeasersPage },
    { path: `/${URL_ROLES.ADMIN}/${USERNAME}/${DATAMODEL.USERS}`, component: AdminDataModelUsersPage },
    { path: `/${URL_ROLES.ADMIN}/${USERNAME}/${DATAMODEL.VERIFICATION_REQUESTS}`, component: AdminDataModelVerificationRequestsPage },
    { path: `/${URL_ROLES.ADMIN}/${USERNAME}/database`, component: AdminDatabasePage },
    { path: `/${URL_ROLES.ADMIN}/${USERNAME}/database/dump`, component: AdminDumpDatabasePage },
    { path: `/${URL_ROLES.ADMIN}/${USERNAME}/database/integrity-check`, component: AdminCheckDatabaseIntegrityPage },
    { path: `/${URL_ROLES.ADMIN}/${USERNAME}/${MODERATION}`, component: AdminModerationPage },
    { path: `/${URL_ROLES.ADMIN}/${USERNAME}/${ANALYTICS.HOME}`, component: AdminAnalyticsPage },
    { path: `/${URL_ROLES.ADMIN}/${USERNAME}/${ANALYTICS.HOME}/${ANALYTICS.NEWSLETTER}`, component: AdminAnalyticsNewsletterPage },
    { path: `/${URL_ROLES.ADMIN}/${USERNAME}/${ANALYTICS.HOME}/${ANALYTICS.OVERHEADANALYSIS}`, component: AdminAnalyticsOverheadAnalysisPage },
    { path: `/${URL_ROLES.ADMIN}/${USERNAME}/${ANALYTICS.HOME}/${ANALYTICS.STUDENTSUMMARY}`, component: AdminAnalyticsStudentSummaryPage },
    { path: `/${URL_ROLES.ADMIN}/${USERNAME}/${ANALYTICS.HOME}/${ANALYTICS.USERINTERACTIONS}`, component: AdminAnalyticsUserInteractionsPage },
    { path: `/${URL_ROLES.ADMIN}/${USERNAME}/${SCOREBOARD}`, component: ScoreboardPage },
  ],

  ADVISOR: [
    { path: `/${URL_ROLES.ADVISOR}/${USERNAME}/${COMMUNITY}`, component: CommunityPage },
    { path: `/${URL_ROLES.ADVISOR}/${USERNAME}/${EXPLORER.CAREERGOALS}`, component: CareerGoalBrowserViewPage },
    { path: `/${URL_ROLES.ADVISOR}/${USERNAME}/${EXPLORER.CAREERGOALS_PARAM}`, component: CareerGoalViewPage },
    { path: `/${URL_ROLES.ADVISOR}/${USERNAME}/${EXPLORER.COURSES}`, component: CourseBrowserViewPage },
    { path: `/${URL_ROLES.ADVISOR}/${USERNAME}/${EXPLORER.COURSES_PARAM}`, component: CourseViewPage },
    { path: `/${URL_ROLES.ADVISOR}/${USERNAME}/${EXPLORER.INTERESTS}`, component: InterestBrowserViewPage },
    { path: `/${URL_ROLES.ADVISOR}/${USERNAME}/${EXPLORER.INTERESTS_PARAM}`, component: InterestViewPage },
    { path: `/${URL_ROLES.ADVISOR}/${USERNAME}/${EXPLORER.OPPORTUNITIES}`, component: ExplorerOpportunitiesPage },
    { path: `/${URL_ROLES.ADVISOR}/${USERNAME}/${EXPLORER.OPPORTUNITIES_PARAM}`, component: OpportunityViewPage },
    { path: `/${URL_ROLES.ADVISOR}/${USERNAME}/${HOME}`, component: AdvisorHomePage },
    { path: `/${URL_ROLES.ADVISOR}/${USERNAME}/${MANAGE_STUDENTS}`, component: AdvisorManageStudentsPage },
    { path: `/${URL_ROLES.ADVISOR}/${USERNAME}/${MANAGE_VERIFICATIONS}`, component: ManageVerificationsPage  },
    { path: `/${URL_ROLES.ADVISOR}/${USERNAME}/${MODERATION}`, component: AdvisorModerationPage },
    { path: `/${URL_ROLES.ADVISOR}/${USERNAME}/${SCOREBOARD}`, component: ScoreboardPage },
  ],

  ALUMNI: [
    { path: `/${URL_ROLES.ALUMNI}/${USERNAME}/${HOME}`, component: AlumniHomePage },
  ],

  FACULTY: [
    { path: `/${URL_ROLES.FACULTY}/${USERNAME}/${HOME}`, component: FacultyHomePage },
    { path: `/${URL_ROLES.FACULTY}/${USERNAME}/verification-requests`, component: FacultyVerificationPage },
    { path: `/${URL_ROLES.FACULTY}/${USERNAME}/manage-opportunities`, component: FacultyManageOpportunitiesPage },
    { path: `/${URL_ROLES.FACULTY}/${USERNAME}/${EXPLORER.CAREERGOALS}`, component: CareerGoalBrowserViewPage },
    { path: `/${URL_ROLES.FACULTY}/${USERNAME}/${EXPLORER.CAREERGOALS_PARAM}`, component: CareerGoalViewPage },
    { path: `/${URL_ROLES.FACULTY}/${USERNAME}/${EXPLORER.COURSES}`, component: CourseBrowserViewPage },
    { path: `/${URL_ROLES.FACULTY}/${USERNAME}/${EXPLORER.COURSES_PARAM}`, component: CourseViewPage },
    { path: `/${URL_ROLES.FACULTY}/${USERNAME}/${EXPLORER.INTERESTS}`, component: InterestBrowserViewPage },
    { path: `/${URL_ROLES.FACULTY}/${USERNAME}/${EXPLORER.INTERESTS_PARAM}`, component: InterestViewPage },
    { path: `/${URL_ROLES.FACULTY}/${USERNAME}/${EXPLORER.OPPORTUNITIES}`, component: ExplorerOpportunitiesPage },
    { path: `/${URL_ROLES.FACULTY}/${USERNAME}/${EXPLORER.OPPORTUNITIES_PARAM}`, component: OpportunityViewPage },
    { path: `/${URL_ROLES.FACULTY}/${USERNAME}/${SCOREBOARD}`, component: ScoreboardPage },
    { path: `/${URL_ROLES.FACULTY}/${USERNAME}/${PRIVACY}`, component: FacultyPrivacyPage },
    { path: `/${URL_ROLES.FACULTY}/${USERNAME}/${MANAGE_REVIEWS}`, component: ReviewModerationPage },
    { path: `/${URL_ROLES.FACULTY}/${USERNAME}/${COMMUNITY}`, component: CommunityPage },
  ],

  LANDING: [
    { path: '/', component: LandingHomePage },
    { path: `/${EXPLORER.CAREERGOALS}`, component: LandingCareerGoalsExplorerPage },
    { path: `/${EXPLORER.CAREERGOALS_PARAM}`, component: LandingCareerGoalExplorerPage },
    { path: `/${EXPLORER.COURSES}`, component: LandingCoursesExplorerPage },
    { path: `/${EXPLORER.COURSES_PARAM}`, component: LandingCourseExplorerPage, exact: false },
    { path: `/${EXPLORER.INTERESTS}`, component: LandingInterestsExplorerPage },
    { path: `/${EXPLORER.INTERESTS_PARAM}`, component: LandingInterestExplorerPage, exact: false },
    { path: `/${EXPLORER.OPPORTUNITIES}`, component: LandingOpportunitiesExplorerPage },
    { path: `/${EXPLORER.OPPORTUNITIES_PARAM}`, component: LandingOpportunityExplorerPage, exact: false },
  ],
  
  STUDENT: [
    { path: `/${URL_ROLES.STUDENT}/${USERNAME}/${HOME}`, component: StudentHomePage },
    { path: `/${URL_ROLES.STUDENT}/${USERNAME}/${STUDENT_VERIFICATION}`, component: StudentVerificationPage },
    { path: `/${URL_ROLES.STUDENT}/${USERNAME}/${PRIVACY}`, component: StudentPrivacyPage },
    { path: `/${URL_ROLES.STUDENT}/${USERNAME}/${STUDENT_REVIEWS}`, component: StudentReviewsPage },
    { path: `/${URL_ROLES.STUDENT}/${USERNAME}/${COMMUNITY}`, component: CommunityPage },
    { path: `/${URL_ROLES.STUDENT}/${USERNAME}/${HOME}/${ICE}`, component: StudentIcePage },
    { path: `/${URL_ROLES.STUDENT}/${USERNAME}/${HOME}/${LEVELS}`, component: StudentLevelsPage },
    { path: `/${URL_ROLES.STUDENT}/${USERNAME}/${DEGREEPLANNER}`, component: StudentDegreePlannerPage },
    { path: `/${URL_ROLES.STUDENT}/${USERNAME}/${EXPLORER.CAREERGOALS}`, component: CareerGoalBrowserViewPage },
    { path: `/${URL_ROLES.STUDENT}/${USERNAME}/${EXPLORER.CAREERGOALS_PARAM}`, component: CareerGoalViewPage },
    { path: `/${URL_ROLES.STUDENT}/${USERNAME}/${EXPLORER.COURSES}`, component: CourseBrowserViewPage },
    { path: `/${URL_ROLES.STUDENT}/${USERNAME}/${EXPLORER.COURSES_PARAM}`, component: CourseViewPage },
    { path: `/${URL_ROLES.STUDENT}/${USERNAME}/${EXPLORER.INTERESTS}`, component: InterestBrowserViewPage },
    { path: `/${URL_ROLES.STUDENT}/${USERNAME}/${EXPLORER.INTERESTS_PARAM}`, component: InterestViewPage },
    { path: `/${URL_ROLES.STUDENT}/${USERNAME}/${EXPLORER.OPPORTUNITIES}`, component: ExplorerOpportunitiesPage },
    { path: `/${URL_ROLES.STUDENT}/${USERNAME}/${EXPLORER.OPPORTUNITIES_PARAM}`, component: OpportunityViewPage },
  ],
};

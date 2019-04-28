import { ProcessedSchema } from '../api/verification/VerificationRequestCollection';

declare global {
  namespace Assets {
    function getBinary(assetPath: string, asyncCallback?: () => void): EJSON;

    function getText(assetPath: string, asyncCallback?: () => void): string;

    function absoluteFilePath(assetPath: string): string;
  }
}

export interface Ice {
  i: number;
  c: number;
  e: number;
}

export interface IDumpOne {
  slug?: string;
}

// AcademicPlans
export interface IAcademicPlan {
  _id: string;
  name: string;
  description: string;
  slugID: string;
  degreeID: string;
  effectiveAcademicTermID: string;
  academicTermNumber: number;
  year: number;
  coursesPerAcademicTerm: number[];
  courseList: string[];
  isBAM?: boolean;
  retired?: boolean;
}

export interface IAcademicPlanDefine extends IDumpOne {
  slug: string;
  degreeSlug: string;
  name: string;
  description: string;
  academicTerm: string;
  coursesPerAcademicTerm: number[];
  courseList: string[];
  retired?: boolean;
}

export interface IAcademicPlanUpdate {
  degreeSlug?: string;
  name?: string;
  academicTerm?: string;
  coursesPerAcademicTerm?: number[];
  courseList?: string[];
  retired?: boolean;
}

// AcademicYearInstances
export interface IAcademicYear {
  year: number;
  springYear: number;
  studentID: string;
  termIDs: string[];
}

export interface IAcademicYearDefine extends IDumpOne {
  year: number;
  student: string;
}

// AdvisorLogs
export interface IAdvisorLogDefine extends IDumpOne {
  advisor: string;
  student: string;
  text: string;
  createdOn?: any;
}

export interface IAdvisorLogUpdate {
  id?: string;
  text?: string;
}

// CareerGoals
export interface ICareerGoal {
  _id: string;
  name: string;
  slug: string;
  description: string;
  interestIDs: string[];
  retired?: boolean;
}

export interface ICareerGoalDefine extends IDumpOne {
  name: string;
  slug: string;
  description: string;
  interests: string[];
}

export interface ICareerGoalUpdate {
  name?: string;
  description?: string;
  interests?: string[];
  retired?: boolean;
}

// CourseInstances
export interface ICourseInstance {
  _id: string;
  termID: string;
  courseID: string;
  verified: boolean;
  fromSTAR?: boolean;
  grade?: string;
  creditHrs: number;
  note?: string;
  studentID: string;
  ice?: Ice;
  retired?: boolean;
}

export interface ICourseInstanceDefine extends IDumpOne {
  academicTerm: string;
  course: string;
  verified?: boolean;
  fromSTAR?: boolean;
  grade?: string;
  note?: string;
  student: string;
  creditHrs?: number;
}

export interface ICourseInstanceUpdate {
  termID?: string;
  verified?: boolean;
  fromSTAR?: boolean;
  grade?: string;
  creditHrs?: number;
  note?: string;
  ice?: Ice;
}

// Courses
export interface ICourse {
  _id: string;
  name: string;
  shortName: string;
  slugID: string;
  num: string;
  description: string;
  creditHrs: number;
  interestIDs: string[];
  // Optional data
  syllabus?: string;
  prerequisites?: string[];
}

export interface ICourseDefine extends IDumpOne {
  name: string;
  shortName?: string;
  slug: string;
  num: string;
  description: string;
  creditHrs?: number;
  interests?: string[];
  syllabus?: string;
  prerequisites?: string[];
  retired?: boolean;
}

export interface ICourseUpdate {
  name?: string;
  shortName?: string;
  num?: string;
  description?: string;
  creditHrs?: number;
  interests?: string[];
  prerequisites?: string[];
  syllabus?: string;
  retired?: boolean;
}

// DesiredDegree
export interface IDesiredDegree {
  _id: string;
  name: string;
  shortName: string;
  slugID: string;
  description: string;
  retired?: boolean;
}

export interface IDesiredDegreeDefine extends IDumpOne {
  name: string;
  shortName?: string;
  slug: string;
  description: string;
  retired?: boolean;
}

export interface IDesiredDegreeUpdate {
  name?: string;
  shortName?: string;
  description?: string;
  retired?: boolean;
}

// Feeds
export interface IFeedDefine extends IDumpOne {
  user?: string;
  course?: string;
  opportunity?: string;
  academicTerm?: string;
  level?: number;
  feedType: string;
  timestamp?: Date;
}
export interface IFeedUpdate {
  description?: string;
  picture?: string;
  users?: string[];
  opportunity?: string;
  course?: string;
  academicTerm?: string;
}

// FeedBackInstances
export interface IFeedbackInstanceDefine extends IDumpOne {
  user: string;
  functionName: string;
  description: string;
  feedbackType: string;
}

export interface IFeedbackInstanceUpdate {
  user?: string;
  functionName?: string;
  description?: string;
  feedbackType?: string;
}

// Help Messages
export interface IHelpDefine extends IDumpOne {
  routeName: string;
  title: string;
  text: string;
}

export interface IHelpUpdate {
  routeName?: string;
  title?: string;
  text?: string;
}

// Interests
export interface IInterest {
  _id: string;
  name: string;
  slugID: string;
  description: string;
  interestTypeID: string;
}

export interface IInterestDefine extends IDumpOne {
  name: string;
  slug: string;
  description: string;
  interestType: string;
}

export interface IInterestUpdate {
  name?: string;
  description?: string;
  interestType?: string;
}

// InterestTypes
export interface ITypeDefine extends IDumpOne {
  name: string;
  slug: string;
  description: string;
}

export interface ITypeUpdate {
  name?: string;
  description?: string;
}

// IceSnapshots
export interface IIceSnapshotDefine extends IDumpOne {
  username: string;
  level: number;
  i: number;
  c: number;
  e: number;
  updated: any;
}

// MentorAnswers
export interface IMentorAnswerDefine extends IDumpOne {
  question: string;
  mentor: string;
  text: string;
}

export interface IMentorAnswerUpdate {
  text?: string;
}

// MentorQuestions
export interface IMentorQuestionDefine extends IDumpOne {
  question: string;
  slug: string;
  student: string;
  moderated?: boolean;
  visible?: boolean;
  moderatorComments?: string;
}

export interface IMentorQuestionUpdate {
  question?: string;
  student?: string;
  moderated?: boolean;
  visible?: boolean;
  moderatorComments?: string;
}

// Opportunities
export interface IOpportunity {
  _id: string;
  name: string;
  slugID: string;
  description: string;
  opportunityTypeID: string;
  sponsorID: string;
  interestIDs: string[];
  termIDs: string[];
  // Optional data
  eventDate?: Date;
  ice?: Ice;
  retired?: boolean;
}

export interface IOpportunityDefine extends IDumpOne {
  name: string;
  slug: string;
  description: string;
  opportunityType: string;
  sponsor: string;
  interests: string[];
  academicTerms: string[];
  ice: Ice;
  eventDate?: any;
  retired?: boolean;
}

export interface IOpportunityUpdate {
  name?: string;
  description?: string;
  opportunityType?: string;
  sponsor?: string;
  interests?: string[];
  academicTerms?: string[];
  eventDate?: any;
  ice?: Ice;
  retired?: boolean;
}

export interface IOpportunityUpdateData {
  name?: string;
  description?: string;
  opportunityTypeID?: string;
  sponsorID?: string;
  interestIDs?: string[];
  termIDs?: string[];
  eventDate?: any;
  ice?: Ice;
  retired?: boolean;
}

// OpportunityInstances
export interface IOpportunityInstance {
  _id: string;
  termID: string;
  opportunityID: string;
  verified: boolean;
  studentID: string;
  sponsorID: string;
  ice: Ice;
}

export interface IOpportunityInstanceDefine extends IDumpOne {
  academicTerm: string;
  opportunity: string;
  sponsor?: string;
  verified: boolean;
  student: string;
}

export interface IOpportunityInstanceUpdate {
  termID?: string;
  verified?: boolean;
  ice?: Ice;
}

// PlanChoice
export interface IPlanChoiceDefine extends IDumpOne {
  choice: string;
}

export interface IPlanChoiceUpdate extends IDumpOne {
  choice?: string;
}

// Profiles
export interface IBaseProfile {
  userID: string;
  username: string;
  firstName: string;
  lastName: string;
  role: string;
  picture?: string;
  website?: string;
  interestIDs: string[];
  careerGoalIDs: string[];
}

// Advisor and Faculty Profiles
export interface IProfileDefine extends IDumpOne {
  username: string;
  firstName: string;
  lastName: string;
  picture?: string;
  website?: string;
  interests?: string[];
  careerGoals?: string[];
}

export interface IProfileUpdate {
  firstName?: string;
  lastName?: string;
  picture?: string;
  website?: string;
  interests?: string[];
  careerGoals?: string[];
}

export interface IMentorProfileDefine extends IProfileDefine {
  company: string;
  career: string;
  location: string;
  linkedin?: string;
  motivation: string;
}

export interface IMentorProfileUpdate extends IProfileUpdate {
  company?: string;
  career?: string;
  location?: string;
  linkedin?: string;
  motivation?: string;
}

export interface IStudentProfileDefine extends IProfileDefine {
  level: number;
  declaredAcademicTerm?: string;
  academicPlan?: string;
  hiddenCourses?: string[];
  hiddenOpportunities?: string[];
  isAlumni?: boolean;
  retired?: boolean;
  shareUsername?: boolean;
  sharePicture?: boolean;
  shareWebsite?: boolean;
  shareInterests?: boolean;
  shareCareerGoals?: boolean;
  shareAcademicPlan?: boolean;
  shareCourses?: boolean;
  shareOpportunities?: boolean;
  shareLevel?: boolean;
}

export interface IStudentProfileUpdate extends IProfileUpdate {
  level?: number;
  declaredAcademicTerm?: string;
  academicPlan?: string;
  hiddenCourses?: string[];
  hiddenOpportunities?: string[];
  isAlumni?: boolean;
  retired?: boolean;
  shareUsername?: boolean;
  sharePicture?: boolean;
  shareWebsite?: boolean;
  shareInterests?: boolean;
  shareCareerGoals?: boolean;
  shareAcademicPlan?: boolean;
  shareCourses?: boolean;
  shareOpportunities?: boolean;
  shareLevel?: boolean;
}

export interface IStudentProfileUpdateData {
  level?: number;
  declaredAcademicTermID?: string;
  academicPlanID?: string;
  hiddenCourseIDs?: string[];
  hiddenOpportunityIDs?: string[];
  isAlumni?: boolean;
  role?: string;
  retired?: boolean;
  shareUsername?: boolean;
  sharePicture?: boolean;
  shareWebsite?: boolean;
  shareInterests?: boolean;
  shareCareerGoals?: boolean;
  shareAcademicPlan?: boolean;
  shareCourses?: boolean;
  shareOpportunities?: boolean;
  shareLevel?: boolean;
}

// Reviews
export interface IReviewDefine extends IDumpOne {
  slug?: string;
  student: string;
  reviewType: string;
  reviewee: string;
  academicTerm: string;
  rating?: number;
  comments: string;
  moderated?: boolean;
  visible?: boolean;
  moderatorComments?: string;
}

export interface IReviewUpdate {
  academicTerm?: string;
  rating?: number;
  comments?: string;
  moderated?: boolean;
  visible?: boolean;
  moderatorComments?: string;
}

export interface IReviewUpdateData {
  termID?: string;
  rating?: number;
  comments?: string;
  moderated?: boolean;
  visible?: boolean;
  moderatorComments?: string;
}

// AcademicTerms
export interface IAcademicTerm {
  _id: string;
  term: string;
  year: number;
  termNumber: number;
  slugID: string;
  retired?: boolean;
}

export interface IAcademicTermDefine extends IDumpOne {
  term: string;
  year: number;
  retired?: boolean;
}

export interface IAcademicTermUpdate {
  retired?: boolean;
}

// RadGradSettings
export interface ISettingsDefine extends IDumpOne {
  quarterSystem: boolean;
}

export interface ISettingsUpdate {
  quarterSystem?: boolean;
}

// Slugs
export interface ISlugDefine extends IDumpOne {
  name: string;
  entityName: string;
}

// StarDataObject
export interface IStarDataObject {
  semester: string;
  name: string;
  num: string;
  credits: number;
  grade: string;
  student: string;
}

// Teasers
export interface ITeaserDefine extends IDumpOne {
  title: string;
  slug: string;
  author: string;
  url: string;
  description: string;
  duration: string;
  interests: string[];
  opportunity: string;
}

export interface ITeaserUpdate {
  title?: string;
  opportunity?: string;
  interests?: string[];
  author?: string;
  url?: string;
  description?: string;
  duration?: string;
}

export interface ITeaserUpdateData {
  title?: string;
  opportunityID?: string;
  interestIDs?: string[];
  author?: string;
  url?: string;
  description?: string;
  duration?: string;
}

// UserInteractions
export interface IUserInteractionDefine extends IDumpOne {
  username: string;
  type: string;
  typeData: any[];
  timestamp?: any;
}

// VerificationRequests
interface IProcessed {
  date: Date;
  status: string;
  verifier: string;
  feedback?: string;

}
export interface IVerificationRequest {
  _id: string;
  studentID: string;
  opportunityInstanceID: string;
  submittedOn: Date;
  status: string;
  processed: IProcessed[];
  ice?: Ice;
}

export interface IVerificationRequestDefine extends IDumpOne {
  student: string;
  opportunityInstance?: string;
  submittedOn?: any;
  status?: string;
  processed?: any[];
  academicTerm?: string;
  opportunity?: string;
}

import { Mongo } from 'meteor/mongo';
import {
  CourseForecastName,
  OpportunityForecastName,
  ProfileCareerGoalsForecastName,
  ProfileCoursesForecastName,
  ProfileInterestsForecastName,
  ProfileOpportunitiesForecastName,
} from '../both/names';

export const CourseForecastCollection = new Mongo.Collection(CourseForecastName);
export const OpportunityForecastCollection = new Mongo.Collection(OpportunityForecastName);
export const ProfileCareerGoalsForecast = new Mongo.Collection(ProfileCareerGoalsForecastName);
export const ProfileCoursesForecast = new Mongo.Collection(ProfileCoursesForecastName);
export const ProfileInterestsForecast = new Mongo.Collection(ProfileInterestsForecastName);
export const ProfileOpportunitiesForecast = new Mongo.Collection(ProfileOpportunitiesForecastName);

import * as TYPES from './types';

interface IDatePickerState {
  startDate: Date;
  endDate: Date;
}

interface IState {
  newsletter: {
    getStudentEmails: boolean;
    testNewsletter: boolean;
    levelNewsletter: boolean;
    allNewsletter: boolean;
  }
  overheadAnalysis: IDatePickerState;
  studentSummary: IDatePickerState;
}

const initialState: IState = {
  newsletter: {
    getStudentEmails: false,
    testNewsletter: false,
    levelNewsletter: false,
    allNewsletter: false,
  },
  overheadAnalysis: {
    startDate: undefined,
    endDate: undefined,
  },
  studentSummary: {
    startDate: undefined,
    endDate: undefined,
  },
};

function reducer(state: IState = initialState, action: { [props: string]: any }): IState {
  let s: IState;
  let otherKeys;
  switch (action.type) {
    case TYPES.GET_EMAILS_WORKING:
      otherKeys = state.newsletter;
      s = {
        ...state,
        newsletter: {
          ...otherKeys,
          getStudentEmails: true,
        },
      };
      return s;
    case TYPES.GET_EMAILS_DONE:
      otherKeys = state.newsletter;
      s = {
        ...state,
        newsletter: {
          ...otherKeys,
          getStudentEmails: false,
        },
      };
      return s;
    case TYPES.TEST_EMAIL_WORKING:
      otherKeys = state.newsletter;
      s = {
        ...state,
        newsletter: {
          ...otherKeys,
          testNewsletter: true,
        },
      };
      return s;
    case TYPES.TEST_EMAIL_DONE:
      otherKeys = state.newsletter;
      s = {
        ...state,
        newsletter: {
          ...otherKeys,
          testNewsletter: false,
        },
      };
      return s;
    case TYPES.LEVEL_EMAIL_WORKING:
      otherKeys = state.newsletter;
      s = {
        ...state,
        newsletter: {
          ...otherKeys,
          levelNewsletter: true,
        },
      };
      return s;
    case TYPES.LEVEL_EMAIL_DONE:
      otherKeys = state.newsletter;
      s = {
        ...state,
        newsletter: {
          ...otherKeys,
          levelNewsletter: false,
        },
      };
      return s;
    case TYPES.ALL_EMAIL_WORKING:
      otherKeys = state.newsletter;
      s = {
        ...state,
        newsletter: {
          ...otherKeys,
          allNewsletter: true,
        },
      };
      return s;
    case TYPES.ALL_EMAIL_DONE:
      otherKeys = state.newsletter;
      s = {
        ...state,
        newsletter: {
          ...otherKeys,
          allNewsletter: false,
        },
      };
      return s;
    case TYPES.SET_OVERHEAD_ANALYSIS_START_DATE:
      otherKeys = state.overheadAnalysis;
      s = {
        ...state,
        overheadAnalysis: {
          ...otherKeys,
          startDate: action.payload,
        },
      };
      return s;
    case TYPES.SET_OVERHEAD_ANALYSIS_END_DATE:
      otherKeys = state.overheadAnalysis;
      s = {
        ...state,
        overheadAnalysis: {
          ...otherKeys,
          endDate: action.payload,
        },
      };
      return s;
    case TYPES.SET_STUDENT_SUMMARY_START_DATE:
      otherKeys = state.studentSummary;
      s = {
        ...state,
        studentSummary: {
          ...otherKeys,
          startDate: action.payload,
        },
      };
      return s;
    case TYPES.SET_STUDENT_SUMMARY_END_DATE:
      otherKeys = state.studentSummary;
      s = {
        ...state,
        studentSummary: {
          ...otherKeys,
          endDate: action.payload,
        },
      };
      return s;
    default:
      return state;
  }
}

export default reducer;

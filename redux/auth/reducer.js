import { 
  loginRoutine,
  signupRoutine,
   } from './actions';

const initialState = {
  session: null,
  loading: false,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case loginRoutine.TRIGGER:
      return {
        ...state,
        loading: true,
      };
    case loginRoutine.SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case loginRoutine.FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case loginRoutine.FULFILL:
      return {
        ...state,
        loading: false,
      };
    case signupRoutine.TRIGGER:
      return {
        ...state,
        loading: true,
      };
    case signupRoutine.SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case signupRoutine.FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case signupRoutine.FULFILL:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
import { 
  loginRoutine,
  signupRoutine,
  actions,
   } from './actions';

const initialState = {
  loading: false,
  error: null,
  session: {
    user: null,
    token: null,
  }
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case actions.LOGOUT: 
      return initialState;
    case actions.SET_SESSION:
      return {
        ...state,
        session: action.session
      }
    case loginRoutine.TRIGGER:
      return {
        ...state,
        loading: true,
      };
    case loginRoutine.SUCCESS:
      return {
        ...state,
        session: {
          ...state.session,
          token: action.payload
        }
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
        session: {
          ...state.session,
          user: action.payload,
        }
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
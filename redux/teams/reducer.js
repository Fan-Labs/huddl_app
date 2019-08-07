import { 
  fetchTeamsRoutine
   } from './actions';

const initialState = {
  loading: false,
  error: null,
  teams: []
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case fetchTeamsRoutine.TRIGGER:
      return {
        ...state,
        loading: true,
      };
    case fetchTeamsRoutine.SUCCESS:
      return {
        ...state,
        teams: action.payload
      };
    case fetchTeamsRoutine.FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case fetchTeamsRoutine.FULFILL:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
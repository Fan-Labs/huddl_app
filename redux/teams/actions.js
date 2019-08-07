import { createRoutine } from 'redux-saga-routines';

//routines are action creators for a lifecyle - trigger, start, success, error, finally
export const fetchTeamsRoutine = createRoutine('FETCH_TEAMS');
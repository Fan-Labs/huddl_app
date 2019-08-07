import { createRoutine } from 'redux-saga-routines';

//routines are action creators for a lifecyle - trigger, start, success, error, finally
export const loginRoutine = createRoutine('LOGIN');
export const signupRoutine = createRoutine('SIGNUP');
export const recoverRoutine = createRoutine('RECOVER');

export const actions = {
	LOAD_SESSION: 'LOAD_SESSION',
	SET_SESSION: 'SET_SESSION',
	PERSIST_SESSION: 'PERSIST_SESSION',
	LOGOUT: 'LOGOUT',

	logout: () => {
		return {
			type: actions.LOGOUT,
		}
	},

	loadSession: () => {
		return {
			type: actions.LOAD_SESSION,
		}
	},

	setSession: (session) => {
		return {
			type: actions.SET_SESSION,
			session,
		}
	},

	persistSession: () => {
		return {
			type: actions.PERSIST_SESSION,
		}
	}
}
import request from 'axios'
import { getSessionToken } from './tokens'
import moment from 'moment'
export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3030'


export function* makeRequest(method, data, url, headers = {}, params = {}) {

  const res = yield request({ url: `${BACKEND_URL}/${url}`, params, method, data, headers });
  return res;
}

export function* makeAuthedRequest(method, data, url, headers, params = {}) {
  const token = getSessionToken();
  debugger
  if (!token) throw Error('No security token in session');
  
  const requestHeaders = { ...headers, 'Authorization': `Bearer ${token}` };
  const res = yield makeRequest(method, data, url, requestHeaders, params);
  return res;
}


export function* signup(email, password, isMerchant=false, isAdmin=false, strategy='local') {
  debugger
  
  const res = yield makeRequest('POST', { strategy, email, password, isAdmin, isMerchant }, 'users');
  debugger
  return res;
}

export function* requestResetEmail(email) {
  const res = yield makeRequest('POST', { action: 'sendResetPwd', value: { email }}, 'authManagement');
  return res;
}

export function* resetPassword(newPassword, token, otp="") {
  
  const res = yield makeRequest('POST', { action: 'resetPwdLong', value: { password: newPassword, token } }, 'authManagement');
  return res;
}

export function* login(email, password, strategy='local') {
  const res = yield makeRequest(
    'POST',
    { email, password, strategy },
    'authentication'
  );
  return res;
}



export function* requestEmailVerification() {
  const res = yield makeAuthedRequest('POST', { }, 'v2/messaging/verify-email');
  return res;
}


export function* updateUserProfile(user, otp="") {
  const res = yield makeAuthedRequest('PUT', { ...user, code: otp }, 'v2/settings/user');
  return res;
}

export function* updatePassword(oldPassword, newPassword, otp="") {
  const res = yield makeAuthedRequest('PUT', { old_password: oldPassword, new_password: newPassword, code: otp }, 'v2/settings/password');
  return res;
}

export function* fetchFixtures() {
  const res = yield makeAuthedRequest('GET', { }, 'fixtures');
  return res;
}

export function* fetchBusinessFixtures(businessId) {
  const res = yield makeAuthedRequest('GET', { }, `business-fixture?businessId=${businessId}`);
  return res;
}

export function* updateBusinessFixture(businessFixtureId, updatedFields) {
  const res = yield makeAuthedRequest('PATCH', updatedFields, `business-fixture/${businessFixtureId}`);
  return res;
}


export function* fetchOffers() {
  const res = yield makeAuthedRequest('GET', { }, 'offers');
  return res;
}

export function* fetchTeams() {
  const res = yield makeAuthedRequest('GET', { }, 'teams');
  return res;
}

export function* fetchTeam(id) {
  const res = yield makeAuthedRequest('GET', { }, `teams/${id}`);
  return res;
}

export function* fetchBusinesses() {
  const res = yield makeAuthedRequest('GET', { }, 'businesses');
  return res;
}

export function* fetchBusiness(id) {
  const res = yield makeAuthedRequest('GET', { }, `businesses/${id}`);
  return res;
}

export function* saveBusiness(business) {
  const res = yield makeAuthedRequest('POST', business, 'businesses');
  return res;
}
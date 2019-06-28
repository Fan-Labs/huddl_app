import request from 'axios'
import { setToken, getValidToken } from './utility'
import moment from 'moment'
import { siteConfig } from '../config'
export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3030'


export function* makeRequest(method, data, url, headers = {}, params = {}) {

  const res = yield request({ url: `${BACKEND_URL}/${url}`, params, method, data, headers });
  
  if (res.data.accessToken) setToken(res.data.accessToken)
  return res;
}

export function* makeAuthedRequest(method, data, url, headers, params = {}) {
  const token = getValidToken();
  if (!token) return null;
  
  const requestHeaders = { ...headers, 'Authorization': `Bearer ${token}` };
  const res = yield makeRequest(method, data, url, requestHeaders, params);
  return res;
}


export function* signup(email, password, isMerchant=true, isAdmin=false, strategy='local') {
  
  const res = yield makeRequest('POST', { strategy, email, password, isAdmin, isMerchant }, 'users');
  
  return res;
}

export function* requestResetEmail(email, otp="") {
  const res = yield makeRequest('POST', { action: 'sendResetPwd', value: { email }}, 'authManagement');
  return res;
}

export function* resetPassword(newPassword, token, otp="") {
  
  const res = yield makeRequest('POST', { action: 'resetPwdLong', value: { password: newPassword, token } }, 'authManagement');
  return res;
}

export function* login(email, password, token, otp="", strategy='local') {
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


// export function* getOTPSMS(number, otp="") {
//   const res = yield makeAuthedRequest('POST', { number }, 'v2/settings/phone');
//   return res;
// }


// export function* verifyPhone(code, number) {
//   const res = yield makeAuthedRequest('PUT', { code, number }, 'v2/settings/phone');
//   return res;
// }

// export function* get2FACode() {
//   const res = yield makeAuthedRequest('GET', { }, 'v2/settings/2fa');
//   return res;
// }

// export function* submitOTP(code) {
//   const res = yield makeAuthedRequest('POST', { code }, 'v2/settings/2fa');
//   return res;
// }

// export function* disable2FA(password, otp="") {
//   const res = yield makeAuthedRequest('DELETE', { password }, 'v2/settings/2fa');
//   return res;
// }

// export function* refreshTokenAndUser() {
//   const res = yield makeAuthedRequest('GET', { }, 'v2/auth/refresh/hard');
//   return res;
// }

// export function* softRefreshToken() {
//   const res = yield makeAuthedRequest('GET', { }, 'v2/auth/refresh/soft');
//   return res;
// }

// export function* uploadDocument(file, documentType) {
  
//   const formData = new FormData();
//   formData.append('document_type', documentType);
//   formData.append('document', file);


//   const res = yield makeAuthedRequest('POST', formData, `v2/verification/documents`, {
//     accept: 'application/json',
//   });
  
  //yield makeAuthedRequest('DELETE', {docID}, `v2/accounts/aml_documents`);
  //yield null;
  //const res = yield makeAuthedRequest('DELETE', {docID}, `v2/accounts/aml_documents`)

  return res
}

export function* getPlaceDetails(placeId) {
 //  const request = {
 //    placeId
 //  };
 // // const service = new google.maps.places.PlacesService();
 // const res = yield request({ url: `https://maps.googleapis.com/maps/api/place/details/json?key=AIzaSyATJ3hSZzqyf0ChS6MN89Dnj_wYv9rnflw&placeid=${placeId}`, method: 'get'});
  debugger
  return 'res'
}

//HELPERS

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
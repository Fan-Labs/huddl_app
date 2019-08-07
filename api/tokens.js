import request from 'axios'
import {
  AsyncStorage,
  Platform
} from 'react-native';
import jwt_decode from 'jwt-decode'
import moment from 'moment'
import {store} from '../redux/store'

export function getSessionToken() {
  debugger
  store.getState().Auth.session
}

export async function isLoggedIn() {
  console.log('checking for token')
  try {
    let session = await AsyncStorage.getItem('session');
    session = JSON.parse(session)
    console.log(session)
    if(session && session.token){
      const decoded = jwt_decode(session.token)
      if (moment().isAfter(moment.unix(decoded.exp))) {
        return false
      }
      return true
    }
    return false
  } catch (err) {
    return false
  }
}

export async function clearSession() {
  try {
    return AsyncStorage.removeItem('session')
  } catch(err) {
    console.log(err)
  }
}

// export function getValidToken() {
//   try {
//     const token = localStorage.getItem('id_token')
//     const decoded = jwt_decode(token)
//     setUser(decoded.user)
//     if (moment().isAfter(moment.unix(decoded.exp))) {
//       clearToken()
//       return null
//     }
//     return token
//   } catch (e) {
//     return null
//   }
// }

// export function setToken(token) {
//   localStorage.setItem('id_token', token);
//   setUser(jwt_decode(token).user)
// }


//allows for importing a folder of images - ie importAll(require.context('./images', false, /\.(png|jpe?g|svg)$/))
// export function importAll(requireContext) {
//   let images = {};
//   requireContext.keys().forEach((item, index) => { images[item.replace('./', '')] = requireContext(item); });
//   return images;
// }


// export function setUser(user) {
//   localStorage.setItem('user_details', JSON.stringify(user))
// }

// export function getUser() {
//   try {
//     return JSON.parse(localStorage.getItem('user_details'))
//   } catch(e) {
//     return null
//   }
// }




// export function filterSpecialCharacters(string) {
//   return string.replace(/[`~$%^&*()|=?;:'"<>{}[\]\\/]/gi, "")
// }



// export async function getUserCountry() {
//   try {
//     const response = await request.get('https://ipapi.co/json/');
//     return response.data.country
//   } catch (error) {
//     console.error(error);
//     return "Somewhere"
//   }
// }



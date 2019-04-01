import firebase from 'firebase/app';
import 'firebase/firestore';

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyBsx5R9L8uDussBcOFmkEWKpP_91tVH3hg',
  authDomain: 'fir-react-v2-e843a.firebaseapp.com',
  databaseURL: 'https://fir-react-v2-e843a.firebaseio.com',
  projectId: 'fir-react-v2-e843a',
  storageBucket: 'fir-react-v2-e843a.appspot.com',
  messagingSenderId: '790688683583'
};

firebase.initializeApp(config);

export const fireStore = firebase.firestore();

export default firebase;

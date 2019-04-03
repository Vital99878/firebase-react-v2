import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

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

export const firebaseAuth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => firebaseAuth.signInWithPopup(googleAuthProvider);
export const signOut = () => firebaseAuth.signOut();

export const createUserProfileDocument = async (user, additionalData) => {
  if (!user) return;

  // Get a reference to the place in DB where user profile might be.
  const userRef = fireStore.doc(`users/${user.uid}`);

  // Go and fetch document form that location.
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const createdAt = new Date();
    const { displayName, email, photoURL } = user;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        createdAt,
        ...additionalData
      });
    } catch (ex) {
      console.error('Error creating a user:', ex);
    }
  }

  return getUserDocument(user.uid);
};

export const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await fireStore
      .collection('users')
      .doc('uid')
      .get();

    return {
      uid,
      ...userDocument.data()
    };
  } catch (ex) {
    console.error('get user document', ex);
  }
};

export default firebase;

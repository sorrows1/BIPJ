// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  //   signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDVz7uKG7LImwaW0r_s4U-Copqc5HM9RU8',
  authDomain: 'crwn-clothing-db-cf1c1.firebaseapp.com',
  projectId: 'crwn-clothing-db-cf1c1',
  storageBucket: 'crwn-clothing-db-cf1c1.appspot.com',
  messagingSenderId: '237549892286',
  appId: '1:237549892286:web:f3918c627679734e9924ef',
};

// Initialize Firebase
initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (
  collectionKey, // collection name
  objectsToAdd // the json object
) => {
  const collectionRef = collection(db, collectionKey); // create a new collection if it doesnt exist
  const batch = writeBatch(db); // create a batch of documents

  objectsToAdd.forEach((obj) => {
    const docRef = doc(collectionRef, obj.title.toLowerCase());
    batch.set(docRef, obj); // set each object as a doc and add it into the batch
  });

  await batch.commit(); // commit all the docs in the batch
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
};

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;
  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (err) {
      console.log(new Error(err));
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (handler) => {
  onAuthStateChanged(auth, handler);
};

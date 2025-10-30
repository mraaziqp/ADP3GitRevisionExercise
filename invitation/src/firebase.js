import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import localGuests, { persistGuestsCollection } from './data/guestData.js';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

let appInstance;
let dbInstance;

function getDb() {
  if (dbInstance) return dbInstance;
  try {
    if (!appInstance) {
      appInstance = initializeApp(firebaseConfig);
    }
    dbInstance = getFirestore(appInstance);
  } catch (error) {
    console.warn('Firestore unavailable, using local data only.', error);
    dbInstance = null;
  }
  return dbInstance;
}

function collectionRef() {
  const db = getDb();
  if (!db) return null;
  return collection(db, 'guests');
}

export async function fetchAllGuestsOnce() {
  const ref = collectionRef();
  if (!ref) {
    return localGuests;
  }
  try {
    const snapshot = await getDocs(query(ref, orderBy('name')));
    return snapshot.docs.map((document) => ({ id: document.id, ...document.data() }));
  } catch (error) {
    console.warn('Unable to fetch guests, falling back to local cache.', error);
    return localGuests;
  }
}

export function listenToGuests(callback) {
  const ref = collectionRef();
  if (!ref) {
    callback(localGuests);
    return () => {};
  }
  try {
    return onSnapshot(query(ref, orderBy('name')), (snapshot) => {
      const guests = snapshot.docs.map((document) => ({ id: document.id, ...document.data() }));
      callback(guests);
      persistGuestsCollection(guests);
    });
  } catch (error) {
    console.warn('Realtime sync unavailable, using local data only.', error);
    callback(localGuests);
    return () => {};
  }
}

export async function updateGuestRsvpStatus(guest) {
  if (!guest?.id) {
    return;
  }
  const ref = collectionRef();
  if (!ref) return;
  try {
    const docRef = doc(ref, guest.id);
    await updateDoc(docRef, {
      rsvpStatus: guest.rsvpStatus,
      notes: guest.notes || '',
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.warn('Failed to update RSVP status remotely.', error);
    throw error;
  }
}

export async function addGuestRecord(guest) {
  const ref = collectionRef();
  if (!ref) {
    const localRecord = { ...guest, id: `local-${Date.now()}` };
    return localRecord;
  }
  try {
    const docRef = await addDoc(ref, {
      ...guest,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return { ...guest, id: docRef.id };
  } catch (error) {
    console.warn('Failed to add guest to Firestore.', error);
    throw error;
  }
}

export async function deleteGuestRecord(guestId) {
  const ref = collectionRef();
  if (!ref) return;
  try {
    const docRef = doc(ref, guestId);
    await deleteDoc(docRef);
  } catch (error) {
    console.warn('Failed to delete guest from Firestore.', error);
    throw error;
  }
}

export async function updateGuestRecord(guestId, data) {
  const ref = collectionRef();
  if (!ref) return;
  try {
    const docRef = doc(ref, guestId);
    await setDoc(docRef, { ...data, updatedAt: new Date().toISOString() }, { merge: true });
  } catch (error) {
    console.warn('Failed to update guest in Firestore.', error);
    throw error;
  }
}

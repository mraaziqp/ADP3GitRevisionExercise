const LOCAL_STORAGE_KEY = 'raziaraaziq:guest';
const LOCAL_COLLECTION_KEY = 'raziaraaziq:guestCollection';

const localGuests = [
  {
    id: 'local-1',
    name: 'Fatima Khan',
    partnerName: 'Ahmed Khan',
    inviteCode: 'FATIMA001',
    rsvpStatus: 'pending',
    notes: '',
  },
  {
    id: 'local-2',
    name: 'Zahra Patel',
    partnerName: '',
    inviteCode: 'ZAHRA002',
    rsvpStatus: 'pending',
    notes: '',
  },
];

function isBrowser() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

export function cacheGuestLocally(guest) {
  if (!isBrowser()) return;
  window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(guest));
}

export function getCachedGuest() {
  if (!isBrowser()) return null;
  const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (error) {
    console.warn('Failed to parse cached guest', error);
    return null;
  }
}

export function clearCachedGuest() {
  if (!isBrowser()) return;
  window.localStorage.removeItem(LOCAL_STORAGE_KEY);
}

export function persistGuestsCollection(guests) {
  if (!isBrowser()) return;
  window.localStorage.setItem(LOCAL_COLLECTION_KEY, JSON.stringify(guests));
}

export function loadCachedGuests() {
  if (!isBrowser()) return [];
  const raw = window.localStorage.getItem(LOCAL_COLLECTION_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch (error) {
    console.warn('Failed to parse cached guest list', error);
    return [];
  }
}

export function lookupGuestByCode(code) {
  if (!code) return null;
  const collection = loadCachedGuests();
  return collection.find((guest) => guest.inviteCode?.toUpperCase() === code.toUpperCase()) || null;
}

export function fetchInviteCodeLocally(code) {
  if (!code) return null;
  return localGuests.find((guest) => guest.inviteCode === code) || null;
}

export default localGuests;

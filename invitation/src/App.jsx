import { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import GuestEntry from './pages/GuestEntry.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import CurtainReveal from './components/CurtainReveal.jsx';
import BismillahIntro from './components/BismillahIntro.jsx';
import Envelope from './components/Envelope.jsx';
import InvitationCard from './components/InvitationCard.jsx';
import RSVP from './components/RSVP.jsx';
import Countdown from './components/Countdown.jsx';
import AudioToggle from './components/AudioToggle.jsx';
import sparkleOverlay from './assets/sparkle-overlay.mp4';
import nasheed from './assets/nasheed-soft.mp3';
import {
  cacheGuestLocally,
  clearCachedGuest,
  getCachedGuest,
  loadCachedGuests,
  persistGuestsCollection,
} from './data/guestData.js';
import {
  updateGuestRsvpStatus,
  listenToGuests,
  fetchAllGuestsOnce,
} from './firebase.js';

const LOCAL_EXIT_CONFIRMATION = 'Are you sure you want to exit the invitation?';

function InvitationExperience({ guest, onGuestCleared, onRsvp }) {
  const [curtainsOpen, setCurtainsOpen] = useState(false);
  const [sealOpened, setSealOpened] = useState(false);
  const [cardVisible, setCardVisible] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const openTimer = setTimeout(() => setCurtainsOpen(true), 1200);
    return () => clearTimeout(openTimer);
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;
    if (audioEnabled) {
      audioRef.current.play().catch(() => {
        /* autoplay guard */
      });
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [audioEnabled]);

  const handleSealOpen = () => {
    if (sealOpened) return;
    setSealOpened(true);
    setTimeout(() => setCardVisible(true), 1200);
  };

  const handleExit = () => {
    if (window.confirm(LOCAL_EXIT_CONFIRMATION)) {
      onGuestCleared();
    }
  };

  return (
    <div className="invitation-stage">
      <video className="sparkle-overlay" autoPlay loop muted playsInline>
        <source src={sparkleOverlay} type="video/mp4" />
      </video>
      <CurtainReveal open={curtainsOpen} />
      <div className="invitation-content">
        <AudioToggle enabled={audioEnabled} onToggle={setAudioEnabled} />
        <BismillahIntro show={curtainsOpen} guestName={guest?.name} />
        <Envelope opened={sealOpened} onOpen={handleSealOpen} />
        <InvitationCard
          guest={guest}
          visible={cardVisible}
        />
        <Countdown eventDate={new Date('2025-12-16T16:00:00+02:00')} />
        <RSVP guest={guest} onRespond={onRsvp} />
        <button type="button" className="exit-button" onClick={handleExit}>
          Close Invitation
        </button>
      </div>
      <audio ref={audioRef} src={nasheed} loop preload="auto" />
    </div>
  );
}

function App() {
  const [guest, setGuest] = useState(null);
  const [guestCollection, setGuestCollection] = useState([]);

  useEffect(() => {
    const cachedGuest = getCachedGuest();
    if (cachedGuest) {
      setGuest(cachedGuest);
    }
    const cachedGuests = loadCachedGuests();
    if (cachedGuests.length) {
      setGuestCollection(cachedGuests);
    }

    const syncGuests = async () => {
      const cloudGuests = await fetchAllGuestsOnce();
      if (cloudGuests.length) {
        setGuestCollection(cloudGuests);
        persistGuestsCollection(cloudGuests);
      }
    };

    syncGuests();
    const unsubscribe = listenToGuests((cloudGuests) => {
      if (cloudGuests.length) {
        setGuestCollection(cloudGuests);
        persistGuestsCollection(cloudGuests);
      }
    });

    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, []);

  const handleGuestResolved = (guestRecord) => {
    setGuest(guestRecord);
    cacheGuestLocally(guestRecord);
  };

  const handleGuestCleared = () => {
    setGuest(null);
    clearCachedGuest();
  };

  const handleRsvpUpdate = async (response) => {
    const updatedGuest = { ...guest, ...response };
    setGuest(updatedGuest);
    cacheGuestLocally(updatedGuest);
    try {
      await updateGuestRsvpStatus(updatedGuest);
    } catch (error) {
      console.warn('RSVP sync failed. Stored locally until connection restores.', error);
    }
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={(
            <GuestEntry
              guest={guest}
              onGuestResolved={handleGuestResolved}
            />
          )}
        />
        <Route
          path="/invite"
          element={
            guest ? (
              <InvitationExperience
                guest={guest}
                onGuestCleared={handleGuestCleared}
                onRsvp={handleRsvpUpdate}
              />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/admin"
          element={
            <AdminDashboard
              guests={guestCollection}
              onGuestsChange={(updated) => {
                setGuestCollection(updated);
                persistGuestsCollection(updated);
              }}
            />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

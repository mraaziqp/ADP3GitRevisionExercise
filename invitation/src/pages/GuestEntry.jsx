import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { lookupGuestByCode, fetchInviteCodeLocally } from '../data/guestData.js';

function GuestEntry({ guest, onGuestResolved }) {
  const navigate = useNavigate();
  const [inviteCode, setInviteCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!inviteCode.trim()) {
      setError('Please enter your personalised invite code.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const normalizedCode = inviteCode.trim().toUpperCase();
      let resolvedGuest = await lookupGuestByCode(normalizedCode);
      if (!resolvedGuest) {
        const fallbackGuest = fetchInviteCodeLocally(normalizedCode);
        if (fallbackGuest) {
          resolvedGuest = fallbackGuest;
        }
      }

      if (!resolvedGuest) {
        throw new Error('Invite code not found. Please contact Razia or Abduraziq for assistance.');
      }

      onGuestResolved(resolvedGuest);
      navigate('/invite');
    } catch (submissionError) {
      setError(submissionError.message);
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = () => {
    navigate('/invite');
  };

  return (
    <main className="guest-entry">
      <div className="entry-card">
        <h1>Razia &amp; Abduraziq</h1>
        <p className="entry-subtitle">Engagement Ceremony Invitation</p>
        <p className="entry-description">
          Enter your unique invite code to unlock the cinematic reveal crafted just for you.
        </p>
        <form onSubmit={handleSubmit} className="entry-form">
          <label htmlFor="invite-code" className="entry-label">Invite Code</label>
          <input
            id="invite-code"
            type="text"
            value={inviteCode}
            onChange={(event) => setInviteCode(event.target.value)}
            placeholder="e.g. RAZIA123"
            disabled={loading}
            autoComplete="one-time-code"
          />
          <button type="submit" className="entry-button" disabled={loading}>
            {loading ? 'Opening...' : 'Reveal Invitation'}
          </button>
        </form>
        {error && <p className="entry-error">{error}</p>}
        {guest && (
          <button type="button" className="entry-secondary" onClick={handleContinue}>
            Continue as {guest.name}
          </button>
        )}
      </div>
    </main>
  );
}

GuestEntry.propTypes = {
  guest: PropTypes.shape({
    name: PropTypes.string,
  }),
  onGuestResolved: PropTypes.func.isRequired,
};

GuestEntry.defaultProps = {
  guest: null,
};

export default GuestEntry;

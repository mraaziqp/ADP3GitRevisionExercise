import PropTypes from 'prop-types';
import { useState } from 'react';

function RSVP({ guest, onRespond }) {
  const [status, setStatus] = useState(guest?.rsvpStatus || 'pending');
  const [notes, setNotes] = useState(guest?.notes || '');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (event, rsvpStatus) => {
    event.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      await onRespond({ rsvpStatus, notes });
      setStatus(rsvpStatus);
      setMessage('RSVP saved. JazakAllahu khairan!');
    } catch (error) {
      setMessage('Could not save RSVP right now. We will retry automatically.');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const handleNotesBlur = (event) => {
    setNotes(event.target.value);
  };

  return (
    <form className="rsvp-card">
      <h3>RSVP</h3>
      <p className="rsvp-subtext">Please let us know if you will join us on this blessed evening.</p>
      <div className="rsvp-actions">
        <button
          type="submit"
          className={`rsvp-button attending ${status === 'attending' ? 'active' : ''}`}
          onClick={(event) => handleSubmit(event, 'attending')}
          disabled={saving}
        >
          Accept
        </button>
        <button
          type="submit"
          className={`rsvp-button declined ${status === 'declined' ? 'active' : ''}`}
          onClick={(event) => handleSubmit(event, 'declined')}
          disabled={saving}
        >
          Decline
        </button>
      </div>
      <label htmlFor="rsvp-notes" className="notes-label">
        Notes (dietary needs, dua requests, etc.)
      </label>
      <textarea
        id="rsvp-notes"
        className="notes-field"
        defaultValue={notes}
        onBlur={handleNotesBlur}
        placeholder="Share anything we should know"
        disabled={saving}
      />
      {message && <p className="rsvp-message">{message}</p>}
    </form>
  );
}

RSVP.propTypes = {
  guest: PropTypes.shape({
    rsvpStatus: PropTypes.string,
    notes: PropTypes.string,
  }),
  onRespond: PropTypes.func.isRequired,
};

RSVP.defaultProps = {
  guest: null,
};

export default RSVP;

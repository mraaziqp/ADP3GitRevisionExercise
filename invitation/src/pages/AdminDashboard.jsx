import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import { persistGuestsCollection } from '../data/guestData.js';
import { addGuestRecord, deleteGuestRecord, updateGuestRecord } from '../firebase.js';

function emptyGuest() {
  return {
    name: '',
    partnerName: '',
    inviteCode: '',
    rsvpStatus: 'pending',
    notes: '',
  };
}

function AdminDashboard({ guests, onGuestsChange }) {
  const [formGuest, setFormGuest] = useState(emptyGuest());
  const [search, setSearch] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setError('');
  }, [formGuest]);

  const filteredGuests = useMemo(() => {
    if (!search.trim()) return guests;
    const query = search.trim().toLowerCase();
    return guests.filter((guest) =>
      guest.name.toLowerCase().includes(query) ||
      (guest.inviteCode || '').toLowerCase().includes(query)
    );
  }, [guests, search]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormGuest((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formGuest.name || !formGuest.inviteCode) {
      setError('Name and invite code are required.');
      return;
    }

    setSaving(true);
    try {
      const result = await addGuestRecord(formGuest);
      const updatedGuests = [...guests, result];
      onGuestsChange(updatedGuests);
      persistGuestsCollection(updatedGuests);
      setFormGuest(emptyGuest());
    } catch (submissionError) {
      setError(submissionError.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (guestId) => {
    if (!window.confirm('Remove this guest?')) return;
    await deleteGuestRecord(guestId);
    const updatedGuests = guests.filter((item) => item.id !== guestId);
    onGuestsChange(updatedGuests);
    persistGuestsCollection(updatedGuests);
  };

  const handleStatusChange = async (guestId, rsvpStatus) => {
    await updateGuestRecord(guestId, { rsvpStatus });
    const updatedGuests = guests.map((item) =>
      item.id === guestId ? { ...item, rsvpStatus } : item
    );
    onGuestsChange(updatedGuests);
    persistGuestsCollection(updatedGuests);
  };

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Manage guest list, RSVP statuses, and invite codes.</p>
      </header>

      <section className="admin-section">
        <h2>Add Guest</h2>
        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label htmlFor="guest-name">Name</label>
            <input
              id="guest-name"
              name="name"
              value={formGuest.name}
              onChange={handleChange}
              placeholder="Guest name"
            />
          </div>
          <div className="form-row">
            <label htmlFor="guest-partner">Partner Name</label>
            <input
              id="guest-partner"
              name="partnerName"
              value={formGuest.partnerName}
              onChange={handleChange}
              placeholder="Optional partner name"
            />
          </div>
          <div className="form-row">
            <label htmlFor="guest-code">Invite Code</label>
            <input
              id="guest-code"
              name="inviteCode"
              value={formGuest.inviteCode}
              onChange={handleChange}
              placeholder="UNIQUECODE"
              autoCapitalize="characters"
            />
          </div>
          <div className="form-row">
            <label htmlFor="guest-notes">Notes</label>
            <textarea
              id="guest-notes"
              name="notes"
              value={formGuest.notes}
              onChange={handleChange}
              placeholder="Special requests"
            />
          </div>
          <button type="submit" disabled={saving}>
            {saving ? 'Saving...' : 'Add Guest'}
          </button>
          {error && <p className="form-error">{error}</p>}
        </form>
      </section>

      <section className="admin-section">
        <div className="guest-list-header">
          <h2>Guest List</h2>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search guests"
            aria-label="Search guests"
          />
        </div>
        <div className="guest-table">
          <div className="guest-table-header">
            <span>Name</span>
            <span>Invite Code</span>
            <span>RSVP</span>
            <span>Actions</span>
          </div>
          {filteredGuests.map((item) => (
            <div key={item.id || item.inviteCode} className="guest-row">
              <span>
                <strong>{item.name}</strong>
                {item.partnerName ? ` & ${item.partnerName}` : ''}
              </span>
              <span>{item.inviteCode}</span>
              <span className={`rsvp-status ${item.rsvpStatus}`}>
                {item.rsvpStatus}
              </span>
              <span className="guest-actions">
                <button type="button" onClick={() => handleStatusChange(item.id, 'attending')}>
                  Mark Attending
                </button>
                <button type="button" onClick={() => handleStatusChange(item.id, 'declined')}>
                  Mark Declined
                </button>
                <button type="button" className="danger" onClick={() => handleDelete(item.id)}>
                  Delete
                </button>
              </span>
            </div>
          ))}
          {filteredGuests.length === 0 && (
            <p className="empty-state">No guests found. Add a guest or adjust your search.</p>
          )}
        </div>
      </section>
    </div>
  );
}

AdminDashboard.propTypes = {
  guests: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      partnerName: PropTypes.string,
      inviteCode: PropTypes.string,
      rsvpStatus: PropTypes.string,
      notes: PropTypes.string,
    })
  ),
  onGuestsChange: PropTypes.func.isRequired,
};

AdminDashboard.defaultProps = {
  guests: [],
};

export default AdminDashboard;

import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import inviteCard from '../assets/invitecard.png';

function InvitationCard({ guest, visible }) {
  const partnerName = guest?.partnerName ? ` & ${guest.partnerName}` : '';

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="invitation-card"
          className="invitation-card"
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 80 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          <img src={inviteCard} alt="Invitation card" className="invitation-card-bg" />
          <div className="invitation-card-content">
            <p className="blessing">In the name of Allah, the Most Gracious, the Most Merciful</p>
            <p className="honour-line">Together with our families</p>
            <h2 className="couple-highlight">Razia &amp; Abduraziq</h2>
            <p className="event-detail">warmly invite you to celebrate their engagement</p>
            <div className="guest-section">
              <span className="guest-label">Honoured Guest:</span>
              <span className="guest-name">{guest?.name}{partnerName}</span>
            </div>
            <div className="event-meta">
              <p>16 December 2025 &bull; 25 Jumada al-Thani 1447 AH</p>
              <p>4:00 PM &mdash; Nurul Islam Hall, Cape Town</p>
              <p>Dress code: Elegant modest attire</p>
            </div>
            <p className="dua">May Allah bless this union and fill it with sakinah, mawaddah, and rahmah.</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

InvitationCard.propTypes = {
  guest: PropTypes.shape({
    name: PropTypes.string,
    partnerName: PropTypes.string,
  }),
  visible: PropTypes.bool,
};

InvitationCard.defaultProps = {
  guest: null,
  visible: false,
};

export default InvitationCard;

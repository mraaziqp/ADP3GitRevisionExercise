import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import bismillah from '../assets/bismillah-gold.png';

function BismillahIntro({ show, guestName }) {
  return (
    <div className="bismillah-intro">
      <AnimatePresence>
        {show && (
          <motion.div
            key="bismillah"
            className="bismillah-wrapper"
            initial={{ opacity: 0, y: 40, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
          >
            <div className="noor-glow" />
            <img src={bismillah} alt="Bismillah in golden calligraphy" className="bismillah-image" />
            <p className="greeting">Assalamu Alaikum{guestName ? `, ${guestName}` : ''}</p>
            <p className="invitation-line">We are honoured to invite you to a blessed celebration of love &amp; unity.</p>
            <h1 className="couple-names">Razia &amp; Abduraziq</h1>
            <p className="event-subtitle">🕊️ Engagement Ceremony</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

BismillahIntro.propTypes = {
  show: PropTypes.bool,
  guestName: PropTypes.string,
};

BismillahIntro.defaultProps = {
  show: false,
  guestName: '',
};

export default BismillahIntro;

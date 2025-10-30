import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import envelopeImage from '../assets/envelope.png';
import waxSeal from '../assets/waxseal.png';

function Envelope({ opened, onOpen }) {
  return (
    <div className={`envelope-scene ${opened ? 'opened' : ''}`}>
      <motion.img
        src={envelopeImage}
        alt="Envelope"
        className="envelope"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      />
      <motion.button
        type="button"
        className={`wax-seal ${opened ? 'melting' : ''}`}
        onClick={onOpen}
        aria-label="Open invitation"
        whileHover={{ scale: opened ? 1 : 1.05 }}
        whileTap={{ scale: opened ? 1 : 0.96 }}
        disabled={opened}
      >
        <img src={waxSeal} alt="Wax seal" />
        <span className="seal-instruction">Tap to break the seal</span>
      </motion.button>
    </div>
  );
}

Envelope.propTypes = {
  opened: PropTypes.bool,
  onOpen: PropTypes.func,
};

Envelope.defaultProps = {
  opened: false,
  onOpen: () => {},
};

export default Envelope;

import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import leftCurtain from '../assets/silk-curtain-left.png';
import rightCurtain from '../assets/silk-curtain-right.png';

const leftVariants = {
  closed: { x: 0 },
  open: { x: '-105%' },
};

const rightVariants = {
  closed: { x: 0 },
  open: { x: '105%' },
};

function CurtainReveal({ open }) {
  return (
    <div className="curtain-reveal">
      <motion.img
        className="curtain curtain-left"
        src={leftCurtain}
        alt="Silk curtain left"
        initial="closed"
        animate={open ? 'open' : 'closed'}
        variants={leftVariants}
        transition={{ duration: 1.8, ease: [0.4, 0.0, 0.2, 1] }}
      />
      <motion.img
        className="curtain curtain-right"
        src={rightCurtain}
        alt="Silk curtain right"
        initial="closed"
        animate={open ? 'open' : 'closed'}
        variants={rightVariants}
        transition={{ duration: 1.8, ease: [0.4, 0.0, 0.2, 1] }}
      />
    </div>
  );
}

CurtainReveal.propTypes = {
  open: PropTypes.bool,
};

CurtainReveal.defaultProps = {
  open: false,
};

export default CurtainReveal;

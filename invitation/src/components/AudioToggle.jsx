import PropTypes from 'prop-types';

function AudioToggle({ enabled, onToggle }) {
  return (
    <div className="audio-toggle">
      <span>Nasheed</span>
      <button
        type="button"
        className={enabled ? 'on' : 'off'}
        onClick={() => onToggle(!enabled)}
        aria-pressed={enabled}
      >
        {enabled ? 'On' : 'Off'}
      </button>
    </div>
  );
}

AudioToggle.propTypes = {
  enabled: PropTypes.bool,
  onToggle: PropTypes.func,
};

AudioToggle.defaultProps = {
  enabled: false,
  onToggle: () => {},
};

export default AudioToggle;

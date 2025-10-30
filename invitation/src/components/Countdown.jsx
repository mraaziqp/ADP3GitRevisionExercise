import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

function getTimeParts(targetDate) {
  const now = new Date();
  const diff = targetDate - now;
  if (diff <= 0) {
    return {
      days: '00',
      hours: '00',
      minutes: '00',
      seconds: '00',
      completed: true,
    };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  const format = (value) => String(value).padStart(2, '0');

  return {
    days: format(days),
    hours: format(hours),
    minutes: format(minutes),
    seconds: format(seconds),
    completed: false,
  };
}

function Countdown({ eventDate }) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeParts(eventDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeParts(eventDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [eventDate]);

  return (
    <section className="countdown-section">
      <h3>Countdown to the Celebration</h3>
      <p className="countdown-date">16 December 2025 &middot; 25 Jumada al-Thani 1447 AH</p>
      <div className="countdown-grid">
        <div className="countdown-block">
          <span className="countdown-number">{timeLeft.days}</span>
          <span className="countdown-label">Days</span>
        </div>
        <div className="countdown-block">
          <span className="countdown-number">{timeLeft.hours}</span>
          <span className="countdown-label">Hours</span>
        </div>
        <div className="countdown-block">
          <span className="countdown-number">{timeLeft.minutes}</span>
          <span className="countdown-label">Minutes</span>
        </div>
        <div className="countdown-block">
          <span className="countdown-number">{timeLeft.seconds}</span>
          <span className="countdown-label">Seconds</span>
        </div>
      </div>
      {timeLeft.completed && (
        <p className="countdown-complete">Alhamdulillah, the blessed day has arrived!</p>
      )}
    </section>
  );
}

Countdown.propTypes = {
  eventDate: PropTypes.instanceOf(Date).isRequired,
};

export default Countdown;

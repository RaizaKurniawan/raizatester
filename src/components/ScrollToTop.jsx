import { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';

// Floating "back to top" button, shared by the main page and /experience.
// Appears once the viewport has scrolled a screen's worth, so it never covers
// content at the top where it would be useless.
const ScrollToTop = ({ threshold = 600 }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > threshold);
    onScroll(); // a reload can restore scroll position mid-page
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  const toTop = () => {
    // html has scroll-behavior: smooth, but pass it explicitly so the button
    // behaves the same if that rule ever changes.
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });

    // Clear a stale #hash so the URL matches where the user now is, without
    // adding a history entry or re-triggering a hash scroll.
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  };

  return (
    <button
      type="button"
      className={`scroll-top${visible ? ' is-visible' : ''}`}
      onClick={toTop}
      aria-label="Scroll back to top"
      // Hidden from keyboard and screen readers until it is actually on screen.
      tabIndex={visible ? 0 : -1}
      aria-hidden={visible ? undefined : true}
    >
      <FaArrowUp aria-hidden="true" />
    </button>
  );
};

export default ScrollToTop;

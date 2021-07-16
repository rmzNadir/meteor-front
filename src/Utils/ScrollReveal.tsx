/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useState,
  useEffect,
  useImperativeHandle,
  ReactElement,
} from 'react';
import { throttle } from 'lodash';

interface Props {
  children(): ReactElement;
}

const ScrollReveal = React.forwardRef((props: Props, ref) => {
  const [viewportHeight, setViewportheight] = useState(window.innerHeight);
  const [revealEl, setRevealel] = useState<NodeListOf<Element>>(
    [] as unknown as NodeListOf<Element>
  );

  const checkComplete = () => {
    return (
      revealEl.length <=
      document.querySelectorAll('[class*=reveal-].is-revealed').length
    );
  };

  const elementIsVisible = (el: Element, offset: string) => {
    return el.getBoundingClientRect().top <= viewportHeight - +offset;
  };

  const revealElements = () => {
    if (checkComplete()) return;

    for (let i = 0; i < revealEl.length; i++) {
      const el = revealEl[i];
      const revealDelay = el.getAttribute('data-reveal-delay');
      const revealOffset = el.getAttribute('data-reveal-offset')
        ? el.getAttribute('data-reveal-offset')
        : '200';
      const listenedEl = el.getAttribute('data-reveal-container')
        ? el.closest(el.getAttribute('data-reveal-container') ?? '')
        : el;
      if (
        elementIsVisible(listenedEl ?? el, revealOffset ?? '200') &&
        !el.classList.contains('is-revealed')
      ) {
        if (revealDelay && +revealDelay !== 0) {
          setTimeout(() => {
            el.classList.add('is-revealed');
          }, +revealDelay);
        } else {
          el.classList.add('is-revealed');
        }
      }
    }
  };

  useImperativeHandle(ref, () => ({
    init() {
      setRevealel(document.querySelectorAll('[class*=reveal-]'));
    },
  }));

  const handleScroll = throttle(() => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    handleListeners();
    revealElements();
  }, 30);

  const handleResize = throttle(() => {
    setViewportheight(window.innerHeight);
  }, 30);

  useEffect(() => {
    if (typeof revealEl !== 'undefined' && revealEl.length > 0) {
      if (!checkComplete()) {
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);
      }
      revealElements();
    }
  }, [revealEl]);

  const handleListeners = () => {
    if (!checkComplete()) return;
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('resize', handleResize);
  };

  useEffect(() => {
    handleListeners();
    revealElements();
  }, [viewportHeight]);

  return <>{props.children()}</>;
});

export default ScrollReveal;

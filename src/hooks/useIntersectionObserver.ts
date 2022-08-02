import { useEffect, useRef } from 'react';

export const useInterSectionObserver = ({
  onTargetObserve,
  observerOptions,
}: {
  onTargetObserve: (target?: Element, observer?: IntersectionObserver) => void;
  observerOptions?: IntersectionObserverInit;
}) => {
  const targetRef = useRef(null);

  useEffect(() => {
    if (targetRef.current == null) return;

    // console.log('connect');
    const io = new IntersectionObserver((entries, observer) => {
      if (entries[0].isIntersecting) {
        // console.log('observe', entries[0].target);
        onTargetObserve(entries[0].target, observer);
      }
    }, observerOptions);

    io.observe(targetRef.current);

    return () => {
      // console.log('disconnect');
      io.disconnect();
    };
  });

  return { targetRef };
};

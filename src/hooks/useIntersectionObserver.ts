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

    const io = new IntersectionObserver((entries, observer) => {
      if (entries[0].isIntersecting) {
        onTargetObserve(entries[0].target, observer);
      }
    }, observerOptions);

    io.observe(targetRef.current);

    return () => {
      io.disconnect();
    };
  });

  return { targetRef };
};

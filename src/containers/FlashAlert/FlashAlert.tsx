import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { closeAlert, selectFlashAlert } from '@store/slices/flashAlert';
import { DefaultAlert } from '@components';

function FlashAlert() {
  const state = useSelector(selectFlashAlert);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!state.show) return;

    const timeOutId = setTimeout(() => {
      dispatch(closeAlert());
    }, 2000);

    return () => {
      clearTimeout(timeOutId);
    };
  }, [state.show]);

  return (
    <DefaultAlert
      variant={state.variant}
      severity={state.severity}
      title={state.title}
      content={state.content}
    />
  );
}

export default FlashAlert;

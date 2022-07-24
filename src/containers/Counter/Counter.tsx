import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import {
  decrement,
  increment,
  incrementByAmount,
  selectCount,
} from '@src/store/slices/counter';
import { CounterWrapper, CountWrapper } from '@src/containers/Counter/style';
import { SampleButton } from '@src/components';

function Counter() {
  const count = useSelector(selectCount);

  const dispatch = useDispatch();

  return (
    <CounterWrapper style={{ display: 'flex' }}>
      <SampleButton
        content="+"
        click={() => {
          dispatch(increment());
        }}
      />
      <CountWrapper>{count}</CountWrapper>
      <SampleButton
        content="-"
        click={() => {
          dispatch(decrement());
        }}
      />
      <SampleButton
        content="+2"
        click={() => {
          dispatch(incrementByAmount(2));
        }}
      />
    </CounterWrapper>
  );
}

export default Counter;

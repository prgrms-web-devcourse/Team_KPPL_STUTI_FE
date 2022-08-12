import { Navigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { selectUser } from '@store/slices/user';
import { openAlert } from '@store/slices/flashAlert';

import { HOME } from './path';

interface Props {
  children: React.ReactElement;
}

function PrivateRoute({ children }: Props) {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  if (!user.isLogin)
    dispatch(
      openAlert({
        severity: 'error',
        title: '페이지 접근 실패',
        content: '로그인이 필요한 페이지 입니다.',
      }),
    );

  return user.isLogin ? children : <Navigate to={HOME} replace />;
}

export default PrivateRoute;

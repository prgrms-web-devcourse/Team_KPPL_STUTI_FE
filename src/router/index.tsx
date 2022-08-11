import { Routes, Route, BrowserRouter } from 'react-router-dom';
import {
  COMMUNITY,
  HOME,
  LOGIN,
  PROFILE_DETAIL,
  PROFILE_EDIT,
  SIGN_UP,
  STUDY_CREATE,
  STUDY_DETAIL,
  STUDY_EDIT,
  STUDY_MANAGE,
} from '@src/router/path';
import StudyManage from '@src/pages/StudyManage';
import StudyEdit from '@src/pages/StudyEdit';
import StudyDetail from '@src/pages/StudyDetail';
import StudyCreate from '@src/pages/StudyCreate';
import SignUp from '@src/pages/SignUp';
import Login from '@src/pages/Login';
import Community from '@src/pages/Community';
import Layout from '@src/layout/Layout';
import { Home, NotFound, ProfileDetail, ProfileEdit } from '@pages';

import PrivateRoute from './PrivateRoute';

function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={HOME} element={<Layout />}>
          <Route index element={<Home />} />
          <Route path={COMMUNITY} element={<Community />} />
          <Route path={PROFILE_DETAIL} element={<ProfileDetail />} />
          <Route
            path={PROFILE_EDIT}
            element={
              <PrivateRoute>
                <ProfileEdit />
              </PrivateRoute>
            }
          />
          <Route
            path={STUDY_CREATE}
            element={
              <PrivateRoute>
                <StudyCreate />
              </PrivateRoute>
            }
          />
          <Route path={STUDY_DETAIL} element={<StudyDetail />} />
          <Route
            path={STUDY_EDIT}
            element={
              <PrivateRoute>
                <StudyEdit />
              </PrivateRoute>
            }
          />
          <Route
            path={STUDY_MANAGE}
            element={
              <PrivateRoute>
                <StudyManage />
              </PrivateRoute>
            }
          />
          <Route path={SIGN_UP} element={<SignUp />} />
        </Route>
        <Route path={LOGIN} element={<Login />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routers;

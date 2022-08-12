import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Layout from '@src/layout/Layout';
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
} from '@router/path';
import {
  Home,
  StudyDetail,
  StudyCreate,
  StudyEdit,
  StudyManage,
  ProfileDetail,
  ProfileEdit,
  Community,
  NotFound,
  Login,
  SignUp,
} from '@pages';

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

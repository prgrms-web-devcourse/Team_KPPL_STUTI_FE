import { Routes, Route, BrowserRouter } from 'react-router-dom';
import {
  COMMUNITY,
  HOME,
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
import Community from '@src/pages/Community';
import Layout from '@src/layout/Layout';
import { Home, ProfileDetail, ProfileEdit } from '@pages';

function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={HOME} element={<Layout />}>
          <Route index element={<Home />} />
          <Route path={COMMUNITY} element={<Community />} />
          <Route path={PROFILE_DETAIL} element={<ProfileDetail />} />
          <Route path={PROFILE_EDIT} element={<ProfileEdit />} />
          <Route path={STUDY_CREATE} element={<StudyCreate />} />
          <Route path={STUDY_DETAIL} element={<StudyDetail />} />
          <Route path={STUDY_EDIT} element={<StudyEdit />} />
          <Route path={STUDY_MANAGE} element={<StudyManage />} />
          <Route path={SIGN_UP} element={<SignUp />} />
        </Route>
        <Route path='/*' />
      </Routes>
    </BrowserRouter>
  );
}

export default Routers;

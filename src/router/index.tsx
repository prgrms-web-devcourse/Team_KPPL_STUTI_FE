import { Switch, BrowserRouter } from 'react-router-dom';
import { Redirect, Route } from 'react-router';
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
import SignUp from '@src/pages/SignUp';
import NavigationHeader from '@src/containers/NavigationHeader/NavigationHeader';
import { Home, ProfileDetail, ProfileEdit } from '@pages';
import ForumIcon from '@mui/icons-material/Forum';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';

function Routers() {
  return (
    <BrowserRouter>
      <NavigationHeader />
      <Switch>
        <Route exact path={HOME} component={Home} />
        <Route exact path={COMMUNITY} component={ForumIcon} />
        <Route exact path={PROFILE_DETAIL} component={ProfileDetail} />
        <Route exact path={PROFILE_EDIT} component={ProfileEdit} />
        <Route exact path={STUDY_DETAIL} component={StudyDetail} />
        <Route exact path={STUDY_CREATE} component={BookmarkAddIcon} />
        <Route exact path={STUDY_EDIT} component={StudyEdit} />
        <Route exact path={STUDY_MANAGE} component={StudyManage} />
        <Route exact path={SIGN_UP} component={SignUp} />
        <Route path='*' render={() => <Redirect to='/error' />} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routers;

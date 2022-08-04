import { Switch } from 'react-router-dom';
import { Redirect, Route, Router } from 'react-router';
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
import NavigationHeader from '@src/containers/NavigationHeader/NavigationHeader';
import history from '@router/history';
import { Home, ProfileDetail, ProfileEdit } from '@pages';

function Routers() {
  return (
    <Router history={history}>
      <NavigationHeader />
      <Switch>
        <Route exact path={HOME} component={Home} />
        <Route exact path={COMMUNITY} component={Community} />
        <Route exact path={PROFILE_DETAIL} component={ProfileDetail} />
        <Route exact path={PROFILE_EDIT} component={ProfileEdit} />
        <Route exact path={STUDY_CREATE} component={StudyCreate} />
        <Route exact path={STUDY_DETAIL} component={StudyDetail} />
        <Route exact path={STUDY_EDIT} component={StudyEdit} />
        <Route exact path={STUDY_MANAGE} component={StudyManage} />
        <Route exact path={SIGN_UP} component={SignUp} />
        <Route path='*' render={() => <Redirect to='/error' />} />
      </Switch>
    </Router>
  );
}

export default Routers;

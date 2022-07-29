import { Switch, BrowserRouter } from 'react-router-dom';
import { Redirect, Route } from 'react-router';
import {
  COMMUNITY,
  HOME,
  PROFILE,
  PROFILE_EDIT,
  SIGN_UP,
  STUDY_CREATE,
  STUDY_DETAIL,
  STUDY_EDIT,
  STUDY_MANAGE,
} from '@src/router/path';
import Home from '@src/pages/Home';
import NavigationHeader from '@src/containers/NavigationHeader/NavigationHeader';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import HandymanIcon from '@mui/icons-material/Handyman';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import ForumIcon from '@mui/icons-material/Forum';
import BuildIcon from '@mui/icons-material/Build';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';

function Routers() {
  return (
    <BrowserRouter>
      <NavigationHeader />
      <Switch>
        <Route exact path={HOME} component={Home} />
        <Route exact path={COMMUNITY} component={ForumIcon} />
        <Route exact path={PROFILE} component={PersonSearchIcon} />
        <Route exact path={PROFILE_EDIT} component={ManageAccountsIcon} />
        <Route exact path={STUDY_DETAIL} component={MenuBookIcon} />
        <Route exact path={STUDY_CREATE} component={BookmarkAddIcon} />
        <Route exact path={STUDY_MANAGE} component={HandymanIcon} />
        <Route exact path={STUDY_EDIT} component={BuildIcon} />
        <Route exact path={SIGN_UP} component={GroupAddIcon} />
        <Route path='*' render={() => <Redirect to='/error' />} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routers;

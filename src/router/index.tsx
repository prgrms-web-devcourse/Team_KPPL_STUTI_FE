import { Switch, BrowserRouter } from 'react-router-dom';
import { Redirect, Route } from 'react-router';
import { HOME } from '@src/router/path';
import Home from '@src/pages/Home';
import NavigationHeader from '@src/containers/NavigationHeader/NavigationHeader';

function Routers() {
  return (
    <BrowserRouter>
      <NavigationHeader />
      <Switch>
        <Route exact path={HOME} component={Home} />
        <Route path='*' render={() => <Redirect to='/error' />} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routers;

import { Switch, BrowserRouter } from 'react-router-dom';
import { Redirect, Route } from 'react-router';
import Home from '@src/pages/Home';
import Sub from '@src/pages/Sub';
import { HOME, SUB } from '@src/router/path';

function Routers() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={SUB} component={Sub} />
        <Route exact path={HOME} component={Home} />
        <Route path="*" render={() => <Redirect to="/error" />} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routers;

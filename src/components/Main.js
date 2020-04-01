import React from 'react';
import { Switch, Route } from 'react-router-dom';
import EpisodeDetail from '../pages/EpisodeDetail';
import Home from '../pages/Home';

const Main = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/episode/:id" component={EpisodeDetail} />
    </Switch>
  );
};

export default Main;

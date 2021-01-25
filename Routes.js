import React from 'react';
import MovieDetailPage from './MovieDetailPage.js';
import MovieListComponent from './MovieListComponent';
import { Route, Switch } from "react-router-dom";

export default function Routes(props) {
    return(
        <Switch>
            <Route exact path="/" component= {MovieListComponent} />
            <Route exact path="/MovieListComponent"  render={()=> <MovieListComponent />} component= {MovieListComponent}></Route>
            <Route exact path="/MovieDetailPage"  render={(props)=> <MovieDetailPage {...props} />} component= {MovieDetailPage}></Route>
        </Switch>
       
    )
}
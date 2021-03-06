import React from "react"
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom"

// import Main from "containers/layouts/Main"
import Admin from "containers/layouts/Admin"

// views
// import Home from "containers/views/Main/Home"
// import NotFound from "containers/views/Main/NotFound"

// admin Views
import Dashboard from "containers/views/Admin/Dashboard"
import Movies from 'containers/views/Admin/Movies'
// import NotFoundAdmin from "containers/views/Admin/NotFound"

const RouterMain = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={() => <Redirect to="/admin/movies" />} />
        <Route path="/admin/:path?" exact>
          <Admin>
            <Switch>
              <Route path="/admin/" exact component={Dashboard} />
              <Route path="/admin/movies" exact component={Movies} />
              <Route path="/admin/turn" exact component={Dashboard} />
              <Route path="/admin/administrators" exact component={Dashboard} />
              <Route path="/admin/profile" exact component={Dashboard} />
              <Route path="/admin/logout" exact component={Dashboard} />
              <Route component={() => <Redirect to="/admin/404" />} />
            </Switch>
          </Admin>
        </Route>
        <Route component={() => <Redirect to="/admin/404" />} />

        {/* <Route>
          <Main>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/404" component={NotFound} />
              <Route component={() => <Redirect to="/404" />} />
            </Switch>
          </Main>
        </Route> */}
      </Switch>
    </Router>
  );
}

export default RouterMain

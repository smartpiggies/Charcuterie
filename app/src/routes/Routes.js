import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  landing as landingRoutes,
  dashboard as dashboardRoutes,
  page as pageRoutes
} from "./index";

import DashboardLayout from "../layouts/Dashboard";
import LandingLayout from "../layouts/Landing";
import AuthLayout from "../layouts/Auth";

import ScrollToTop from "../components/ScrollToTop";

const ChildRoutes = ({ layout: Layout, routes }) => (
  <Layout>
    <Switch>
      {routes.map((category, index) =>
        category.children ? (
          // Route item with children
          category.children.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact
              component={route.component}
            />
          ))
        ) : (
          // Route item without children
          <Route
            key={index}
            path={category.path}
            exact
            component={category.component}
          />
        )
      )}
    </Switch>
  </Layout>
);

const Routes = () => (
  <Router>
    <ScrollToTop>
      <Switch>
        {/* Landing routes */}
        <Route
          path="/"
          exact
          component={() => (
            <ChildRoutes layout={LandingLayout} routes={landingRoutes} />
          )}
        />

        {/* Auth routes */}
        <Route
          path="/auth/*"
          exact
          component={() => (
            <ChildRoutes layout={AuthLayout} routes={pageRoutes} />
          )}
        />

        {/* Dashboard routes */}
        <Route
          path="/*"
          exact
          component={() => (
            <ChildRoutes layout={DashboardLayout} routes={dashboardRoutes} />
          )}
        />
      </Switch>
    </ScrollToTop>
  </Router>
);

export default Routes;

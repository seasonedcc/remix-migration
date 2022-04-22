import React from 'react'
import { Router } from '@reach/router'
import map from 'lodash/map'

import type { RouteProps } from 'shared/core/Route'
import { Route } from 'shared/core/Route'
import ROUTES from 'shared/routes'
import Layout from 'shared/ui/layout'

import NotFound from 'shared/core/NotFound'

const App = () => {
  return (
    <Router className="root-router">
      {map(ROUTES, (route: RouteProps) => (
        <Route
          key={route.path}
          component={route.component || NotFound}
          path={route.path}
          pageTitle={route.pageTitle}
          authorize={route.authorize}
          show={true}
          LayoutComponent={route.LayoutComponent || Layout}
        />
      ))}
      <Route
        component={NotFound}
        default
        path=""
        pageTitle="404 - Page not found"
        show
        LayoutComponent={Layout}
      />
    </Router>
  )
}

export default App

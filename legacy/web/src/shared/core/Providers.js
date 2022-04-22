import { CroodsProvider } from 'croods'
import { authHeaders, saveHeaders } from 'croods-auth'
import { CssBaseline } from '@material-ui/core'
import { StylesProvider } from '@material-ui/core/styles'
import { isDev } from '@seasonedsoftware/utils'

import Loading from 'shared/ui/Loading'
import { snakeCase } from 'lodash'
import SnackbarProvider from 'shared/ui/Snackbar/SnackbarProvider'

const headersOptions = {}

const headers = () => ({
  ...authHeaders(headersOptions),
})

const getBaseURL = () =>
  window?.env?.REACT_APP_API_URL ?? process.env.REACT_APP_API_URL

const Providers = ({ children }) => (
  <CroodsProvider
    handleResponseHeaders={saveHeaders}
    debugRequests={isDev()}
    debugActions={isDev()}
    headers={headers}
    baseUrl={getBaseURL()}
    renderLoading={Loading}
    requestTimeout={30000}
    urlParser={snakeCase}
    renderError={(error) => (
      <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>
    )}
  >
    <SnackbarProvider>
      <StylesProvider>
        <CssBaseline />
        {children}
      </StylesProvider>
    </SnackbarProvider>
  </CroodsProvider>
)

export default Providers

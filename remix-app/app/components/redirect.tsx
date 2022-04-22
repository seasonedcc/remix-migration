import type { NavigateProps } from 'react-router'
import { Navigate } from 'react-router'

type Props = NavigateProps
function Redirect(props: Props) {
  return (
    <>
      <Navigate {...props} />
      <meta httpEquiv="refresh" content={`0; URL='${props.to}'`} />
    </>
  )
}

export default Redirect

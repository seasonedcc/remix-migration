import * as React from 'react'

function useRerender() {
  return React.useReducer(() => ({}), {})[1]
}

export { useRerender }

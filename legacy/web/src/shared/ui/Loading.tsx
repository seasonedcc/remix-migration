import React from 'react'
import { CircularProgress } from '@material-ui/core'

export default function Loading() {
  return (
    <div
      className="flex h-full w-full items-center justify-center"
      data-testid="Circular Loading"
    >
      <CircularProgress />
    </div>
  )
}

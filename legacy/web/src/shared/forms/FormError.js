import React from 'react'
import { FormHelperText } from '@material-ui/core'

export default ({ children, ...props }) =>
  children ? (
    <FormHelperText error {...props}>
      {children}
    </FormHelperText>
  ) : null

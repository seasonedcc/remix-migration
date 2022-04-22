import React from 'react'
import { Container } from '@material-ui/core'

const Content = ({ children }) => (
  <Container>
    <div className="mb-4">{children}</div>
  </Container>
)

export default Content

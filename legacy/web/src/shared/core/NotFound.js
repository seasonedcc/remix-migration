import { Link } from '@reach/router'

import Container from 'shared/ui/Container'
import Title from 'shared/ui/Title'

export default () => (
  <Container>
    <Title>404 - Page not found</Title>
    <p>
      <Link to="/">Go to Home page</Link>
    </p>
  </Container>
)

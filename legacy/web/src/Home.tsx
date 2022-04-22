import React from 'react'
import { useSignOut } from 'croods-auth'

const Home = () => {
  const [{ _signingOut, _error }, signOut] = useSignOut()
  return (
    <div>
      <h2>Home Page</h2>
      <hr />
      <br />
      <p>
        Check out our{' '}
        <a className="text-blue-600" href="/faq">
          FAQ
        </a>
      </p>
      <p>
        <button className="text-blue-600" onClick={() => signOut()}>
          Log out
        </button>
      </p>
    </div>
  )
}

export default Home

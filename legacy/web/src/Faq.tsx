import { useCroods } from 'croods'
import React from 'react'

const FAQ = () => {
  const [{ list }, { fetch }] = useCroods({ name: 'faq' })
  React.useEffect(() => {
    fetch()()
  }, [])

  return (
    <>
      <h1>FAQ Page</h1>
      <hr />
      <br />
      <ul>
        {list.map((faq) => (
          <li key={faq.id}>
            Q: <b>{faq.question}</b>
            <p>
              A: <b>{faq.answer}</b>
            </p>
          </li>
        ))}
      </ul>
    </>
  )
}

export default FAQ

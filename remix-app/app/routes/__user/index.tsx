import { $path } from 'remix-routes'

export default function Index() {
  return (
    <section className="flex w-full grow flex-col text-left">
      <h2>Home Page in Remix</h2>
      <hr />
      <p className="mt-5">
        Check out our
        <a className="text-blue-600" href="/faq">
          FAQ
        </a>
      </p>
      <hr />
      <p className="mt-5">
        <form action={$path('/auth/logout')} method="POST">
          <button className="text-blue-600" type="submit">
            Logout
          </button>
        </form>
      </p>
    </section>
  )
}

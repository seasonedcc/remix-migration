import type {
  ErrorBoundaryComponent,
  LinksFunction,
  MetaFunction,
} from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from '@remix-run/react'
import { Toaster } from 'react-hot-toast'
import { MdCheckCircle } from 'react-icons/md'

import styles from './styles/app.css'

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }]

export const meta: MetaFunction = () => {
  return { title: 'Remix Application' }
}

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  )
}

function Document({
  children,
  title,
}: {
  children: React.ReactNode
  title?: string
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {title && <title>{title}</title>}
        <Meta />
        <Links />
      </head>
      <body className="flex min-h-screen w-screen flex-col overflow-y-auto overflow-x-hidden bg-blue-900 antialiased">
        <Toaster
          position="bottom-right"
          containerClassName="!inset-12"
          toastOptions={{
            className:
              '!bg-blush !text-white !rounded !p-4 !min-w-max !max-w-full',
            icon: <MdCheckCircle className="fill-white text-lg" />,
          }}
        />
        <main className="flex grow flex-col items-center p-4 text-center">
          <div className="my-4 w-full max-w-screen-lg rounded-2xl bg-white p-6">
            {children}
          </div>
        </main>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

export const CatchBoundary = () => {
  const caught = useCatch()
  return (
    <Document title={`${caught.status} - ${caught.statusText}`}>
      <div className="flex grow flex-col items-center justify-center">
        <main className="mx-auto max-w-screen-lg rounded-xl bg-white p-2 text-center sm:rounded-2xl sm:p-4 md:my-4 md:p-6">
          <h1>{caught.status}</h1>
          <p>{caught.statusText}</p>
        </main>
      </div>
    </Document>
  )
}

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  console.error(error)
  return (
    <Document title="Oh no!">
      <div className="flex grow flex-col items-center justify-center">
        <main className="mx-auto max-w-screen-lg rounded-xl bg-white p-2 text-center sm:rounded-2xl sm:p-4 md:my-4 md:p-6">
          <h1>500</h1>
        </main>
      </div>
    </Document>
  )
}

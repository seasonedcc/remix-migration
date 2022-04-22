import React from 'react'
import { usePageId } from '@seasonedsoftware/utils'

import LayoutContent from './LayoutContent'

type Props = {
  pageTitle: string
  location: Location
  breadcrumbs: string[]
  path: string
  children: React.ReactNode
  category: string
}

const Layout = ({ pageTitle, location, children }: Props) => {
  const id = usePageId(location)

  return (
    <div className="relative flex h-screen w-screen overflow-hidden bg-blue-900">
      <LayoutContent id={id} pageTitle={pageTitle} content={children} />
    </div>
  )
}

export default Layout

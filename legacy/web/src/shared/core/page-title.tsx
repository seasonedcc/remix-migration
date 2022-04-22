import { usePageTitle } from 'shared/utils/hooks'

const PageTitle = ({ children }: { children: string }) => {
  usePageTitle(`${children}`)
  return null
}

export default PageTitle

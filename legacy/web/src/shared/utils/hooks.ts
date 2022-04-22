import { useEffect } from 'react'
import { navigate } from '@reach/router'
import type { Store } from 'croods'
import { useStore as createStore } from 'croods'
import { useQueryParam } from '@seasonedsoftware/utils'

const STATIC_TITLE = document.title

export const setTitleFn = (
  store: Store,
  title: string,
  separator: string = '|',
): void => store.setState({ siteTitle: { title, separator } }, 'page@title')

const useGlobal = createStore(
  {
    setTitle: setTitleFn,
  },
  { siteTitle: { title: STATIC_TITLE, separator: '|' } },
)

export const usePageTitle = (text: string): void => {
  const [{ siteTitle }] = useGlobal('page@title')

  const { title, separator } = siteTitle || {}
  useEffect(() => {
    document.title = title ? [text, title].join(` ${separator} `) : text
    return () => {
      document.title = title || STATIC_TITLE
    }
  }, [text, separator, title])
}

// It will grab the redirect_to param from the URL and return a function that
// navigates to such path
// USAGE: const redirectBack = useRedirectBack()
// <button onClick={redirectBack} />
export const useRedirectBack = (
  param: string = 'redirect_to',
  defaultPath: string = '/',
) => {
  const redirect = useQueryParam(param)
  return () => navigate((redirect as unknown as string) || defaultPath)
}

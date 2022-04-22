import PageTitle from 'shared/core/page-title'
import { cx } from 'shared/helpers'

const LayoutContent = ({ id, pageTitle, content }) => (
  <main className={cx('z-[100] max-w-full grow overflow-auto p-2 md:p-4')}>
    <section
      className="mx-auto max-w-screen-lg rounded-xl bg-white p-2 shadow sm:rounded-2xl sm:p-4 md:my-4 md:p-6"
      id={id}
    >
      {pageTitle && <PageTitle>{pageTitle}</PageTitle>}
      {content}
    </section>
  </main>
)

export default LayoutContent

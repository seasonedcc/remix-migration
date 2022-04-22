import type { DeviseUser } from '~/framework/common/types'

function create(user: DeviseUser) {
  localStorage.setItem('authCredentials', JSON.stringify(user))
}

function destroy() {
  localStorage.removeItem('authCredentials')
}

export { create, destroy }

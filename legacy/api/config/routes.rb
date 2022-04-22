# frozen_string_literal: true

Rails.application.routes.draw do # rubocop:disable Metrics/BlockLength
  resources :faq, only: %i[index]
  mount_devise_token_auth_for 'User', at: 'auth', controllers: {
    passwords: 'auth/passwords', sessions: 'sessions'
  }, skip: [:invitations]

  require 'sidekiq/web'
  if Rails.env.production?
    Sidekiq::Web.use Rack::Auth::Basic do |username, password|
      ActiveSupport::SecurityUtils.secure_compare(
        ::Digest::SHA256.hexdigest(username),
        ::Digest::SHA256.hexdigest(ENV['SIDEKIQ_USERNAME'])
      ) &
        ActiveSupport::SecurityUtils.secure_compare(
          ::Digest::SHA256.hexdigest(password),
          ::Digest::SHA256.hexdigest(ENV['SIDEKIQ_PASSWORD'])
        )
    end
  end
  mount Sidekiq::Web, at: '/sidekiq'
end

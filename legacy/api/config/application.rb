# frozen_string_literal: true

require_relative 'boot'

require 'rails'
require 'active_model/railtie'
require 'active_job/railtie'
require 'active_record/railtie'
require 'active_storage/engine'
require 'action_controller/railtie'
require 'action_mailer/railtie'
require 'action_view/railtie'
require 'action_cable/engine'
require 'rails/test_unit/railtie'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Legacy
  class Application < Rails::Application
    config.load_defaults 5.2
    config.api_only = false
    config.time_zone = 'UTC'
    config.i18n.default_locale = :'en'
    config.i18n.available_locales = [:'en']
    config.action_cable.mount_path = '/cable'

    config.autoload_paths += [
      Rails.root.join('app', 'mailers', 'concerns').to_s
    ]
    config.autoload_paths += [
      Rails.root.join('spec', 'mailers', 'concerns').to_s
    ]
  end
end

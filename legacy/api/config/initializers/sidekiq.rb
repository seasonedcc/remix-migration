# frozen_string_literal: true

Sidekiq.configure_server do |config|
  config.redis = {
    url: ENV['REDISTOGO_URL'] || ENV['REDIS_URL'] || 'redis://redis:6379'
  }
end
Sidekiq.configure_client do |config|
  config.redis = {
    url: ENV['REDISTOGO_URL'] || ENV['REDIS_URL'] || 'redis://redis:6379'
  }
end

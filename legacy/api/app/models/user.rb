# frozen_string_literal: true

class User < ApplicationRecord
  extend Devise::Models
  include Rails.application.routes.url_helpers

  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :trackable, :validatable

  include DeviseTokenAuth::Concerns::User
end

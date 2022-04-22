# frozen_string_literal: true

class OrganizationNotAuthorizedError < StandardError; end

class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken
  include Pundit

  before_action :configure_permitted_parameters, if: :devise_controller?

  rescue_from ActiveRecord::RecordNotFound, with: :not_found
  rescue_from ActiveRecord::RecordNotUnique, with: :unprocessable_entity
  rescue_from ActiveRecord::RecordInvalid, with: :unprocessable_entity
  rescue_from Pundit::NotAuthorizedError, with: :forbidden

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit :sign_up, keys: sign_up_keys
    devise_parameter_sanitizer.permit :account_update, keys: account_update_keys
  end

  def sign_up_keys
    []
  end

  def account_update_keys
    %i[first_name last_name role password password_confirmation]
  end

  def not_found(exception)
    render status: :not_found, json: {
      id: 'not_found',
      message: exception.message
    }
  end

  def unprocessable_entity(exception)
    render status: :unprocessable_entity, json: {
      id: 'unprocessable_entity',
      message: exception.message
    }
  end

  def forbidden(exception)
    render status: :forbidden, json: {
      id: 'forbidden',
      message: exception.message
    }
  end
end

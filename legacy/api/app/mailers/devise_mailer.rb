# frozen_string_literal: true

class DeviseMailer < Devise::Mailer
  include Devise::Controllers::UrlHelpers
  layout 'layouts/mailer'
  default template_path: 'devise/mailer'
  default from: "legacy app <#{ENV['DEFAULT_FROM_EMAIL']}>"

  def reset_password_instructions(record, token, opts = {})
    @token = token
    @resource = record
    @redirect_url = opts[:redirect_url]
    # Custom logic to send the email with MJML
    mail(
      to: record.email,
      subject: 'Password recovery'
    ) do |format|
      format.text
      format.mjml
    end
  end
end

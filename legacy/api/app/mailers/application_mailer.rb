# frozen_string_literal: true

class ApplicationMailer < ActionMailer::Base
  default from: "legacy app <#{ENV['DEFAULT_FROM_EMAIL']}>"
  layout 'layouts/mailer'

  def mail(headers)
    super(headers) do |format|
      format.text
      format.mjml
    end
  end
end

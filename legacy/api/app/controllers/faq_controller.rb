# frozen_string_literal: true

class FaqController < ApplicationController
  def index
    render status: :ok, json: Faq.all.order(sorting: :asc, created_at: :desc)
  end
end

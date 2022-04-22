# frozen_string_literal: true

class Faq < ApplicationRecord
  validates :question, :answer, presence: true

  def as_json(_options = {})
    {
      id: id,
      question: question,
      answer: answer
    }
  end
end

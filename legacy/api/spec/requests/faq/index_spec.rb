# frozen_string_literal: true

require 'rails_helper'

describe 'GET /faq', type: :request do
  let(:faq_1) { Faq.create!(question: 'Foo 1', answer: 'Bar 1', sorting: 3) }
  let(:faq_2) { Faq.create!(question: 'Foo 2', answer: 'Bar 2', sorting: 0) }
  let(:faq_3) { Faq.create!(question: 'Foo 3', answer: 'Bar 3', sorting: 1) }
  let(:faq_4) { Faq.create!(question: 'Foo 4', answer: 'Bar 4', sorting: 5) }
  let(:faq_5) { Faq.create!(question: 'Foo 5', answer: 'Bar 5', sorting: 0) }

  let(:create_faqs) do
    faq_1
    faq_2
    faq_3
    faq_4
    faq_5
  end

  let(:expected_hash) do
    [
      { 'id' => faq_5.id, 'question' => 'Foo 5', 'answer' => 'Bar 5' },
      { 'id' => faq_2.id, 'question' => 'Foo 2', 'answer' => 'Bar 2' },
      { 'id' => faq_3.id, 'question' => 'Foo 3', 'answer' => 'Bar 3' },
      { 'id' => faq_1.id, 'question' => 'Foo 1', 'answer' => 'Bar 1' },
      { 'id' => faq_4.id, 'question' => 'Foo 4', 'answer' => 'Bar 4' }
    ]
  end

  before { create_faqs }

  context 'without params' do
    before do
      get '/faq'
    end

    it { expect(response).to have_http_status(:ok) }
    it { expect(JSON.parse(response.body)).to match_array(expected_hash) }
    it { expect(JSON.parse(response.body).length).to eq(5) }
  end
end

# frozen_string_literal: true

class CreateFaqs < ActiveRecord::Migration[5.2]
  def change
    create_table :faqs do |t|
      t.string :question, null: false
      t.text :answer, null: false
      t.integer :sorting, default: 0

      t.timestamps
    end
  end
end

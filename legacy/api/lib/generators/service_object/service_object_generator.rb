# frozen_string_literal: true

class ServiceObjectGenerator < Rails::Generators::NamedBase
  source_root File.expand_path('templates', __dir__)

  def generate_service_object
    template 'service_object_template.erb', "app/services/#{name.underscore}.rb"
    template(
      'service_object_template_spec.erb',
      "spec/services/#{name.underscore}_spec.rb"
    )
  end

  private

  def service_object_name
    name.camelcase
  end
end

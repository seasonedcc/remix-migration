User.create!(email: 'user@example.com', password: 'somesecurepassword', provider: 'email')
Faq.create!(question: 'Is this page being rendered by the legacy application?', answer: 'Yes! This is delivered through a resource route that proxies the request and renders as if it was a part of the new app.')
# Remix migration example

This is  only an example for didactic purposes.
Do not use in production.

## Prerequisites

To run this example you will need to have installed:
* [Ruby](https://www.ruby-lang.org/en/)
* [Node](https://nodejs.org/en/)
* [PostgreSQL](https://www.postgresql.org/)

## Quick start

The following script (in the repository root) will install each application's dependencies:

```
./setup.sh
```

## Applications used in this example

  * Legacy Rails backend in [legacy/api](./legacy/api)
  * Legacy React SPA in [legacy/web](./legacy/web)
  * New Remix app in [remix-app](./remix-app)

## References

 * [Remix domains](https://github.com/SeasonedSoftware/remix-domains) used to implement the application login logic.
 * [devise_token_auth](https://github.com/lynndylanhurley/devise_token_auth) is the gem used to authenticate the SPA on the Rails API.
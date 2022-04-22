const binCommand = "bin/";
const onlyChangedRbFiles = `git status | xargs ls -1 2>/dev/null | grep '\.rb$' | grep -v -e 'schema\.rb$'`;
const onlyChangedTests = `git status | xargs ls -1 2>/dev/null | grep '^spec\/' | grep '\.rb$'`;

module.exports = {
  hooks: {
    "pre-commit": `${onlyChangedTests} | xargs ${binCommand}rspec && ${onlyChangedRbFiles} | xargs ${binCommand}rubocop -a`,
    "post-rebase": `${binCommand}bundle install`,
    "post-merge": `${binCommand}bundle install --frozen`,
    "post-checkout": `CHECKOUT_BRANCH=\${HUSKY_GIT_PARAMS##* }; if [ "$CHECKOUT_BRANCH" -eq "1" ]; then ${binCommand}bundle install --frozen; fi`
  }
};

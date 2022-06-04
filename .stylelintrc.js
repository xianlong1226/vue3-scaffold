module.exports = {
  extends: [
    "stylelint-config-html",
    "stylelint-config-standard-scss",
    "stylelint-config-recommended-vue/scss"
  ],
  rules: {
    'max-nesting-depth': [4]
  }
}

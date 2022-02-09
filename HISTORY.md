# Changelog

Notable changes to this project will be documented in this file.

## v0.0.0, 2022-02-09, [@msfninja](https://github.com/msfninja)

### Notes

The `sanitise` function now supports passing a callback as an
argument.

### Added

 - [96b578b](https://github.com/kerig-it/sanitiser/commit/96b578bf1bb9852f1cd5c3611e4ccb9927bb6c0d):
 **Update `index.js`**:
  * Add `callback` parameter to `sanitise`.
  * Change the string build-up inside the forEach loop.
  * Remove `checkOptions`.
 - [08693df](https://github.com/kerig-it/sanitiser/commit/08693dfb9c91f3bb94fd831ab9dd051d31256e96):
 **Update `README.md`**:
  * Add documentation for the new parameter configuration in `sanitise`.
  * Add more examples.
 - [a887f0f](https://github.com/kerig-it/sanitiser/commit/a887f0f6c07fed8cc2af45fc0b93df854051d75e):
 **Update `test.js`**: [Add package testing].

## v0.0.0-beta.1, 2022-02-04, [@msfninja](https://github.com/msfninja)

### Notes

The `sanitise` function accepts a third parameter&#8212;`options`.
Support for the Windows directory separator `\` has been added as
well.

### Added

 - [`f3ca2f2`](https://github.com/kerig-it/sanitiser/commit/f3ca2f276c4fa2da2133dba702a0d32d53ddf97a):
 **Update `index.js`**: Add allowance for Windows directory separators
 `\`.
 - [`fa8cfcf`](https://github.com/kerig-it/sanitiser/commit/fa8cfcfcfc7a48bccf9f29b221d3998e42d16455):
 **Update `index.js`**:
   * Add `options` parameter to `sanitise()` function.
   * Add `checkOptions()` function for validating supplied options.
 - [`b4a5b04`](https://github.com/kerig-it/sanitiser/commit/b4a5b0459d67d4a4f5b6014ea148a32a5404aec6):
 **Update `README.md`**: Add documentation for `options` parameter in
 the `sanitise()` function.

### Changed

 - [`fedcdc4`](https://github.com/kerig-it/sanitiser/commit/fedcdc40182802b0e3aefd4a6428c308c0f69d61):
 **Update `README.md`**:
   * Add `\` directory separator.
   * Add regular expression code snippets.
   * Add hyperlink to path name truncation.

## v0.0.0-beta.0, 2022-02-02, [@msfninja](https://github.com/msfninja)

### Notes

This pre-release comes with documentation and an improved more
readable code style. In several files, each line has been reduced to
70 characters or less, if possible.

### Added

 - [`45086c8`](https://github.com/kerig-it/sanitiser/commit/45086c8f05cee1ee9d0a253baeed4a2c085c9dc1):
 **Update `README.md`**: Add documentation.

### Changed

 - [`6df71cc`](https://github.com/kerig-it/sanitiser/commit/6df71ccd0fb519107eceb38ef2110a6b116dacf8):
 **Rename `LICENSE` to `LICENCE`**: In the name of more consistent
 style of English.

 - [`0e43dc0`](https://github.com/kerig-it/sanitiser/commit/0e43dc02d74b4b84fc53bcdb8c32484b92c61b48):
 **Update `SECURITY.md`**:
   * Reduce the amount of characters per line to 70 or less, if
   possible.
   * General improvements.

 - [`2d2bd43`](https://github.com/kerig-it/sanitiser/commit/2d2bd43386cfade47f706d1a55c0278bdeed509b):
 **Update `index.js`**: Reduce the amount of characters per line to 70
 or less, if possible, improving overall readability.

### Removed

 - [`f055dc8`](https://github.com/kerig-it/sanitiser/commit/f055dc83dfd098304a4f22defe0bf38ec759a3e7):
 **Delete `config.json`**: File has no use.

## v0.0.0-alpha.0, 2022-02-01, [@msfninja](https://github.com/msfninja)

### Notes

Initial pre-release.

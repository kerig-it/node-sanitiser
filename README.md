<h1 align="center">Sanitiser</h1>

`sanitiser` is a path name sanitiser. It's based off of the
[`sanitize-filename`](https://github.com/parshap/node-sanitize-filename)
package, but accepts directory separators such as `/` and `\`, making
it viable to sanitise path names, as well as filenames.

<table>
	<tr>
		<th>Table of Contents</th>
	</tr>
	<tr>
		<td>
			<ul>
				<li>
					<a href="#notice">Notice</a>
				</li>
				<li>
					<a href="#installing">Installing</a>
				</li>
				<li>
					<a href="#usage">Usage</a>
				</li>
				<ul>
					<li>
						<a href="#syntax">Syntax</a>
					</li>
					<li>
						<a href="#importing">Importing</a>
					</li>
					<li>
						<a href="#sanitising">Sanitising</a>
					</li>
					<li>
						<a href="#examples">Examples</a>
					</li>
				</ul>
				<li>
					<a href="#testing">Testing</a>
				</li>
				<li>
					<a href="#support">Support</a>
				</li>
			</ul>
		</td>
	</tr>
</table>

## Notice

This repository is licenced under the [MIT licence](https://mit-license.org/).
For a full picture of your rights and responsibilities, refer to the
licence file in the root directory of this repository ([`LICENCE`](/LICENCE)).

## Installing

This package is a [node package](https://nodejs.org/api/packages.html#modules-packages).
To install it using [npm](https://npmjs.org) (Node package manager),
issue the below command in your shell, given you are in the relevant
working directory of your project/repository:

```bash
npm i sanitiser
```

This will add `sanitiser` in your dependancies in your [`package.json`](https://nodejs.dev/learn/the-package-json-guide)
file.

## Usage

### Syntax

```plain
sanitiser(pathname[, options, callback]);
```

 - `pathname` \<string\> Path
 - `options` \<Object\>
   * `ignoreControl` \<boolean\> **Default**: `false`
   * `ignoreIllegal` \<boolean\> **Default**: `false`
   * `ignoreRelative` \<boolean\> **Default**: `false`
   * `replacement` \<string\> Replacer in `replace()`
 - `callback` \<Function\>
   * `error` \<boolean\> | \<Error\> `false` if no error
   * `result` \<string\> Sanitised path

[More information in Sanitising](#sanitising).

### Importing

To use the `sanitiser` package in your project/code, you can add it
using [`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)
or [`require`](https://nodejs.org/en/knowledge/getting-started/what-is-require/).

**`import`**:

```js
import sanitiser from 'sanitiser';
```

**`require`:**

```js
const sanitiser = require('sanitiser');
```

### Sanitising

`sanitiser` is a function that accepts three arguments.

|Parameter|Type|Mandatory|Description|
|---|---|---|---|
|`pathname`|String|Yes|Holds the path name that has to be sanitised.|
|[`options`](#options-parameter)|Object|No|Holds an object with proprties that can configure the behaviour of the `sanitise` function.|
|[`callback`](#callback-parameter)|Function|No|Holds a callback function that will be executed when `pathname` is sanitised.|

<b id="options-parameter">`options` parameter</b>

|Property|Type|Default|Description|
|---|---|---|---|
|`ignoreControl`|Boolean|`false`|Defines whether or not to apply [the control characters regular expression](#control-characters).|
|`ignoreIllegal`|Boolean|`false`|Defines whether or not to apply [the illegal characters regular expression](#illegal-characters).|
|`ignoreRelative`|Boolean|`false`|Defines whether or not to apply [the relative paths regular expression](#relative-paths).|
|`noTruncation`|Boolean|`false`|Defines whether or not to [truncate the path name to 4096 bytes](https://unix.stackexchange.com/a/32834).|
|`replacement`|String|Empty string|Holds a string that illegal characters in `pathname` will be replaced with.|

<b id="callback-parameter">`callback` parameter</b>

|Parameter|Type|Description|
|---|---|---|
|`error`|Boolean/Error|Is `false` if there is no error, and an `Error` instance upon errors.|
|`result`|String|Holds the sanitised path name.|

So, the first parameter is the actual string representing the path
that you would like to sanitise. The second parameter is an object
where you can supply specific options to alter the behaviour of the
`sanitise` function. The third parameter is a callback function with
two parameters of its own that will be executed once the path name is
sanitised.

Below are all regular expressions that are used in sanitising a path
name.

<b id="control-characters">Control characters:</b>

```js
/[\x00-\x1f\x80-\x9f]/g
```

<b id="illegal-characters">Illegal characters:</b>

```js
/[\?<>:\*\|"]/g
```

<b id="relative-paths">Relative paths:</b>

```js
/^\.+$/
```

Before the regular expression will be applied to the supplied path
name, though, `pathname` will be [truncated to 4096 bytes](https://unix.stackexchange.com/a/32834)
with the aid of the [`truncate-utf8-bytes`](https://github.com/parshap/truncate-utf8-bytes)
package. It is possible to not truncate the path name by supplying the
`noTruncation` option being set to `true` in [the `options` parameter](#options-parameter).

The `sanitise` function returns a string representing the sanitised
path name or the callback, if supplied.

### Examples

Sanitised path name assigment to a variable.

```js
const sanitiser = require('sanitiser');

let pathname = '/some/../arbitrary/./path/*';
let sanitised = sanitiser(pathname);

console.log(sanitsed);
// Expected output: /some/arbitrary/path/
```

Sanitised path name output via a callback.

```js
const sanitiser = require('sanitiser');

let pathname = '/some/../arbitrary/./path/*';

sanitiser(pathname, (error, result) => {
	if (error) throw error;

	console.log(result);
	// Expected output: /some/arbitrary/path/
});
```

Sanitised path name with `ignoreRelative` enabled output via a callback.

```js
const sanitiser = require('sanitiser');

let pathname = '/some/../arbitrary/./path/*';

sanitiser(pathname, { ignoreRelative: true }, (error, result) => {
	if (error) throw error;

	console.log(result);
	// Expected output: /some/../arbitrary/./path/
});
```

## Testing

To test the sanitiser, you can issue the below command in your shell,
given your working directory is the root directory of this repository.

```bash
npm test
```

This will run a test of the package.

## Support

If you have any further questions or you ran into problems, you can
contact any of this repository contributors or open an issue on
[our GitHub repository](https://github.com/kerig-it/sanitiser/issues).
If you chose the former, you can choose from one of the below e-mail
addresses:

 - <msfninja@pm.me> ([@msfninja](https://github.com/msfninja))

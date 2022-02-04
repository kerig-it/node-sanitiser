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
				</ul>
				<li>
					<a href="#examples">Examples</a>
				</li>
				<!-- <li>
					<a href="#testing">Testing</a>
				</li> -->
				<li>
					<a href="#support">Support</a>
				</li>
			</ul>
		</td>
	</tr>
</table>

# Notice

This repository is licenced under the [MIT licence](https://mit-license.org/).
For a full picture of your rights and responsibilities, refer to the
licence file in the root directory of this repository ([`LICENCE`](/LICENCE)).

# Installing

This package is a [node package](https://nodejs.org/api/packages.html#modules-packages).
To install it using [npm](https://npmjs.org) (Node package manager),
issue the below command in your shell, given you are in the relevant
working directory of your project/repository:

```bash
npm i sanitiser
```

This will add `sanitiser` in your dependancies in your [`package.json`](https://nodejs.dev/learn/the-package-json-guide)
file.

# Usage

## Syntax

```plain
sanitiser(pathname[, replacement], options);
```

 - `pathname` \<string\> Path
 - `replacement` \<string\> Replacer in `replace()`
 - `options` \<Object\>
   * `ignoreControl` \<boolean\> **Default**: `false`
   * `ignoreIllegal` \<boolean\> **Default**: `false`
   * `ignoreRelative` \<boolean\> **Default**: `false`

[More information in Sanitising](#sanitising).

## Importing

To use the `sanitiser` package in your project/code, you can add it
using [`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)
or [`require()`](https://nodejs.org/en/knowledge/getting-started/what-is-require/).

**`import`**:

```js
import sanitiser from 'sanitiser';
```

**`require()`:**

```js
const sanitiser = require('sanitiser');
```

## Sanitising

`sanitiser` is a function that accepts three arguments.

|Parameter|Type|Mandatory|Description|
|---|---|---|---|
|`pathname`|String|Yes|Holds the path name that has to be sanitised.|
|`replacement`|String|No|Holds a string that illegal characters in `pathname` will be replaced with.|
|[`options`](#options-parameter)|Object|No|Holds an object with proprties that can configure the behaviour of the `sanitise()` function.|

<b id="options-parameter">`options` parameter</b>

|Property|Type|Description|
|---|---|---|
|`ignoreControl`|Boolean|Defines whether or not apply [the control characters regular expression](#control-characters).|
|`ignoreIllegal`|Boolean|Defines whether or not apply [the illegal characters regular expression](#illegal-characters).|
|`ignoreRelative`|Boolean|Defines whether or not apply [the relative paths regular expression](#relative-paths).|

The first parameter is the actual path name that you want to sanitise.
The second parameter is a string that you would like the illegal
characters be replaced with. In case you don't supply a replacer, the
illegal characters in the `pathname` string will simply be removed.

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
package.

The `sanitiser` function returns a string representing the sanitised
path name.

# Examples

In the example below, a path name is being sanitised.

```js
const sanitiser = require('sanitiser');

let pathanme = '/some/../arbitrary/./path/*';
let sanitised = sanitiser(pathname);

console.log(sanitsed);
// Expected output: //some//arbitrary//path/
```

<!-- # Testing

To test the sanitiser, you can issue the below command in your shell,
given you are in the relevant working directory.

```bash
npm test
```

This will run a test of the package. -->

# Support

If you have any further questions or you ran into problems, you can
contact any of this repository's contributors or open an issue on
[our GitHub repository](https://github.com/kerig-it/sanitiser/issues).
If you chose the former, you can choose one of the e-mail addresses
below:

 - <msfninja@pm.me> ([@msfninja](https://github.com/msfninja))

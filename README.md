### Hexlet tests and linter status:
[![Actions Status](https://github.com/hellion86/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/hellion86/frontend-project-lvl2/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/a07a5c3b664fee55e4e1/maintainability)](https://codeclimate.com/github/hellion86/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/a07a5c3b664fee55e4e1/test_coverage)](https://codeclimate.com/github/hellion86/frontend-project-lvl2/test_coverage)
[![Node CI](https://github.com/hellion86/frontend-project-lvl2/workflows/linter-test/badge.svg)](https://github.com/hellion86/frontend-project-lvl2/actions)


## Description
:hammer:Diff generator is a program that determines the difference between two data structures. A similar mechanism is used in tests' output or while tracking changes in configuration files.

Features:

* different input formats: yaml, json;
* different report generation formats: plain text, stylish and json;

### 1. Install dependencies:
```
$ make install
```

### 2. Use as console utilite

```
$ cd bin
$ chmod +x gendiff.js
$ sudo npm link
$ gendiff -h
```

### Using
* Functional programming: no let/for/classes, immutable
* JEST
* Github Actions, Eslint

### Example of work
[![asciicast](https://asciinema.org/a/aqAmNrPN7SBGNEtEVmwx15NTq.svg)](https://asciinema.org/a/aqAmNrPN7SBGNEtEVmwx15NTq)
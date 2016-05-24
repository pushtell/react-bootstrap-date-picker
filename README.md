# React-Bootstrap based date picker.

[![NPM Version](https://badge.fury.io/js/react-bootstrap-date-picker.svg)](https://www.npmjs.com/package/react-bootstrap-date-picker)
[![Circle CI](https://circleci.com/gh/pushtell/react-bootstrap-date-picker.svg?style=shield)](https://circleci.com/gh/pushtell/react-bootstrap-date-picker)
[![Coverage Status](https://coveralls.io/repos/pushtell/react-bootstrap-date-picker/badge.svg?branch=master&service=github)](https://coveralls.io/github/pushtell/react-bootstrap-date-picker?branch=master)
[![Dependency Status](https://david-dm.org/pushtell/react-bootstrap-date-picker.svg)](https://david-dm.org/pushtell/react-bootstrap-date-picker)
[![NPM Downloads](https://img.shields.io/npm/dm/react-bootstrap-date-picker.svg?style=flat)](https://www.npmjs.com/package/react-bootstrap-date-picker)

See the demo at [pushtell.github.io/react-bootstrap-date-picker](http://pushtell.github.io/react-bootstrap-date-picker/).

[![Demo](https://cdn.rawgit.com/pushtell/react-bootstrap-date-picker/master/documentation-images/date-picker-screencast.gif)](http://pushtell.github.io/react-bootstrap-date-picker/)

Please [★ on GitHub](https://github.com/pushtell/react-bootstrap-date-picker)!

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<h1>Table of Contents</h1>

- [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)
  - [`<DatePicker />`](#datepicker-)
- [Tests](#tests)
  - [Browser Coverage](#browser-coverage)
  - [Running Tests](#running-tests)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

`react-bootstrap-date-picker` is compatible with React 0.14.x and 0.15.x.

```bash
npm install react-bootstrap-date-picker
```

## Usage

```js
var DatePicker = require("react-bootstrap-date-picker");

var App = React.createClass({
  getInitialState: function(){
    var value = new Date().getISOString();
    return {
      value: value
    }
  },
  handleChange: function(value) {
    // value is an ISO String.
    this.setState({
      value: value
    });
  },
  render: function(){
    return <FormGroup>
      <ControlLabel>Label</ControlLabel>
      <DatePicker value={this.state.value} onChange={this.handleChange} />
      <HelpBlock>Help</HelpBlock>
    </FormGroup>;
  }
});

```

## API Reference

### `<DatePicker />`

DatePicker component. Renders as a [React-Bootstrap InputGroup](https://react-bootstrap.github.io/components.html#forms-input-groups).

[InputGroup](https://react-bootstrap.github.io/components.html#forms-input-groups) properties are passed through to the input group.

* **Properties:**
  * `value` - ISO date string representing the current value.
    * **Optional**
    * **Type:** `string`
    * **Example:** `"2016-05-19T16:00:00.000Z"`
  * `onChange` - Focus callback function.
    * **Optional**
    * **Type:** `function`
    * **Callback Arguments:**
      * `value` - ISO date string representing the selected value.
        * **Type:** `String`
        * **Example:** `"2016-05-19T16:00:00.000Z"`
  * `onFocus` - Focus callback function.
    * **Optional**
    * **Type:** `function`
    * **Callback Arguments:**
      * `event` - Focus event.
        * **Type:** `Event`
  * `onBlur` - Blur callback function.
    * **Optional**
    * **Type:** `function`
    * **Callback Arguments:**
      * `event` - Blur event.
        * **Type:** `Event`
  * `dateFormat` - Date format. Any combination of DD, MM, YYYY and separator.
    * **Optional**
    * **Type:** `string`
    * **Examples:** `"MM/DD/YYYY"`, `"YYYY/MM/DD"`, `"MM-DD-YYYY"`, or `"DD MM YYYY"`
  * `clearButtonElement` - Character or component to use for the clear button.
    * **Optional**
    * **Type:** `string` or `ReactClass`
    * **Example:** `"×"`
  * `previousButtonElement` - Character or component to use for the calendar's previous button.
    * **Optional**
    * **Type:** `string` or `ReactClass`
    * **Example:** `"<"`
  * `nextButtonElement` - Character or component to use for the calendar's next button.
    * **Optional**
    * **Type:** `string` or `ReactClass`
    * **Example:** `">"`
  * `cellPadding` - CSS padding value for calendar date cells.
    * **Optional**
    * **Type:** `string`
    * **Example:** `"2px"`
  * `dayLabels` - Array of day names to use in the calendar. Starting on Sunday.
    * **Optional**
    * **Type:** `array`
    * **Example:** `['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']`
  * `monthLabels` - Array of month names to use in the calendar.
    * **Optional**
    * **Type:** `array`
    * **Example:** `['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']`
  * `calendarPlacement` - Overlay placement for the popover calendar.
    * **Optional**
    * **Type:** `string`
    * **Example:** `"top"`

## Tests

### Browser Coverage

[Karma](http://karma-runner.github.io/0.13/index.html) tests are performed on [Browserstack](https://www.browserstack.com/) in the following browsers:

* IE 9, Windows 7
* IE 10, Windows 7
* IE 11, Windows 7
* Opera (latest version), Windows 7
* Firefox (latest version), Windows 7
* Chrome (latest version), Windows 7
* Safari (latest version), OSX Yosemite
* Mobile Safari (latest version), iPhone 6, iOS 8.3

Please [let us know](https://github.com/pushtell/react-bootstrap-date-picker/issues/new) if a different configuration should be included here.

### Running Tests

Locally:

```bash

npm test

```

On [Browserstack](https://www.browserstack.com/):

```bash

BROWSERSTACK_USERNAME=YOUR_USERNAME BROWSERSTACK_ACCESS_KEY=YOUR_ACCESS_KEY npm test

```

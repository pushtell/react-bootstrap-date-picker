'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _FormControl = require('react-bootstrap/lib/FormControl');

var _FormControl2 = _interopRequireDefault(_FormControl);

var _InputGroup = require('react-bootstrap/lib/InputGroup');

var _InputGroup2 = _interopRequireDefault(_InputGroup);

var _Popover = require('react-bootstrap/lib/Popover');

var _Popover2 = _interopRequireDefault(_Popover);

var _Button = require('react-bootstrap/lib/Button');

var _Button2 = _interopRequireDefault(_Button);

var _Overlay = require('react-bootstrap/lib/Overlay');

var _Overlay2 = _interopRequireDefault(_Overlay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CalendarHeader = _react2.default.createClass({
  displayName: "DatePickerHeader",
  propTypes: {
    displayDate: _react2.default.PropTypes.object.isRequired,
    onChange: _react2.default.PropTypes.func.isRequired,
    monthLabels: _react2.default.PropTypes.array.isRequired,
    previousButtonElement: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.object]).isRequired,
    nextButtonElement: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.object]).isRequired
  },
  handleClickPrevious: function handleClickPrevious() {
    var newDisplayDate = new Date(this.props.displayDate);
    newDisplayDate.setMonth(newDisplayDate.getMonth() - 1);
    this.props.onChange(newDisplayDate);
  },
  handleClickNext: function handleClickNext() {
    var newDisplayDate = new Date(this.props.displayDate);
    newDisplayDate.setMonth(newDisplayDate.getMonth() + 1);
    this.props.onChange(newDisplayDate);
  },
  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: 'text-center' },
      _react2.default.createElement(
        'div',
        { className: 'text-muted pull-left', onClick: this.handleClickPrevious, style: { cursor: "pointer" } },
        this.props.previousButtonElement
      ),
      _react2.default.createElement(
        'span',
        null,
        this.props.monthLabels[this.props.displayDate.getMonth()],
        ' ',
        this.props.displayDate.getFullYear()
      ),
      _react2.default.createElement(
        'div',
        { className: 'text-muted pull-right', onClick: this.handleClickNext, style: { cursor: "pointer" } },
        this.props.nextButtonElement
      )
    );
  }
}); // See http://jszen.blogspot.com/2007/03/how-to-build-simple-calendar-with.html for calendar logic.

var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

var Calendar = _react2.default.createClass({
  displayName: "DatePickerCalendar",
  propTypes: {
    selectedDate: _react2.default.PropTypes.object,
    displayDate: _react2.default.PropTypes.object.isRequired,
    onChange: _react2.default.PropTypes.func.isRequired,
    dayLabels: _react2.default.PropTypes.array.isRequired,
    cellPadding: _react2.default.PropTypes.string.isRequired
  },
  handleClick: function handleClick(day) {
    var newSelectedDate = new Date(this.props.displayDate);
    newSelectedDate.setHours(12);
    newSelectedDate.setMinutes(0);
    newSelectedDate.setSeconds(0);
    newSelectedDate.setMilliseconds(0);
    newSelectedDate.setDate(day);
    this.props.onChange(newSelectedDate);
  },
  render: function render() {
    var _this = this;

    var currentDate = new Date();
    var currentDay = currentDate.getDate();
    var currentMonth = currentDate.getMonth();
    var currentYear = currentDate.getFullYear();
    var selectedDay = this.props.selectedDate ? this.props.selectedDate.getDate() : null;
    var selectedMonth = this.props.selectedDate ? this.props.selectedDate.getMonth() : null;
    var selectedYear = this.props.selectedDate ? this.props.selectedDate.getFullYear() : null;
    var year = this.props.displayDate.getFullYear();
    var month = this.props.displayDate.getMonth();
    var firstDay = new Date(year, month, 1);
    var startingDay = firstDay.getDay();
    var monthLength = daysInMonth[month];
    if (month == 1) {
      if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0) {
        monthLength = 29;
      }
    }
    var weeks = [];
    var day = 1;
    for (var i = 0; i < 9; i++) {
      var week = [];
      for (var j = 0; j <= 6; j++) {
        if (day <= monthLength && (i > 0 || j >= startingDay)) {
          var selected = day === selectedDay && month == selectedMonth && year === selectedYear;
          var current = day === currentDay && month == currentMonth && year === currentYear;
          week.push(_react2.default.createElement(
            'td',
            { key: j, onClick: this.handleClick.bind(this, day), style: { cursor: "pointer", padding: this.props.cellPadding }, className: selected ? "bg-primary" : current ? "text-muted" : null },
            day
          ));
          day++;
        } else {
          week.push(_react2.default.createElement('td', { key: j }));
        }
      }
      weeks.push(_react2.default.createElement(
        'tr',
        { key: i },
        week
      ));
      if (day > monthLength) {
        break;
      }
    }
    return _react2.default.createElement(
      'table',
      { className: 'text-center' },
      _react2.default.createElement(
        'thead',
        null,
        _react2.default.createElement(
          'tr',
          null,
          this.props.dayLabels.map(function (label, index) {
            return _react2.default.createElement(
              'td',
              { key: index, className: 'text-muted', style: { padding: _this.props.cellPadding } },
              _react2.default.createElement(
                'small',
                null,
                label
              )
            );
          })
        )
      ),
      _react2.default.createElement(
        'tbody',
        null,
        weeks
      )
    );
  }
});

exports.default = _react2.default.createClass({
  displayName: "DatePicker",
  propTypes: {
    value: _react2.default.PropTypes.string,
    cellPadding: _react2.default.PropTypes.string,
    placeholder: _react2.default.PropTypes.string,
    dayLabels: _react2.default.PropTypes.array,
    monthLabels: _react2.default.PropTypes.array,
    onChange: _react2.default.PropTypes.func,
    onClear: _react2.default.PropTypes.func,
    clearButtonElement: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.object]),
    previousButtonElement: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.object]),
    nextButtonElement: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.object]),
    calendarPlacement: _react2.default.PropTypes.string,
    dateFormat: _react2.default.PropTypes.string // 'MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY/MM/DD', 'DD-MM-YYYY'
  },
  getDefaultProps: function getDefaultProps() {
    var language = typeof window !== "undefined" && window.navigator ? (window.navigator.userLanguage || window.navigator.language || '').toLowerCase() : '';
    var dateFormat = !language || language === "en-us" ? 'MM/DD/YYYY' : 'DD/MM/YYYY';
    return {
      cellPadding: "5px",
      dayLabels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      monthLabels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      clearButtonElement: "×",
      previousButtonElement: "<",
      nextButtonElement: ">",
      calendarPlacement: "bottom",
      dateFormat: dateFormat
    };
  },
  getInitialState: function getInitialState() {
    var state = this.makeDateValues(this.props.value);
    state.focused = false;
    state.inputFocused = false;
    state.placeholder = this.props.placeholder || this.props.dateFormat;
    state.separator = this.props.dateFormat.match(/[^A-Z]/)[0];
    return state;
  },
  makeDateValues: function makeDateValues(isoString) {
    var displayDate = void 0;
    var selectedDate = isoString ? new Date(isoString) : null;
    var inputValue = isoString ? this.makeInputValueString(selectedDate) : null;
    if (selectedDate) {
      displayDate = new Date(selectedDate);
    } else {
      displayDate = new Date();
      displayDate.setHours(12);
      displayDate.setMinutes(0);
      displayDate.setSeconds(0);
      displayDate.setMilliseconds(0);
    }
    return {
      value: selectedDate ? selectedDate.toISOString() : null,
      displayDate: displayDate,
      selectedDate: selectedDate,
      inputValue: inputValue
    };
  },
  clear: function clear() {
    if (this.props.onClear) {
      this.props.onClear();
    } else {
      this.setState(this.makeDateValues(null));
    }

    if (this.props.onChange) {
      this.props.onChange(null);
    }
  },
  handleHide: function handleHide(e) {
    if (this.state.inputFocused) {
      return;
    }
    this.setState({
      focused: false
    });
    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
  },
  handleKeyDown: function handleKeyDown(e) {
    if (e.which === 9 && this.state.inputFocused) {
      this.setState({
        focused: false
      });
      if (this.props.onBlur) {
        this.props.onBlur(e);
      }
    }
  },
  handleFocus: function handleFocus(e) {
    if (this.state.focused === true) {
      return;
    }
    this.setState({
      inputFocused: true,
      focused: true
    });
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
  },
  handleBlur: function handleBlur(e) {
    this.setState({
      inputFocused: false
    });
  },

  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
    return !(this.state.inputFocused === true && nextState.inputFocused === false);
  },
  getValue: function getValue() {
    return this.state.selectedDate ? this.state.selectedDate.toISOString() : null;
  },
  makeInputValueString: function makeInputValueString(date) {
    var month = date.getMonth() + 1;
    var day = date.getDate();

    //this method is executed during intialState setup... handle a missing state properly
    var separator = this.state ? this.state.separator : this.props.dateFormat.match(/[^A-Z]/)[0];
    if (this.props.dateFormat.match(/MM.DD.YYYY/)) {
      return (month > 9 ? month : "0" + month) + separator + (day > 9 ? day : "0" + day) + separator + date.getFullYear();
    } else if (this.props.dateFormat.match(/DD.MM.YYYY/)) {
      return (day > 9 ? day : "0" + day) + separator + (month > 9 ? month : "0" + month) + separator + date.getFullYear();
    } else {
      return date.getFullYear() + separator + (month > 9 ? month : "0" + month) + separator + (day > 9 ? day : "0" + day);
    }
  },
  handleBadInput: function handleBadInput(originalValue) {
    var parts = originalValue.replace(new RegExp('[^0-9' + this.state.separator + ']'), '').split(this.state.separator);
    if (this.props.dateFormat.match(/MM.DD.YYYY/) || this.props.dateFormat.match(/DD.MM.YYYY/)) {
      if (parts[0] && parts[0].length > 2) {
        parts[1] = parts[0].slice(2) + (parts[1] || '');
        parts[0] = parts[0].slice(0, 2);
      }
      if (parts[1] && parts[1].length > 2) {
        parts[2] = parts[1].slice(2) + (parts[2] || '');
        parts[1] = parts[1].slice(0, 2);
      }
      if (parts[2]) {
        parts[2] = parts[2].slice(0, 4);
      }
    } else {
      if (parts[0] && parts[0].length > 4) {
        parts[1] = parts[0].slice(4) + (parts[1] || '');
        parts[0] = parts[0].slice(0, 4);
      }
      if (parts[1] && parts[1].length > 2) {
        parts[2] = parts[1].slice(2) + (parts[2] || '');
        parts[1] = parts[1].slice(0, 2);
      }
      if (parts[2]) {
        parts[2] = parts[2].slice(0, 2);
      }
    }
    this.setState({
      inputValue: parts.join(this.state.separator)
    });
  },
  handleInputChange: function handleInputChange(e) {
    var originalValue = _reactDom2.default.findDOMNode(this.refs.input).value;
    var inputValue = originalValue.replace(/(-|\/\/)/g, this.state.separator);
    var month = void 0,
        day = void 0,
        year = void 0;
    if (this.props.dateFormat.match(/MM.DD.YYYY/)) {
      if (!inputValue.match(/[0-1][0-9]\/[0-3][0-9]\/[1-2][0-9][0-9][0-9]/)) {
        return this.handleBadInput(originalValue);
      }
      month = inputValue.slice(0, 2).replace(/[^0-9]/g, '');
      day = inputValue.slice(3, 5).replace(/[^0-9]/g, '');
      year = inputValue.slice(6, 10).replace(/[^0-9]/g, '');
    } else if (this.props.dateFormat.match(/DD.MM.YYYY/)) {
      if (!inputValue.match(/[0-1][0-9]\/[0-3][0-9]\/[1-2][0-9][0-9][0-9]/)) {
        return this.handleBadInput(originalValue);
      }
      day = inputValue.slice(0, 2).replace(/[^0-9]/g, '');
      month = inputValue.slice(3, 5).replace(/[^0-9]/g, '');
      year = inputValue.slice(6, 10).replace(/[^0-9]/g, '');
    } else {
      if (!inputValue.match(/[1-2][0-9][0-9][0-9]\/[0-3][0-9]\/[0-9][0-9]/)) {
        return this.handleBadInput(originalValue);
      }
      year = inputValue.slice(0, 4).replace(/[^0-9]/g, '');
      month = inputValue.slice(5, 7).replace(/[^0-9]/g, '');
      day = inputValue.slice(8, 10).replace(/[^0-9]/g, '');
    }
    var monthInteger = parseInt(month, 10);
    var dayInteger = parseInt(day, 10);
    var yearInteger = parseInt(year, 10);
    if (monthInteger > 12 || dayInteger > 31) {
      return this.handleBadInput(originalValue);
    }
    if (!isNaN(monthInteger) && !isNaN(dayInteger) && !isNaN(yearInteger) && monthInteger <= 12 && dayInteger <= 31 && yearInteger > 999) {
      var selectedDate = new Date();
      selectedDate.setHours(12);
      selectedDate.setMinutes(0);
      selectedDate.setSeconds(0);
      selectedDate.setMilliseconds(0);
      selectedDate.setYear(yearInteger);
      selectedDate.setMonth(monthInteger - 1);
      selectedDate.setDate(dayInteger);
      this.setState({
        selectedDate: selectedDate,
        displayDate: selectedDate,
        value: selectedDate.toISOString()
      });
      if (this.props.onChange) {
        this.props.onChange(selectedDate.toISOString());
      }
    }
    if (this.props.dateFormat.match(/MM.DD.YYYY/)) {
      inputValue = month + inputValue.slice(2, 3).replace(new RegExp('[^\\' + this.state.separator + ']', 'g'), '') + day + inputValue.slice(5, 6).replace(new RegExp('[^\\' + this.state.separator + ']', 'g'), '') + year;
    } else if (this.props.dateFormat.match(/DD.MM.YYYY/)) {
      inputValue = day + inputValue.slice(2, 3).replace(new RegExp('[^\\' + this.state.separator + ']', 'g'), '') + month + inputValue.slice(5, 6).replace(new RegExp('[^\\' + this.state.separator + ']', 'g'), '') + year;
    } else {
      inputValue = year + inputValue.slice(4, 5).replace(new RegExp('[^\\' + this.state.separator + ']', 'g'), '') + month + inputValue.slice(7, 8).replace(new RegExp('[^\\' + this.state.separator + ']', 'g'), '');
    }
    if (this.props.dateFormat.match(/YYYY.MM.DD/)) {
      if (this.state.inputValue && inputValue.length > this.state.inputValue.length) {
        if (inputValue.length == 4) {
          inputValue += this.state.separator;
        }
        if (inputValue.length == 7) {
          inputValue += this.state.separator;
        }
        inputValue = inputValue.slice(0, 10);
      }
    } else {
      if (this.state.inputValue && inputValue.length > this.state.inputValue.length) {
        if (inputValue.length == 2) {
          inputValue += this.state.separator;
        }
        if (inputValue.length == 5) {
          inputValue += this.state.separator;
        }
        inputValue = inputValue.slice(0, 10);
      }
    }
    this.setState({
      inputValue: inputValue
    });
  },
  onChangeMonth: function onChangeMonth(newDisplayDate) {
    this.setState({
      displayDate: newDisplayDate
    });
  },
  onChangeDate: function onChangeDate(newSelectedDate) {
    this.setState({
      inputValue: this.makeInputValueString(newSelectedDate),
      selectedDate: newSelectedDate,
      displayDate: newSelectedDate,
      value: newSelectedDate.toISOString(),
      focused: false
    });
    if (this.props.onBlur) {
      this.props.onBlur(new Event("Change Date"));
    }
    if (this.props.onChange) {
      this.props.onChange(newSelectedDate.toISOString());
    }
  },
  componentWillReceiveProps: function componentWillReceiveProps(newProps) {
    var value = newProps.value;
    if (this.getValue() !== value) {
      this.setState(this.makeDateValues(value));
    }
  },
  render: function render() {
    var _this2 = this;

    var calendarHeader = _react2.default.createElement(CalendarHeader, {
      previousButtonElement: this.props.previousButtonElement,
      nextButtonElement: this.props.nextButtonElement,
      displayDate: this.state.displayDate,
      onChange: this.onChangeMonth,
      monthLabels: this.props.monthLabels,
      dateFormat: this.props.dateFormat });
    return _react2.default.createElement(
      _InputGroup2.default,
      { ref: 'inputGroup', bsClass: this.props.bsClass, bsSize: this.props.bsSize, id: this.props.id ? this.props.id + "_group" : null },
      _react2.default.createElement(
        _Overlay2.default,
        { rootClose: true, onHide: this.handleHide, show: this.state.focused, container: function container() {
            return _reactDom2.default.findDOMNode(_this2.refs.overlayContainer);
          }, target: function target() {
            return _reactDom2.default.findDOMNode(_this2.refs.input);
          }, placement: this.props.calendarPlacement, delayHide: 200 },
        _react2.default.createElement(
          _Popover2.default,
          { id: 'calendar', title: calendarHeader },
          _react2.default.createElement(Calendar, { cellPadding: this.props.cellPadding, selectedDate: this.state.selectedDate, displayDate: this.state.displayDate, onChange: this.onChangeDate, dayLabels: this.props.dayLabels })
        )
      ),
      _react2.default.createElement('div', { ref: 'overlayContainer' }),
      _react2.default.createElement('input', { type: 'hidden', id: this.props.id, name: this.props.name, value: this.state.value || '' }),
      _react2.default.createElement(_FormControl2.default, {
        onKeyDown: this.handleKeyDown,
        value: this.state.inputValue || '',
        ref: 'input',
        type: 'text',
        placeholder: this.state.focused ? this.props.dateFormat : this.state.placeholder,
        onFocus: this.handleFocus,
        onBlur: this.handleBlur,
        onChange: this.handleInputChange
      }),
      _react2.default.createElement(
        _InputGroup2.default.Addon,
        { onClick: this.clear, style: { cursor: this.state.inputValue ? "pointer" : "not-allowed" } },
        this.props.clearButtonElement
      )
    );
  }
});
module.exports = exports['default'];
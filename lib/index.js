'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // See http://jszen.blogspot.com/2007/03/how-to-build-simple-calendar-with.html for calendar logic.

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Input = require('react-bootstrap/lib/Input');

var _Input2 = _interopRequireDefault(_Input);

var _Popover = require('react-bootstrap/lib/Popover');

var _Popover2 = _interopRequireDefault(_Popover);

var _Button = require('react-bootstrap/lib/Button');

var _Button2 = _interopRequireDefault(_Button);

var _OverlayTrigger = require('react-bootstrap/lib/OverlayTrigger');

var _OverlayTrigger2 = _interopRequireDefault(_OverlayTrigger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var makeInputValueString = function makeInputValueString(date) {
  var month = date.getMonth() + 1;
  var day = date.getDate();
  return (month > 9 ? month : "0" + month) + "/" + (day > 9 ? day : "0" + day) + "/" + date.getFullYear();
};

var CalendarHeader = _react2.default.createClass({
  displayName: "DatePickerHeader",
  propTypes: {
    displayDate: _react2.default.PropTypes.object.isRequired,
    onChange: _react2.default.PropTypes.func.isRequired,
    monthLabels: _react2.default.PropTypes.array.isRequired,
    onDateClick: _react2.default.PropTypes.func.isRequired,
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
        { onClick: this.props.onDateClick },
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
});

var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

var Calendar = _react2.default.createClass({
  displayName: "DatePickerCalendar",
  propTypes: {
    selectedDate: _react2.default.PropTypes.object,
    displayDate: _react2.default.PropTypes.object.isRequired,
    onChange: _react2.default.PropTypes.func.isRequired,
    dayLabels: _react2.default.PropTypes.array.isRequired,
    cellPadding: _react2.default.PropTypes.string.isRequired,
    onUnmount: _react2.default.PropTypes.func.isRequired
  },
  componentWillUnmount: function componentWillUnmount() {
    this.props.onUnmount();
  },
  handleClick: function handleClick(day) {
    var newSelectedDate = new Date(this.props.displayDate);
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
    dayLabels: _react2.default.PropTypes.array,
    monthLabels: _react2.default.PropTypes.array,
    onChange: _react2.default.PropTypes.func,
    clearButtonElement: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.object]),
    previousButtonElement: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.object]),
    nextButtonElement: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.object]),
    calendarPlacement: _react2.default.PropTypes.string
  },
  getDefaultProps: function getDefaultProps() {
    return {
      cellPadding: "5px",
      dayLabels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      monthLabels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      placeholder: "MM/DD/YYYY",
      clearButtonElement: "×",
      previousButtonElement: "<",
      nextButtonElement: ">",
      calendarPlacement: "bottom"
    };
  },
  getInitialState: function getInitialState() {
    var state = this.makeDateValues(this.props.value ? this.props.value : this.props.valueLink ? this.props.valueLink.value : null);
    state.focused = false;
    return state;
  },
  makeDateValues: function makeDateValues(isoString) {
    var displayDate = undefined;
    var selectedDate = isoString ? new Date(isoString) : null;
    var inputValue = isoString ? makeInputValueString(selectedDate) : null;
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
    this.setState(this.makeDateValues(null));
    if (this.props.onChange) {
      this.props.onChange(null);
    }
    if (this.props.valueLink && this.props.valueLink.requestChange) {
      this.props.valueLink.requestChange(null);
    }
  },
  handleHide: function handleHide(e) {
    if (document.activeElement === this.refs.input.getInputDOMNode()) {
      return;
    }
    this.setState({
      focused: false
    });
    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
  },
  handleFocus: function handleFocus(e) {
    if (this.refs.overlay.state.isOverlayShown === true) {
      return;
    }
    this.setState({
      focused: true
    });
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
  },
  handleBlur: function handleBlur(e) {
    if (this.refs.overlay.state.isOverlayShown === true) {
      return;
    }
    this.setState({
      focused: false
    });
    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
  },
  handleHeaderDateClick: function handleHeaderDateClick(e) {},
  getValue: function getValue() {
    return this.state.selectedDate ? this.state.selectedDate.toISOString() : null;
  },
  handleInputChange: function handleInputChange(e) {
    var inputValue = this.refs.input.getValue();
    inputValue = inputValue.replace(/(-|\/\/)/g, '/');
    var month = inputValue.slice(0, 2).replace(/[^0-9]/g, '');
    var day = inputValue.slice(3, 5).replace(/[^0-9]/g, '');
    var year = inputValue.slice(6, 10).replace(/[^0-9]/g, '');
    var monthInteger = parseInt(month, 10);
    var dayInteger = parseInt(day, 10);
    var yearInteger = parseInt(year, 10);
    if (!isNaN(monthInteger) && !isNaN(dayInteger) && !isNaN(yearInteger) && monthInteger <= 12 && dayInteger <= 31 && yearInteger > 999) {
      var selectedDate = new Date();
      selectedDate.setDate(dayInteger);
      selectedDate.setMonth(monthInteger - 1);
      selectedDate.setYear(yearInteger);
      this.setState({
        selectedDate: selectedDate,
        displayDate: selectedDate,
        value: selectedDate.toISOString()
      });
      if (this.props.onChange) {
        this.props.onChange(selectedDate.toISOString());
      }
      if (this.props.valueLink && this.props.valueLink.requestChange) {
        this.props.valueLink.requestChange(selectedDate.toISOString());
      }
    }
    inputValue = month + inputValue.slice(2, 3).replace(/[^\/]/g, '') + day + inputValue.slice(5, 6).replace(/[^\/]/g, '') + year;
    if (this.state.inputValue && inputValue.length > this.state.inputValue.length) {
      if (inputValue.length == 2) {
        inputValue += "/";
      }
      if (inputValue.length == 5) {
        inputValue += "/";
      }
      inputValue = inputValue.slice(0, 10);
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
      inputValue: makeInputValueString(newSelectedDate),
      selectedDate: newSelectedDate,
      displayDate: newSelectedDate,
      value: newSelectedDate.toISOString()
    });
    this.refs.overlay.handleDelayedHide();
    if (this.props.onChange) {
      this.props.onChange(newSelectedDate.toISOString());
    }
    if (this.props.valueLink && this.props.valueLink.requestChange) {
      this.props.valueLink.requestChange(newSelectedDate.toISOString());
    }
  },
  componentWillReceiveProps: function componentWillReceiveProps(newProps) {
    var value = newProps.value ? newProps.value : newProps.valueLink ? newProps.valueLink.value : null;
    if (this.getValue() !== value) {
      this.setState(this.makeDateValues(value));
    }
  },
  render: function render() {
    var calendarHeader = _react2.default.createElement(CalendarHeader, {
      previousButtonElement: this.props.previousButtonElement,
      nextButtonElement: this.props.nextButtonElement,
      displayDate: this.state.displayDate,
      onDateClick: this.handleHeaderDateClick,
      onChange: this.onChangeMonth,
      monthLabels: this.props.monthLabels });
    var popOver = _react2.default.createElement(
      _Popover2.default,
      { id: 'calendar', title: calendarHeader },
      _react2.default.createElement(Calendar, { cellPadding: this.props.cellPadding, selectedDate: this.state.selectedDate, displayDate: this.state.displayDate, onChange: this.onChangeDate, dayLabels: this.props.dayLabels, onUnmount: this.handleHide })
    );
    var buttonStyle = this.props.bsStyle === "error" ? "danger" : this.props.bsStyle;
    var clearButton = _react2.default.createElement(
      _Button2.default,
      { onClick: this.clear, bsStyle: buttonStyle || "default", disabled: !this.state.inputValue },
      this.props.clearButtonElement
    );
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        _OverlayTrigger2.default,
        { ref: 'overlay', trigger: 'click', rootClose: true, placement: this.props.calendarPlacement, overlay: popOver, delayHide: 100 },
        _react2.default.createElement(_Input2.default, _extends({}, this.props, {
          value: this.state.inputValue,
          ref: 'input',
          type: 'text',
          valueLink: null,
          placeholder: this.state.focused ? "MM/DD/YYYY" : this.props.placeholder,
          onFocus: this.handleFocus,
          onBlur: this.handleBlur,
          onChange: this.handleInputChange,
          buttonAfter: clearButton,
          name: null,
          id: null
        }))
      ),
      _react2.default.createElement('input', { type: 'hidden', id: this.props.id, name: this.props.name, value: this.state.value })
    );
  }
});
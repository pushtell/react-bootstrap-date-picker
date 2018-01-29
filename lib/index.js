'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Button = require('react-bootstrap/lib/Button');

var _Button2 = _interopRequireDefault(_Button);

var _FormControl = require('react-bootstrap/lib/FormControl');

var _FormControl2 = _interopRequireDefault(_FormControl);

var _InputGroup = require('react-bootstrap/lib/InputGroup');

var _InputGroup2 = _interopRequireDefault(_InputGroup);

var _Overlay = require('react-bootstrap/lib/Overlay');

var _Overlay2 = _interopRequireDefault(_Overlay);

var _Popover = require('react-bootstrap/lib/Popover');

var _Popover2 = _interopRequireDefault(_Popover);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // See http://jszen.blogspot.com/2007/03/how-to-build-simple-calendar-with.html for calendar logic.

var instanceCount = 0;

var CalendarHeader = function (_React$Component) {
  _inherits(CalendarHeader, _React$Component);

  function CalendarHeader() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, CalendarHeader);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CalendarHeader.__proto__ || Object.getPrototypeOf(CalendarHeader)).call.apply(_ref, [this].concat(args))), _this), _this.displayingMinMonth = function () {
      if (!_this.props.minDate) return false;

      var displayDate = new Date(_this.props.displayDate);
      var minDate = new Date(_this.props.minDate);
      return minDate.getFullYear() == displayDate.getFullYear() && minDate.getMonth() == displayDate.getMonth();
    }, _this.displayingMaxMonth = function () {
      if (!_this.props.maxDate) return false;

      var displayDate = new Date(_this.props.displayDate);
      var maxDate = new Date(_this.props.maxDate);
      return maxDate.getFullYear() == displayDate.getFullYear() && maxDate.getMonth() == displayDate.getMonth();
    }, _this.handleClickPrevious = function () {
      var newDisplayDate = new Date(_this.props.displayDate);
      newDisplayDate.setDate(1);
      newDisplayDate.setMonth(newDisplayDate.getMonth() - 1);
      _this.props.onChange(newDisplayDate);
    }, _this.handleClickNext = function () {
      var newDisplayDate = new Date(_this.props.displayDate);
      newDisplayDate.setDate(1);
      newDisplayDate.setMonth(newDisplayDate.getMonth() + 1);
      _this.props.onChange(newDisplayDate);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(CalendarHeader, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'text-center' },
        _react2.default.createElement(
          'div',
          { className: 'text-muted pull-left datepicker-previous-wrapper', onClick: this.handleClickPrevious, style: { cursor: 'pointer' } },
          this.displayingMinMonth() ? null : this.props.previousButtonElement
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
          { className: 'text-muted pull-right datepicker-next-wrapper', onClick: this.handleClickNext, style: { cursor: 'pointer' } },
          this.displayingMaxMonth() ? null : this.props.nextButtonElement
        )
      );
    }
  }]);

  return CalendarHeader;
}(_react2.default.Component);

CalendarHeader.displayName = 'DatePickerHeader';
CalendarHeader.propTypes = {
  displayDate: _propTypes2.default.object.isRequired,
  minDate: _propTypes2.default.string,
  maxDate: _propTypes2.default.string,
  onChange: _propTypes2.default.func.isRequired,
  monthLabels: _propTypes2.default.array.isRequired,
  previousButtonElement: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]).isRequired,
  nextButtonElement: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]).isRequired
};


var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

var Calendar = function (_React$Component2) {
  _inherits(Calendar, _React$Component2);

  function Calendar() {
    var _ref2;

    var _temp2, _this2, _ret2;

    _classCallCheck(this, Calendar);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _ret2 = (_temp2 = (_this2 = _possibleConstructorReturn(this, (_ref2 = Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call.apply(_ref2, [this].concat(args))), _this2), _this2.handleClick = function (e) {
      var day = e.currentTarget.getAttribute('data-day');
      var newSelectedDate = _this2.setTimeToNoon(new Date(_this2.props.displayDate));
      newSelectedDate.setDate(day);
      _this2.props.onChange(newSelectedDate);
    }, _this2.handleClickToday = function () {
      var newSelectedDate = _this2.setTimeToNoon(new Date());
      _this2.props.onChange(newSelectedDate);
    }, _this2.setTimeToNoon = function (date) {
      date.setHours(12);
      date.setMinutes(0);
      date.setSeconds(0);
      date.setMilliseconds(0);
      return date;
    }, _this2.getWeekNumber = function (date) {
      var target = new Date(date.valueOf());
      var dayNr = (date.getDay() + 6) % 7;
      target.setDate(target.getDate() - dayNr + 3);
      var firstThursday = target.valueOf();
      target.setMonth(0, 1);
      if (target.getDay() !== 4) {
        target.setMonth(0, 1 + (4 - target.getDay() + 7) % 7);
      }
      return 1 + Math.ceil((firstThursday - target) / 604800000);
    }, _temp2), _possibleConstructorReturn(_this2, _ret2);
  }

  _createClass(Calendar, [{
    key: 'render',
    value: function render() {
      var _this3 = this;

      var currentDate = this.setTimeToNoon(new Date());
      var selectedDate = this.props.selectedDate ? this.setTimeToNoon(new Date(this.props.selectedDate)) : null;
      var minDate = this.props.minDate ? this.setTimeToNoon(new Date(this.props.minDate)) : null;
      var maxDate = this.props.maxDate ? this.setTimeToNoon(new Date(this.props.maxDate)) : null;
      var year = this.props.displayDate.getFullYear();
      var month = this.props.displayDate.getMonth();
      var firstDay = new Date(year, month, 1);
      var startingDay = this.props.weekStartsOn > 1 ? firstDay.getDay() - this.props.weekStartsOn + 7 : this.props.weekStartsOn === 1 ? firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1 : firstDay.getDay();
      var showWeeks = this.props.showWeeks;

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
            var className = null;
            var date = new Date(year, month, day, 12, 0, 0, 0).toISOString();
            var beforeMinDate = minDate && Date.parse(date) < Date.parse(minDate);
            var afterMinDate = maxDate && Date.parse(date) > Date.parse(maxDate);
            var clickHandler = this.handleClick;
            var style = { cursor: 'pointer', padding: this.props.cellPadding, borderRadius: this.props.roundedCorners ? 5 : 0 };

            if (beforeMinDate || afterMinDate) {
              className = 'text-muted';
              clickHandler = null;
              style.cursor = 'default';
            } else if (Date.parse(date) === Date.parse(selectedDate)) {
              className = 'bg-primary';
            } else if (Date.parse(date) === Date.parse(currentDate)) {
              className = 'text-primary';
            }

            week.push(_react2.default.createElement(
              'td',
              {
                key: j,
                'data-day': day,
                onClick: clickHandler,
                style: style,
                className: className
              },
              day
            ));
            day++;
          } else {
            week.push(_react2.default.createElement('td', { key: j }));
          }
        }

        if (showWeeks) {
          var weekNum = this.getWeekNumber(new Date(year, month, day - 1, 12, 0, 0, 0));
          week.unshift(_react2.default.createElement(
            'td',
            {
              key: 7,
              style: { padding: this.props.cellPadding, fontSize: '0.8em', color: 'darkgrey' },
              className: 'text-muted'
            },
            weekNum
          ));
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

      var weekColumn = showWeeks ? _react2.default.createElement('td', {
        className: 'text-muted current-week',
        style: { padding: this.props.cellPadding } }) : null;

      return _react2.default.createElement(
        'table',
        { className: 'text-center' },
        _react2.default.createElement(
          'thead',
          null,
          _react2.default.createElement(
            'tr',
            null,
            weekColumn,
            this.props.dayLabels.map(function (label, index) {
              return _react2.default.createElement(
                'td',
                {
                  key: index,
                  className: 'text-muted',
                  style: { padding: _this3.props.cellPadding } },
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
        ),
        this.props.showTodayButton && _react2.default.createElement(
          'tfoot',
          null,
          _react2.default.createElement(
            'tr',
            null,
            _react2.default.createElement(
              'td',
              { colSpan: this.props.dayLabels.length, style: { paddingTop: '9px' } },
              _react2.default.createElement(
                _Button2.default,
                {
                  block: true,
                  bsSize: 'xsmall',
                  className: 'u-today-button',
                  onClick: this.handleClickToday },
                this.props.todayButtonLabel
              )
            )
          )
        )
      );
    }
  }]);

  return Calendar;
}(_react2.default.Component);

Calendar.displayName = 'DatePickerCalendar';
Calendar.propTypes = {
  selectedDate: _propTypes2.default.object,
  displayDate: _propTypes2.default.object.isRequired,
  minDate: _propTypes2.default.string,
  maxDate: _propTypes2.default.string,
  onChange: _propTypes2.default.func.isRequired,
  dayLabels: _propTypes2.default.array.isRequired,
  cellPadding: _propTypes2.default.string.isRequired,
  weekStartsOn: _propTypes2.default.number,
  showTodayButton: _propTypes2.default.bool,
  todayButtonLabel: _propTypes2.default.string,
  roundedCorners: _propTypes2.default.bool,
  showWeeks: _propTypes2.default.bool
};

var _class = function (_React$Component3) {
  _inherits(_class, _React$Component3);

  function _class(props, context) {
    _classCallCheck(this, _class);

    var _this4 = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props, context));

    _initialiseProps.call(_this4);

    if (props.value && props.defaultValue) {
      throw new Error('Conflicting DatePicker properties \'value\' and \'defaultValue\'');
    }
    var state = _this4.makeDateValues(props.value || props.defaultValue);
    if (props.weekStartsOn > 1) {
      state.dayLabels = props.dayLabels.slice(props.weekStartsOn).concat(props.dayLabels.slice(0, props.weekStartsOn));
    } else if (props.weekStartsOn === 1) {
      state.dayLabels = props.dayLabels.slice(1).concat(props.dayLabels.slice(0, 1));
    } else {
      state.dayLabels = props.dayLabels;
    }
    state.focused = false;
    state.inputFocused = false;
    state.placeholder = props.placeholder || props.dateFormat;
    state.separator = props.dateFormat.match(/[^A-Z]/)[0];
    _this4.state = state;
    return _this4;
  }

  _createClass(_class, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return !(this.state.inputFocused === true && nextState.inputFocused === false);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      var value = newProps.value;
      if (this.getValue() !== value) {
        this.setState(this.makeDateValues(value));
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      var calendarHeader = _react2.default.createElement(CalendarHeader, {
        previousButtonElement: this.props.previousButtonElement,
        nextButtonElement: this.props.nextButtonElement,
        displayDate: this.state.displayDate,
        minDate: this.props.minDate,
        maxDate: this.props.maxDate,
        onChange: this.onChangeMonth,
        monthLabels: this.props.monthLabels,
        dateFormat: this.props.dateFormat });

      var control = this.props.customControl ? _react2.default.cloneElement(this.props.customControl, {
        onKeyDown: this.handleKeyDown,
        value: this.state.inputValue || '',
        required: this.props.required,
        placeholder: this.state.focused ? this.props.dateFormat : this.state.placeholder,
        ref: 'input',
        disabled: this.props.disabled,
        onFocus: this.handleFocus,
        onBlur: this.handleBlur,
        onChange: this.handleInputChange,
        className: this.props.className,
        style: this.props.style,
        autoComplete: this.props.autoComplete,
        onInvalid: this.props.onInvalid,
        noValidate: this.props.noValidate
      }) : _react2.default.createElement(_FormControl2.default, {
        onKeyDown: this.handleKeyDown,
        value: this.state.inputValue || '',
        required: this.props.required,
        ref: 'input',
        type: 'text',
        className: this.props.className,
        style: this.props.style,
        autoFocus: this.props.autoFocus,
        disabled: this.props.disabled,
        placeholder: this.state.focused ? this.props.dateFormat : this.state.placeholder,
        onFocus: this.handleFocus,
        onBlur: this.handleBlur,
        onChange: this.handleInputChange,
        autoComplete: this.props.autoComplete,
        onInvalid: this.props.onInvalid,
        noValidate: this.props.noValidate
      });

      return _react2.default.createElement(
        _InputGroup2.default,
        {
          ref: 'inputGroup',
          bsClass: this.props.showClearButton ? this.props.bsClass : '',
          bsSize: this.props.bsSize,
          id: this.props.id ? this.props.id + '_group' : null },
        control,
        _react2.default.createElement(
          _Overlay2.default,
          {
            rootClose: true,
            onHide: this.handleHide,
            show: this.state.focused,
            container: function container() {
              return _this5.props.calendarContainer || _reactDom2.default.findDOMNode(_this5.refs.overlayContainer);
            },
            target: function target() {
              return _reactDom2.default.findDOMNode(_this5.refs.input);
            },
            placement: this.state.calendarPlacement,
            delayHide: 200 },
          _react2.default.createElement(
            _Popover2.default,
            { id: 'date-picker-popover-' + this.props.instanceCount, className: 'date-picker-popover', title: calendarHeader },
            _react2.default.createElement(Calendar, {
              cellPadding: this.props.cellPadding,
              selectedDate: this.state.selectedDate,
              displayDate: this.state.displayDate,
              onChange: this.onChangeDate,
              dayLabels: this.state.dayLabels,
              weekStartsOn: this.props.weekStartsOn,
              showTodayButton: this.props.showTodayButton,
              todayButtonLabel: this.props.todayButtonLabel,
              minDate: this.props.minDate,
              maxDate: this.props.maxDate,
              roundedCorners: this.props.roundedCorners,
              showWeeks: this.props.showWeeks
            })
          )
        ),
        _react2.default.createElement('div', { ref: 'overlayContainer', style: { position: 'relative' } }),
        _react2.default.createElement('input', { ref: 'hiddenInput', type: 'hidden', id: this.props.id, name: this.props.name, value: this.state.value || '', 'data-formattedvalue': this.state.value ? this.state.inputValue : '' }),
        this.props.showClearButton && !this.props.customControl && _react2.default.createElement(
          _InputGroup2.default.Addon,
          {
            onClick: this.props.disabled ? null : this.clear,
            style: { cursor: this.state.inputValue && !this.props.disabled ? 'pointer' : 'not-allowed' } },
          _react2.default.createElement(
            'div',
            { style: { opacity: this.state.inputValue && !this.props.disabled ? 1 : 0.5 } },
            this.props.clearButtonElement
          )
        ),
        this.props.children
      );
    }
  }]);

  return _class;
}(_react2.default.Component);

_class.displayName = 'DatePicker';
_class.propTypes = {
  defaultValue: _propTypes2.default.string,
  value: _propTypes2.default.string,
  required: _propTypes2.default.bool,
  className: _propTypes2.default.string,
  style: _propTypes2.default.object,
  minDate: _propTypes2.default.string,
  maxDate: _propTypes2.default.string,
  cellPadding: _propTypes2.default.string,
  autoComplete: _propTypes2.default.string,
  placeholder: _propTypes2.default.string,
  dayLabels: _propTypes2.default.array,
  monthLabels: _propTypes2.default.array,
  onChange: _propTypes2.default.func,
  onClear: _propTypes2.default.func,
  onBlur: _propTypes2.default.func,
  onFocus: _propTypes2.default.func,
  autoFocus: _propTypes2.default.bool,
  disabled: _propTypes2.default.bool,
  weekStartsOnMonday: function weekStartsOnMonday(props, propName, componentName) {
    if (props[propName]) {
      return new Error('Prop \'' + propName + '\' supplied to \'' + componentName + '\' is obsolete. Use \'weekStartsOn\' instead.');
    }
  },
  weekStartsOn: _propTypes2.default.number,
  clearButtonElement: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),
  showClearButton: _propTypes2.default.bool,
  previousButtonElement: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),
  nextButtonElement: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),
  calendarPlacement: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]),
  dateFormat: _propTypes2.default.string, // 'MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY/MM/DD', 'DD-MM-YYYY'
  bsClass: _propTypes2.default.string,
  bsSize: _propTypes2.default.string,
  calendarContainer: _propTypes2.default.object,
  id: _propTypes2.default.string,
  name: _propTypes2.default.string,
  showTodayButton: _propTypes2.default.bool,
  todayButtonLabel: _propTypes2.default.string,
  instanceCount: _propTypes2.default.number,
  customControl: _propTypes2.default.object,
  roundedCorners: _propTypes2.default.bool,
  showWeeks: _propTypes2.default.bool,
  children: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.node), _propTypes2.default.node]),
  onInvalid: _propTypes2.default.func,
  noValidate: _propTypes2.default.bool
};

_class.defaultProps = function () {
  var language = typeof window !== 'undefined' && window.navigator ? (window.navigator.userLanguage || window.navigator.language || '').toLowerCase() : '';
  var dateFormat = !language || language === 'en-us' ? 'MM/DD/YYYY' : 'DD/MM/YYYY';
  return {
    cellPadding: '5px',
    dayLabels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    monthLabels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    clearButtonElement: '×',
    previousButtonElement: '<',
    nextButtonElement: '>',
    calendarPlacement: 'bottom',
    dateFormat: dateFormat,
    showClearButton: true,
    autoFocus: false,
    disabled: false,
    showTodayButton: false,
    todayButtonLabel: 'Today',
    autoComplete: 'on',
    showWeeks: false,
    instanceCount: instanceCount++,
    style: {
      width: '100%'
    },
    roundedCorners: false,
    noValidate: false
  };
}();

var _initialiseProps = function _initialiseProps() {
  var _this6 = this;

  this.makeDateValues = function (isoString) {
    var displayDate = void 0;
    var selectedDate = isoString ? new Date(isoString.slice(0, 10) + 'T12:00:00.000Z') : null;
    var minDate = _this6.props.minDate ? new Date(_this6.props.minDate.slice(0, 10) + 'T12:00:00.000Z') : null;
    var maxDate = _this6.props.maxDate ? new Date(_this6.props.maxDate.slice(0, 10) + 'T12:00:00.000Z') : null;

    var inputValue = isoString ? _this6.makeInputValueString(selectedDate) : null;
    if (selectedDate) {
      displayDate = new Date(selectedDate);
    } else {
      var today = new Date(new Date().toISOString().slice(0, 10) + 'T12:00:00.000Z');
      if (minDate && Date.parse(minDate) >= Date.parse(today)) {
        displayDate = minDate;
      } else if (maxDate && Date.parse(maxDate) <= Date.parse(today)) {
        displayDate = maxDate;
      } else {
        displayDate = today;
      }
    }

    return {
      value: selectedDate ? selectedDate.toISOString() : null,
      displayDate: displayDate,
      selectedDate: selectedDate,
      inputValue: inputValue
    };
  };

  this.clear = function () {
    if (_this6.props.onClear) {
      _this6.props.onClear();
    } else {
      _this6.setState(_this6.makeDateValues(null));
    }

    if (_this6.props.onChange) {
      _this6.props.onChange(null, null);
    }
  };

  this.handleHide = function () {
    if (_this6.state.inputFocused) {
      return;
    }
    _this6.setState({
      focused: false
    });
    if (_this6.props.onBlur) {
      var event = document.createEvent('CustomEvent');
      event.initEvent('Change Date', true, false);
      _reactDom2.default.findDOMNode(_this6.refs.hiddenInput).dispatchEvent(event);
      _this6.props.onBlur(event);
    }
  };

  this.handleKeyDown = function (e) {
    if (e.which === 9 && _this6.state.inputFocused) {
      _this6.setState({
        focused: false
      });

      if (_this6.props.onBlur) {
        var event = document.createEvent('CustomEvent');
        event.initEvent('Change Date', true, false);
        _reactDom2.default.findDOMNode(_this6.refs.hiddenInput).dispatchEvent(event);
        _this6.props.onBlur(event);
      }
    }
  };

  this.handleFocus = function () {
    if (_this6.state.focused === true) {
      return;
    }

    var placement = _this6.getCalendarPlacement();

    _this6.setState({
      inputFocused: true,
      focused: true,
      calendarPlacement: placement
    });

    if (_this6.props.onFocus) {
      var event = document.createEvent('CustomEvent');
      event.initEvent('Change Date', true, false);
      _reactDom2.default.findDOMNode(_this6.refs.hiddenInput).dispatchEvent(event);
      _this6.props.onFocus(event);
    }
  };

  this.handleBlur = function () {
    _this6.setState({
      inputFocused: false
    });
  };

  this.getValue = function () {
    return _this6.state.selectedDate ? _this6.state.selectedDate.toISOString() : null;
  };

  this.getFormattedValue = function () {
    return _this6.state.displayDate ? _this6.state.inputValue : null;
  };

  this.getCalendarPlacement = function () {
    var tag = Object.prototype.toString.call(_this6.props.calendarPlacement);
    var isFunction = tag === '[object AsyncFunction]' || tag === '[object Function]' || tag === '[object GeneratorFunction]' || tag === '[object Proxy]';
    if (isFunction) {
      return _this6.props.calendarPlacement();
    } else {
      return _this6.props.calendarPlacement;
    }
  };

  this.makeInputValueString = function (date) {
    var month = date.getMonth() + 1;
    var day = date.getDate();

    //this method is executed during intialState setup... handle a missing state properly
    var separator = _this6.state ? _this6.state.separator : _this6.props.dateFormat.match(/[^A-Z]/)[0];
    if (_this6.props.dateFormat.match(/MM.DD.YYYY/)) {
      return (month > 9 ? month : '0' + month) + separator + (day > 9 ? day : '0' + day) + separator + date.getFullYear();
    } else if (_this6.props.dateFormat.match(/DD.MM.YYYY/)) {
      return (day > 9 ? day : '0' + day) + separator + (month > 9 ? month : '0' + month) + separator + date.getFullYear();
    } else {
      return date.getFullYear() + separator + (month > 9 ? month : '0' + month) + separator + (day > 9 ? day : '0' + day);
    }
  };

  this.handleBadInput = function (originalValue) {
    var parts = originalValue.replace(new RegExp('[^0-9' + _this6.state.separator + ']'), '').split(_this6.state.separator);
    if (_this6.props.dateFormat.match(/MM.DD.YYYY/) || _this6.props.dateFormat.match(/DD.MM.YYYY/)) {
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
    _this6.setState({
      inputValue: parts.join(_this6.state.separator)
    });
  };

  this.handleInputChange = function () {

    var originalValue = _reactDom2.default.findDOMNode(_this6.refs.input).value;
    var inputValue = originalValue.replace(/(-|\/\/)/g, _this6.state.separator).slice(0, 10);

    if (!inputValue) {
      _this6.clear();
      return;
    }

    var month = void 0,
        day = void 0,
        year = void 0;
    if (_this6.props.dateFormat.match(/MM.DD.YYYY/)) {
      if (!inputValue.match(/[0-1][0-9].[0-3][0-9].[1-2][0-9][0-9][0-9]/)) {
        return _this6.handleBadInput(originalValue);
      }

      month = inputValue.slice(0, 2).replace(/[^0-9]/g, '');
      day = inputValue.slice(3, 5).replace(/[^0-9]/g, '');
      year = inputValue.slice(6, 10).replace(/[^0-9]/g, '');
    } else if (_this6.props.dateFormat.match(/DD.MM.YYYY/)) {
      if (!inputValue.match(/[0-3][0-9].[0-1][0-9].[1-2][0-9][0-9][0-9]/)) {
        return _this6.handleBadInput(originalValue);
      }

      day = inputValue.slice(0, 2).replace(/[^0-9]/g, '');
      month = inputValue.slice(3, 5).replace(/[^0-9]/g, '');
      year = inputValue.slice(6, 10).replace(/[^0-9]/g, '');
    } else {
      if (!inputValue.match(/[1-2][0-9][0-9][0-9].[0-1][0-9].[0-3][0-9]/)) {
        return _this6.handleBadInput(originalValue);
      }

      year = inputValue.slice(0, 4).replace(/[^0-9]/g, '');
      month = inputValue.slice(5, 7).replace(/[^0-9]/g, '');
      day = inputValue.slice(8, 10).replace(/[^0-9]/g, '');
    }

    var monthInteger = parseInt(month, 10);
    var dayInteger = parseInt(day, 10);
    var yearInteger = parseInt(year, 10);
    if (monthInteger > 12 || dayInteger > 31) {
      return _this6.handleBadInput(originalValue);
    }

    if (!isNaN(monthInteger) && !isNaN(dayInteger) && !isNaN(yearInteger) && monthInteger <= 12 && dayInteger <= 31 && yearInteger > 999) {
      var selectedDate = new Date(yearInteger, monthInteger - 1, dayInteger, 12, 0, 0, 0);
      _this6.setState({
        selectedDate: selectedDate,
        displayDate: selectedDate,
        value: selectedDate.toISOString()
      });

      if (_this6.props.onChange) {
        _this6.props.onChange(selectedDate.toISOString(), inputValue);
      }
    }

    _this6.setState({
      inputValue: inputValue
    });
  };

  this.onChangeMonth = function (newDisplayDate) {
    _this6.setState({
      displayDate: newDisplayDate
    });
  };

  this.onChangeDate = function (newSelectedDate) {
    var inputValue = _this6.makeInputValueString(newSelectedDate);
    _this6.setState({
      inputValue: inputValue,
      selectedDate: newSelectedDate,
      displayDate: newSelectedDate,
      value: newSelectedDate.toISOString(),
      focused: false
    });

    if (_this6.props.onBlur) {
      var event = document.createEvent('CustomEvent');
      event.initEvent('Change Date', true, false);
      _reactDom2.default.findDOMNode(_this6.refs.hiddenInput).dispatchEvent(event);
      _this6.props.onBlur(event);
    }

    if (_this6.props.onChange) {
      _this6.props.onChange(newSelectedDate.toISOString(), inputValue);
    }
  };
};

exports.default = _class;
module.exports = exports['default'];
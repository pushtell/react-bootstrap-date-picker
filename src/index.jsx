// See http://jszen.blogspot.com/2007/03/how-to-build-simple-calendar-with.html for calendar logic.

import React from 'react';
import ReactDOM from 'react-dom';
import {
  Button,
  FormControl,
  InputGroup,
  Overlay,
  Popover,
} from 'react-bootstrap';

const CalendarHeader = React.createClass({
  displayName: 'DatePickerHeader',

  propTypes: {
    displayDate: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired,
    monthLabels: React.PropTypes.array.isRequired,
    previousButtonElement: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object
    ]).isRequired,
    nextButtonElement: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object
    ]).isRequired,
  },

  handleClickPrevious() {
    const newDisplayDate = new Date(this.props.displayDate);
    newDisplayDate.setMonth(newDisplayDate.getMonth() - 1);
    this.props.onChange(newDisplayDate);
  },

  handleClickNext() {
    const newDisplayDate = new Date(this.props.displayDate);
    newDisplayDate.setMonth(newDisplayDate.getMonth() + 1);
    this.props.onChange(newDisplayDate);
  },

  render() {
    return <div className="text-center">
      <div className="text-muted pull-left" onClick={this.handleClickPrevious} style={{cursor: 'pointer'}}>{this.props.previousButtonElement}</div>
      <span>{this.props.monthLabels[this.props.displayDate.getMonth()]} {this.props.displayDate.getFullYear()}</span>
      <div className="text-muted pull-right" onClick={this.handleClickNext} style={{cursor: 'pointer'}}>{this.props.nextButtonElement}</div>
    </div>;
  }
});

const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const Calendar = React.createClass({
  displayName: 'DatePickerCalendar',

  propTypes: {
    selectedDate: React.PropTypes.object,
    displayDate: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired,
    dayLabels: React.PropTypes.array.isRequired,
    cellPadding: React.PropTypes.string.isRequired,
    weekStartsOnMonday: React.PropTypes.bool,
    showTodayButton: React.PropTypes.bool,
    todayButtonLabel: React.PropTypes.string,
  },

  handleClick(day) {
    const newSelectedDate = new Date(this.props.displayDate);
    newSelectedDate.setHours(12);
    newSelectedDate.setMinutes(0);
    newSelectedDate.setSeconds(0);
    newSelectedDate.setMilliseconds(0);
    newSelectedDate.setDate(day);
    this.props.onChange(newSelectedDate);
  },

  handleClickToday() {
    const newSelectedDate = new Date();
    newSelectedDate.setHours(12);
    newSelectedDate.setMinutes(0);
    newSelectedDate.setSeconds(0);
    newSelectedDate.setMilliseconds(0);
    this.props.onChange(newSelectedDate);
  },

  render() {
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const selectedDay = this.props.selectedDate ? this.props.selectedDate.getDate() : null;
    const selectedMonth = this.props.selectedDate ? this.props.selectedDate.getMonth() : null;
    const selectedYear = this.props.selectedDate ? this.props.selectedDate.getFullYear() : null;
    const year = this.props.displayDate.getFullYear();
    const month = this.props.displayDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const startingDay = this.props.weekStartsOnMonday ? (firstDay.getDay() - 1) : firstDay.getDay();

    let monthLength = daysInMonth[month];
    if (month == 1) {
      if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
        monthLength = 29;
      }
    }

    const weeks = [];
    let day = 1;
    for (let i = 0; i < 9; i++) {
      const week = [];
      for (let j = 0; j <= 6; j++) {
        if (day <= monthLength && (i > 0 || j >= startingDay)) {
          const selected = day === selectedDay && month == selectedMonth && year === selectedYear;
          const current = day === currentDay && month == currentMonth && year === currentYear;
          week.push(<td
            key={j}
            onClick={this.handleClick.bind(this, day)}
            style={{cursor: 'pointer', padding: this.props.cellPadding}}
            className={selected ? 'bg-primary' : current ? 'text-muted' : null}>
            {day}
          </td>);
          day++;
        } else {
          week.push(<td key={j} />);
        }
      }

      weeks.push(<tr key={i}>{week}</tr>);
      if (day > monthLength) {
        break;
      }
    }

    return <table className="text-center">
      <thead>
        <tr>
          {this.props.dayLabels.map((label, index)=>{
            return <td
              key={index}
              className="text-muted"
              style={{padding: this.props.cellPadding}}>
              <small>{label}</small>
            </td>;
          })}
        </tr>
      </thead>
      <tbody>
        {weeks}
      </tbody>
      {this.props.showTodayButton && <tfoot>
        <tr>
          <td colSpan={this.props.dayLabels.length} style={{ paddingTop: '9px' }}>
            <Button
              block
              bsSize="xsmall"
              onClick={this.handleClickToday.bind(this)}>
              {this.props.todayButtonLabel}
            </Button>
          </td>
        </tr>
      </tfoot>}
    </table>;
  }
});

export default React.createClass({
  displayName: 'DatePicker',

  propTypes: {
    value: React.PropTypes.string,
    cellPadding: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    dayLabels: React.PropTypes.array,
    monthLabels: React.PropTypes.array,
    onChange: React.PropTypes.func,
    onClear: React.PropTypes.func,
    onBlur: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    disabled: React.PropTypes.bool,
    weekStartsOnMonday: React.PropTypes.bool,
    clearButtonElement: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object
    ]),
    showClearButton: React.PropTypes.bool,
    previousButtonElement: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object
    ]),
    nextButtonElement: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object
    ]),
    calendarPlacement: React.PropTypes.string,
    dateFormat: React.PropTypes.string, // 'MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY/MM/DD', 'DD-MM-YYYY'
    bsClass: React.PropTypes.string,
    bsSize: React.PropTypes.string,
    calendarContainer: React.PropTypes.object,
    id: React.PropTypes.string,
    name: React.PropTypes.string,
    showTodayButton: React.PropTypes.bool,
    todayButtonLabel: React.PropTypes.string,
    customControl: React.PropTypes.object,
  },

  getDefaultProps() {
    const language = typeof window !== 'undefined' && window.navigator ? (window.navigator.userLanguage || window.navigator.language || '').toLowerCase() : '';
    const dateFormat = !language || language === 'en-us' ? 'MM/DD/YYYY' : 'DD/MM/YYYY';
    return {
      cellPadding: '5px',
      dayLabels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      monthLabels: ['January', 'February', 'March', 'April',
                    'May', 'June', 'July', 'August', 'September',
                    'October', 'November', 'December'],
      clearButtonElement: '×',
      previousButtonElement: '<',
      nextButtonElement: '>',
      calendarPlacement: 'bottom',
      dateFormat: dateFormat,
      showClearButton: true,
      disabled: false,
      showTodayButton: false,
      todayButtonLabel: 'Today',
    };
  },

  getInitialState() {
    const state = this.makeDateValues(this.props.value);
    if (this.props.weekStartsOnMonday) {
      state.dayLabels = this.props.dayLabels.slice(1).concat(this.props.dayLabels.slice(0,1));
    } else {
      state.dayLabels = this.props.dayLabels;
    }
    state.focused = false;
    state.inputFocused = false;
    state.placeholder = this.props.placeholder || this.props.dateFormat;
    state.separator = this.props.dateFormat.match(/[^A-Z]/)[0];
    return state;
  },

  makeDateValues(isoString) {
    let displayDate;
    const selectedDate = isoString ? new Date(isoString) : null;
    const inputValue = isoString ? this.makeInputValueString(selectedDate) : null;
    if (selectedDate) {
      displayDate = new Date(selectedDate);
    }
    else {
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

  clear() {
    if (this.props.onClear) {
      this.props.onClear();
    }
    else {
      this.setState(this.makeDateValues(null));
    }

    if (this.props.onChange) {
      this.props.onChange(null);
    }
  },

  handleHide() {
    if (this.state.inputFocused) {
      return;
    }
    this.setState({
      focused: false
    });
    if (this.props.onBlur) {
      const event = document.createEvent('CustomEvent');
      event.initEvent('Change Date', true, false);
      ReactDOM.findDOMNode(this.refs.hiddenInput).dispatchEvent(event);
      this.props.onBlur(event);
    }
  },

  handleKeyDown(e) {
    if (e.which === 9 && this.state.inputFocused) {
      this.setState({
        focused: false
      });

      if (this.props.onBlur) {
        const event = document.createEvent('CustomEvent');
        event.initEvent('Change Date', true, false);
        ReactDOM.findDOMNode(this.refs.hiddenInput).dispatchEvent(event);
        this.props.onBlur(event);
      }
    }
  },

  handleFocus(e) {
    if (this.state.focused === true) {
      return;
    }

    this.setState({
      inputFocused: true,
      focused: true
    });

    if (this.props.onFocus) {
      const event = document.createEvent('CustomEvent');
      event.initEvent('Change Date', true, false);
      ReactDOM.findDOMNode(this.refs.hiddenInput).dispatchEvent(event);
      this.props.onFocus(event);
    }
  },

  handleBlur(e) {
    this.setState({
      inputFocused: false
    });
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    return !(this.state.inputFocused === true && nextState.inputFocused === false);
  },

  getValue() {
    return this.state.selectedDate ? this.state.selectedDate.toISOString() : null;
  },

  makeInputValueString(date) {
    const month = date.getMonth() + 1;
    const day = date.getDate();

    //this method is executed during intialState setup... handle a missing state properly
    const separator = (this.state ? this.state.separator : this.props.dateFormat.match(/[^A-Z]/)[0]);
    if (this.props.dateFormat.match(/MM.DD.YYYY/)) {
      return (month > 9 ? month : `0${month}`) + separator + (day > 9 ? day : `0${day}`) + separator + date.getFullYear();
    }
    else if (this.props.dateFormat.match(/DD.MM.YYYY/)) {
      return (day > 9 ? day : `0${day}`) + separator + (month > 9 ? month : `0${month}`) + separator + date.getFullYear();
    }
    else {
      return date.getFullYear() + separator + (month > 9 ? month : `0${month}`) + separator + (day > 9 ? day : `0${day}`);
    }
  },

  handleBadInput(originalValue) {
    const parts = originalValue.replace(new RegExp(`[^0-9${this.state.separator}]`), '').split(this.state.separator);
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
        parts[2] = parts[2].slice(0,4);
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
        parts[2] = parts[2].slice(0,2);
      }
    }
    this.setState({
      inputValue: parts.join(this.state.separator)
    });
  },

  handleInputChange(e) {
    const originalValue = ReactDOM.findDOMNode(this.refs.input).value;
    const inputValue = originalValue.replace(/(-|\/\/)/g, this.state.separator);

    let month, day, year;
    if (this.props.dateFormat.match(/MM.DD.YYYY/)) {
      if (!inputValue.match(/[0-1][0-9].[0-3][0-9].[1-2][0-9][0-9][0-9]/)) {
        return this.handleBadInput(originalValue);
      }

      month = inputValue.slice(0,2).replace(/[^0-9]/g, '');
      day = inputValue.slice(3,5).replace(/[^0-9]/g, '');
      year = inputValue.slice(6,10).replace(/[^0-9]/g, '');
    } else if (this.props.dateFormat.match(/DD.MM.YYYY/)) {
      if (!inputValue.match(/[0-3][0-9].[0-1][0-9].[1-2][0-9][0-9][0-9]/)) {
        return this.handleBadInput(originalValue);
      }

      day = inputValue.slice(0,2).replace(/[^0-9]/g, '');
      month = inputValue.slice(3,5).replace(/[^0-9]/g, '');
      year = inputValue.slice(6,10).replace(/[^0-9]/g, '');
    } else {
      if (!inputValue.match(/[1-2][0-9][0-9][0-9].[0-1][0-9].[0-3][0-9]/)) {
        return this.handleBadInput(originalValue);
      }

      year = inputValue.slice(0,4).replace(/[^0-9]/g, '');
      month = inputValue.slice(5,7).replace(/[^0-9]/g, '');
      day = inputValue.slice(8,10).replace(/[^0-9]/g, '');
    }

    const monthInteger = parseInt(month, 10);
    const dayInteger = parseInt(day, 10);
    const yearInteger = parseInt(year, 10);
    if (monthInteger > 12 || dayInteger > 31) {
      return this.handleBadInput(originalValue);
    }

    if (!isNaN(monthInteger) && !isNaN(dayInteger) && !isNaN(yearInteger) && monthInteger <= 12 && dayInteger <= 31 && yearInteger > 999) {
      const selectedDate = new Date(yearInteger, monthInteger - 1, dayInteger, 12, 0, 0, 0);
      this.setState({
        selectedDate: selectedDate,
        displayDate: selectedDate,
        value: selectedDate.toISOString()
      });

      if (this.props.onChange) {
        this.props.onChange(selectedDate.toISOString());
      }
    }

    this.setState({
      inputValue: inputValue
    });
  },

  onChangeMonth(newDisplayDate) {
    this.setState({
      displayDate: newDisplayDate
    });
  },

  onChangeDate(newSelectedDate) {
    this.setState({
      inputValue: this.makeInputValueString(newSelectedDate),
      selectedDate: newSelectedDate,
      displayDate: newSelectedDate,
      value: newSelectedDate.toISOString(),
      focused: false
    });

    if (this.props.onBlur) {
      const event = document.createEvent('CustomEvent');
      event.initEvent('Change Date', true, false);
      ReactDOM.findDOMNode(this.refs.hiddenInput).dispatchEvent(event);
      this.props.onBlur(event);
    }

    if (this.props.onChange) {
      this.props.onChange(newSelectedDate.toISOString());
    }
  },

  componentWillReceiveProps(newProps) {
    const value = newProps.value;
    if (this.getValue() !== value) {
      this.setState(this.makeDateValues(value));
    }
  },

  render() {
    const calendarHeader = <CalendarHeader
      previousButtonElement={this.props.previousButtonElement}
      nextButtonElement={this.props.nextButtonElement}
      displayDate={this.state.displayDate}
      onChange={this.onChangeMonth}
      monthLabels={this.props.monthLabels}
      dateFormat={this.props.dateFormat} />;

    const control = this.props.customControl
      ? React.cloneElement(this.props.customControl, {
        onKeyDown: this.handleKeyDown,
        value: this.state.inputValue || '',
        placeholder: this.state.focused ? this.props.dateFormat : this.state.placeholder,
        ref: 'input',
        disabled: this.props.disabled,
        onFocus: this.handleFocus,
        onBlur: this.handleBlur,
        onChange: this.handleInputChange,
      })
      : <FormControl
          onKeyDown={this.handleKeyDown}
          value={this.state.inputValue || ''}
          ref="input"
          type="text"
          disabled={this.props.disabled}
          placeholder={this.state.focused ? this.props.dateFormat : this.state.placeholder}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onChange={this.handleInputChange}
          style={{width: '100%'}} />;

    return <InputGroup
      ref="inputGroup"
      bsClass={this.props.showClearButton ? this.props.bsClass : ''}
      bsSize={this.props.bsSize}
      id={this.props.id ? `${this.props.id}_group` : null}>
      <Overlay
        rootClose={true}
        onHide={this.handleHide}
        show={this.state.focused}
        container={() => this.props.calendarContainer || ReactDOM.findDOMNode(this.refs.overlayContainer)}
        target={() => ReactDOM.findDOMNode(this.refs.input)}
        placement={this.props.calendarPlacement}
        delayHide={200}>
        <Popover id="calendar" title={calendarHeader}>
          <Calendar
            cellPadding={this.props.cellPadding}
            selectedDate={this.state.selectedDate}
            displayDate={this.state.displayDate}
            onChange={this.onChangeDate}
            dayLabels={this.state.dayLabels}
            weekStartsOnMonday={this.props.weekStartsOnMonday}
            showTodayButton={this.props.showTodayButton}
            todayButtonLabel={this.props.todayButtonLabel} />
        </Popover>
      </Overlay>
      <div ref="overlayContainer" />
      <input ref="hiddenInput" type="hidden" id={this.props.id} name={this.props.name} value={this.state.value || ''} />
      {control}
      {this.props.showClearButton && !this.props.customControl && <InputGroup.Addon
        onClick={this.props.disabled ? null : this.clear}
        style={{cursor:(this.state.inputValue && !this.props.disabled) ? 'pointer' : 'not-allowed'}}>
        <div style={{opacity: (this.state.inputValue && !this.props.disabled) ? 1 : 0.5}}>
          {this.props.clearButtonElement}
        </div>
      </InputGroup.Addon>}
    </InputGroup>;
  }
});

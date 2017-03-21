// See http://jszen.blogspot.com/2007/03/how-to-build-simple-calendar-with.html for calendar logic.

import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/lib/Button';
import FormControl from 'react-bootstrap/lib/FormControl';
import InputGroup from 'react-bootstrap/lib/InputGroup';
import Overlay from 'react-bootstrap/lib/Overlay';
import Popover from 'react-bootstrap/lib/Popover';

let instanceCount = 0;

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
    newDisplayDate.setDate(1);
    newDisplayDate.setMonth(newDisplayDate.getMonth() - 1);
    this.props.onChange(newDisplayDate);
  },

  handleClickNext() {
    const newDisplayDate = new Date(this.props.displayDate);
    newDisplayDate.setDate(1);
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
    minDate: React.PropTypes.string,
    maxDate: React.PropTypes.string,
    onChange: React.PropTypes.func.isRequired,
    dayLabels: React.PropTypes.array.isRequired,
    cellPadding: React.PropTypes.string.isRequired,
    weekStartsOnMonday: React.PropTypes.bool,
    showTodayButton: React.PropTypes.bool,
    todayButtonLabel: React.PropTypes.string,
    roundedCorners: React.PropTypes.bool
  },

  handleClick(day) {
    const newSelectedDate = this.setTimeToNoon(new Date(this.props.displayDate));
    newSelectedDate.setDate(day);
    this.props.onChange(newSelectedDate);
  },

  handleClickToday() {
    const newSelectedDate = this.setTimeToNoon(new Date());
    this.props.onChange(newSelectedDate);
  },

  setTimeToNoon(date) {
    date.setHours(12);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
  },

  render() {
    const currentDate = this.setTimeToNoon(new Date());
    const selectedDate = this.props.selectedDate ? this.setTimeToNoon(new Date(this.props.selectedDate)) : null;
    const minDate = this.props.minDate ? this.setTimeToNoon(new Date(this.props.minDate)) : null;
    const maxDate = this.props.maxDate ? this.setTimeToNoon(new Date(this.props.maxDate)) : null;
    const year = this.props.displayDate.getFullYear();
    const month = this.props.displayDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const startingDay = this.props.weekStartsOnMonday ? (firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1) : firstDay.getDay();

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
          let className = null;
          const date = new Date(year, month, day, 12, 0, 0, 0).toISOString();
          const beforeMinDate = minDate && Date.parse(date) < Date.parse(minDate);
          const afterMinDate = maxDate && Date.parse(date) > Date.parse(maxDate);
          if (beforeMinDate || afterMinDate) {
            week.push(<td
              key={j}
              style={{ padding: this.props.cellPadding }}
              className="text-muted"
            >
              {day}
            </td>);
          } else {
            if (Date.parse(date) === Date.parse(selectedDate)) {
              className = 'bg-primary';
            } else if (Date.parse(date) === Date.parse(currentDate)) {
              className = 'text-primary';
            }
            week.push(<td
              key={j}
              onClick={this.handleClick.bind(this, day)}
              style={{ cursor: 'pointer', padding: this.props.cellPadding, borderRadius: this.props.roundedCorners ? 5 : 0 }}
              className={className}
            >
              {day}
            </td>);
          }
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
              className="u-today-button"
              onClick={this.handleClickToday}>
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
    defaultValue: React.PropTypes.string,
    value: React.PropTypes.string,
    required: React.PropTypes.bool,
    className: React.PropTypes.string,
    style: React.PropTypes.object,
    minDate: React.PropTypes.string,
    maxDate: React.PropTypes.string,
    cellPadding: React.PropTypes.string,
    autoComplete: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    dayLabels: React.PropTypes.array,
    monthLabels: React.PropTypes.array,
    onChange: React.PropTypes.func,
    onClear: React.PropTypes.func,
    onBlur: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    autoFocus: React.PropTypes.bool,
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
    instanceCount: React.PropTypes.number,
    customControl: React.PropTypes.object,
    roundedCorners: React.PropTypes.bool
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
      autoFocus: false,
      disabled: false,
      showTodayButton: false,
      todayButtonLabel: 'Today',
      autoComplete: 'on',
      instanceCount: instanceCount++,
      style: {
        width: '100%'
      },
      roundedCorners: false
    };
  },

  getInitialState() {
    if (this.props.value && this.props.defaultValue) {
      throw new Error('Conflicting DatePicker properties \'value\' and \'defaultValue\'');
    }
    const state = this.makeDateValues(this.props.value || this.props.defaultValue);
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
    const selectedDate = isoString ? new Date(`${isoString.slice(0,10)}T12:00:00.000Z`) : null;
    const inputValue = isoString ? this.makeInputValueString(selectedDate) : null;
    if (selectedDate) {
      displayDate = new Date(selectedDate);
    } else {
      displayDate = new Date(`${(new Date().toISOString().slice(0,10))}T12:00:00.000Z`);
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
      this.props.onChange(null, null);
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

  handleFocus() {
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

  handleBlur() {
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

  getFormattedValue() {
    return this.state.displayDate ? this.state.inputValue : null;
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

  handleInputChange() {

    const originalValue = ReactDOM.findDOMNode(this.refs.input).value;
    const inputValue = originalValue.replace(/(-|\/\/)/g, this.state.separator).slice(0,10);

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
        this.props.onChange(selectedDate.toISOString(), inputValue);
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
    const inputValue = this.makeInputValueString(newSelectedDate);
    this.setState({
      inputValue: inputValue,
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
      this.props.onChange(newSelectedDate.toISOString(), inputValue);
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
      })
      : <FormControl
          onKeyDown={this.handleKeyDown}
          value={this.state.inputValue || ''}
          required={this.props.required}
          ref="input"
          type="text"
          className={this.props.className}
          style={this.props.style}
          autoFocus={this.props.autoFocus}
          disabled={this.props.disabled}
          placeholder={this.state.focused ? this.props.dateFormat : this.state.placeholder}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onChange={this.handleInputChange}
          autoComplete={this.props.autoComplete}
          />;

    return <InputGroup
      ref="inputGroup"
      bsClass={this.props.showClearButton ? this.props.bsClass : ''}
      bsSize={this.props.bsSize}
      id={this.props.id ? `${this.props.id}_group` : null}>
      {control}
      <Overlay
        rootClose={true}
        onHide={this.handleHide}
        show={this.state.focused}
        container={() => this.props.calendarContainer || ReactDOM.findDOMNode(this.refs.overlayContainer)}
        target={() => ReactDOM.findDOMNode(this.refs.input)}
        placement={this.props.calendarPlacement}
        delayHide={200}>
        <Popover id={`date-picker-popover-${this.props.instanceCount}`} className="date-picker-popover" title={calendarHeader}>
          <Calendar
            cellPadding={this.props.cellPadding}
            selectedDate={this.state.selectedDate}
            displayDate={this.state.displayDate}
            onChange={this.onChangeDate}
            dayLabels={this.state.dayLabels}
            weekStartsOnMonday={this.props.weekStartsOnMonday}
            showTodayButton={this.props.showTodayButton}
            todayButtonLabel={this.props.todayButtonLabel}
            minDate={this.props.minDate}
            maxDate={this.props.maxDate}
            roundedCorners={this.props.roundedCorners}
           />
        </Popover>
      </Overlay>
      <div ref="overlayContainer" style={{position: 'relative'}} />
      <input ref="hiddenInput" type="hidden" id={this.props.id} name={this.props.name} value={this.state.value || ''} data-formattedvalue={this.state.value ? this.state.inputValue : ''} />
      {this.props.showClearButton && !this.props.customControl && <InputGroup.Addon
        onClick={this.props.disabled ? null : this.clear}
        style={{cursor:(this.state.inputValue && !this.props.disabled) ? 'pointer' : 'not-allowed'}}>
        <div style={{opacity: (this.state.inputValue && !this.props.disabled) ? 1 : 0.5}}>
          {this.props.clearButtonElement}
        </div>
      </InputGroup.Addon>}
      {this.props.children}
    </InputGroup>;
  }
});

// See http://jszen.blogspot.com/2007/03/how-to-build-simple-calendar-with.html for calendar logic.

import React from 'react';
import Input from 'react-bootstrap/lib/Input';
import Popover from 'react-bootstrap/lib/Popover';
import Button from 'react-bootstrap/lib/Button';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';

const makeInputValueString = function(date) {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return (month > 9 ? month : "0" + month) + "/" + (day > 9 ? day : "0" + day) + "/" + date.getFullYear()
};

const CalendarHeader = React.createClass({
  displayName: "DatePickerHeader",
  propTypes: {
    displayDate: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired,
    monthLabels: React.PropTypes.array.isRequired,
    onDateClick: React.PropTypes.func.isRequired,
    previousButtonElement: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object
    ]).isRequired,
    nextButtonElement: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object
    ]).isRequired,
  },
  handleClickPrevious(){
    const newDisplayDate = new Date(this.props.displayDate);
    newDisplayDate.setMonth(newDisplayDate.getMonth() - 1);
    this.props.onChange(newDisplayDate);
  },
  handleClickNext(){
    const newDisplayDate = new Date(this.props.displayDate);
    newDisplayDate.setMonth(newDisplayDate.getMonth() + 1);
    this.props.onChange(newDisplayDate);
  },
  render() {
    return <div className="text-center">
      <div className="text-muted pull-left" onClick={this.handleClickPrevious} style={{cursor: "pointer"}}>{this.props.previousButtonElement}</div>
        <span onClick={this.props.onDateClick}>{this.props.monthLabels[this.props.displayDate.getMonth()]} {this.props.displayDate.getFullYear()}</span>
      <div className="text-muted pull-right" onClick={this.handleClickNext} style={{cursor: "pointer"}}>{this.props.nextButtonElement}</div>
    </div>;
  }
});

const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const Calendar = React.createClass({
  displayName: "DatePickerCalendar",
  propTypes: {
    selectedDate: React.PropTypes.object,
    displayDate: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired,
    dayLabels: React.PropTypes.array.isRequired,
    cellPadding: React.PropTypes.string.isRequired,
    onUnmount: React.PropTypes.func.isRequired
  },
  componentWillUnmount(){
    this.props.onUnmount();
  },
  handleClick(day) {
    const newSelectedDate = new Date(this.props.displayDate);
    newSelectedDate.setDate(day);
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
    const startingDay = firstDay.getDay();
    let monthLength = daysInMonth[month];
    if (month == 1) {
      if((year % 4 == 0 && year % 100 != 0) || year % 400 == 0){
        monthLength = 29;
      }
    }
    const weeks = [];
    let day = 1;
    for (let i = 0; i < 9; i++) {
      let week = [];
      for (let j = 0; j <= 6; j++) {
        if (day <= monthLength && (i > 0 || j >= startingDay)) {
          const selected = day === selectedDay && month == selectedMonth && year === selectedYear;
          const current = day === currentDay && month == currentMonth && year === currentYear;
          week.push(<td key={j} onClick={this.handleClick.bind(this, day)} style={{cursor: "pointer", padding: this.props.cellPadding}} className={selected ? "bg-primary" : current ? "text-muted" : null}>{day}</td>);
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
            return <td key={index} className="text-muted" style={{padding: this.props.cellPadding}}>
              <small>{label}</small>
            </td>
          })}
        </tr>
      </thead>
      <tbody>
        {weeks}
      </tbody>
    </table>;
  }
});

export default React.createClass({
  displayName: "DatePicker",
  propTypes: {
    value: React.PropTypes.string,
    cellPadding: React.PropTypes.string,
    dayLabels: React.PropTypes.array,
    monthLabels: React.PropTypes.array,
    onChange: React.PropTypes.func,
    clearButtonElement: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object
    ]),
    previousButtonElement: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object
    ]),
    nextButtonElement: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object
    ]),
    calendarPlacement: React.PropTypes.string
  },
  getDefaultProps() {
    return {
      cellPadding: "5px",
      dayLabels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      monthLabels: ['January', 'February', 'March', 'April',
                    'May', 'June', 'July', 'August', 'September',
                    'October', 'November', 'December'],
      placeholder: "MM/DD/YYYY",
      clearButtonElement: "×",
      previousButtonElement: "<",
      nextButtonElement: ">",
      calendarPlacement: "bottom"
    }
  },
  getInitialState() {
    var state = this.makeDateValues(this.props.value ? this.props.value : this.props.valueLink ? this.props.valueLink.value : null);
    state.focused = false;
    return state;
  },
  makeDateValues(isoString) {
    let displayDate;
    const selectedDate = isoString ? new Date(isoString) : null;
    const inputValue = isoString ? makeInputValueString(selectedDate) : null;
    if(selectedDate) {
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
    }
  },
  clear() {
    this.setState(this.makeDateValues(null));
    if(this.props.onChange) {
      this.props.onChange(null);
    }
    if(this.props.valueLink && this.props.valueLink.requestChange) {
      this.props.valueLink.requestChange(null);
    }
  },
  handleHide(e){
    if(document.activeElement === this.refs.input.getInputDOMNode()) {
      return;
    }
    this.setState({
      focused: false
    });
    if(this.props.onBlur) {
      this.props.onBlur(e);
    }
  },
  handleFocus(e){
    if(this.refs.overlay.state.isOverlayShown === true) {
      return;
    }
    this.setState({
      focused: true
    });
    if(this.props.onFocus) {
      this.props.onFocus(e);
    }
  },
  handleBlur(e){
    if(this.refs.overlay.state.isOverlayShown === true) {
      return;
    }
    this.setState({
      focused: false
    });
    if(this.props.onBlur) {
      this.props.onBlur(e);
    }
  },
  handleHeaderDateClick(e) {

  },
  getValue(){
    return this.state.selectedDate ? this.state.selectedDate.toISOString() : null;
  },
  handleInputChange(e){
    let inputValue = this.refs.input.getValue();
    inputValue = inputValue.replace(/(-|\/\/)/g, '/');
    const month = inputValue.slice(0,2).replace(/[^0-9]/g, '');
    const day = inputValue.slice(3,5).replace(/[^0-9]/g, '');
    const year = inputValue.slice(6,10).replace(/[^0-9]/g, '');
    const monthInteger = parseInt(month, 10);
    const dayInteger = parseInt(day, 10);
    const yearInteger = parseInt(year, 10);
    if(!isNaN(monthInteger) && !isNaN(dayInteger) && !isNaN(yearInteger) && monthInteger <= 12 && dayInteger <= 31 && yearInteger > 999) {
      const selectedDate = new Date();
      selectedDate.setDate(dayInteger);
      selectedDate.setMonth(monthInteger - 1);
      selectedDate.setYear(yearInteger);
      this.setState({
        selectedDate: selectedDate,
        displayDate: selectedDate,
        value: selectedDate.toISOString()
      });
      if(this.props.onChange) {
        this.props.onChange(selectedDate.toISOString());
      }
      if(this.props.valueLink && this.props.valueLink.requestChange) {
        this.props.valueLink.requestChange(selectedDate.toISOString());
      }
    }
    inputValue = month + inputValue.slice(2,3).replace(/[^\/]/g, '') + day + inputValue.slice(5,6).replace(/[^\/]/g, '') + year;
    if(this.state.inputValue && inputValue.length > this.state.inputValue.length) {
      if(inputValue.length == 2) {
        inputValue += "/";
      }
      if(inputValue.length == 5) {
        inputValue += "/";
      }
      inputValue = inputValue.slice(0, 10);
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
      inputValue: makeInputValueString(newSelectedDate),
      selectedDate: newSelectedDate,
      displayDate: newSelectedDate,
      value: newSelectedDate.toISOString()
    });
    this.refs.overlay.handleDelayedHide();
    if(this.props.onChange) {
      this.props.onChange(newSelectedDate.toISOString());
    }
    if(this.props.valueLink && this.props.valueLink.requestChange) {
      this.props.valueLink.requestChange(newSelectedDate.toISOString());
    }
  },
  componentWillReceiveProps(newProps) {
    const value = newProps.value ? newProps.value : newProps.valueLink ? newProps.valueLink.value : null;
    if(this.getValue() !== value) {
      this.setState(this.makeDateValues(value));
    }
  },
  render() {
    const calendarHeader = <CalendarHeader
      previousButtonElement={this.props.previousButtonElement}
      nextButtonElement={this.props.nextButtonElement}
      displayDate={this.state.displayDate}
      onDateClick={this.handleHeaderDateClick}
      onChange={this.onChangeMonth}
      monthLabels={this.props.monthLabels} />;
    const popOver = <Popover id="calendar" title={calendarHeader}>
      <Calendar cellPadding={this.props.cellPadding} selectedDate={this.state.selectedDate} displayDate={this.state.displayDate} onChange={this.onChangeDate} dayLabels={this.props.dayLabels} onUnmount={this.handleHide} />
    </Popover>;
    const buttonStyle = this.props.bsStyle === "error" ? "danger" : this.props.bsStyle;
    const clearButton = <Button onClick={this.clear} bsStyle={buttonStyle || "default"} disabled={!this.state.inputValue}>{this.props.clearButtonElement}</Button>;
    return <div>
      <OverlayTrigger ref="overlay" trigger="click" rootClose placement={this.props.calendarPlacement} overlay={popOver} delayHide={100}>
        <Input
          {...this.props}
          value={this.state.inputValue}
          ref="input"
          type="text"
          valueLink={null}
          placeholder={this.state.focused ? "MM/DD/YYYY" : this.props.placeholder}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onChange={this.handleInputChange}
          buttonAfter={clearButton}
          name={null}
          id={null}
        />
      </OverlayTrigger>
      <input type="hidden" id={this.props.id} name={this.props.name} value={this.state.value} />
    </div>;
  }
});


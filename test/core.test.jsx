import React from "react";
import ReactDOM from "react-dom";
import DatePicker from "../src/index.jsx";
import assert from "assert";
import co from "co";
import ES6Promise from 'es6-promise';
import UUID from "node-uuid";
import TestUtils from 'react/lib/ReactTestUtils';

ES6Promise.polyfill();

const spanishDayLabels = ['Dom', 'Lu', 'Ma', 'Mx', 'Ju', 'Vi', 'Sab'];
const spanishMonthLabels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

describe("Date Picker", function() {
  this.timeout(30000);
  let container, calendarContainer;
  before(function(){
    container = document.createElement("div");
    container.id = "react";
    document.getElementsByTagName('body')[0].appendChild(container);
    calendarContainer = document.createElement("div"); // optional container for the calendar popover
    calendarContainer.id = "calendarContainer";
    document.getElementsByTagName('body')[0].appendChild(calendarContainer);
  });
  after(function(){
    document.getElementsByTagName('body')[0].removeChild(container);
    document.getElementsByTagName('body')[0].removeChild(calendarContainer);
  });
  it("should render an empty date picker.", co.wrap(function *(){
    const id = UUID.v4();
    const App = React.createClass({
      render: function(){
        return <div>
          <DatePicker id={id} />
        </div>;
      }
    });
    yield new Promise(function(resolve, reject){
      ReactDOM.render(<App />, container, resolve);
    });
    const hiddenInputElement = document.getElementById(id);
    assert.equal(hiddenInputElement.value, "");
    ReactDOM.unmountComponentAtNode(container);
  }));
  it("should render a date picker with a value.", co.wrap(function *(){
    const id = UUID.v4();
    const value = new Date().toISOString();
    const App = React.createClass({
      render: function(){
        return <div>
          <DatePicker id={id} value={value} />
        </div>;
      }
    });
    yield new Promise(function(resolve, reject){
      ReactDOM.render(<App />, container, resolve);
    });
    const hiddenInputElement = document.getElementById(id);
    assert.equal(hiddenInputElement.value, value);
    ReactDOM.unmountComponentAtNode(container);
  }));
  it("should open the calendar and select a date.", co.wrap(function *(){
    const id = UUID.v4();
    const App = React.createClass({
      render: function(){
        return <div>
          <DatePicker id={id} />
        </div>;
      }
    });
    yield new Promise(function(resolve, reject){
      ReactDOM.render(<App />, container, resolve);
    });
    const hiddenInputElement = document.getElementById(id);
    const inputElement = document.querySelector("input.form-control");
    TestUtils.Simulate.focus(inputElement);
    const dayElement = document.querySelector("table tbody tr:nth-child(2) td");
    assert.equal(hiddenInputElement.value, '');
    TestUtils.Simulate.click(dayElement);
    assert.notEqual(hiddenInputElement.value, '');
    ReactDOM.unmountComponentAtNode(container);
  }));
  it("should open the calendar, select a date, and trigger a change event.", co.wrap(function *(){
    const id = UUID.v4();
    let value = null;
    const App = React.createClass({
      handleChange: function(newValue){
        value = newValue;
      },
      render: function(){
        return <div>
          <DatePicker id={id} onChange={this.handleChange} />
        </div>;
      }
    });
    yield new Promise(function(resolve, reject){
      ReactDOM.render(<App />, container, resolve);
    });
    const inputElement = document.querySelector("input.form-control");
    TestUtils.Simulate.focus(inputElement);
    const dayElement = document.querySelector("table tbody tr:nth-child(2) td");
    assert.equal(value, null);
    TestUtils.Simulate.click(dayElement);
    assert(typeof value === "string");
    ReactDOM.unmountComponentAtNode(container);
  }));
  it("should open the calendar and render 29 days on a leap year.", co.wrap(function *(){
    const id = UUID.v4();
    let value = "2016-02-15T00:00:00.000Z";
    const App = React.createClass({
      render: function(){
        return <div>
          <DatePicker id={id} value={value} />
        </div>;
      }
    });
    yield new Promise(function(resolve, reject){
      ReactDOM.render(<App />, container, resolve);
    });
    const inputElement = document.querySelector("input.form-control");
    TestUtils.Simulate.focus(inputElement);
    const dayElement = document.querySelector("table tbody tr:nth-child(5) td:nth-of-type(2)");
    assert.equal(dayElement.innerHTML, '29');
    TestUtils.Simulate.click(dayElement);
    ReactDOM.unmountComponentAtNode(container);
  }));
  it("should update via a change handler when the input is changed.", co.wrap(function *(){
    const id = UUID.v4();
    let value = null;
    const App = React.createClass({
      handleChange: function(newValue){
        value = newValue;
      },
      render: function(){
        return <div>
          <DatePicker id={id} onChange={this.handleChange} dateFormat="MM/DD/YYYY" />
        </div>;
      }
    });
    yield new Promise(function(resolve, reject){
      ReactDOM.render(<App />, container, resolve);
    });
    const inputElement = document.querySelector("input.form-control");
    inputElement.value = "05/31/1980";
    TestUtils.Simulate.change(inputElement);
    const date = new Date(value);
    assert.equal(date.getMonth(), 4);
    assert.equal(date.getDate(), 31);
    assert.equal(date.getFullYear(), 1980);
    ReactDOM.unmountComponentAtNode(container);
  }));
  it("should render with custom elements", co.wrap(function *(){
    const id = UUID.v4();
    const clearButtonElement = <div id="clear-button-element"></div>;
    const previousButtonElement = <div id="previous-button-element"></div>;
    const nextButtonElement = <div id="next-button-element"></div>;
    const App = React.createClass({
      render: function(){
        return <div>
          <DatePicker
            id={id}
            dayLabels={spanishDayLabels}
            monthLabels={spanishMonthLabels}
            clearButtonElement={clearButtonElement}
            nextButtonElement={nextButtonElement}
            previousButtonElement={previousButtonElement} />
        </div>;
      }
    });
    var spanishMonthLabel = spanishMonthLabels[new Date().getMonth()];
    yield new Promise(function(resolve, reject){
      ReactDOM.render(<App />, container, resolve);
    });
    const inputElement = document.querySelector("input.form-control");
    TestUtils.Simulate.focus(inputElement);
    const dayElement = document.querySelector("table tbody tr:nth-child(2) td");
    TestUtils.Simulate.click(dayElement);
    const popover = document.querySelector(".popover");
    assert.notEqual(document.getElementById("clear-button-element"), null);
    assert.notEqual(document.getElementById("previous-button-element"), null);
    assert.notEqual(document.getElementById("next-button-element"), null);
    assert.notEqual(popover.innerHTML.indexOf(spanishMonthLabel), -1);
    assert.notEqual("Mx", -1);
    ReactDOM.unmountComponentAtNode(container);
  }));
  it("should render without clear button element", co.wrap(function *(){
    const id = UUID.v4();
    const clearButtonElement = <div id="clear-button-element"></div>;
    const App = React.createClass({
      render: function(){
        return <div>
          <DatePicker
            id={id}
            clearButtonElement={clearButtonElement}
            showClearButton={false}
            />
        </div>;
      }
    });
    yield new Promise(function(resolve, reject){
      ReactDOM.render(<App />, container, resolve);
    });
    assert.equal(document.getElementById("clear-button-element"), null);
    ReactDOM.unmountComponentAtNode(container);
  }));
  it("should go to the previous and next month.", co.wrap(function *(){
    const id = UUID.v4();
    const App = React.createClass({
      render: function(){
        return <div>
          <DatePicker id={id} />
        </div>;
      }
    });
    yield new Promise(function(resolve, reject){
      ReactDOM.render(<App />, container, resolve);
    });
    const hiddenInputElement = document.getElementById(id);
    const inputElement = document.querySelector("input.form-control");
    TestUtils.Simulate.focus(inputElement);
    const previousButtonElement = document.querySelector(".pull-left");
    const nextButtonElement = document.querySelector(".pull-right");
    const dayElement = document.querySelector("table tbody tr:nth-child(2) td");
    TestUtils.Simulate.click(previousButtonElement);
    TestUtils.Simulate.click(dayElement);
    var previousMonthISOString = hiddenInputElement.value;
    TestUtils.Simulate.focus(inputElement);
    TestUtils.Simulate.click(nextButtonElement);
    TestUtils.Simulate.click(dayElement);
    var currentMonthISOString = hiddenInputElement.value;
    assert(previousMonthISOString < currentMonthISOString);
    ReactDOM.unmountComponentAtNode(container);
  }));
  it("should cycle through every month in the year.", co.wrap(function *(){
    const id = UUID.v4();
    const App = React.createClass({
      render: function(){
        return <div>
          <DatePicker id={id} />
        </div>;
      }
    });
    yield new Promise(function(resolve, reject){
      ReactDOM.render(<App />, container, resolve);
    });
    const inputElement = document.querySelector("input.form-control");
    TestUtils.Simulate.focus(inputElement);
    const nextButtonElement = document.querySelector(".pull-right");
    for(let i = 0; i < 12; i++) {
      TestUtils.Simulate.click(nextButtonElement);
    }
    ReactDOM.unmountComponentAtNode(container);
  }));
  it("should update via a change handler when cleared.", co.wrap(function *(){
    const id = UUID.v4();
    let value = null;
    const App = React.createClass({
      handleChange: function(newValue){
        value = newValue;
      },
      render: function(){
        return <div>
          <DatePicker id={id} onChange={this.handleChange} />
        </div>;
      }
    });
    yield new Promise(function(resolve, reject){
      ReactDOM.render(<App />, container, resolve);
    });
    const inputElement = document.querySelector("input.form-control");
    TestUtils.Simulate.focus(inputElement);
    const clearButtonElement = document.querySelector("span.input-group-addon");
    const dayElement = document.querySelector("table tbody tr:nth-child(2) td");
    TestUtils.Simulate.click(dayElement);
    assert.notEqual(value, null);
    TestUtils.Simulate.click(clearButtonElement);
    assert.equal(value, null);
    ReactDOM.unmountComponentAtNode(container);
  }));
  it("should call focus and blur handlers.", co.wrap(function *(){
    const id = UUID.v4();
    var results = {};
    var value = new Date().toISOString();
    const App = React.createClass({
      getInitialState: function() {
        return {
          focused: false
        }
      },
      focusHandler: function(e) {
        assert.equal(e.target, document.querySelector("input[type=hidden]"));
        assert.equal(e.target.value, value);
        this.setState({
          focused: true
        });
      },
      blurHandler: function(e) {
        assert.equal(e.target, document.querySelector("input[type=hidden]"));
        assert.equal(e.target.value, value);
        this.setState({
          focused: false
        });
      },
      render: function(){
        return <div>
          <div id='blurringClickTarget'>Blurring Click Target</div>
          {this.state.focused ? <div id="focused">Focused</div> : <div id="blurred">Blurred</div>}
          <DatePicker id={id} onBlur={this.blurHandler} onFocus={this.focusHandler} value={value} />
        </div>;
      }
    });
    yield new Promise(function(resolve, reject){
      ReactDOM.render(<App />, container, resolve);
    });
    const inputElement = document.querySelector("input.form-control");
    const blurringClickTarget = document.getElementById("blurringClickTarget");
    assert.notEqual(document.getElementById("blurred"), null);
    TestUtils.Simulate.focus(inputElement);
    assert.notEqual(document.getElementById("focused"), null);
    TestUtils.Simulate.blur(inputElement);
    blurringClickTarget.click(); // React-overlays won't hide on a synthetic event so can't use TestUtils here.
    assert.notEqual(document.getElementById("blurred"), null);
    ReactDOM.unmountComponentAtNode(container);
  }));
  it("should automatically insert slashes.", co.wrap(function *(){
    const id = UUID.v4();
    const App = React.createClass({
      render: function(){
        return <div>
          <DatePicker id={id} />
        </div>;
      }
    });
    yield new Promise(function(resolve, reject){
      ReactDOM.render(<App />, container, resolve);
    });
    const inputElement = document.querySelector("input.form-control");
    inputElement.value = "0";
    TestUtils.Simulate.change(inputElement);
    inputElement.value = "053";
    TestUtils.Simulate.change(inputElement);
    assert.equal(inputElement.value, "05/3");
    inputElement.value = "05/311";
    TestUtils.Simulate.change(inputElement);
    assert.equal(inputElement.value, "05/31/1");
    ReactDOM.unmountComponentAtNode(container);
  }));
  it("should automatically insert in YYYY/MM/DD format.", co.wrap(function *(){
    const id = UUID.v4();
    const App = React.createClass({
      render: function(){
        return <div>
          <DatePicker id={id} dateFormat="YYYY/MM/DD" />
        </div>;
      }
    });
    yield new Promise(function(resolve, reject){
      ReactDOM.render(<App />, container, resolve);
    });
    const inputElement = document.querySelector("input.form-control");
    inputElement.value = "0";
    TestUtils.Simulate.change(inputElement);
    inputElement.value = "19800";
    TestUtils.Simulate.change(inputElement);
    assert.equal(inputElement.value, "1980/0");
    inputElement.value = "1980/053";
    TestUtils.Simulate.change(inputElement);
    assert.equal(inputElement.value, "1980/05/3");
    ReactDOM.unmountComponentAtNode(container);
  }));
  it("should render dates in different formats.", co.wrap(function *(){
    const mm_dd_yyyy_id = "_" + UUID.v4();
    const dd_mm_yyyy_id = "_" + UUID.v4();
    const yyyy_mm_dd_id = "_" + UUID.v4();
    const App = React.createClass({
      getInitialState: function(){
        return {
          value: null
        }
      },
      handleChange(value){
        this.setState({value:value});
      },
      render: function(){
        return <div>
          <DatePicker id={mm_dd_yyyy_id} dateFormat="MM/DD/YYYY" onChange={this.handleChange} value={this.state.value} />
          <DatePicker id={dd_mm_yyyy_id} dateFormat="DD/MM/YYYY" onChange={this.handleChange} value={this.state.value} />
          <DatePicker id={yyyy_mm_dd_id} dateFormat="YYYY/MM/DD" onChange={this.handleChange} value={this.state.value} />
        </div>;
      }
    });
    yield new Promise(function(resolve, reject){
      ReactDOM.render(<App />, container, resolve);
    });
    const mm_dd_yyyy_inputElement = document.querySelector("#" + mm_dd_yyyy_id + "_group input.form-control");
    const dd_mm_yyyy_inputElement = document.querySelector("#" + dd_mm_yyyy_id + "_group input.form-control");
    const yyyy_mm_dd_inputElement = document.querySelector("#" + yyyy_mm_dd_id + "_group input.form-control");
    mm_dd_yyyy_inputElement.value = "05/31/1980";
    TestUtils.Simulate.change(mm_dd_yyyy_inputElement);
    assert.equal(mm_dd_yyyy_inputElement.value, "05/31/1980");
    assert.equal(dd_mm_yyyy_inputElement.value, "31/05/1980");
    assert.equal(yyyy_mm_dd_inputElement.value, "1980/05/31");
    dd_mm_yyyy_inputElement.value = "15/04/2015";
    TestUtils.Simulate.change(dd_mm_yyyy_inputElement);
    assert.equal(mm_dd_yyyy_inputElement.value, "04/15/2015");
    assert.equal(dd_mm_yyyy_inputElement.value, "15/04/2015");
    assert.equal(yyyy_mm_dd_inputElement.value, "2015/04/15");
    yyyy_mm_dd_inputElement.value = "1999/12/31";
    TestUtils.Simulate.change(yyyy_mm_dd_inputElement);
    assert.equal(mm_dd_yyyy_inputElement.value, "12/31/1999");
    assert.equal(dd_mm_yyyy_inputElement.value, "31/12/1999");
    assert.equal(yyyy_mm_dd_inputElement.value, "1999/12/31");
    ReactDOM.unmountComponentAtNode(container);
  }));
  it("week should start on Monday.", co.wrap(function *(){
    const id = UUID.v4();
    const App = React.createClass({
      render: function(){
        return <div>
          <DatePicker id={id} weekStartsOnMonday />
        </div>;
      }
    });
    yield new Promise(function(resolve, reject){
      ReactDOM.render(<App />, container, resolve);
    });
    const inputElement = document.querySelector("input.form-control");
    TestUtils.Simulate.focus(inputElement);
    assert.equal(document.querySelector("table thead tr:first-child td small").innerHTML, "Mon");
    ReactDOM.unmountComponentAtNode(container);
  }));
  it("should allow placing the popover calendar in a container specified in the props.", co.wrap(function *(){
    const id = UUID.v4();
    const App = React.createClass({
      render: function(){
        return <div>
          <DatePicker id={id} calendarContainer={calendarContainer} />
        </div>;
      }
    });
    yield new Promise(function(resolve, reject){
      ReactDOM.render(<App />, container, resolve);
    });
    const inputElement = document.querySelector("input.form-control");
    TestUtils.Simulate.focus(inputElement);
    assert.notEqual(document.querySelector("#calendarContainer #calendar"), null);
    ReactDOM.unmountComponentAtNode(container);
  }));
  it("should disable the input.", co.wrap(function *(){
    const id = UUID.v4();
    const value = new Date().toISOString();
    const App = React.createClass({
      render: function(){
        return <div>
          <DatePicker id={id} value={value} disabled={true}/>
        </div>;
      }
    });
    yield new Promise(function(resolve, reject){
      ReactDOM.render(<App />, container, resolve);
    });
    const hiddenInputElement = document.getElementById(id);
    const inputElement = document.querySelector("input.form-control");
    assert.equal(inputElement.disabled, true);
    ReactDOM.unmountComponentAtNode(container);
  }));
  it("should disable the input.", co.wrap(function *(){
    const id = UUID.v4();
    let value = new Date().toISOString();
    let originalValue = value;
    const App = React.createClass({
      handleChange: function(newValue){
        value = newValue;
      },
      render: function(){
        return <div>
          <DatePicker id={id} onChange={this.handleChange} disabled={true} />
        </div>;
      }
    });
    yield new Promise(function(resolve, reject){
      ReactDOM.render(<App />, container, resolve);
    });
    const inputElement = document.querySelector("input.form-control");
    assert.equal(inputElement.disabled, true);
    const clearButtonElement = document.querySelector("span.input-group-addon");
    TestUtils.Simulate.click(clearButtonElement);
    assert.equal(value, originalValue);
    ReactDOM.unmountComponentAtNode(container);
  }));
});

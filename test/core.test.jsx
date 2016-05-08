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
    let container;
    before(function(){
        container = document.createElement("div");
        container.id = "react";
        document.getElementsByTagName('body')[0].appendChild(container);
    });
    after(function(){
        document.getElementsByTagName('body')[0].removeChild(container);
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
        TestUtils.Simulate.click(inputElement);
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
        TestUtils.Simulate.click(inputElement);
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
        TestUtils.Simulate.click(inputElement);
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
                    <DatePicker id={id} onChange={this.handleChange} />
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
        TestUtils.Simulate.click(inputElement);
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
        TestUtils.Simulate.click(inputElement);
        const previousButtonElement = document.querySelector(".pull-left");
        const nextButtonElement = document.querySelector(".pull-right");
        const dayElement = document.querySelector("table tbody tr:nth-child(2) td");
        TestUtils.Simulate.click(previousButtonElement);
        TestUtils.Simulate.click(dayElement);
        var previousMonthISOString = hiddenInputElement.value;
        TestUtils.Simulate.click(inputElement);
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
        TestUtils.Simulate.click(inputElement);
        const nextButtonElement = document.querySelector(".pull-right");
        for(let i = 0; i < 12; i++) {
            TestUtils.Simulate.click(nextButtonElement);
        }
        ReactDOM.unmountComponentAtNode(container);
    }));
    it("should updated a change handler when cleared.", co.wrap(function *(){
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
        TestUtils.Simulate.click(inputElement);
        const clearButtonElement = document.querySelector(".form-group button");
        const dayElement = document.querySelector("table tbody tr:nth-child(2) td");
        TestUtils.Simulate.click(dayElement);
        assert.notEqual(value, null);
        TestUtils.Simulate.click(clearButtonElement);
        // assert.equal(value, null);
        // ReactDOM.unmountComponentAtNode(container);
    }));
    it("should call focus and blur handlers.", co.wrap(function *(){
        const id = UUID.v4();
        var results = {};
        const App = React.createClass({
            getInitialState: function() {
                return {
                    blurred: false,
                    focused: false
                }
            },
            focusHandler: function() {
                this.setState({
                    focused: true
                });
            },
            blurHandler: function() {
                this.setState({
                    blurred: true
                });
            },
            render: function(){
                return <div>
                    {this.state.focused ? <div id="focused" /> : null}
                    {this.state.blurred ? <div id="blurred" /> : null}
                    <DatePicker id={id} onBlur={this.blurHandler} onFocus={this.focusHandler} />
                </div>;
            }
        });
        yield new Promise(function(resolve, reject){
            ReactDOM.render(<App />, container, resolve);
        });
        const inputElement = document.querySelector("input.form-control");
        inputElement.focus();
        yield new Promise(function(resolve, reject){
            setTimeout(resolve, 1000);
        });
        inputElement.blur();
        yield new Promise(function(resolve, reject){
            setTimeout(resolve, 2000);
        });
        assert.notEqual(document.getElementById("focused"), null);
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
        inputElement.value = "05";
        TestUtils.Simulate.change(inputElement);
        assert.equal(inputElement.value, "05/");
        inputElement.value = "05/31";
        TestUtils.Simulate.change(inputElement);
        assert.equal(inputElement.value, "05/31/");
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
        inputElement.value = "1980";
        TestUtils.Simulate.change(inputElement);
        assert.equal(inputElement.value, "1980/");
        inputElement.value = "1980/05";
        TestUtils.Simulate.change(inputElement);
        assert.equal(inputElement.value, "1980/05/");
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
        const mm_dd_yyyy_inputElement = document.querySelector("#" + mm_dd_yyyy_id + "_container input.form-control");
        const dd_mm_yyyy_inputElement = document.querySelector("#" + dd_mm_yyyy_id + "_container input.form-control");
        const yyyy_mm_dd_inputElement = document.querySelector("#" + yyyy_mm_dd_id + "_container input.form-control");
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
});


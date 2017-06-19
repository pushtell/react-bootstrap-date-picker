import React from 'react';
import ReactDOM from 'react-dom';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import { Form, Navbar, Button } from 'react-bootstrap';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import DatePicker from '../src/index.jsx';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import createReactClass from 'create-react-class';

const spanishDayLabels = ['Dom', 'Lu', 'Ma', 'Mx', 'Ju', 'Vi', 'Sab'];
const spanishMonthLabels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const wapperDivStyle = { border: '1px solid #ccc' };
const scrollingDivStyle = { padding: '10px', height: '70px', overflow: 'auto' };

const App = createReactClass({
  getInitialState() {
    return {
      date: new Date().toISOString(),
      previousDate: null,
      minDate: null,
      maxDate: null,
      focused: false,
      invalid: false
    };
  },
  handleChange(value) {
    this.setState({
      date: value
    });
  },
  handleMinChange(value) {
    this.setState({
      minDate: value
    });
  },
  handleMaxChange(value) {
    this.setState({
      maxDate: value
    });
  },
  handlePlacement() {
    return 'top';
  },
  handleRandomPlacement() {
    const placementKey = Math.floor((Math.random()*4) + 1);
    switch (placementKey) {
      case 1:
        return 'top';
      case 2:
        return 'left';
      case 4:
        return 'right';
      default:
        return 'bottom';
    }
  },
  handleValidationCheck(e) {
    e.preventDefault();
    this.setState(() => ({
      invalid: false
    }));
  },
  handleInvalidDate(e) {
    e.preventDefault();
    this.setState(() => ({
      invalid: true
    }));
  },
  handleResetValidation(e) {
    e.preventDefault();
    this.setState(() => ({
      invalid: false
    }));
  },
  render() {
    const LabelISOString = new Date().toISOString();
    return <Grid>
      <Row>
        <Col xs={12}>
          <h1>React-Bootstrap Date Picker</h1>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Navbar>
            <Nav bsStyle="pills">
              <NavItem href="https://github.com/pushtell/react-bootstrap-date-picker/blob/master/example/app.jsx">Example Source</NavItem>
              <NavItem href="https://github.com/pushtell/react-bootstrap-date-picker">Documentation on Github</NavItem>
              <NavItem href="https://www.npmjs.com/package/react-bootstrap-date-picker">NPM Package</NavItem>
            </Nav>
          </Navbar>
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <h2>Change Handler</h2>
        </Col>
        <Col xs={6}>
          <h2>Disabled</h2>
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
          <FormGroup controlId="change_handler">
            <ControlLabel>Change Handler</ControlLabel>
            <DatePicker onChange={this.handleChange} placeholder="Placeholder" value={this.state.date} id="change_handler_example" />
            <HelpBlock>Help</HelpBlock>
          </FormGroup>
        </Col>
        <Col sm={6}>
          <FormGroup controlId="disabled">
            <ControlLabel>Disabled</ControlLabel>
            <DatePicker disabled={true} onChange={this.handleChange} placeholder="Placeholder" value={this.state.date} id="disabled_example" />
            <HelpBlock>Help</HelpBlock>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
          <FormGroup controlId="required">
            <ControlLabel>Required</ControlLabel>
            <DatePicker required onChange={this.handleChange} placeholder="Placeholder" value={this.state.date} id="required_example" />
            <HelpBlock>Help</HelpBlock>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <h2>Blur and Focus Events</h2>
        </Col>
        <Col xs={6}>
          <h2>Week Starts on Monday</h2>
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
          <FormGroup>
            <ControlLabel>{this.state.focused ? 'Focused' : 'Blurred'}</ControlLabel>
            <DatePicker onChange={this.handleChange} placeholder="Placeholder" value={this.state.date} onFocus={() => {this.setState({focused: true});}} onBlur={() => {this.setState({focused: false});}} />
            <HelpBlock>This is {this.state.focused ? 'focused' : 'blurred'}.</HelpBlock>
          </FormGroup>
        </Col>
        <Col sm={6}>
          <FormGroup>
            <ControlLabel>Week Starts on Monday</ControlLabel>
            <DatePicker onChange={this.handleChange} weekStartsOn={1} placeholder="Placeholder" value={this.state.date} />
            <HelpBlock>Help</HelpBlock>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <h2>Styles</h2>
        </Col>
      </Row>
      <Row>
        <Col sm={4}>
          <FormGroup validationState="success">
            <ControlLabel>Success</ControlLabel>
            <DatePicker placeholder="Placeholder" />
            <HelpBlock>Help</HelpBlock>
          </FormGroup>
        </Col>
        <Col sm={4}>
          <FormGroup validationState="warning">
            <ControlLabel>Warning</ControlLabel>
            <DatePicker placeholder="Placeholder" />
            <HelpBlock>Help</HelpBlock>
          </FormGroup>
        </Col>
        <Col sm={4}>
          <FormGroup validationState="error">
            <ControlLabel>Error</ControlLabel>
            <DatePicker placeholder="Placeholder" />
            <HelpBlock>Help</HelpBlock>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <h2>Date Format</h2>
        </Col>
      </Row>
      <Row>
        <Col sm={4}>
          <FormGroup>
            <ControlLabel>MM/DD/YYYY</ControlLabel>
            <DatePicker dateFormat="MM/DD/YYYY" onChange={this.handleChange} value={this.state.date} />
            <HelpBlock>Help</HelpBlock>
          </FormGroup>
        </Col>
        <Col sm={4}>
          <FormGroup>
            <ControlLabel>DD-MM-YYYY</ControlLabel>
            <DatePicker dateFormat="DD-MM-YYYY" onChange={this.handleChange} value={this.state.date} />
            <HelpBlock>Help</HelpBlock>
          </FormGroup>
        </Col>
        <Col sm={4}>
          <FormGroup>
            <ControlLabel>YYYY/MM/DD</ControlLabel>
            <DatePicker dateFormat="YYYY/MM/DD" onChange={this.handleChange} value={this.state.date} />
            <HelpBlock>Help</HelpBlock>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <h2>Min/Max Dates</h2>
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
          <FormGroup>
            <ControlLabel>Example Min/Max</ControlLabel>
            <DatePicker minDate={this.state.minDate} maxDate={this.state.maxDate} onChange={this.handleChange} value={this.state.date} />
            <HelpBlock>Sample min/max DatePicker using configured values</HelpBlock>
          </FormGroup>
        </Col>
        <Col sm={3}>
          <FormGroup>
            <ControlLabel>Min</ControlLabel>
            <DatePicker onChange={this.handleMinChange} value={this.state.minDate} />
            <HelpBlock>{`Configure Example minDate`}</HelpBlock>
            <HelpBlock>{`value: ${this.state.minDate}`}</HelpBlock>
          </FormGroup>
        </Col>
        <Col sm={3}>
          <FormGroup>
            <ControlLabel>Max</ControlLabel>
            <DatePicker onChange={this.handleMaxChange} value={this.state.maxDate} />
            <HelpBlock>{`Configure Example maxDate`}</HelpBlock>
            <HelpBlock>{`value: ${this.state.maxDate}`}</HelpBlock>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <h2>Show Week Numbers</h2>
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <FormGroup controlId="show_weeks">
            <ControlLabel>Show Weeks</ControlLabel>
            <DatePicker onChange={this.handleChange} placeholder="Placeholder" value={this.state.date} id="show_dates_example" showWeeks={true} />
            <HelpBlock>Help</HelpBlock>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <h2>Validation</h2>
        </Col>
      </Row>
      <Row>
        <Form onSubmit={this.handleValidationCheck}>
          <Col xs={6}>
              <FormGroup controlId="custom_validation_example_default" validationState={this.state.invalid ? 'error' : null}>
                <ControlLabel>Default</ControlLabel>
                <DatePicker
                  onChange={this.handleChange}
                  placeholder="Placeholder"
                  required
                />
            </FormGroup>
          </Col>
          <Col xs={6}>
              <FormGroup controlId="custom_validation_example_oninvalid" validationState={this.state.invalid ? 'error' : null}>
                <ControlLabel>onInvalid override</ControlLabel>
                <DatePicker
                  onChange={this.handleChange}
                  placeholder="Placeholder"
                  onInvalid={this.handleInvalidDate}
                  required
                />
                {this.state.invalid
                  && <HelpBlock>You must pick a date.</HelpBlock>}
            </FormGroup>
          </Col>
          <Col xs={6}>
            <Button type="submit">Validate</Button>
            <Button type="button" onClick={this.handleResetValidation}>Reset</Button>
          </Col>
        </Form>
      </Row>
      <Row>
        <Col xs={12}>
          <h2>Custom</h2>
        </Col>
      </Row>
      <Row>
        <Col sm={4}>
          <FormGroup>
            <ControlLabel>Previous / Next Buttons</ControlLabel>
            <DatePicker placeholder="Placeholder" previousButtonElement={<Glyphicon glyph="star" />}  nextButtonElement={<Glyphicon glyph="star" />}  />
            <HelpBlock>Help</HelpBlock>
          </FormGroup>
        </Col>
        <Col sm={4}>
          <FormGroup>
            <ControlLabel>Padding</ControlLabel>
            <DatePicker placeholder="Placeholder" cellPadding="10px" />
            <HelpBlock>Help</HelpBlock>
          </FormGroup>
        </Col>
        <Col sm={4}>
          <FormGroup>
            <ControlLabel>Day and Month Labels</ControlLabel>
            <DatePicker placeholder="Placeholder" dayLabels={spanishDayLabels} monthLabels={spanishMonthLabels} />
            <HelpBlock>Help</HelpBlock>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
          <FormGroup>
            <ControlLabel>Clear Button</ControlLabel>
            <DatePicker placeholder="Placeholder" clearButtonElement={<Glyphicon glyph="star" />} />
            <HelpBlock>Help</HelpBlock>
          </FormGroup>
        </Col>
        <Col sm={6}>
          <FormGroup controlId="no_clear_button">
            <ControlLabel>No Clear Button</ControlLabel>
            <DatePicker placeholder="Placeholder" showClearButton={false} />
            <HelpBlock>Help</HelpBlock>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
          <FormGroup>
            <ControlLabel>FormControl Style</ControlLabel>
            <DatePicker style={{width:'100%', backgroundColor:'#FFEEEE'}} />
            <HelpBlock>&#123;width:"100%", backgroundColor:"#FFEEEE"&#125;</HelpBlock>
          </FormGroup>
        </Col>
        <Col sm={6}>
          <FormGroup>
            <ControlLabel>Today Button</ControlLabel>
            <DatePicker showTodayButton />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
          <FormGroup>
            <ControlLabel>Thursday First Day of Week</ControlLabel>
            <DatePicker weekStartsOn={4} />
          </FormGroup>
        </Col>
        <Col sm={6}>
          <FormGroup>
            <ControlLabel>Control Element</ControlLabel>
            <DatePicker customControl={<CustomControl />} />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <h2>Placement</h2>
        </Col>
      </Row>
      <Row>
        <Col sm={3}>
          <FormGroup>
            <ControlLabel>Top</ControlLabel>
            <DatePicker placeholder="Placeholder" calendarPlacement="top" />
            <HelpBlock>Help</HelpBlock>
          </FormGroup>
        </Col>
        <Col sm={3}>
          <FormGroup>
            <ControlLabel>Right</ControlLabel>
            <DatePicker placeholder="Placeholder" calendarPlacement="right" />
            <HelpBlock>Help</HelpBlock>
          </FormGroup>
        </Col>
        <Col sm={3}>
          <FormGroup>
            <ControlLabel>Bottom</ControlLabel>
            <DatePicker placeholder="Placeholder" calendarPlacement="bottom" />
            <HelpBlock>Help</HelpBlock>
          </FormGroup>
        </Col>
        <Col sm={3}>
          <FormGroup>
            <ControlLabel>Left</ControlLabel>
            <DatePicker placeholder="Placeholder" calendarPlacement="left" />
            <HelpBlock>Help</HelpBlock>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
          <FormGroup>
            <ControlLabel>Placement determined by function</ControlLabel>
            <DatePicker placeholder="Placeholder" calendarPlacement={this.handlePlacement} />
            <HelpBlock>Placed at top</HelpBlock>
          </FormGroup>
        </Col>
        <Col sm={6}>
          <FormGroup>
            <ControlLabel>Random placement</ControlLabel>
            <DatePicker placeholder="Placeholder" calendarPlacement={this.handleRandomPlacement} />
            <HelpBlock>Placement is random in either of the four directions</HelpBlock>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <h2>Placed in a Scrolling Container</h2>
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
          <h4>Popover in scroll region</h4>
          <div style={wapperDivStyle}>
            <div style={scrollingDivStyle}>
                <DatePicker placeholder="Start Date" /><br/>
                <DatePicker placeholder="End Date" />
            </div>
          </div>
        </Col>
        <Col sm={6}>
          <h4>Popover outside scroll region</h4>
          <div style={wapperDivStyle}>
            <div style={scrollingDivStyle}>
                <DatePicker placeholder="Start Date" calendarContainer={document.body} /><br/>
                <DatePicker placeholder="End Date"  calendarContainer={document.body} />
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <h2>Sizes</h2>
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
          <FormGroup>
            <ControlLabel>Label</ControlLabel>
            <DatePicker placeholder="Placeholder" />
            <HelpBlock>Help</HelpBlock>
          </FormGroup>
        </Col>
        <Col sm={6}>
          <FormGroup bsSize="small">
            <ControlLabel>Label</ControlLabel>
            <DatePicker placeholder="Placeholder" value={this.state.date} />
            <HelpBlock>Help</HelpBlock>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
          <FormGroup>
            <ControlLabel>Label</ControlLabel>
            <DatePicker placeholder="Placeholder" />
            <HelpBlock>Help</HelpBlock>
          </FormGroup>
        </Col>
        <Col sm={6}>
          <FormGroup>
            <ControlLabel>Label</ControlLabel>
            <DatePicker placeholder="Placeholder" value={this.state.date} />
            <HelpBlock>Help</HelpBlock>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
          <FormGroup bsSize="large">
            <ControlLabel>Label</ControlLabel>
            <DatePicker placeholder="Placeholder" />
            <HelpBlock>Help</HelpBlock>
          </FormGroup>
        </Col>
        <Col sm={6}>
          <FormGroup bsSize="large">
            <ControlLabel>Label</ControlLabel>
            <DatePicker placeholder="Placeholder" value={this.state.date} />
            <HelpBlock>Help</HelpBlock>
          </FormGroup>
        </Col>
      </Row>
    </Grid>;
  }
});

const CustomControl = createReactClass({
  displayName: 'CustomControl',

  render() {
    const {
      value,
      placeholder,
      ...rest,
    } = this.props;

    return <Button {...rest}>{value || placeholder}</Button>;
  },
});

ReactDOM.render(<App />, document.getElementById('react'));

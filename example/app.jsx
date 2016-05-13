import React from 'react';
import ReactDOM from 'react-dom';
import Grid from "react-bootstrap/lib/Grid";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import { Navbar } from "react-bootstrap";
import Nav from "react-bootstrap/lib/Nav";
import NavItem from "react-bootstrap/lib/NavItem";
import DatePicker from "../src/index.jsx";
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

const spanishDayLabels = ['Dom', 'Lu', 'Ma', 'Mx', 'Ju', 'Vi', 'Sab'];
const spanishMonthLabels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

const App = React.createClass({
  getInitialState() {
    return {
      date: new Date().toISOString(),
      previousDate: null
    };
  },
  handleChange(value) {
    this.setState({
      date: value
    });
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
        <Col xs={12}>
          <h2>Change Handler</h2>
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
          <form>
            <DatePicker onChange={this.handleChange} placeholder="Placeholder" value={this.state.date} />
          </form>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <h2>Blur and Focus Events</h2>
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
          <form>
            <DatePicker placeholder="Placeholder" help="Open console to see focus/blur logging." value={this.state.date} onFocus={() => {console.log("Focus")}} onBlur={() => {console.log("Blur")}}/>
          </form>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <h2>Styles</h2>
        </Col>
      </Row>
      <Row>
        <Col sm={4}>
          <form>
            <DatePicker bsStyle="success" label="Success" placeholder="Placeholder" help="Help" />
          </form>
        </Col>
        <Col sm={4}>
          <form>
            <DatePicker bsStyle="warning" label="Warning" placeholder="Placeholder" value={this.state.date} help="Help" />
          </form>
        </Col>
        <Col sm={4}>
          <form>
            <DatePicker bsStyle="error" label="Error" placeholder="Placeholder" value={this.state.date} help="Help" />
          </form>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <h2>Date Format</h2>
        </Col>
      </Row>
      <Row>
        <Col sm={4}>
          <form>
            <DatePicker label="MM/DD/YYYY" dateFormat="MM/DD/YYYY" onChange={this.handleChange} value={this.state.date} help="Help" />
          </form>
        </Col>
        <Col sm={4}>
          <form>
            <DatePicker label="DD-MM-YYYY" dateFormat="DD-MM-YYYY" onChange={this.handleChange} value={this.state.date} help="Help" />
          </form>
        </Col>
        <Col sm={4}>
          <form>
            <DatePicker label="YYYY/MM/DD" dateFormat="YYYY/MM/DD" onChange={this.handleChange} value={this.state.date} help="Help" />
          </form>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <h2>Custom</h2>
        </Col>
      </Row>
      <Row>
        <Col sm={3}>
          <form>
            <DatePicker label="Clear Button" placeholder="Placeholder" clearButtonElement={<Glyphicon glyph="star" />} />
          </form>
        </Col>
        <Col sm={3}>
          <form>
            <DatePicker label="Previous / Next Buttons" placeholder="Placeholder" previousButtonElement={<Glyphicon glyph="star" />}  nextButtonElement={<Glyphicon glyph="star" />}  />
          </form>
        </Col>
        <Col sm={3}>
          <form>
            <DatePicker label="Padding" placeholder="Placeholder" cellPadding="10px" />
          </form>
        </Col>
        <Col sm={3}>
          <form>
            <DatePicker label="Day and Month Labels" placeholder="Placeholder" dayLabels={spanishDayLabels} monthLabels={spanishMonthLabels} />
          </form>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <h2>Placement</h2>
        </Col>
      </Row>
      <Row>
        <Col sm={3}>
          <form>
            <DatePicker label="Top" placeholder="Placeholder" calendarPlacement="top" />
          </form>
        </Col>
        <Col sm={3}>
          <form>
            <DatePicker label="Right" placeholder="Placeholder" calendarPlacement="right"/>
          </form>
        </Col>
        <Col sm={3}>
          <form>
            <DatePicker label="Bottom" placeholder="Placeholder" calendarPlacement="bottom" />
          </form>
        </Col>
        <Col sm={3}>
          <form>
            <DatePicker label="Left" placeholder="Placeholder" calendarPlacement="left" />
          </form>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <h2>Sizes</h2>
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
          <form>
            <DatePicker bsSize="small" label="Label" placeholder="Placeholder" help="Help" />
          </form>
        </Col>
        <Col sm={6}>
          <form>
            <DatePicker bsSize="small" label="Label" placeholder="Placeholder" value={this.state.date} help="Help" />
          </form>
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
          <form>
            <DatePicker label="Label" placeholder="Placeholder" help="Help" />
          </form>
        </Col>
        <Col sm={6}>
          <form>
            <DatePicker label="Label" placeholder="Placeholder" value={this.state.date} help="Help" />
          </form>
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
          <form>
            <DatePicker bsSize="large" label="Label Date" placeholder="Placeholder" help="Help" />
          </form>
        </Col>
        <Col sm={6}>
          <form>
            <DatePicker bsSize="large" label="Label" placeholder="Placeholder" value={this.state.date} help="Help" />
          </form>
        </Col>
      </Row>
    </Grid>;
  }
});

ReactDOM.render(<App />, document.getElementById('react'));



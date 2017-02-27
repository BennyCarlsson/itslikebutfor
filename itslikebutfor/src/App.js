import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {FormControl, ControlLabel} from 'react-bootstrap';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div id="content">
          <InputField/>
        </div>
      </div>
    );
  }
}
class ShowResult extends Component{
  render(){
    return(
      <div id="resultDiv">
        <h1>it's like ... but for ...</h1>
      </div>
    )
  }
}
class InputField extends Component{
  constructor(props) {
   super(props);
   this.state = {
     value: '',
   };
  }
  getInitialState() {
    return {
      value: ''
    };
  }
  handleChange(e) {
    this.setState({ value: e.target.value });
  }
  handleSubmit(e){
    e.preventDefault();
  }
  render(){
    return(
      <div className="inputField">
        <form onSubmit={this.handleSubmit}>
        <ControlLabel>Enter your last used application</ControlLabel>
          <FormControl autoFocus className="formControl"
            type="text"
            value={this.state.value}
            placeholder="e.g. facebook"
            onChange={this.handleChange}
          />
      </form>
      </div>
    )
  }
}

export default App;

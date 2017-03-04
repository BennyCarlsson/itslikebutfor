import React, { Component } from 'react';
import './App.css';
import {FormControl, ControlLabel} from 'react-bootstrap';

class App extends Component {
  constructor(props) {
   super(props);
   this.state = {
     showPage: 'inputfield',
     lastApp: '',
   };
  }
  lastAppEdit(word){
    this.setState({lastApp:word, showPage:'showResult'});
  }
  render() {
    return (
      <div className="App">
        <div id="content">
          {this.state.showPage === "inputfield"
            ?<InputField showPage={this.state.showPage} lastAppEdit={this.lastAppEdit.bind(this)} lastApp={this.state.lastApp}/>
            :<ShowResult showPage={this.state.showPage} lastApp={this.state.lastApp}/>}
        </div>
      </div>
    );
  }
}
class ShowResult extends Component{
  constructor(props) {
   super(props);
   this.state = {
     thing: '',
   };
  }
  componentDidMount(){
    this.setState({thing:"cats"});
  }
  handleClick(e){
    //backspace
    if(e.charCode === 8){
      this.props.lastApp = "";
    }
    //enter och space
    if(e.charCode === 13 || e.charCode === 32){

    }
  }
  render(){
    return(
      <div id="resultDiv" onKeyPress={this.handleClick}>
        <h1>it's like <span className="word">{this.props.lastApp} </span>
          but for <span className="word">{this.state.thing}</span></h1>
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
  handleChange(e) {
    e.preventDefault();
    this.setState({ value: e.target.value });
  }
  handleSubmit(e){
    e.preventDefault();
    this.props.lastAppEdit(this.state.value);
  }
  render(){
    return(
      <div className="inputField">
        <form onSubmit={this.handleSubmit.bind(this)}>
        <ControlLabel>Enter your last used application</ControlLabel>
          <FormControl autoFocus className="formControl"
            type="text"
            value={this.state.value}
            placeholder="e.g. facebook"
            onChange={this.handleChange.bind(this)}
          />
      </form>
      </div>
    )
  }
}
export default App;

import React, { Component } from 'react';
import './App.css';
import list from './list.js';
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
  backToInputState(){
    this.setState({showPage:'inputfield'})
  }
  render() {
    return (
      <div className="App">
        <div id="content">
          {this.state.showPage === "inputfield"
            ?<InputField showPage={this.state.showPage} lastAppEdit={this.lastAppEdit.bind(this)} lastApp={this.state.lastApp}/>
          :<ShowResult showPage={this.state.showPage} lastApp={this.state.lastApp} backToInputState={this.backToInputState.bind(this)}/>}
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
  newThing(){
    var n = Math.floor((Math.random() * list.length));
    this.setState({thing:list[n]});
  }
  handleClick(e){
    //backspace
    if(e.code === "Backspace"){
      document.removeEventListener("keydown",this.handleClick.bind(this));
      this.props.backToInputState();
    }
    //enter och space
    if(e.code === "Enter" || e.code === "Spacebar"){
      this.newThing();
    }
  }
  componentWillMount(){
    document.addEventListener("keydown",this.handleClick.bind(this));
  }
  //funkar inte :(
  componentWillUnmount(){
    document.removeEventListener("keydown",this.handleClick.bind(this));
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
        <ControlLabel>Enter your last used application  </ControlLabel>
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

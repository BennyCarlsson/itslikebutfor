import React, { Component } from 'react';
import list from './list.js';
import {FormControl, ControlLabel, Grid, Row, Col} from 'react-bootstrap';

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
      <div>
        <Grid>
          <Row>
            <Col xsHidden md={3}></Col>
            <Col md={6}>
                {
                  this.state.showPage === "inputfield"
                  ?<InputField showPage={this.state.showPage} lastAppEdit={this.lastAppEdit.bind(this)} lastApp={this.state.lastApp}/>
                  :<ShowResult showPage={this.state.showPage} lastApp={this.state.lastApp} backToInputState={this.backToInputState.bind(this)}/>
                }
            </Col>
            <Col xsHidden md={3}></Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

class ShowResult extends Component{
  constructor(props) {
   super(props);
   this.handleClick = this.handleClick.bind(this);
   this.state = {
     thing: '',
   };
  }
  componentDidMount(){
    var n = Math.floor((Math.random() * list.length));
    this.setState({thing:list[n]});
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
    if(e.code === "Enter" || e.code === "Space"){
      this.newThing();
    }
  }
  componentWillMount(){
    document.addEventListener("keydown",this.handleClick,false);
  }
  componentWillUnmount(){
    document.removeEventListener("keydown",this.handleClick,false);
  }
  render(){
    return(
      <div onKeyPress={this.handleClick}>
        <h1>it's like <span>{this.props.lastApp} </span>
          but for <span>{this.state.thing}</span></h1>
        <p className="text-left"><kbd>Backspace</kbd> for new</p>
        <p className="text-right"><kbd>Enter</kbd> or <kbd>Space</kbd> for next</p>
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
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
        <ControlLabel><h1>Enter your last used application</h1>  </ControlLabel>
          <FormControl autoFocus
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

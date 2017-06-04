/*global FB*/
import React, { Component } from 'react';
import list from './list.js';
import {FormControl, Grid, Row, Col, PageHeader, Glyphicon} from 'react-bootstrap';

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
            <Col xsHidden md={1}></Col>
            <Col md={10}>
              {
                this.state.showPage === "inputfield"
                ?<InputField showPage={this.state.showPage} lastAppEdit={this.lastAppEdit.bind(this)} lastApp={this.state.lastApp}/>
                :<ShowResult showPage={this.state.showPage} lastApp={this.state.lastApp} backToInputState={this.backToInputState.bind(this)}/>
              }
            </Col>
            <Col xsHidden md={1}></Col>
          </  Row>
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

    window.fbAsyncInit = function() {
      FB.init({
        appId            : '1933529873547959',
        autoLogAppEvents : true,
        xfbml            : true,
        version          : 'v2.9'
      });
      FB.AppEvents.logPageView();
    };

    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "//connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
  }
  newThing(){
    var n = Math.floor((Math.random() * list.length));
    this.setState({thing:list[n]});
  }
  backSpace(){
    document.removeEventListener("keydown",this.handleClick.bind(this));
    this.props.backToInputState();
  }
  handleClick(e){
    //backspace
    if(e.code === "Backspace"){
      this.backSpace();
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
  share(text){
    console.log();
      FB.ui(
       {
        method: 'share',
        quote: 'its like '+this.props.lastApp+' but for '+this.state.thing,
        href: 'http://itslikebutfor.com'
      }, function(response){});
  }
  render(){
    return(
      <div onKeyPress={this.handleClick}>
        <PageHeader>
          it's like <strong>{this.props.lastApp} </strong>
          but for <strong>{this.state.thing}</strong>
        <small className="pull-right">
          <a style={{color:'#777'}}
            href={"https://twitter.com/intent/tweet?text=it's like "+this.props.lastApp+" but for "+this.state.thing+" &amp;hashtags=itslikebutfor http://itslikebutfor.com/"}>
            <i className="fa fa-twitter"> </i>
          </a>
          <span>     </span>
          <a style={{color:'#777'}} href="#" onClick={this.share.bind(this)}><i className="fa fa-facebook"> </i></a>
        </small>
      </PageHeader>
        <em>
          <div className="pull-left" onClick={this.backSpace.bind(this)}><small><Glyphicon glyph="arrow-left"/> Backspace </small></div>
          <div className="pull-right" onClick={this.newThing.bind(this)}><small>Enter or Space <Glyphicon glyph="repeat"/></small></div>
        </em>
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
        <PageHeader>
          Enter your last used application
        </PageHeader>
        <form onSubmit={this.handleSubmit.bind(this)}>
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

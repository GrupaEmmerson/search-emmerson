import React, {Component} from 'react';

class Footer extends Component {
  render() {
    return (
      <footer className="app-footer">
        <a style={{color: '#fff'}} href="https://emmerson.pl">Emmerson</a> &copy; 2017
        <span className="float-right">Create by <a style={{color: '#fff'}} href="http://draftway.pl">Draftway Sp. z o.o.</a></span>
      </footer>
    )
  }
}

export default Footer;

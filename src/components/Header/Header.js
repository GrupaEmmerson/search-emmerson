import React, {Component} from 'react';
import {
  Badge,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Nav,
  NavItem,
  NavLink,
  NavbarToggler,
  NavbarBrand,
  DropdownToggle
} from 'reactstrap';
import { connect } from 'react-redux';
import * as actions from '../../actions';
let testWeakMap = new WeakMap();

class Header extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

    get state () {
        return testWeakMap.get(this);
    }

    set state (value) {
        testWeakMap.set(this, value);
    }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  sidebarToggle(e) {
      e.preventDefault();
      document.body.classList.toggle('sidebar-hidden');
  }

  mobileSidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-mobile-show');
  }

  render() {
      return (
          <header className="app-header navbar">
              <NavbarToggler className="d-lg-none" onClick={this.mobileSidebarToggle}>&#9776;</NavbarToggler>
              <NavbarBrand href="#"/>

              <NavbarToggler className="d-md-down-none" style={{color: '#fff'}} onClick={this.sidebarToggle}><span className="fa fa-search"></span> Więcej Filtrów</NavbarToggler>

              <Nav className="ml-auto" navbar>

                  <NavItem className="px-3 d-md-down-none">
                      <NavLink href="#" onClick={()=>{this.props.setSearchProperties('&buy=1&rent=0'); this.props.setIsLoaded(false);}}>Kup</NavLink>
                  </NavItem>

                  <NavItem className="px-3 d-md-down-none">
                      <NavLink href="#" onClick={()=>{this.props.setSearchProperties('&buy=0&rent=1'); this.props.setIsLoaded(false);}}>Wynajmij</NavLink>
                  </NavItem>

              </Nav>
          </header>
      )
  }
}


function mapStateToProps(state){
    return {
        location: state.location.location,
        viewport: state.viewport.viewport,
        offers: state.offers.offers,
        isLoaded: state.isLoaded.isLoaded,
        searchProperties: state.searchProperties.searchProperties
    }
}

export default connect(mapStateToProps, actions)(Header);

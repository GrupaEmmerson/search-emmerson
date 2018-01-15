import React, {Component} from 'react';
import {
  Nav,
  NavItem,
  NavLink,
  NavbarBrand,
} from 'reactstrap';
import { connect } from 'react-redux';
import * as actions from '../../actions';
let testWeakMap = new WeakMap();

class HeaderNoSidebar extends Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

    get state () {
        return testWeakMap.get(this);
    }

    set state (value) {
        testWeakMap.set(this, value);
    }


  render() {
      return (
          <header className="app-header navbar">

              <NavbarBrand href="#"/>

              <Nav className="ml-auto" navbar>

                  <NavItem className="px-3 d-md-down-none">
                      <NavLink href="#" onClick={()=>{this.props.setSearchProperties('&buy=1&rent=0'); this.props.setIsLoaded(false); this.context.router.history.push('/')}}>Kup</NavLink>
                  </NavItem>

                  <NavItem className="px-3 d-md-down-none">
                      <NavLink href="#" onClick={()=>{this.props.setSearchProperties('&buy=0&rent=1'); this.props.setIsLoaded(false); this.context.router.history.push('/')}}>Wynajmij</NavLink>
                  </NavItem>

              </Nav>
          </header>
      )
  }
}

HeaderNoSidebar.contextTypes = {
    router: function () {
        return React.PropTypes.object.isRequired;
    }
};

function mapStateToProps(state){
    return {
        location: state.location.location,
        viewport: state.viewport.viewport,
        offers: state.offers.offers,
        isLoaded: state.isLoaded.isLoaded,
        searchProperties: state.searchProperties.searchProperties
    }
}

export default connect(mapStateToProps, actions)(HeaderNoSidebar);

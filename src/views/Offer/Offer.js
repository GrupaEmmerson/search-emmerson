import React, {Component} from "react";
import { connect } from 'react-redux';
import * as actions from '../../actions';
import OfferView from './OfferView';

let testWeakMap = new WeakMap();

class Offer extends Component {

    constructor (props) {
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
            <OfferView {...this.props}/>
        )
    }

}

function mapStateToProps(state){
    return {
        location: state.location.location,
        viewport: state.viewport.viewport,
        offers: state.offers.offers,
        isLoaded: state.isLoaded.isLoaded,
        searchProperties: state.searchProperties.searchProperties,
        search: state.search.search,
        rowsCount: state.rowsCount.rowsCount
    }
}

export default connect(mapStateToProps, actions)(Offer);
import React, {Component} from "react";
import { connect } from 'react-redux';
import * as actions from '../../actions';

let testWeakMap = new WeakMap();

class Contact extends Component {

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
        const { adviser } = this.props;
        return (
            <div className="container-fluid nopadding" >
                <div className="col-md-12 ">
                    <div className="col-md-12 nopadding">
                        <form>
                            <legend><span className="fa fa-envelope"></span> Kontakt:</legend>
                            <div className='row'>
                                <div className='col-5'>
                                    <img src={adviser.photo} style={{width: 100+'px'}}/>
                                </div>
                                <div className='col-7'>
                                    <address>
                                        <strong>{adviser.name}</strong><br/>
                                        <strong>+48 {adviser.cell_phone}</strong><br/>
                                        {adviser.phone ? adviser.phone : ''}<br/><br/>
                                        {adviser.branch.address}<br/>
                                        {adviser.branch.postal} {adviser.branch.town}<br/>
                                    </address>
                                </div>
                                <div className='col-12'>
                                    <br/>
                                    <a style={{color:'#fff'}} href={adviser.email}>{adviser.email}</a>
                                    <br/><br/>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="well well-sm ">
                        <form>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label htmlFor="name">
                                            Imię i nazwisko *</label>
                                        <input type="text" className="form-control" id="name" placeholder="" required="required" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">
                                            E-mail *</label>
                                        <div className="input-group">
                                                    <span className="input-group-addon">
                                                        <span className="fa fa-envelope"></span>
                                                    </span>
                                            <input type="email" className="form-control" id="email" placeholder="" required="required" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label htmlFor="name">
                                            Wiadomość *</label>
                                        <textarea name="message" id="message" className="form-control" rows="9" cols="25" required="required"
                                                  placeholder=""/>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <button type="submit" className="btn btn-outline-light col-12 " id="btnContactUs">
                                        Wyślij wiadomość
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
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

export default connect(mapStateToProps, actions)(Contact);

import React, {Component} from 'react';

import { connect } from 'react-redux';
import * as actions from '../../actions';
import { reduxForm, Field} from 'redux-form';
import { Form, Button, Nav } from "reactstrap";

let testWeakMap = new WeakMap();

class Sidebar extends Component {

    constructor (props) {
        super(props);
        this.state = {
            priceFrom: 0,
            priceTo: 999999999,
            priceM2From: 0,
            priceM2To: 999999999,
            primaryMarket: false,
            secondaryMarket: false,
            commercialMarket: false,
            flatType: false,
            houseType: false,
            plotType: false,
            hallType: false,
            commercialUnitType: false,
            officeType: false,
            exclusive: false,
            zeroPercent: false
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    get state () {
        return testWeakMap.get(this);
    }

    set state (value) {
        testWeakMap.set(this, value);
    }

    checkValid(){
        if( !(this.state.primaryMarket || this.state.secondaryMarket || this.state.commercialMarket ))
        {
            this.setState({noValid: true});
            return true;

        }
        else if(!(this.state.flatType||this.state.houseType||this.state.plotType||this.state.hallType||this.state.commercialUnitType||this.state.officeType))
        {
            this.setState({noValid: true});
            return true;
        }
        else
        {
            this.setState({
                noValid: false,
            });

            return false;
        }
    }

    handleFormSubmit(formData) {
        console.log(formData);
        if( this.checkValid() )
        {
            return (
                this.setState({noValid: true})
            );
        }
        else
        {
            this.props.setSearch(formData);
            this.props.setIsLoaded(false);
            this.setState({noValid: false});
            document.body.classList.toggle('sidebar-hidden');
            document.body.classList.toggle('sidebar-mobile-show');
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

        setTimeout(()=>this.checkValid(), 500);

    }

    renderAlert(noValid){
        if(noValid){
            return(
                <div className="col-md-12 col-sm-12 col-12" style={{
                    marginTop: 15 + 'px'
                }}>
                    <div style={{
                        textAlign: 'center',
                        color: '#e3001b',
                        backgroundColor: 'transparent',
                        backgroundImage: 'none',
                        borderColor: '#e3001b',
                        border: 'solid 1px',
                        padding: 5+'px'
                    }}>
                        <h4 style={{margin: 'auto', marginTop: 15+'px', marginBottom: 15+'px'}}>Zaznacz rynek i rodzaj nieruchomości</h4>
                    </div>
                </div>
            );
        }
    }

    render() {

        const formData =  {
            priceFrom: this.state.priceFrom,
            priceTo: this.state.priceTo,
            priceM2From: this.state.priceM2From,
            priceM2To: this.state.priceM2To,
            primaryMarket: this.state.primaryMarket,
            secondaryMarket: this.state.secondaryMarket,
            commercialMarket: this.state.commercialMarket,
            flatType: this.state.flatType,
            houseType: this.state.houseType,
            plotType: this.state.plotType,
            hallType: this.state.hallType,
            commercialUnitType: this.state.commercialUnitType,
            officeType: this.state.officeType,
            exclusive: this.state.exclusive,
            zeroPercent: this.state.zeroPercent
        };

        if(this.state.priceFrom === '' || this.state.priceFrom === null || this.state.priceFrom === undefined)
            formData['priceFrom'] = 0;
        if(this.state.priceTo === '' || this.state.priceTo === null || this.state.priceTo === undefined)
            formData['priceTo'] = 999999999;
        if(this.state.priceM2From === '' || this.state.priceM2From === null || this.state.priceM2From === undefined)
            formData['priceM2From'] = 0;
        if(this.state.priceM2To === '' || this.state.priceM2To === null || this.state.priceM2To === undefined)
            formData['priceM2To'] = 999999999;

        const checkInput = ({input:{ checked, onChange, name, value}, className, placeholder, id, label, type, children}) => (
            <label className="form-check-label col-sm-12 col-12">
                <input  type={type} className={className} id={id} name={name} placeholder={placeholder} onChange={onChange} checked={checked} value={value}/>
                {label}
            </label>
        );

        return (
            <div className="sidebar">
                <nav className="sidebar-nav">
                    <Nav>
                        <div className='container-fluid nopadding' style={{position: 'relative'}}>
                            <div className='d-lg-none'>
                                <div className="col-12" style={{marginTop: 5+'px'}}>
                                    <button className='btn btn-lg btn-outline-emmerson col-12' onClick={()=>{this.props.setSearchProperties('&buy=1&rent=0'); this.props.setIsLoaded(false); this.context.router.history.push('/')}}>Kup</button>
                                </div>

                                <div className="col-12" style={{marginTop: 5+'px'}}>
                                    <button className='btn btn-lg btn-outline-emmerson col-12' onClick={()=>{this.props.setSearchProperties('&buy=0&rent=1'); this.props.setIsLoaded(false); this.context.router.history.push('/')}}>Wynajmij</button>
                                </div>
                            </div>
                            <Form >
                                <legend className="col-form-legend col-sm-12 col-12 hidden-md-up"><h5>Cenna:</h5></legend>
                                <div className="col-md-12 col-12">
                                    <div className="row">
                                        <div className="col-md-6 col-sm-6 col-6">
                                            <div className="form-group">
                                                <label htmlFor='priceFrom'>Cena od:</label>
                                                <Field component="input" type="text" id="priceFrom" placeholder="od" name='priceFrom'
                                                    className="form-control bg-dark search-box search-color-text"
                                                    value={this.state.priceFrom} onChange={this.handleInputChange}/>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-sm-6 col-6">
                                            <div className="form-group">
                                                <label htmlFor='priceFrom'>Cena do:</label>
                                                <Field component="input" type="text" id="priceTo" placeholder="do"
                                                       name='priceTo' className="form-control bg-dark search-box search-color-text"
                                                       value={this.state.priceTo} onChange={this.handleInputChange}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-12 col-12">
                                    <div className="row">
                                        <div className="col-md-6 col-6">
                                            <div className="form-group">
                                                <label htmlFor='priceFrom'>Cena m<sup>2</sup> od:</label>
                                                <Field
                                                    component="input" type="text"
                                                    id="priceM2From" placeholder="od"  name='priceM2From' className="form-control bg-dark search-box search-color-text"
                                                    value={this.state.priceM2From} onChange={this.handleInputChange}/>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-6">
                                            <div className="form-group">
                                                <label htmlFor='priceFrom'>Cena m<sup>2</sup> do:</label>
                                                <Field
                                                    component="input" type="text"
                                                    id="priceM2To" placeholder="do"  name='priceM2To' className="form-control bg-dark search-box search-color-text"
                                                    value={this.state.priceM2To} onChange={this.handleInputChange}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <legend className="col-form-legend col-sm-12  col-12"><h5>Rynek:</h5></legend>
                                <div className="col-md-12">
                                    <div className="form-check">
                                        <Field
                                            component={checkInput} className="form-check-input" type="checkbox" name="primaryMarket"
                                            id="primaryMarket" label='&nbsp;Pierwotny' value={this.state.primaryMarket} checked={this.state.primaryMarket} onChange={this.handleInputChange}/>
                                        <Field
                                            component={checkInput} className="form-check-input" type="checkbox" name="secondaryMarket"
                                            id="secondaryMarket" label='&nbsp;Wtórny' value={this.state.primaryMarket} checked={this.state.secondaryMarket} onChange={this.handleInputChange}/>
                                        <Field
                                            component={checkInput} className="form-check-input" type="checkbox" name="commercialMarket"
                                            id="commercialMarket" label='&nbsp;Komercyjny' value={this.state.primaryMarket} checked={this.state.commercialMarket} onChange={this.handleInputChange}/>
                                    </div>
                                </div>

                                <legend className="col-form-legend col-sm-12  col-12"><h5>Rodzaj Nieruchomości:</h5></legend>
                                <div className="col-md-12">
                                    <div className="form-check">
                                        <Field
                                            component={checkInput} className="form-check-input" type="checkbox" name="flatType" id="flatType"
                                            label='&nbsp;Mieszkania' value={this.state.primaryMarket} checked={this.state.flatType} onChange={this.handleInputChange}/>

                                        <Field
                                            component={checkInput} className="form-check-input" type="checkbox" name="houseType" id="houseType"
                                            label='&nbsp;Domy' value={this.state.primaryMarket} checked={this.state.houseType} onChange={this.handleInputChange}/>

                                        <Field
                                            component={checkInput} className="form-check-input" type="checkbox" name="plotType" id="plotType"
                                            label='&nbsp;Działki' value={this.state.primaryMarket} checked={this.state.plotType} onChange={this.handleInputChange}/>

                                        <Field
                                            component={checkInput} className="form-check-input" type="checkbox" name="hallType" id="hallType"
                                            label='&nbsp;Hale' value={this.state.primaryMarket} checked={this.state.hallType} onChange={this.handleInputChange}/>

                                        <Field
                                            component={checkInput} className="form-check-input" type="checkbox" name="commercialUnitType"
                                               id="commercialUnitType" label='&nbsp;Lokale Usługowe' value={this.state.primaryMarket} checked={this.state.commercialUnitType} onChange={this.handleInputChange}/>

                                        <Field
                                            component={checkInput} className="form-check-input" type="checkbox" name="officeType"
                                               id="officeType" label='&nbsp;Biura' value={this.state.primaryMarket} checked={this.state.officeType} onChange={this.handleInputChange}/>

                                    </div>
                                </div>

                                <legend className="col-form-legend col-sm-12 col-12"><h5>Rodzaj oferty:</h5></legend>
                                <div className="col-md-12">
                                        <Field
                                            component={checkInput} className="form-check-input" type="checkbox" name="exclusive" id="exclusive"
                                            label='&nbsp;Wyłącznie u Nas!' value={this.state.primaryMarket} checked={this.state.exclusive} onChange={this.handleInputChange}/>

                                        <Field
                                            component={checkInput} className="form-check-input" type="checkbox" name="zeroPercent" id="zeroPercent"
                                            label='&nbsp;Bez prowizji' value={this.state.primaryMarket} checked={this.state.zeroPercent} onChange={this.handleInputChange}/>

                                </div>
                                {
                                    this.renderAlert(this.state.noValid)
                                }
                                <div className="col-md-12 col-sm-12 col-12" style={{marginTop: 15 + 'px'}}>
                                    <Button onClick={()=>this.handleFormSubmit(formData)} className='btn btn-lg btn-outline-emmerson col-12'>
                                        <span className='fa fa-search'></span> Wyszukaj
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </Nav>
                </nav>
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
        search: state.search.search
    }
}

Sidebar = connect(
    mapStateToProps,
    actions
)(Sidebar);

export default Sidebar = reduxForm({
    form: 'searchBox',
    fields:
        [
            'priceFrom',
            'priceTo',
            'priceM2From',
            'priceM2To',
            'primaryMarket',
            'secondaryMarket',
            'commercialMarket',
            'flatType',
            'houseType',
            'plotType',
            'hallType',
            'commercialUnitType',
            'officeType',
            'exclusive',
            'zeroPercent'
        ]
})(Sidebar);
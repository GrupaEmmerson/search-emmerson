import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Link } from 'react-router-dom'
import NumberFormat from 'react-number-format';

let testWeakMap = new WeakMap();

class OffersView extends Component {
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

    render(){
        const {tableData, className, style, count} = this.props;

        if(!tableData)
        {
            return(
                <div className='col-12 col-sm-12 col-md-12 col-lg-12 vertical-center'>
                    <div className="loader"></div>
                </div>
            );
        }
        if(count === 0)
        {
            return(
                <div className='col-12 col-sm-12 col-md-12 col-lg-12 vertical-center'>
                    <div className="loader" style={{margin: 'auto'}}></div>
                </div>
            );
        }
       const row = tableData.filter((i, index) => (index < count ));

        return (
            <div className='row nopadding' style={{paddingLeft: 15, paddingRight: 15}} >
                {
                    row.map((e, index) => {

                        return(
                            <div className='col-md-6 col-lg-12 col-sm-12 nopadding' key={index}>
                                <Link to={"/offer/"+e.id} target='_blank'>
                                    <div className="smalltitle2" style={ {
                                        backgroundImage: "url(" +  e.big_photo_url  + ")",
                                        float: 'left',
                                        cursor: 'pointer'
                                    }} onMouseOver={() => {
                                        this.props.setViewport({index: e.id, position: { lat: parseFloat(e.latitude), lng: parseFloat(e.longitude) }});
                                    }} onMouseOut={() => {
                                        this.props.setViewport({index: null, position: null});
                                    }}
                                    >
                                        <div className='icons-top-right row nopadding'>
                                            <div className='row' style={{paddingTop: 5+'px', paddingRight: 5+'px', margin:0}}>
                                                {e.type_of_contract.map(a => {
                                                    return(
                                                        <div className='col-sm-6 col-6 nopadding'>
                                                            <img src={'./img/'+ a} />
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                        <div className='offer-info'>
                                            <div className='offer-text row nopadding col-md-12 col-lg-12 col-sm-12' >
                                                <div className='col-md-6 col-sm-6 col-6'>
                                                    <h4>Miasto <b>{e.city}</b></h4>
                                                </div>
                                                <div className='col-md-6  col-sm-6 col-6'>
                                                    <h4>Na <b>{e.for_rent !== true ? 'Sprzedaż' : 'Wynajem' }</b></h4>
                                                </div>
                                                <div className='col-md-6 col-sm-6 col-6'>
                                                    Nr. Oferty: <b>{e.number}</b><br/>
                                                    Cena: <b><NumberFormat value={parseFloat(e.price)} displayType={'text'} thousandSeparator={' '} decimalSeparator={','} decimalScale={2} fixedDecimalScale={true}/> zł</b><br/>
                                                </div>
                                                <div className='col-md-6 col-sm-6 col-6'>
                                                    Rodzaj: <b>{e.item}</b><br/>
                                                    Cena za m<sup>2</sup>: <b><NumberFormat value={parseFloat(e.price_per_m2)} displayType={'text'} thousandSeparator={' '} decimalSeparator={','} decimalScale={2} fixedDecimalScale={true}/> zł</b><br/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        );
                    })
                }
                <div className='col-12 col-sm-12 col-md-12 col-lg-12'>
                    <button className='btn btn-outline-emmerson col-12'
                            style={{marginTop: 20+'px', marginBottom: 20+'px'}}
                            onClick={()=> this.props.setRowsCount( this.props.rowsCount + 20)}
                    >
                        Wczytaj Więcej
                    </button>
                </div>
            </div>
        )
    }
}

OffersView.contextTypes = {
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
        searchProperties: state.searchProperties.searchProperties,
        search: state.search.search,
        rowsCount: state.rowsCount.rowsCount
    }
}

export default connect(mapStateToProps, actions)(OffersView);



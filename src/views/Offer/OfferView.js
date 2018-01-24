import React, {Component} from "react";
import { connect } from 'react-redux';
import {  } from 'react-router';
import * as actions from '../../actions';
import SimpleSlider from './SimpleSlider';
import Contact from './Contact';
import { MapOfferContainer } from './MapOfferContainer';
import InfoOfferView from  './InfoOfferView';
import HeaderOffer from "./HeaderOffer";
import {Helmet} from "react-helmet";

let testWeakMap = new WeakMap();

class OfferView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            offer: null,
            baseUrl: 'http://test.draftway.pl',
            link : 'http://test.draftway.pl/#/offer/' + this.props.match.params.id,
            name : 'Emmerson Realty S.A.',
            caption : 'Emmerson Realty S.A',
            description :  '-',
            redirect_uri : 'http://test.draftway.pl/#/offer/' + this.props.match.params.id,
        };

    }

    get state() {
        return testWeakMap.get(this);
    }

    set state(value) {
        testWeakMap.set(this, value);
    }

    componentDidMount(){
        const apiUrl = `http://api-www.emmerson.pl/offer/`;

            const url = [apiUrl + this.props.match.params.id].join("");

            fetch(url)
                .then(res => res.json())
                .then(response => {
                    this.setState({offer: response});
                    this.setState({
                        picture: 'https://cdn31.draftway.pl/virgofotoresizer.ashx?wym=1200_1200&id=5334657',
                        description: this.state.offer.description.replace(/<\/?[^>]+(>|$)/g, "").substring(0,247) + '...'
                    });
                    this.facebookShare();
                });

        window.fbAsyncInit = function() {
            FB.init({
                appId      : '1537301123055501',
                xfbml      : true,
                version    : 'v2.11'
            });
            FB.AppEvents.logPageView();
        };

        (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/pl_PL/sdk.js#xfbml=1&version=v2.8";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }

    facebookShare(){

        const link = this.state.link;
        const picture = this.state.picture;
        this.setState({
            facebook: 'https://www.facebook.com/dialog/feed?app_id=1537301123055501&link='+  encodeURIComponent(link) + '&picture=' +  encodeURIComponent(picture)
        });

        console.log(this.state.facebook)
    }

    render() {

        if(!this.state.offer){
            return (
                <div className='vertical-center'>
                    <div className='loader' style={{margin: 'auto'}}>
                    </div>
                </div>
            )
        }
        return (
            <div className="container">
                <Helmet>
                    <meta property="og:title" content={this.state.name} data-doc-meta="true"/>
                    <meta property="og:type" content="website" data-doc-meta="true"/>
                    <meta property="og:url" content={this.state.link} data-doc-meta="true"/>
                    <meta property="og:image" content={this.state.picture} data-doc-meta="true"/>
                    <meta property="og:description" content={this.state.description} data-doc-meta="true"/>
                    <meta property="og:site_name" content={this.state.name} data-doc-meta="true"/>
                    <meta property="fb:app_id" content="1537301123055501" data-doc-meta="true"/>
                </Helmet>
                <div className='row'>
                    <div className='col-12 col-sm-12 col-md-12 col-lg-12' style={{backgroundColor: '#151b1e', margin: 0, padding: 0}} >
                        <div className='col-12 nopadding' style={{marginBottom: 25+'px'}}>
                            <HeaderOffer
                                headerPhoto={this.state.offer.photo[0]}
                                price={this.state.offer.price}
                                priceM2={this.state.offer.price_per_m2}
                                surface={this.state.offer.surface}
                                full_location={this.state.offer.full_location}
                                type_of_contract={this.state.offer.type_of_contract}
                            />
                        </div>

                        <div className='contact'>
                            <Contact adviser={this.state.offer.adviser}/>
                        </div>

                        <div className='offer-box col-12 col-sm-12 col-md-12 col-lg-12 row nopadding' style={{marginTop: 50+'px'}} >

                            <div className='col-12 col-sm-12 col-md-12'>
                                <div style={{borderBottom: '1px solid #e3001b', color: '#fff', margin: 0, padding: 0, fontSize: 14+'px', marginTop: 20+'px'}}>
                                    <div style={{backgroundColor: '#e3001b', padding: 4+'px'}} className='col-3'>Galeria:</div>
                                </div>
                                <SimpleSlider images={this.state.offer.photo}/>
                            </div>

                            <div className='col-12 col-sm-12 col-md-5 col-lg-3' style={{marginBottom: 40+'px'}}>
                                <InfoOfferView offer={this.state.offer}/>
                            </div>

                            <div className='col-12 col-sm-12 col-md-7 col-lg-9' style={{marginBottom: 40+'px'}}>

                                <div style={{borderBottom: '1px solid #e3001b', color: '#fff', margin: 0, padding: 0, fontSize: 14+'px', marginTop: 40+'px'}}>
                                    <div style={{backgroundColor: '#e3001b', padding: 4+'px'}} className='col-3'>Opis:</div>
                                </div>

                                <div dangerouslySetInnerHTML={{ __html: this.state.offer.description }} style={{marginTop: 40+'px', marginBottom: 40+'px'}}/>

                                <div style={{borderBottom: '1px solid #e3001b', color: '#fff', margin: 0, padding: 0, fontSize: 14+'px', marginTop: 20+'px'}}>
                                    <div style={{backgroundColor: '#e3001b', padding: 4+'px'}} className='col-3'>Udostępnij:</div>
                                </div>

                                <div className="col-12 row nopadding">
                                    <div id="fb-root"></div>
                                    <a href={this.state.facebook} target='_blank'>
                                        <button className="btn btn-lg btn-facebook col-12 col-sm-6 col-md-6 col-lg-3 fb-share-button" style={{marginTop: 10+'px'}}>
                                            <span> Facebook</span>
                                        </button>
                                    </a>
                                    <button className="btn btn-lg btn-google-plus col-12 col-sm-6 col-md-6 col-lg-3" style={{marginTop: 10+'px'}}><span> Google+</span></button>
                                    <button className="btn btn-lg btn-twitter col-12 col-sm-6 col-md-6 col-lg-3" style={{marginTop: 10+'px'}}><span> Twitter</span></button>
                                    <button className="btn btn-lg btn-pinterest text col-12 col-sm-6 col-md-6 col-lg-3" style={{marginTop: 10+'px'}}><i className="fa fa-file-pdf-o"></i>&nbsp;Zapisz do PDF</button>
                                </div>

                                <div style={{borderBottom: '1px solid #e3001b', color: '#fff', margin: 0, padding: 0, fontSize: 14+'px', marginTop: 40+'px'}}>
                                    <div style={{backgroundColor: '#e3001b', padding: 4+'px'}} className='col-3'>Mapa:</div>
                                </div>

                                <div style={{margin: 0, padding: 0}}>
                                    <MapOfferContainer markerLocation={{lat: parseFloat(this.state.offer.latitude), lng: parseFloat(this.state.offer.longitude)}} markerIco={this.state.offer.ico}/>
                                </div>
                            </div>
                        </div>
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

export default connect(mapStateToProps, actions)(OfferView);
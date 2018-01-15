import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import HeaderNoSidebar from '../../components/HeaderNoSidebar/';
import Offer from "../../views/Offer/Offer";
import Footer from "../../components/Footer/Footer";

class NoSidebar extends Component {
    render() {
        return (
            <div className="app">
                <HeaderNoSidebar />
                <div className="app-body">
                    <main className="main">
                        <Switch>
                            <Route path="/offer/:id" name="Offer" component={ (props) => <Offer {...props}/> }/>
                        </Switch>
                    </main>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default NoSidebar;
import React, {Component} from "react";
import NumberFormat from 'react-number-format';
import Lightbox from 'react-image-lightbox';

let testWeakMap = new WeakMap();

class InfoOfferView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            offer: null,
            photoIndex: 0,
            isOpen: false,
        };

    }

    get state() {
        return testWeakMap.get(this);
    }

    set state(value) {
        testWeakMap.set(this, value);
    }

    renderField([key,value]){
        return(
            <div key={key} className='row col-12 nopadding' style={{color: '#000'}}>
                <div className="col-6 nopadding">{key.toString()}:</div>
                <div className="col-6 nopadding">
                    <div className="float-right">{value.toString()}</div>
                </div>
            </div>
        );
    }

    renderFields(array){

        return(
            Object.entries(array).map(this.renderField.bind(this))
        );
    }

    render() {
        const { offer } = this.props;
        return(
          <div>

              {offer.feature.map((attribute, index) => {
                  /**
                   * Aby działały rzuty nazwa pola musi być taka sama jak pole atrybutu.
                   */
                  if(attribute.name === 'Rzut')
                  {
                      return(
                          <div key={index}>
                              <div style={{borderBottom: '1px solid #e3001b', color: '#fff', margin: 0, padding: 0, fontSize: 14+'px', marginTop: 40+'px'}}>
                                  <div key={attribute.name} style={{backgroundColor: '#e3001b', padding: 4+'px'}} className='col-9'>{attribute.name}:</div>
                              </div>
                              {
                                  attribute.value.map(array => {
                                      return(
                                          <div>
                                              <img src={array.floorPlan[0].link} style={{width: 100+'%',
                                                  cursor: 'pointer'}} onClick={()=>this.setState({ isOpen: true, photoIndex: 0 })}/>
                                              {this.state.isOpen && (
                                                  <Lightbox
                                                      mainSrc={array.floorPlan[this.state.photoIndex].link}
                                                      nextSrc={array.floorPlan[(this.state.photoIndex + 1) % array.floorPlan.length].link}
                                                      prevSrc={array.floorPlan[(this.state.photoIndex + array.floorPlan.length - 1) % array.floorPlan.length].link}
                                                      onCloseRequest={() => this.setState({ isOpen: false })}
                                                      onMovePrevRequest={() =>
                                                          this.setState({
                                                              photoIndex: (this.state.photoIndex + array.floorPlan.length - 1) % array.floorPlan.length,
                                                          })
                                                      }
                                                      onMoveNextRequest={() =>
                                                          this.setState({
                                                              photoIndex: (this.state.photoIndex + 1) % array.floorPlan.length,
                                                          })
                                                      }
                                                  />
                                              )}
                                          </div>
                                      )
                                  })
                              }
                          </div>
                      )
                  }
                  return(
                      <div key={index}>
                          <div style={{borderBottom: '1px solid #e3001b', color: '#fff', margin: 0, padding: 0, fontSize: 14+'px', marginTop: 40+'px'}}>
                              <div key={attribute.name} style={{backgroundColor: '#e3001b', padding: 4+'px'}} className='col-9'>{attribute.name}:</div>
                          </div>
                          {
                              attribute.value.map(array => {
                                  return(
                                      <div className='nopadding'>
                                          {
                                              this.renderFields(array)
                                          }
                                      </div>
                                  )
                              })
                          }
                      </div>
                  )}
              )}
          </div>
        );
    }
}

export default InfoOfferView;
import React from 'react';
import Slider from 'react-slick';
import Lightbox from 'react-image-lightbox';

let testWeakMap = new WeakMap();

class SimpleSlider extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
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
    render() {
        const {images} = this.props;
        const style = {
            image: {
                margin: 'auto',
                width: 'auto',
                height: 157+'px',
                marginBottom: 40+'px',
                border: '3px solid #fff',
                boxShadow: '10px 10px 5px 0px rgba(0,0,0,0.75)',
                cursor: 'pointer'
            }
        };

        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 5,
            responsive: [
                { breakpoint: 388, settings: { slidesToShow: 1 } },
                { breakpoint: 768, settings: { slidesToShow: 2 } },
                { breakpoint: 991, settings: { slidesToShow: 3 } },
                { breakpoint: 1199, settings: { slidesToShow: 4 } }
            ],
            slidesToScroll: 1,
            adaptiveHeight: true,
            touchMove: true,
            arrows: true,
            dotsClass: 'slick-dots white-dots'
        };

        return (
            <div className='col-12 col-sm-12 col-md-12 col-lg-12' >
                <Slider {...settings}>
                    {images.map((e, index) => {
                        console.log(index);
                        return(
                            <img
                                src={e.link}
                                style={style.image}
                                onClick={()=>this.setState({ isOpen: true, photoIndex: index })}
                            />
                        );
                    })}
                </Slider>
                {this.state.isOpen && (
                    <Lightbox
                        mainSrc={images[this.state.photoIndex].link}
                        nextSrc={images[(this.state.photoIndex + 1) % images.length].link}
                        prevSrc={images[(this.state.photoIndex + images.length - 1) % images.length].link}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                        onMovePrevRequest={() =>
                            this.setState({
                                photoIndex: (this.state.photoIndex + images.length - 1) % images.length,
                            })
                        }
                        onMoveNextRequest={() =>
                            this.setState({
                                photoIndex: (this.state.photoIndex + 1) % images.length,
                            })
                        }
                    />
                )}
            </div>
        );
    }
}

export default SimpleSlider;
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { AnimationHandler, AnimationHandlerResponse, CarouselProps, CarouselState } from 'react-responsive-carousel/lib/ts/components/Carousel/types';

const floatAnimationHandler: AnimationHandler = (props: CarouselProps, state: CarouselState): AnimationHandlerResponse => {
    const transitionTime = props.transitionTime || 500; // Default transition time
    const floatStyle = {
        transform: state.swiping ? 'translateY(-100%)' : 'translateY(0px)', // Floating effect
        transition: `transform ${transitionTime}ms ease-in-out, opacity ${transitionTime}ms ease-in-out`,
        opacity: state.swiping ? 0.7 : 1, // Optional fade effect while swiping
    };

    return {
        // itemListStyle: floatStyle,
        slideStyle: floatStyle,
        // selectedStyle: floatStyle,
        prevStyle: {
            transform: 'translateY(-100%)'
        },
    };
};

const ReactCarousel: React.FC = () => {
    return (
        <Carousel
            showArrows={true}
            showThumbs={false}
            infiniteLoop={true}
            showStatus={false}
            autoPlay={true}
            interval={3000}
            transitionTime={1000}
            stopOnHover={true}
            swipeable={true}
            emulateTouch={true}
            // animationHandler={'fade'}
            animationHandler={floatAnimationHandler}
        >
            <div>
                <img src="https://www.w3schools.com/bootstrap/la.jpg" alt="Slide 1" />
            </div>
            <div >
                <img src="https://www.w3schools.com/bootstrap/chicago.jpg" alt="Slide 2" />
            </div>
            <div>
                <img src="https://www.w3schools.com/bootstrap/ny.jpg" alt="Slide 3" />
            </div>
        </Carousel>
    );
};

export default ReactCarousel;

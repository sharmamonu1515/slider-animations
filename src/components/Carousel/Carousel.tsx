import React, { useEffect, useRef, useState } from "react";
import { CarouselProps, CustomCSSProperties } from "utils/CarouselTypes";

const Carousel = ({ slides, animationType, options }: CarouselProps) => {
    const [activeIndex, setActiveIndex] = useState<number>(0);
 
    const intervalRef = useRef<any>(null);

    const handleNext = () => {
        setActiveIndex((prevIndex) => {
            const nextIndex = (prevIndex + 1) % slides.length;
            return nextIndex;
        });
        resetAutoplay();
    };

    const handlePrev = () => {
        setActiveIndex((prevIndex) => {
            const prevIndexCorrected = (prevIndex - 1 + slides.length) % slides.length;
            return prevIndexCorrected;
        });
        resetAutoplay();
    };

    const resetAutoplay = () => {
        if ( ! options ) {
            return false;
        }

        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        
        if (options.autoplayDuration && !isNaN(options.autoplayDuration)) {
            intervalRef.current = setInterval(handleNext, options.autoplayDuration);
        }
    };

    const handleMouseEnter = () => {
        if (options.pauseOnHover && intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    };

    const handleMouseLeave = () => {
        if (options.pauseOnHover) {
            resetAutoplay();
        }
    };

    const getBlurStyleClass = (): string => {
        if (animationType === "blur" && "style" in options) {
            switch (options.style?.toLowerCase()) {
                case "gentle":
                    return "blur-gentle";
                case "moderate":
                    return "blur-moderate";
                case "intense":
                    return "blur-intense";
                default:
                    return "blur-gentle";
            }
        }
        return "";
    };

    const getFlipStyleClass = (): string => {
        if (animationType === "flip" && "style" in options) {
            switch (options.style?.toLowerCase()) {
                case "gentle":
                    return "flip-gentle";
                case "moderate":
                    return "flip-moderate";
                case "intense":
                    return "flip-intense";
                default:
                    return "flip-gentle";
            }
        }
        return "";
    };

    const getWinkStyleClass = (): string => {
        if (animationType === "wink" && "direction" in options) {
            switch (options.direction?.toLowerCase()) {
                case "horizontal":
                    return "wynk-horizontal";
                case "vertical":
                    return "wynk-vertical";
            }
        }
        return "";
    }

    const getExpandStyleClass = (): string => {
        if (animationType === "expand" && "style" in options) {
            switch (options.style?.toLowerCase()) {
                case "gentle":
                    return "expand-gentle";
                case "moderate":
                    return "expand-moderate";
                case "intense":
                    return "expand-intense";
                default:
                    return "expand-gentle";
            }
        }
        return "";
    };

    const getShrinkStyleClass = (): string => {
        if (animationType === "shrink" && "style" in options) {
            switch (options.style?.toLowerCase()) {
                case "gentle":
                    return "shrink-gentle";
                case "moderate":
                    return "shrink-moderate";
                case "intense":
                    return "shrink-intense";
                default:
                    return "shrink-gentle";
            }
        }
        return "";
    };

    const getShapeStyleClass = (): string => {
        if (animationType === "shape" && "shape" in options) {
            switch (options.shape?.toLowerCase()) {
                case "oval":
                    return "shape-oval";
                case "circle":
                    return "shape-circle";
                case "square":
                    return "shape-square";
                case "diamond":
                    return "shape-diamond";
                default:
                    return "";
            }
        }
        return "";
    };

    const getRevealStyleClass = (): string => {
        if (animationType === "reveal" && "direction" in options) {
            switch (options.direction?.toLowerCase()) {
                case "top":
                    return "reveal-top";
                case "bottom":
                    return "reveal-bottom";
                case "left":
                    return "reveal-left";
                case "right":
                    return "reveal-right";
                default:
                    return "";
            }
        }
        return "";
    };

    const getFloatDirectionStyle = (): React.CSSProperties => {
        if (animationType === "float" && "direction" in options) {
            switch (options.direction.toLowerCase()) {
                case "top":
                    return { transform: "translateY(-100%)" };
                case "bottom":
                    return { transform: "translateY(100%)" };
                case "left":
                    return { transform: "translateX(-100%)" };
                case "right":
                    return { transform: "translateX(100%)" };
                default:
                    return {};
            }
        }
        return {};
    };

    const getFlipAnimation = (): string => {
        if (animationType === "flip" && "direction" in options) {
            switch (options.direction.toLowerCase()) {
                case "top":
                    return "flipTop";
                case "bottom":
                    return "flipBottom";
                case "left":
                    return "flipLeft";
                case "right":
                    return "flipRight";
                default:
                    return "";
            }
        }
        return "";
    };

    const getExpandAnimation = (): string => {
        if (animationType === "expand" && "direction" in options) {
            switch (options.direction.toLowerCase()) {
                case "right":
                    return "expandRight";
                case "top right":
                    return "expandTopRight";
                case "top":
                    return "expandTop";
                case "top left":
                    return "expandTopLeft";
                case "left":
                    return "expandLeft";
                case "bottom left":
                    return "expandBottomLeft";
                case "bottom":
                    return "expandBottom";
                case "bottom right":
                    return "expandBottomRight";
                default:
                    return "";
            }
        }
        return "";
    };

    useEffect(() => {
        setActiveIndex(0)
        resetAutoplay();

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [options]);

    return (
        <div className={`carousel-container ${animationType}`}>
            {animationType && options && 
                <div className="carousel slide carouselWidth"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
                <div className="carousel-inner">
                    {slides.map((slide, slideIndex) => (
                        <div
                            key={slideIndex}
                            className={`carousel-item ${slideIndex === activeIndex ? "active" : ""
                                } ${animationType} ${getBlurStyleClass()} ${getExpandStyleClass()} ${getShrinkStyleClass()} ${getRevealStyleClass()} ${getShapeStyleClass()} ${getFlipStyleClass()} ${getWinkStyleClass()}`}
                            style={{
                                ...getFloatDirectionStyle(),
                                '--animation-duration': (options.duration / 1000) + 's',
                                '--expand-animation': getExpandAnimation(),
                                '--flip-animation': getFlipAnimation(),
                                '--animation-delay': (options.delay / 1000) + 's',
                            } as CustomCSSProperties}
                        >
                            <img
                                src={slide}
                                alt={`Slide ${slideIndex + 1}`}
                            />
                        </div>
                    ))}
                </div>
                <button
                    className="carousel-control-prev"
                    type="button"
                    onClick={handlePrev}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-chevron-left"
                    >
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </button>
                <button
                    className="carousel-control-next"
                    type="button"
                    onClick={handleNext}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-chevron-right"
                    >
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </button>
            </div>}
        </div>
    );
}

export default Carousel;
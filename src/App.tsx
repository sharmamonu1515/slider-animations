import React, { useEffect, useState } from "react";
import "./App.css"; // Import your updated CSS
import { AnimationOptions } from "./utils/CarouselTypes";
import Carousel from "./components/Carousel/Carousel";

function App() {

  const animations: string[] = [
    "fade",
    "float",
    "blur",
    "expand",
    "shrink",
    "reveal",
    "shape",
    "flip",
    "grow",
    "wink",
    "slide",
    "flash",
  ];

  const basicDirections = ['Top', 'Bottom', 'Left', 'Right'];
  const allDirections = ['Right', 'Top Right', 'Top', 'Top Left', 'Left', 'Bottom Left', 'Bottom', 'Bottom Right', 'Center'];

  const [animationOptions, setAnimationOptions] = useState<{[key: string]: AnimationOptions;}>({
      fade: { duration: 1000, delay: 0, autoplayDuration: 3000, pauseOnHover: false },
      float: { direction: basicDirections, duration: 1500, delay: 0, autoplayDuration: 3000, pauseOnHover: false },
      blur: { style: ["Gentle", "Moderate", "Intense"], duration: 1000, delay: 0, autoplayDuration: 3000, pauseOnHover: false },
      expand: { style: ["Gentle", "Moderate", "Intense"], direction: allDirections, duration: 1000, delay: 0, autoplayDuration: 3000, pauseOnHover: false },
      shrink: { style: ["Gentle", "Moderate", "Intense"], duration: 1000, delay: 0, autoplayDuration: 3000, pauseOnHover: false },
      reveal: { direction: basicDirections, duration: 1000, delay: 0, autoplayDuration: 3000, pauseOnHover: false },
      shape: { shape: ['Oval', 'Circle', 'Square', 'Diamond',], duration: 1000, delay: 0, autoplayDuration: 3000, pauseOnHover: false },
      flip: { style: ["Gentle", "Moderate", "Intense"], direction: basicDirections, duration: 1000, delay: 0, autoplayDuration: 3000, pauseOnHover: false },
      grow: { style: ["Gentle", "Moderate", "Intense"], direction: basicDirections, distance: "100px", duration: 1000, delay: 0, autoplayDuration: 3000, pauseOnHover: false },
      wink: { direction: ["Horizontal", "Vertical"], duration: 1000, delay: 0, autoplayDuration: 3000, pauseOnHover: false },
      slide: { style: ["Gentle", "Moderate", "Intense"], direction: basicDirections, duration: 1000, delay: 0, autoplayDuration: 3000, pauseOnHover: false },
      flash: { duration: 1000, delay: 0, autoplayDuration: 3000, pauseOnHover: false },
  });

  type AnimationType = "fade" | "float" | "blur" | "expand" | "shrink" | "reveal" | "shape" | "flip" | "grow" | "wink" | "slide" | "flash";

  const [selectedAnimationType, setSelectedAnimationType] = useState<AnimationType>('fade')
  const [options, setOptions] = useState<any>(null);
  
  const onOptionChange = (option: string, value: string | number | boolean) => {
    setOptions({
        ...options, 
        [option]: value
    });
  };

  const setDefaultOptionsForAnimationType = (animationType: string) => {
    // set default options for animation type
    const options = animationOptions[animationType as keyof typeof animationOptions];
    setOptions((prevOptions: any) => {
        const newOptions: { [key: string]: any } = {};

        Object.keys(options).forEach((key) => {
            const optionValue = options[key as keyof AnimationOptions];
            newOptions[key] = Array.isArray(optionValue) && optionValue.length > 0 ? optionValue[0] : optionValue;
        });
        
        return {
            ...prevOptions,
            ...newOptions,
        };
    });
  }

  const handleAnimationTypeChange = (e: any) => {
    setSelectedAnimationType(e.target.value);

    setDefaultOptionsForAnimationType(e.target.value);
  }

  const slides: string[] = [
    "https://www.w3schools.com/bootstrap/la.jpg",
    "https://www.w3schools.com/bootstrap/chicago.jpg",
    "https://www.w3schools.com/bootstrap/ny.jpg",
  ];

  useEffect(() => {
    setDefaultOptionsForAnimationType(selectedAnimationType);
  }, [])

  return (
    <div className="App">

      <h2>{selectedAnimationType.charAt(0).toUpperCase() + selectedAnimationType.slice(1)} Animation</h2>
      <div className="animation-options">
          <select onChange={(e) => handleAnimationTypeChange(e)}>
              {animations.map((animation: string, index: number) => (
                  <option key={index} value={animation}>{animation}</option>
              ))}
          </select>

          {selectedAnimationType && animationOptions[selectedAnimationType] && (
              Object.keys(animationOptions[selectedAnimationType]).map((parameter: string, index: number) => {
                  const optionValue = options && options[parameter] ? options[parameter] : '';
                  const animationFields = animationOptions[selectedAnimationType][parameter as keyof AnimationOptions];

                  return (
                      <div key={index}>
                      <label>{parameter}:</label>
                      {Array.isArray(animationFields) ? (
                          <select
                          onChange={(e) => onOptionChange(parameter, e.target.value)}
                          value={optionValue}
                          >
                          {animationFields.map((option, i) => (
                              <option key={i} value={option}>
                              {option}
                              </option>
                          ))}
                          </select>
                      ) : typeof animationFields === 'string' || typeof animationFields === 'number' ? (
                          <input
                          type="text"
                          value={optionValue}
                          onChange={(e) => onOptionChange(parameter, e.target.value)}
                          />
                      ) : (
                          <input
                          type="checkbox"
                          checked={optionValue as boolean}
                          onChange={(e) => onOptionChange(parameter, e.target.checked)}
                          />
                      )}
                      </div>
                  );
              })
          )}
      </div>

      <Carousel slides={slides} animationType={selectedAnimationType} options={options} />
    </div>
  );
}

export default App;

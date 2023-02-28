import React, { useState } from "react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";

const images = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQElN9pkfM4B3YFyQz4-jmVLV0kVavTy8FEEQ&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQElN9pkfM4B3YFyQz4-jmVLV0kVavTy8FEEQ&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQElN9pkfM4B3YFyQz4-jmVLV0kVavTy8FEEQ&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQElN9pkfM4B3YFyQz4-jmVLV0kVavTy8FEEQ&usqp=CAU",
];

const Slider = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleNext = () => {
        setCurrentImageIndex(
            currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1
        );
    };

    const handlePrev = () => {
        setCurrentImageIndex(
            currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1
        );
    };

    return (
        <div className="slider">
            <FaArrowAltCircleLeft className="left-arrow" onClick={handlePrev} />
            <FaArrowAltCircleRight className="right-arrow" onClick={handleNext} />
            <div className="image-container">
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Image ${index + 1}`}
                        className={index === currentImageIndex ? "active" : ""}
                    />
                ))}
            </div>
        </div>
    );
};

export default Slider;

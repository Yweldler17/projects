

import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
// import image1 from "./assets/images/0429121756a.jpg"
// import image2 from "./assets/images/0415121435.jpg"
// import image3 from "./assets/images/0426122105b.jpg"
// import image4 from "./assets/images/0411121640.jpg"
// import image5 from "./assets/images/upsherin.jpeg"
// import avromi from "./assets/images/Avromi.JPG"
// import image6 from "./assets/images/image3.jpg"
// import image7 from "./assets/images/image4.jpg"
// import IMG_2516 from "./assets/images/IMG_2516.JPG"
// import IMG_2967 from "./assets/images/IMG_2967.JPG"
// import IMG_3553 from "./assets/images/IMG_3553.JPG"


export default function Gallery() {

    const [folder, setFolder] = useState([]);
    const images2 = []

    function importAll(r) {
        let images = [];
        r.keys().forEach((item, index) => {
            images.push({
                original: r(item).default,
                thumbnail: r(item).default
            });
        })
        return images;
    };

    const familyList = importAll(require.context('./assets/images/family', false, /\.(png|PNG|JPG|jpe?g|svg)$/));
    const outdoorList = importAll(require.context(`./assets/images/outdoor`, false, /\.(png|PNG|JPG|jpe?g|svg)$/));
    const eventList = importAll(require.context(`./assets/images/event`, false, /\.(png|PNG|JPG|jpe?g|svg)$/));
    const simchaList = importAll(require.context(`./assets/images/simcha`, false, /\.(png|PNG|JPG|jpe?g|svg)$/));

    // useEffect(() => {
    //     setFolder(outdoorList)
    // }, []);


    console.log(images2);
    console.log(familyList);
    console.log(outdoorList);
    console.log(eventList);
    console.log(simchaList);

    return <>
        <div className="gallery-background-div">
            <div className="galleryWrapper">
                <ImageGallery className="gallery" items={folder} thumbnailPosition="right" />
            </div>
            <div className="categorySideBar">
                <button onClick={() => setFolder(familyList)}>Family</button>
                <button onClick={() => setFolder(outdoorList)}>Outdoor</button>
                <button onClick={() => setFolder(eventList)}>Event</button>
                <button onClick={() => setFolder(simchaList)}>Simcha</button>
            </div>
        </div>
    </>;
    // const imageList = importAll(require.context('./assets/images', false, /\.(png|PNG|JPG|jpe?g|svg)$/));
    // console.log(imageList);
    // console.log(images);
    // console.log(images2);
    // return <>
    //     <div className="gallery-background-div">
    //         <div className="galleryWrapper">
    //             <ImageGallery className="gallery" items={images2} thumbnailPosition="right" />
    //         </div>
    //     </div>
    // </>;


}
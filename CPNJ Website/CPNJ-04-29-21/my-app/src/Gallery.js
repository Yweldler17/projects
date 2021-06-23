

import React, { useState } from 'react'
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

export default function Gallery() {

    function importAll(r) {
        let images = [];
        r.keys().forEach((item) => {
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

    const [folder, setFolder] = useState(familyList);

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


}


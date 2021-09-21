import React, { useState } from "react";
import { mdiThumbUp } from '@mdi/js';
import Icon from '@mdi/react';


function Card(props) {
    const [isClick, setClick] = useState(false);

    function clickFunction(url, title) {
        setClick(!isClick);
        props.clickLike({url, title}, isClick);
    }

    return (
        <div className="card block">
            {/** Card image */}
            <div className="card-image">
                <figure className="image is-4by3">
                    <img src={props.url} alt={props.title} />
                </figure>
            </div>

            {/** Card content */}
            <div className="card-content">
                <div className="media">
                    <div className="media-content">
                        <p className="title is-4">{props.title}</p>
                        <p className="subtitle is-6"> © {props.copyright ? props.copyright : "Unknown"}</p>
                    </div>
                </div>
                <div className="content">
                    {props.explanation}
                </div>
                <span className="tag">{props.date}</span>
            </div>

            {/** Card footer */}
            <footer className="card-footer">
                <button className={`button ${isClick ? "is-danger" : ""} card-footer-item`}
                    onClick={() => clickFunction(props.url, props.title)}
                >
                    <Icon path={mdiThumbUp} size={1} />
                </button>
            </footer>

        </div>
    );
}

export default Card;
import { mdiHeart, mdiRefresh } from '@mdi/js';
import Icon from '@mdi/react';
import React from "react";

function Navbar(props) {
    return (
        <nav className="navbar is-black block">
            <div className="navbar-brand">
                <p className="title is-1 has-text-white"> Spacestagram </p>
            </div>

            <div className="navbar-menu">
                <div className="navbar-end">
                    <div className="navbar-item">

                        <div className="dropdown is-hoverable is-right">
                            <div className="dropdown-trigger">
                                <button className="button is-danger icon-text has-text-weight-medium">My likes &nbsp;
                                    <Icon path={mdiHeart} size={1} />
                                </button>
                            </div>


                            <div className="dropdown-menu" role="menu">
                                <div className="dropdown-content">

                                    <div>
                                        <a href='/'
                                            className="dropdown-item has-text-info-dark" style={{padding: '0em'}}>
                                            <Icon path={mdiRefresh} size={1} />
                                        </a>
                                        <hr className="dropdown-divider" />
                                    </div>

                                    {props.likes.map((like, index) => {
                                        console.log(like);
                                        return (index !== props.likes.length - 1 ?
                                            <div key={like.title}>
                                                <a href={like.url} className="dropdown-item">{like.title}</a>
                                                <hr className="dropdown-divider" />
                                            </div>
                                            :
                                            <div key={like.title}>
                                                <a href={like.url} className="dropdown-item">{like.title}</a>
                                            </div>
                                        )
                                    })}

                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
import React, { useState, useEffect } from 'react';
import Nav from '../../Components/Nav';
import { Link } from 'react-router-dom';

export default function Instruments() {
    let [ loggedIn,, ] = useState(localStorage.hasOwnProperty("ACCESS_TOKEN"));
    const [ accountData, setAccountData ] = useState({});

    useEffect(() => {
        if (loggedIn) {
            fetch("/getUserData", {
                'method': 'GET',
                'headers': {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem("ACCESS_TOKEN")
                }
            })
                .then(response => response.json())
                .then(response => {
                    if (response.status === 200)
                        setAccountData(response.data);
                    // eslint-disable-next-line
                    else loggedIn = false;
                });
        }
    }, []);

    return (
        <div className="instruments">
            <Nav loggedIn={loggedIn} account={accountData} />
            <div className="options">
                <div className="brass">
                    <Link to="/brass">brass</Link>
                    <div className="img">
                        <img alt="" src="data:image/jpeg;base64,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" />
                    </div>
                </div>
                <div className="woodwind">
                    <Link to="/woodwind">Woodwind</Link>
                    <div className="img">
                        <img alt="" src="https://www.teachingkidsmusic.com/uploads/1/8/1/9/18198925/slide3_8_orig.jpeg"/>
                    </div>
                </div>
                <div className="percussionbass">
                    <Link to="/percussion-bass">Percussion/Bass</Link>
                    <div className="img">
                        <img alt="" src="data:image/jpeg;base64,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" />
                    </div>
                </div>
            </div>
            <h1>Pick the instrument category you are playing in band!</h1>
        </div>
    );
}

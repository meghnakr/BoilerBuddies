import React from 'react';
import logo from '../assets/logo_text.png';
import Tabs from '../components/Tabs.js';

export default function Account(props) {
    return (
        <>
        <Tabs>
        <div label="Profile">
          See ya later, <em>Alligator</em>!
        </div>
        <div label="Account">
          After 'while, <em>Crocodile</em>!
        </div>
        <div label="Sarcosuchus">
          Nothing to see here, this tab is <em>extinct</em>!
        </div>
      </Tabs>
        </>
    )
}
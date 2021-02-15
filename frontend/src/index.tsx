import React from 'react';
import { render } from 'react-dom';

import Router from "./router";
import "./index.scss";

render(
    <Router />, 
    document.getElementById('root')
);

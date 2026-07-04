import React from 'react';
import ReactDOM from 'react-dom/client';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// global.css must load before App's component styles so component-level
// overrides (e.g. hiding .btn variants in media queries) win the cascade
import './styles/global.css';
import App from './App';

gsap.registerPlugin(ScrollTrigger);

// Note: StrictMode intentionally omitted — its double-invoked dev effects
// conflict with the imperative GSAP layer work in the hero transition.
ReactDOM.createRoot(document.getElementById('root')).render(<App />);

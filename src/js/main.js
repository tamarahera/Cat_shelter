import accordion from "./modules/accordion";
import filter from "./modules/filter";
import hamburger from "./modules/hamburger";
import loadMoreCats from "./modules/loadMoreCats";
import showActiveCat from "./modules/showActiveCat";
import slides from "./modules/slides";
import tabs from "./modules/tabs";
import form from "./modules/form";


window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    accordion();
    hamburger();
    loadMoreCats();
    showActiveCat();
    filter();
    slides();
    tabs();
    form();
});
import { render } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';

import {logout} from '../src/api/data.js';

import { catalogPage } from './views/catalog.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { userPage } from './views/userPage.js';




const main = document.querySelector('main');
document.querySelector('#logoutBtn').addEventListener('click',logoutUser);



page('/', userRedirect, midWare, homePage);
page('/login', midWare, loginPage);
page('/register', midWare, registerPage);
page('/catalog', midWare, catalogPage);
page('/details/:id', midWare, detailsPage);
page('/edit/:id',midWare,editPage);
page('/createMeme',midWare,createPage);
page('/myPage',midWare,userPage);

//app start
setUserNav();
page.start();



function midWare(ctx, next) {
    ctx.render = (content) => render(content, main);
    ctx.navigation = () =>setUserNav();

    next();

}

function userRedirect(_, next) {
    const token = sessionStorage.getItem('authToken');

    if (token !== null) {
        page.redirect('/catalog');
    } else {
        next();
    }
}

function setUserNav() {
    const userEmail = sessionStorage.getItem('email');

    if (userEmail == null) {
        document.querySelector('nav div.guest').style.display = '';
        document.querySelector('nav div.user').style.display = 'none';

    } else {
        document.querySelector('nav div.user').style.display = '';
        document.querySelector('nav div.user div.profile>span').textContent = `Welcome, ${userEmail}`;
        document.querySelector('nav div.guest').style.display = 'none';
    }

}

async function logoutUser() {
    await logout();
    setUserNav();
    page.redirect('/');
}
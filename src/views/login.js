import { html } from '../../node_modules/lit-html/lit-html.js';
import {notify} from './common/notification.js';
import { login } from '../api/data.js';

const loginTemplate = (onSubmit) => html`
<section id="login">
    <form @submit=${onSubmit} id="login-form">
        <div class="container">
            <h1>Login</h1>
            <label for="email">Email</label>
            <input id="email" placeholder="Enter Email" name="email" type="text">
            <label for="password">Password</label>
            <input id="password" type="password" placeholder="Enter Password" name="password">
            <input type="submit" class="registerbtn button" value="Login">
            <div class="container signin">
                <p>Dont have an account?<a href="/register">Sign up</a>.</p>
            </div>
        </div>
    </form>
</section>`;



export async function loginPage(ctx) {
    ctx.render(loginTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        const form = new FormData(event.target);
        const email = form.get('email').trim();
        const password = form.get('password').trim();

        if(email == '' || password == ''){
            return notify('All field\'s are required!');
        }

       await login(email,password);
       ctx.navigation();
       ctx.page.redirect('/catalog');
    }
}
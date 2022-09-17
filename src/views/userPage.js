import { html } from '../../node_modules/lit-html/lit-html.js';
import { getMemesByUser } from '../api/data.js';

const userPageTemplate = (memes, username, email, count) => html`
<section id="user-profile-page" class="user-profile">
    <article class="user-info">
        <img id="user-avatar-url" alt="user-profile" src="/images/${sessionStorage.getItem('gender')}.png">
        <div class="user-content">
            <p>Username: ${username}</p>
            <p>Email: ${email}</p>
            <p>My memes count: ${count}</p>
        </div>
    </article>
    <h1 id="user-listings-title">User Memes</h1>
    <div class="user-meme-listings">
        <!-- Display : All created memes by this user (If any) -->

        <!-- Display : If user doesn't have own memes  -->
        ${count ? memes.map(memeTemplate) : html`<p class="no-memes">No memes in database.</p>` }
    </div>
</section>
</div>`;

const memeTemplate = (data) => html`
<div class="user-meme">
    <p class="user-meme-title">${data.title}</p>
    <img class="userProfileImage" alt="meme-img" src="${data.imageUrl}">
    <a class="button" href="/details/${data._id}">Details</a>
</div>
`;

export async function userPage(ctx) {
    const userId = sessionStorage.getItem('userId');
    const memes = await getMemesByUser(userId);
    const username = sessionStorage.getItem('userName');
    const email = sessionStorage.getItem('email');
    const count = memes.length;


    ctx.render(userPageTemplate(memes, username, email, count));
}
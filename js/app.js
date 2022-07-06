const filter = document.querySelector('#search');
const postContainer = document.querySelector('#post-container');
const loading = document.querySelector('#loader');
// console.log(loading);


let page = 1;
let limit = 4;

//Function to get the posts from json placeholder
async function getPosts() {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);

    const data = await res.json();

    return data;
}

//my code 
//function to get posts from json placeholder
const getPosts = async () => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);

    const data = await res.json();

    return data;
}

//my code 
// function to filter through posts on search
const filterPosts = (e) => {
    const search = e.target.value.toLowerCase();
    const posts = document.querySelectorAll('.posts');

    posts.forEach(post => {
        const title = post.querySelector('.post-title').innerText.toLowerCase();

        const body = post.querySelector('.post-body').innerText.toLowerCase();

        if(title.indexOf(search) > -1 || body.indexOf(search) > -1){
            post.style.display = 'flex';
        }
        else {
            post.style.display = 'none';
        }
    })
}

//Filter posts on search
function filterPosts(e) {
    const search = e.target.value.toUpperCase();
    const posts = document.querySelectorAll('.post');

    posts.forEach(post => {
        const title = post.querySelector('.post-title').innerText.toUpperCase();

        const body = post.querySelector('.post-body').innerText.toUpperCase();

        if(title.indexOf(search) > -1 || body.indexOf(search) > -1) {
            post.style.display = 'flex';
        } else{
            post.style.display = 'none';
        }
    });
}

//my sode 
//function to show posts in DOM 
const showPosts = async () => {
    const posts = await getPosts();

    posts.forEach( post => {
        const postEl = document.createElement('div');
        postEl.classList.add('post');
        postEl.innerHTML= `
        <h2 class="post-title">
            ${post.title}
        </h2>
        <p class="post-body">
            ${post.body}
        </p>
        `;

        postContainer.appendChild(postEl);
    })
}

//function to show post on DOM
async function showPosts() {
    const posts = await getPosts();

    posts.forEach(post => {
        const postEl = document.createElement('div');
        postEl.classList.add('post');
        postEl.innerHTML = `
        <div class="post-info">
        <h2 class="post-title">${post.title}</h2>
        <p class="post-body">
            ${post.body}
        </p>
        </div>
        `;

        postContainer.appendChild(postEl);
    });
}

//Show loading and fetch more posts
function showLoading() {
    loading.style.display = 'flex';
    setTimeout(() => {
        loading.style.display = 'none';

        setTimeout(() => {
            page++;
            showPosts();
        }, 1000);

    }, 2000);
}

//Show posts initially
showPosts();

window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 5){
        showLoading();
    }
});

filter.addEventListener('input', filterPosts);


// const getPosts = async () => {
//     let imageArray;
//     fetch('https://jsonplaceholder.typicode.com/photos')
//     .then(res => res.json())
//     .then(data => {
//         imageArray = data;
//     })
//     return imageArray;
// }

// const showPosts = () => {

// }





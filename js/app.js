const filter = document.querySelector('#search');
const postContainer = document.querySelector('#post-container');
const loading = document.querySelector('#loader');
// console.log(loading);


let page = 1;
let limit = 4;

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

//show loading while fetching more posts.
const showLoading = () => {
    loading.style.display = 'flex';
    setTimeout( () => {
        loading.style.display = 'none';

        setTimeout(() => {
            showPosts();
        }, 1000);

    }, 4000);
};

//Show posts initially
showPosts();

window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 5){
        showLoading();
    }
});


const filter = document.querySelector('#search');
const postContainer = document.querySelector('#post-container');
const loading = document.querySelector('#loader');


let page = 1;
let limit = 4;

//my code 
//function to get posts from json placeholder
const getPosts = async () => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);

    const data = await res.json();

    return data;
}

const audio = new Audio();
audio.src = 'melodyloops-preview-just-having-fun-2m30s.mp3';

function toggleMusic() {
    audio.play();
}

function pauseMusic() {
    audio.pause();
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


//my code 
// function to filter through posts on search
function filterPosts(e) {
    const search = e.target.value.toLowerCase();
    const posts = document.querySelectorAll('.post');

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
 
//show loading while fetching more posts.
const showLoading = () => {
    loading.style.display = 'flex';
    setTimeout( () => {
        loading.style.display = 'none';

        setTimeout(() => {
            showPosts();
        }, 1000);

    }, 3000);
};

//Show posts initially
showPosts();

window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 5){
        showLoading();
    }
});


filter.addEventListener('input', filterPosts);

window.addEventListener('click', document.querySelector('audio').play());
window.addEventListener('keyup', document.querySelector('audio').play());

window.addEventListener('keydown', document.querySelector('audio').pause());
window.addEventListener('dblclick', document.querySelector('audio').pause());
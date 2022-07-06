const searchKeyword = document.querySelector('#search');
const postContainer = document.querySelector('#post-container');
const loading = document.querySelector('#loader');



const getPosts = async () => {
    fetch('https://avatars.dicebear.com/api/:sprites/:seed.svg')
    .then(res => res.json)
    .then(image => console.log(image))
}

getPosts();





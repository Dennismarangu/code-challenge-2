document.addEventListener('DOMContentLoaded', () => {

  // Define the API endpoint URL
  const API_URL = 'http://localhost:3000/characters';

  // Get references to the HTML elements we'll need to update
  const postsList = document.getElementById('posts-list');
  const postTitle = document.getElementById('post-title');
  const postBody = document.getElementById('post-body');

  // Function to render the posts list
  function renderPosts(posts) {
    // Clear any existing posts from the list
    postsList.innerHTML = '';

    // Loop through the posts and create an HTML element for each one
    posts.forEach(post => {
      const li = document.createElement('li');
      li.innerText = post.title;
      li.setAttribute('data-id', post.id);
      postsList.appendChild(li);
    });
  }

  // Function to render the selected post
  function renderPost(post) {
    postTitle.innerText = post.title;
    postBody.innerText = post.body;
  }

  // Function to fetch the posts from the API
  function fetchPosts() {
    fetch(API_URL)
      .then(response => response.json())
      .then(data => renderPosts(data))
      .catch(error => console.error(error));
  }

  // Function to fetch a single post by ID from the API
  function fetchPostById(id) {
    const url = `${API_URL}/${id}`;
    fetch(url)
      .then(response => response.json())
      .then(data => renderPost(data))
      .catch(error => console.error(error));
  }

  // Attach an event listener to the posts list to handle click events
  postsList.addEventListener('click', event => {
    // Get the ID of the clicked post
    const postId = event.target.getAttribute('data-id');

    // Fetch the post details and render them
    fetchPostById(postId);
  });

  // Fetch the posts when the page loads
  fetchPosts();

});

function renderUserList(users) {
  userList.innerHTML = "";
  users.forEach((user) => {
    const li = document.createElement("li");
    li.textContent = user.name;
    li.addEventListener("click", () => {
      fetchUserDetails(user.id);
    });
    userList.appendChild(li);
  });
}
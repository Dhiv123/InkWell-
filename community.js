document.addEventListener('DOMContentLoaded', function() {
    const postsList = document.getElementById('posts-list');
    loadPosts();

    function loadPosts() {
        postsList.innerHTML = '';
        const posts = JSON.parse(localStorage.getItem('community-posts')) || [];
        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('post');
            postElement.innerHTML = `
                <div class="author">${post.author}</div>
                <div class="content">${post.content}</div>
                <div class="likes-comments">
                    <span>Likes: ${post.likes}</span>
                    <span>Comments: ${post.comments.length}</span>
                </div>
                <a href="draft_content.html?filename=${post.id}">View Draft</a>
            `;
            postsList.appendChild(postElement);
        });
    }
});

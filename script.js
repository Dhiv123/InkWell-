document.addEventListener('DOMContentLoaded', function() {
    // Functionality for Drafting Page
    const saveDraftButton = document.getElementById('save-draft');
    const deleteDraftButton = document.getElementById('delete-draft');
    const draftList = document.getElementById('draft-list');
    const loadDraftButton = document.getElementById('load-draft');
    const newDraftButton = document.getElementById('new-draft');
    const draftInput = document.getElementById('draft-input');
    const draftPrefix = 'draft_';
const postDraftButton = document.getElementById('post-draft');


    if (saveDraftButton && draftInput) {
        saveDraftButton.addEventListener('click', function() {
            const text = draftInput.value;
            if (!text) {
                alert("Please enter some text to save.");
                return;
            }

            const filename = prompt("Enter the filename:", "draft.txt");
            if (!filename) {
                alert("Filename cannot be empty.");
                return;
            }

            saveDraft(filename, text);
            updateDraftList();
        });
    }

    if (deleteDraftButton && draftList) {
        deleteDraftButton.addEventListener('click', function() {
            const selectedDraft = draftList.value;
            if (selectedDraft) {
                const confirmation = confirm("Are you sure you want to delete this draft?");
                if (confirmation) {
                    deleteDraft(selectedDraft);
                    updateDraftList();
                    draftInput.value = ''; // Clear the input field
                }
            } else {
                alert("Please select a draft to delete.");
            }
        });
    }

    if (loadDraftButton && draftList) {
        loadDraftButton.addEventListener('click', function() {
            const selectedDraft = draftList.value;
            if (selectedDraft) {
                loadDraft(selectedDraft);
            } else {
                alert("Please select a draft to load.");
            }
        });
    }

    if (newDraftButton) {
        newDraftButton.addEventListener('click', function() {
            const currentText = draftInput.value.trim();
            if (currentText) {
                const filename = prompt("Enter the filename for the current draft:", "draft.txt");
                if (filename) {
                    saveDraft(filename, currentText);
                    updateDraftList();
                    draftInput.value = ''; // Clear the input field for a new draft
                }
            } else {
                draftInput.value = ''; // Clear the input field for a new draft if it's already empty
            }
        });
    }

    if (postDraftButton) {
        postDraftButton.addEventListener('click', function() {
            const text = draftInput.value;
            if (!text) {
                alert("Please enter some text to post.");
                return;
            }

            const filename = prompt("Enter the filename:", "draft.txt");
            if (!filename) {
                alert("Filename cannot be empty.");
                return;
            }

            saveDraft(filename, text);
            postDraftToCommunity(filename);
            updateDraftList();
        });
    }


    function saveDraft(filename, content) {
        localStorage.setItem(draftPrefix + filename, content);
    }

    function loadDraft(filename) {
        const content = localStorage.getItem(draftPrefix + filename);
        if (content !== null) {
            draftInput.value = content;
        } else {
            alert("Draft not found.");
        }
    }

    function deleteDraft(filename) {
        localStorage.removeItem(draftPrefix + filename);
    }

    function updateDraftList() {
        draftList.innerHTML = '';
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            // Only include drafts and exclude sensitive information
            if (key.startsWith(draftPrefix)) {
                const option = document.createElement('option');
                option.value = key.substring(draftPrefix.length); // Remove prefix for display
                option.textContent = key.substring(draftPrefix.length); // Remove prefix for display
                draftList.appendChild(option);
            }
        }
    }

    function postDraftToCommunity(filename) {
        const content = localStorage.getItem(draftPrefix + filename);
        if (!content) {
            alert("Draft not found.");
            return;
        }

        const currentUser = JSON.parse(localStorage.getItem('currentUser')) || { name: 'Anonymous' };
        const posts = JSON.parse(localStorage.getItem('community-posts')) || [];

        posts.push({
            author: currentUser.name,
            filename: filename,
            content: content,
            id: new Date().getTime(),
            comments: [],
            likes: 0
        });

        localStorage.setItem('community-posts', JSON.stringify(posts));
        alert('Draft posted to community!');
    }

    // Initial update of the draft list on page load
    if (draftList) {
        updateDraftList();
    }

    // Functionality for Brainstorming Page
    const addIdeaButton = document.getElementById('add-idea');
    const ideasContainer = document.getElementById('ideas-container');
    const ideaInput = document.getElementById('idea-input');
    const divider = document.getElementById('divider');
    const splitContainer = document.querySelector('.split-container');
    const ideasTab = document.getElementById('ideas-tab');
    const ideasList = document.getElementById('ideas-list');

    if (addIdeaButton && ideasContainer && ideaInput) {
        // Load saved ideas from local storage
        loadIdeas();

        // Event listener for clicking the "Add Idea" button
        addIdeaButton.addEventListener('click', function() {
            const ideaText = ideaInput.value.trim();

            if (ideaText !== '') {
                addIdea(ideaText);
                ideaInput.value = ''; // Clear the input field
            }
        });

        function addIdea(text) {
            const ideaElement = document.createElement('div');
            ideaElement.classList.add('idea');
            ideaElement.textContent = text;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('delete-button');
            deleteButton.addEventListener('click', function() {
                const confirmation = confirm("Are you sure you want to delete this idea?");
                if (confirmation) {
                    ideasContainer.removeChild(ideaElement);
                    saveIdeas();
                }
            });

            ideaElement.appendChild(deleteButton);
            ideasContainer.appendChild(ideaElement);

            saveIdeas(); // Call saveIdeas when adding a new idea
        }

        function saveIdeas() {
            const ideas = [];
            const ideaElements = ideasContainer.querySelectorAll('.idea');

            ideaElements.forEach((element) => {
                ideas.push(element.textContent.replace('Delete', '').trim());
            });

            localStorage.setItem('ideas', JSON.stringify(ideas));
        }

        function loadIdeas() {
            const savedIdeas = JSON.parse(localStorage.getItem('ideas')) || [];

            savedIdeas.forEach((idea) => {
                addIdea(idea);
            });
        }
    }

    // Common functionality for both pages
    let isResizing = false;

    if (divider && splitContainer) {
        // Event listener for mouse down on the divider
        divider.addEventListener('mousedown', function(event) {
            isResizing = true;
        });

        // Event listener for mouse up on the document
        document.addEventListener('mouseup', function(event) {
            isResizing = false;
        });

        // Event listener for mouse move on the document
        document.addEventListener('mousemove', function(event) {
            if (isResizing) {
                const containerWidth = splitContainer.offsetWidth;
                const mouseX = event.pageX;
                const newWidth = mouseX / containerWidth * 100; // Calculate new width in percentage

                // Ensure the new width is within certain limits (e.g., between 20% and 80%)
                const minWidth = 20; // Minimum width percentage
                const maxWidth = 80; // Maximum width percentage
                const clampedWidth = Math.min(Math.max(newWidth, minWidth), maxWidth);

                // Update the width of the editor container and the divider position
                splitContainer.style.gridTemplateColumns = `${clampedWidth}% 5px auto`;
            }
        });
    }

    if (ideasTab && ideasList) {
        // Event listener for clicking on the Ideas tab
        ideasTab.addEventListener('click', function() {
            ideasList.classList.toggle('show-ideas');
        });
    }


var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}


});
document.addEventListener('DOMContentLoaded', function() {
    const communityPostsContainer = document.getElementById('community-posts');

    const posts = JSON.parse(localStorage.getItem('community-posts')) || [];

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');

        const username = document.createElement('p');
        username.textContent = `Username: ${post.author}`;

        const content = document.createElement('p');
        content.textContent = `Content: ${post.content}`;

        const likes = document.createElement('p');
        likes.textContent = `Likes: ${post.likes}`;

        const comments = document.createElement('p');
        comments.textContent = `Comments: ${post.comments.length}`;

        postElement.appendChild(username);
        postElement.appendChild(content);
        postElement.appendChild(likes);
        postElement.appendChild(comments);

        communityPostsContainer.appendChild(postElement);
    });
});

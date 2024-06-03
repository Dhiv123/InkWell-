document.addEventListener('DOMContentLoaded', function() {
    const draftsList = document.getElementById('drafts-list');
    const saveDraftButton = document.getElementById('save-draft');
    const draftContent = document.getElementById('draft-content');

    saveDraftButton.addEventListener('click', function() {
        const content = draftContent.value.trim();
        if (content) {
            saveDraft(content);
            draftContent.value = '';
        } else {
            alert('Please write something before saving.');
        }
    });

    function saveDraft(content) {
        const drafts = JSON.parse(localStorage.getItem('drafts')) || [];
        const draft = {
            id: new Date().getTime().toString(),
            content: content,
            author: 'Anonymous', // You can replace this with the actual author name
            likes: 0,
            comments: []
        };
        drafts.push(draft);
        localStorage.setItem('drafts', JSON.stringify(drafts));
        loadDrafts();
    }

    function loadDrafts() {
        draftsList.innerHTML = '';
        const drafts = JSON.parse(localStorage.getItem('drafts')) || [];
        drafts.forEach(draft => {
            const draftElement = document.createElement('div');
            draftElement.classList.add('draft');
            draftElement.innerHTML = `
                <p>${draft.content}</p>
                <button class="post-draft" data-id="${draft.id}">Post to Community</button>
            `;
            draftsList.appendChild(draftElement);
        });
    }

    draftsList.addEventListener('click', function(event) {
        if (event.target.classList.contains('post-draft')) {
            const draftId = event.target.getAttribute('data-id');
            postDraftToCommunity(draftId);
        }
    });

    function postDraftToCommunity(draftId) {
        const drafts = JSON.parse(localStorage.getItem('drafts')) || [];
        const draft = drafts.find(d => d.id === draftId);
        if (draft) {
            const posts = JSON.parse(localStorage.getItem('community-posts')) || [];
            posts.push(draft);
            localStorage.setItem('community-posts', JSON.stringify(posts));
            alert('Draft posted to community!');
        } else {
            alert('Draft not found.');
        }
    }

    loadDrafts();
});

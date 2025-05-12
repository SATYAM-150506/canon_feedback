document.getElementById('feedback-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const userName = document.getElementById('user-name').value;
    const userEmail = document.getElementById('user-email').value;
    const feedbackDate = document.getElementById('feedback-date').value;
    const productModel = document.getElementById('product-model').value;
    const userComments = document.getElementById('user-comments').value;
    const satisfactionLevel = document.getElementById('satisfaction-level').value;

    if (userName && userEmail && feedbackDate && productModel && userComments && satisfactionLevel) {
        const feedback = {
            id: Date.now(),
            name: userName,
            email: userEmail,
            date: feedbackDate,
            product_model: productModel,
            comments: userComments,
            satisfaction: satisfactionLevel
        };
        
        addFeedback(feedback);
        document.getElementById('feedback-form').reset();
    }
});

function addFeedback(feedback) {
    const feedbackList = document.getElementById('feedback-list');
    const row = document.createElement('tr');
    row.setAttribute('data-id', feedback.id);

    row.innerHTML = `
        <td>${feedback.name}</td>
        <td>${feedback.email}</td>
        <td>${feedback.date}</td>
        <td>${feedback.product_model}</td>
        <td>${feedback.comments}</td>
        <td>${feedback.satisfaction}</td>
        <td><button onclick="deleteFeedback(${feedback.id})">Delete</button></td>
    `;

    feedbackList.appendChild(row);
}

function deleteFeedback(id) {
    document.querySelector(`tr[data-id='${id}']`).remove();
}
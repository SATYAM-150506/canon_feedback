document.getElementById('feedback-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const userName = document.getElementById('user-name').value;
    const userEmail = document.getElementById('user-email').value;
    const feedbackDate = document.getElementById('feedback-date').value;
    const productModel = document.getElementById('product-model').value;
    const userComments = document.getElementById('user-comments').value;
    const satisfactionLevel = document.getElementById('satisfaction-level').value;
    const userRating = document.querySelector('input[name="rating"]:checked') ? document.querySelector('input[name="rating"]:checked').value : null;

    if (userName && userEmail && feedbackDate && productModel && userComments && satisfactionLevel && userRating) {
        const feedback = {
            id: Date.now(),
            name: userName,
            email: userEmail,
            date: feedbackDate,
            product_model: productModel,
            comments: userComments,
            satisfaction: satisfactionLevel,
            rating: userRating
        };
        
        addFeedback(feedback);
        document.getElementById('feedback-form').reset();
    } else {
        alert("Please fill out all fields, including the rating.");
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
        <td>${feedback.rating} ★</td> <!-- Display the rating with stars -->
        <td><button onclick="deleteFeedback(${feedback.id})">Delete</button></td>
    `;

    feedbackList.appendChild(row);
}

function deleteFeedback(id) {
    document.querySelector(`tr[data-id='${id}']`).remove();
}
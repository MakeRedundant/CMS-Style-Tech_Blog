// Define an asynchronous function to handle the commentss form submission.
async function commentFormHandler(event) {
  // Prevent the default form submission behavior.
  event.preventDefault();

  // Get the comment text from the textarea input in the form.
  const comment_text = document
    .querySelector('textarea[name="comment-body"]')
    .value.trim();

  // Get the post_id from the current URL by splitting it.
  const post_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  // Check if the comment text is provided.
  if (comment_text) {
    // Send a POST request to the server's '/api/comments' endpoint.
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({
        post_id,
        comment_text,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      // Reload the page to display the new comment.
      document.location.reload();
    } else {
      // Display an alert with the error status text if comment submission fails.
      alert(response.statusText);
    }
  }
}
// Add a submit event listener to the comment form to trigger the comment submission process.
document
  .querySelector('.comment-form')
  .addEventListener('submit', commentFormHandler);

//Summary
//The code defines an asynchronous function commentFormHandler to handle comment form submissions.
//It retrieves the comment text from a textarea input in the form.
//It extracts the post_id from the current URL by splitting the URL.
//If the comment text is provided, it sends a POST request to the server's '/api/comments' endpoint with the post_id and comment_text as JSON data.
//If the server responds with a successful status code, the page is reloaded to display the new comment.
//If the server responds with an error, an alert is displayed with the error message.

// Define an asynchronous function to handle the submission of a new post form.
async function newFormHandler(event) {
  // Prevent the default form submission behavior (page reload).
  event.preventDefault();

  // Get the values of the title and post_content inputs from the form.
  const title = document.querySelector('input[name="post-title"]').value;
  const post_content = document.querySelector('input[name="post-content"]')
    .value;

  // Send a POST request to the server's '/api/posts' endpoint with the post data.
  const response = await fetch('/api/posts', {
    method: 'POST',
    body: JSON.stringify({
      title,
      post_content,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Check if the response from the server is successful (status code 200-299).
  if (response.ok) {
    // Redirect the user to the '/dashboard' page after successfully creating a new post.
    document.location.replace('/dashboard');
  } else {
    // Display an alert with the error status text if post creation fails.
    alert(response.statusText);
  }
}
// Add a submit event listener to the new post form to trigger the submission process.
document
  .querySelector('.new-post-form')
  .addEventListener('submit', newFormHandler);

//Summary
//The code defines an asynchronous function newFormHandler to handle the submission of a new post form.
//It retrieves the values of the title and post_content inputs from the form.
//It sends a POST request to the server's '/api/posts' endpoint with the post data as JSON.
//If the server responds with a successful status code, the user is redirected to the '/dashboard' page, indicating successful post creation.
//If the server responds with an error, an alert is displayed with the error message.

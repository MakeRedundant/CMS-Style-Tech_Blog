// Define an asynchronous function to handle the editing of a post.
async function editFormHandler(event) {
  // Prevent the default behavior (e.g., submitting a form).
  event.preventDefault();

  // Extract the updated title and post content from the form input fields.
  const title = document.querySelector('input[name="post-title"]').value;
  const post_content = document.querySelector('input[name="post-content"]')
    .value;

  // Extract the post ID from the current URL.
  // const id = window.location.toString().split('/').slice(-1)[0];

  //Assign location to variable
  const currentRoute = document.location;
  //Assign URL to variable
  const address = currentRoute.href;
  //Split variable and assign to new Array
  const addressArray = address.split('/');
  //Get last position of Array
  const id = addressArray[addressArray.length - 1];
  console.log(id);

  // Send a PUT request to the server's '/api/posts/:id' endpoint to update the post.
  const response = await fetch(`/api/posts/${id}`, {
    method: 'PUT',
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
    // Redirect the user to the '/dashboard' page after successfully editing the post.
    document.location.replace('/dashboard/');
  } else {
    // Display an alert with the error status text if editing fails.
    alert(response.statusText);
  }
}
// Add a submit event listener to the edit post form to trigger the edit process.
document
  .querySelector('.edit-post-form')
  .addEventListener('submit', editFormHandler);
//Summary
//The code defines an asynchronous function editFormHandler to handle the editing of a post.
//It prevents the default behavior of the form submission using event.preventDefault().
//It extracts the updated title and post content from the form input fields.
//It extracts the post ID from the current URL by splitting and selecting the last part of the URL.
//It sends a PUT request to the server's '/api/posts/:id' endpoint with the updated post data as JSON.
//If the server responds with a successful status code, the user is redirected to the '/dashboard/' page, indicating successful post editing.
//If the server responds with an error, an alert is displayed with the error message.

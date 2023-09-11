// Define an asynchronous function to handle the deletion of a post.
async function deleteFormHandler(event) {
  // Prevent the default behavior (e.g., following a link or submitting a form).
  event.preventDefault();

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

  // Send a DELETE request to the server's '/api/posts/:id' endpoint to delete the post.
  const response = await fetch(`/api/posts/${id}`, {
    method: 'DELETE',
    body: JSON.stringify({
      post_id: id,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Check if the response from the server is successful (status code 200-299).
  if (response.ok) {
    // Redirect the user to the '/dashboard' page after successfully deleting the post.
    document.location.replace('/dashboard/');
  } else {
    // Display an alert with the error status text if post deletion fails.
    alert(response.statusText);
  }
}
// Add a click event listener to the delete post button to trigger the deletion process.
document
  .querySelector('.delete-post-btn')
  .addEventListener('click', deleteFormHandler);

//Summary
//The code defines an asynchronous function deleteFormHandler to handle the deletion of a post.
//It prevents the default behavior of the element that triggers this function (e.g., clicking a link or button) using event.preventDefault().
//It extracts the post ID from the current URL by splitting and selecting the last part of the URL.
//It sends a DELETE request to the server's '/api/posts/:id' endpoint with the post ID as JSON data.
//If the server responds with a successful status code, the user is redirected to the '/dashboard/' page, indicating successful post deletion.
//If the server responds with an error, an alert is displayed with the error message.

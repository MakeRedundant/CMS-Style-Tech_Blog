// Defined an asynchronous function to handle user signup.
async function signupFormHandler(event) {
  // Prevent the default behavior (e.g., submitting a form).
  event.preventDefault();

  // Extract user signup data from the input fields.
  const username = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  const twitter = document.querySelector('#twitter-signup').value.trim();
  const github = document.querySelector('#github-signup').value.trim();

  // Check if username, email, and password are provided.
  if (username && email && password) {
    // Send a POST request to the server's '/api/users' endpoint to create a new user.
    const response = await fetch('/api/users', {
      method: 'post',
      body: JSON.stringify({
        username,
        email,
        twitter,
        github,
        password,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    // Check if the response from the server is successful (status code 200-299).
    if (response.ok) {
      // Log 'success' to the console and redirect the user to the '/dashboard' page upon successful signup.
      console.log('success');
      document.location.replace('/dashboard');
    } else {
      // Display an alert with the error status text if signup fails.
      alert(response.statusText);
    }
  }
}
// Add a submit event listener to the signup form to trigger the signup process.
document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);

//Summary
//The code defines an asynchronous function signupFormHandler to handle user signup.
//It extracts user signup data (username, email, password, twitter, and github) from the input fields.
//It checks if username, email, and password are provided.
//It sends a POST request to the server's '/api/users' endpoint with the user signup data as JSON.
//If the server responds with a successful status code, 'success' is logged to the console, and the user is redirected to the '/dashboard' page, indicating a successful signup.
//If the server responds with an error, an alert is displayed with the error message.

// Define an asynchronous function to handle the login form submission.
async function loginFormHandler(event) {
  // Prevent the default form submission behavior.
  event.preventDefault();

  // Get the user's email and password from the form inputs.
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  // Log the email and password before sending the request for debugging.
  console.log('Email:', email);
  console.log('Password:', password);

  // Check if both email and password are provided.
  if (email && password) {
    // Send a POST request to the server's '/api/users/login' endpoint.
    const response = await fetch('/api/users/login', {
      method: 'post',
      body: JSON.stringify({
        email,
        password,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    console.log('Response:', response);

    // Check if the response from the server is successful (status code 200-299).
    if (response.ok) {
      // Redirect the user to the dashboard page upon successful login.
      document.location.replace('/dashboard');
    } else {
      // Display an alert with the error status text if login fails.
      alert(response.statusText);
    }
  }
}
// Add a submit event listener to the login form to trigger the login process.
document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

//Summary
//The code defines an asynchronous function loginFormHandler to handle login form submissions.
//It retrieves the user's email and password from the login form's input fields.
//It sends a POST request to the server's '/api/users/login' endpoint with the provided email and password as JSON data.
//If the server responds with a successful status code, the user is redirected to the dashboard page.
//If the server responds with an error, an alert is displayed with the error message.

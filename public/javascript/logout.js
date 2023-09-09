async function logout() {
  const response = await fetch('/api/users/logout', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('#logout').addEventListener('click', logout);

//Summary
//this script is designed to handle user logout functionality in a web application.
//When the user clicks a specific HTML element with the id 'logout,' it sends a POST request to the server's '/api/users/logout' endpoint.
// If the logout is successful, the user is redirected to the homepage; otherwise, an error message is displayed.

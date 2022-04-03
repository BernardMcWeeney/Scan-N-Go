// If the user clicks the link to create a user, the registration form is displayed
function showRegistrationContainer() {
  document.getElementById('registrationContainer').style = ""
}

// Function that returns the backend server URL. This is for the frontend to understand whether it is being run locally or on Azure
function backendServer() {
  url = window.location.href;
  let domain = (new URL(url));
  if (domain.hostname == "scanngo-frontend-app.azurewebsites.net") {
    var backendServerURL = "https://scanngo-backend-app.azurewebsites.net/";
  } else if ((domain.hostname == "127.0.0.1") || (domain.hostname == "localhost") || (domain.hostname == "0.0.0.0")) {
    var backendServerURL = "http://127.0.0.1:8000/";
  } else if (domain.hostname == "192.168.1.20") {
    var backendServerURL = "http://192.168.1.20:8000/";
  } else {
    alert("ERROR: Cannot determine Backend Server (Django) URL");
  }
  //console.log("domain ", domain)
  //console.log('Backend Server URL', backendServerURL)
  return backendServerURL
}

function registerNewUser() {
  // always prevent default events when using javascript
  // get the value the in the fname box
  let first_name = document.getElementById("fname-register").value.trim();
  // get the value the in the fname box
  let last_name = document.getElementById("lname-register").value.trim();
  // get the value the in the username box
  let username = document.getElementById("registerUser").value;
  // get the value in the email box
  let email = document.getElementById("registerEmail").value;
  // get the value in the password box
  let password = document.getElementById("registerPassword").value;

  // prevent "" value in inputs
  if (username == "") {
    alert("Username cannot be null");
  } else if (password == "") {
    alert("Password cannot be null");
  } else if (first_name == "") {
    alert("First Name cannot be null");
  } else if (last_name == "") {
    alert("Last Name cannot be null");
  } else if (email == "") {
    alert("Email cannot be null");
  } else {

  console.log('New User Details (Read from input boxes):', 'First Name', first_name, "Last name", last_name, "Username", username, "Password", password, "Email", email)

  // get profile image
  let profile_image = document.getElementById("formFile").files[0];
  console.log("Profile Image", profile_image)

  // create API url
  let backendServerURL = backendServer() // get backend server URL
  let djangoServer = backendServerURL + "register/"

  // Create form data
  var formData1 = new FormData();
  formData1.append("first_name", first_name);
  formData1.append("last_name", last_name);
  formData1.append("username", username);
  formData1.append("email", email);
  formData1.append("password", password);
  formData1.append("user_image", profile_image);

  // create request obj
  var requestObject;
  requestObject = {
      body: formData1,
      accept: '*/*',
      method: 'POST'
  };

  // do api call
  fetch(djangoServer, requestObject)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        // throw a error if the response is not 200
        throw new Error('Something went wrong creating the account. Please check your credentials before submitting');
      }
    }) // extract the json from the response you get from the server
    .then(data => {
      //console.log(data);
      // alert the user that their account is created and reload the page
      if (!alert("Successfully created you a User Account!")) {
        window.location.reload();
      }
      // set the values back to "" on the registration form
      document.getElementById("registerUser").value = ""
      document.getElementById("registerEmail").value = ""
      document.getElementById("registerPassword").value = ""
      document.getElementById("fname-register").value = ""
      document.getElementById("lname-register").value = ""
      document.getElementById("formFile").value = ""
    })
    // if there is an error, alert the user
    .catch((error) => {
      alert("Error in creating account - Please check the credentials you have used\n\n It is most likely that a user with this username already exists\n\n")
    });
  }
}

// Function to log in the user
function logInUser(event) {
  event.preventDefault(); // always prevent default events when using javascript
  // get the value the in the username box
  let username = document.getElementById("inputEmail").value;
  // get the value in the password box
  let password = document.getElementById("inputPassword").value;
  // prevent "" value in password or username input
  if (username == "") {
    alert("Username cannot be null");
  } else if (password == "") {
    alert("Password cannot be null");
  } else {
    uname = document.getElementById("inputEmail").value;
    pword = document.getElementById("inputPassword").value;
    //console.log("Username:", uname, "Password:", pword)
    let url = backendServer() // get the hostname of the backend server
    let backendServerURL1 = backendServer() + "api/token/" // create the URL to call
    //console.log("Sending Login Data to ", backendServerURL1)

    // get the token from the backend server
    fetch(backendServerURL1, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: uname,
        password: pword
      })
    })
      .then(response => response.json())
      .then(data => {
        //console.log(data)
        if ('access' in data) {
          let accessToken = data['access'];
          let refreshToken = data['refresh'];
          sessionStorage.setItem("access", accessToken); // write the access token to sessionStorage
          sessionStorage.setItem("refresh", refreshToken); // write the refresh token to sessionStorage
          sessionStorage.setItem("username", uname); // write the username to sessionStorage
          window.location.href = "/store-scanner"; // go to homepage
        } else {
          //console.log(data);
          // if invalid login, alert the user
          alert("username or password invalid");
        }
      });
  }
};
let loginForm = document.getElementById("login-form"); // get the form
loginForm.addEventListener('submit', logInUser); // bind the login function to the submit button

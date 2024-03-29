function backendServer() { // get backend server URL
  const domain = window.location.hostname.toString();
  //console.log("Domain: ", domain)
  if (domain == "scanngo.ie") {
    var backendServerURL = "https://www.backend.scanngo.ie/";
  } else if (domain == "www.scanngo.ie") {
    var backendServerURL = "https://www.backend.scanngo.ie/";
  }
  else if ( (domain == "127.0.0.1") || (domain == "localhost") || (domain == "0.0.0.0") ) {
    var backendServerURL = "http://127.0.0.1:8000/";
    }
  else {
    alert("ERROR: Cannot determine Backend Server (Django) URL");
    }

  //console.log('Backend Server URL', backendServerURL)
  return backendServerURL
}


function toggleResetPswd(e){
    e.preventDefault();
    $('#logreg-forms .form-signin').toggle() // display:block or none
    $('#logreg-forms .form-reset').toggle() // display:block or none
}

function toggleSignUp(e){
    e.preventDefault();
    $('#logreg-forms .form-signin').toggle(); // display:block or none
    $('#logreg-forms .form-signup').toggle(); // display:block or none
}

$(()=>{
    // Login Register Form
    $('#logreg-forms #forgot_pswd').click(toggleResetPswd);
    $('#logreg-forms #cancel_reset').click(toggleResetPswd);
    $('#logreg-forms #btn-signup').click(toggleSignUp);
    $('#logreg-forms #cancel_signup').click(toggleSignUp);
})

// if user is not logged in, send them to the login page
function checkLogin(){
  //console.log(sessionStorage)
  if (sessionStorage.getItem('access') != null) {
    var isLoggedIn= true;
  } else {
    var isLoggedIn = false;
  }
  if (isLoggedIn == false){
    ////console.log("test")
    location.href = '/login/false';
   // //console.log("User is not Logged In")
}
}

function getUsername() {
  if (sessionStorage.getItem('username') != null) {
    var username = sessionStorage.getItem('username')
  } else {
    var username = "User is not logged in"
}
  return username
}

function isLoggedIn(){
  // //console.log(sessionStorage)
  if (sessionStorage.getItem('access') != null) {
    return true;
  } else {
    return false;
  }}


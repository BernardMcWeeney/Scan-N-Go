// If the user clicks the link to create a user, the registration form is displayed
function showRegistrationContainer() {
  document.getElementById('registrationContainer').style = ""
}

// Function that returns the backend server URL. This is for the frontend to understand whether it is being run locally or on Azure
function backendServer() {
  url = window.location.href;
  let domain = (new URL(url));
  if (domain.hostname == "scanngo.ie") {
    var backendServerURL = "https://www.backend.scanngo.ie/";
  } else if (domain.hostname == "www.scanngo.ie") {
    var backendServerURL = "https://www.backend.scanngo.ie/";
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

function updatestoreprofile() {
  let store_name = document.getElementById("register-store_name").value.trim();
  let email = document.getElementById("register-email").value;
  let address1 = document.getElementById("register-address1").value;
  let address2 = document.getElementById("register-address2").value;
  let county = document.getElementById("register-county").value;
  let eircode = document.getElementById("register-eircode").value;

  // prevent "" value in inputs
  if (eircode == "") {
    alert("Eircode cannot be null");
  } else if (county == "") {
    alert("County cannot be null");
  } else if (store_name == "") {
    alert("Store Name cannot be null");
  } else if (address1 == "") {
    alert("Address Line 1 cannot be null");
  } else if (address2 == "") {
    alert("Address Line 2 cannot be null");
  } else if (email == "") {
    alert("Email cannot be null");
  } else {

  console.log('New Store Details (Read from input boxes):', 'Store Name', store_name, "county", county, "eircode", eircode, "address1", address1, "address2", address2, "Email", email)

  // get profile image
  let store_logo = document.getElementById("register-storelogo").files[0];
  console.log("Profile Image", store_logo)

  // create API url
  let backendServerURL = backendServer() // get backend server URL
  let djangoServer = backendServerURL + "stores/"

  // Create form data
  var formData1 = new FormData();
  formData1.append("store_name", store_name);
  formData1.append("email", email);
  formData1.append("address1", address1);
  formData1.append("address2", address2);
  formData1.append("county", county);
  formData1.append("eircode", eircode);
  formData1.append("store_logo", store_logo);

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
      if (!alert("Successfully Updated Store Profile!")) {
        window.location.reload();
      }
      // set the values back to "" on the registration form
      document.getElementById("register-store_name").value = ""
      document.getElementById("register-email").value = ""
      document.getElementById("register-address1").value = ""
      document.getElementById("register-address2").value = ""
      document.getElementById("register-county").value = ""
      document.getElementById("register-eircode").value = ""
      document.getElementById("register-storelogo").value = ""
    })
    // if there is an error, alert the user
    .catch((error) => {
      alert("Error in updating store profile! - Please retry.\n\n")
    });
  }
}

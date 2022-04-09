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

  function selectElement(id, valueToSelect) {
    let element = document.getElementById(id);
    element.value = valueToSelect;
    }
  function loadStoreProfile() {
      let backendServerURL = backendServer();
      if (sessionStorage.getItem("owned_store") === null) {
          storenumber = "5"
      } else {
          storenumber = sessionStorage.getItem("owned_store")
      }
      let djangoServer_User = backendServerURL + "stores/" + storenumber

      let token = sessionStorage.getItem('access').toString()

      var obj = {
          method: 'GET',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Origin': '',
              'Authorization': 'Bearer ' + token
          },
      }
      fetch(djangoServer_User, obj)
          .then(response => response.json()) // extract the json from the response you get from the server
          .then(async (data) => {
              document.getElementById("register-store_name").value = data.name
              document.getElementById("register-email").value= data.email
              document.getElementById("register-address1").value = data.address_line1
              document.getElementById("register-address2").value = data.address_line2
              selectElement('inputState', data.county)
              document.getElementById("register-eircode").value = data.eir_code
              document.getElementById("formFile").value = null
          })
  }

  function updateStoreProfile(event) {
  // always prevent default events when using javascript
  event.preventDefault(); // always prevent default events when using javascript
  let name = document.getElementById("register-store_name").value.trim()
  let email = document.getElementById("register-email").value.trim();
  let address_line1 = document.getElementById("register-address1").value.trim()
  let address_line2 = document.getElementById("register-address2").value.trim();
  let county = document.getElementById("inputState").value
  let eircode = document.getElementById("register-eircode").value.trim();

  // prevent "" value in inputs
  //if (basket_limit == "" || parseFloat(basket_limit) <= 0 || isNaN(basket_limit) == true) {
  //  alert("Basket Item Limit cannot be null or 0. Full numbers only please, no decimals!");
  //} else if (value_limit == "" || parseFloat(value_limit) <= 0 || isNaN(basket_limit) == true) {
  //  alert("Basket value Limit cannot be null. Full numbers only please, no decimals!");
  //} else if (publishable_key == "") {
  //  alert("Publishable POS Key cannot be null");
 // } else {
  let token = sessionStorage.getItem('access').toString()
  //console.log('New Store Settings (Read from input boxes):', 'basket limit', basket_limit, "value limit", value_limit, "publishable key", publishable_key, "secret key", secret_key)

  // create API url
  let backendServerURL = backendServer() // get backend server URL
  let djangoServer = backendServerURL + "store_profile/"
  let store_image = document.getElementById("formFile").files[0];
  // Create form data
  var formData1 = new FormData();
  formData1.append("name", name);
  formData1.append("email", email);
  formData1.append("address_line1", address_line1);
  formData1.append("address_line2", address_line2);
  formData1.append("county", county);
  formData1.append("eir_code", eircode);

  if (document.getElementById("formFile").files.length !== 0) {
      formData1.append("storelogo_image", store_image)
  }

  // create request obj
  var requestObject;
  requestObject = {
      body: formData1,
      accept: '*/*',
      method: 'POST',
      headers: {
          'Authorization': 'Bearer ' + token
    },

  };

  // do api call
  fetch(djangoServer, requestObject)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        // throw a error if the response is not 200
        throw new Error('Something went wrong updating store settings. Please check your details before submitting and try again');
      }
    }) // extract the json from the response you get from the server
    .then(data => {
      //console.log(data);
      // alert the user that their account is created and reload the page
      if (!alert("Successfully updated store profile!")) {
        window.location.reload();
      }
    })
    // if there is an error, alert the user
    .catch((error) => {
      alert("Something went wrong updating store settings. Please check your details before submitting and try again")
    });
  }

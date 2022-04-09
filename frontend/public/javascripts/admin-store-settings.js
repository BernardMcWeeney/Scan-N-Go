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
  function LoadStoreSettings() {
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
          document.getElementById("register-BasketItem-limit").value =  data.Store_Basket_Item_limit
          document.getElementById("register-BasketValue-limit").value =  data.Store_Basket_Value_limit
          document.getElementById("register-API_Publishable_key").value =  data.POS_API_Publishable_Key
          document.getElementById("register-API_Secret_Key").value =  ""
      })
}


function updateStoreSettings(event) {
  // always prevent default events when using javascript
  event.preventDefault(); // always prevent default events when using javascript
  let basket_limit = document.getElementById("register-BasketItem-limit").value
  let value_limit = document.getElementById("register-BasketValue-limit").value.trim();
  let publishable_key = document.getElementById("register-API_Publishable_key").value.trim();
  let secret_key = document.getElementById("register-API_Secret_Key").value.trim();

  // prevent "" value in inputs
  if (basket_limit == "" || parseFloat(basket_limit) <= 0 || isNaN(basket_limit) == true) {
    alert("Basket Item Limit cannot be null or 0. Full numbers only please, no decimals!");
  } else if (value_limit == "" || parseFloat(value_limit) <= 0 || isNaN(basket_limit) == true) {
    alert("Basket value Limit cannot be null. Full numbers only please, no decimals!");
  } else if (publishable_key == "") {
    alert("Publishable POS Key cannot be null");
  } else {
      let token = sessionStorage.getItem('access').toString()
      console.log('New Store Settings (Read from input boxes):', 'basket limit', basket_limit, "value limit", value_limit, "publishable key", publishable_key, "secret key", secret_key)

      // create API url
      let backendServerURL = backendServer() // get backend server URL
      let djangoServer = backendServerURL + "store_settings/"

      // Create form data
      var formData1 = new FormData();
      formData1.append("Store_Basket_Item_limit", basket_limit);
      formData1.append("Store_Basket_Value_limit", value_limit);
      formData1.append("POS_API_Publishable_Key", publishable_key);
      console.log(secret_key)
      if (secret_key.length !== 0) {
          formData1.append("POS_API_Secret_Key", secret_key);
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
          if (!alert("Successfully updated store settings!")) {
            window.location.reload();
          }
        })
        // if there is an error, alert the user
        .catch((error) => {
          alert("Something went wrong updating store settings. Please check your details before submitting and try again")
        });
      }
}
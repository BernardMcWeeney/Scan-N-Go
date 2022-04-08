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
          storenumber = "3"
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
              document.getElementById("register-BasketItem-limit").setAttribute("value", data.Store_Basket_Item_limit);
              document.getElementById("register-BasketValue-limit").setAttribute("value", data.Store_Basket_Value_limit);
              document.getElementById("register-API_Publishable_key").setAttribute("value", data.POS_API_Publishable_Key);
          })
  }
  LoadStoreSettings()
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

function setUserStore(storeID) {
    let backendServerURL = backendServer()
    let djangoServer = backendServerURL + "set_store/"
    let token = sessionStorage.getItem('access').toString()
    //console.log("Access Token from sessionStorage: ", token)
    var requestObject = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Origin': '',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            'last_store': storeID.toString()
        })
    }
    fetch(djangoServer, requestObject)
        .then(response => response.json()) // extract the json from the response you get from the server
        .then(data => {
            //console.log(data);
            //alert("Set store to store ID: "+ storeID.toString());
            sessionStorage.setItem("storeID", parseInt(storeID.toString()));
        })
      .then(data => {
        window.location.href = "/";
      })
    };
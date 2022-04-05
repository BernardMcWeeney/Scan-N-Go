function backendServer() { // get the backend server URL
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

// load the preview qty into the basket icon in the nav bar
function loadBasketPreview() {
  let backendServerURL = backendServer()
  let djangoServer = backendServerURL + "baskets/"
  let token = sessionStorage.getItem('access').toString()

  var obj = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Origin': '',
      'Authorization': 'Bearer ' + token
    },}

  //console.log("sending data to ",djangoServer)
  fetch(djangoServer, obj)
    .then(response => response.json()) // extract the json from the response you get from the server
    .then(data => {
      //console.log("data for basket", data[0].items.length)
      document.getElementById('lblCartCount').innerHTML = data[0].items.length // add the value to the icon
    })
}

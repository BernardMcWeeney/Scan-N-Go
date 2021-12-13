function backendServer() {
  const domain = window.location.hostname.toString();
  console.log("Domain: ", domain)
  if (domain == "scanngo-frontend-app.azurewebsites.net") {
    var backendServerURL = "https://scanngo-backend-app.azurewebsites.net/";
  }
  else if ( (domain == "127.0.0.1") || (domain == "localhost") || (domain == "0.0.0.0") ) {
    var backendServerURL = "http://127.0.0.1:8000/";
    }
  else {
    alert("ERROR: Cannot determine Backend Server (Django) URL");
    }

  console.log('Backend Server URL', backendServerURL)
  return backendServerURL
}


function GetUserOrder() {
    let backendServerURL = backendServer()
    let djangoServer = backendServerURL + "orders/"
    let token = sessionStorage.getItem('access').toString()

    var obj = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': '',
        'Host': 'api.producthunt.com',
        'Authorization': 'Bearer ' + token
      },}

    console.log("sending data to ",djangoServer)
    fetch(djangoServer, obj)
      .then(response => response.json()) // extract the json from the response you get from the server
      .then(data => {

          let UserOrderData = data;
          console.log(UserOrderData)
          for (var i = 0; i < UserOrderData.length; i++) {
              console.log(UserOrderData[i])
          }
      })

}

    GetUserOrder()
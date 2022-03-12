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

function GetStoreData() {
      let backendServerURL = backendServer();

      let djangoServer_User = backendServerURL + "stores/2"

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
      let StoreUserData_Dict = {};
      fetch(djangoServer_User, obj)
          .then(response => response.json()) // extract the json from the response you get from the server
          .then(async (data) => {
              console.log(data)
              //document.getElementById("test").innerHTML= data.users[0].username
              for (var i = 0; i < data.users.length; i++) {
                  console.log(data.users[i].username);
                  var currentTime = new Date().getTime();
                  var minutes = 30;
                  var timeLimit = new Date(currentTime -minutes*60000).getTime();
                  var userScanInTime = new Date(data.users[i].store_login).getTime();

                  if(userScanInTime <= currentTime && userScanInTime >= timeLimit) {
                      console.log(data.users[i].email)
                      StoreUserData_Dict[i] = data.users[i]
                  }

              }
              console.log(StoreUserData_Dict)

              document.getElementById("test").innerHTML= ("Number of users in Store: " + Object.keys(StoreUserData_Dict).length);



          })
  }
  //var timer = setInterval(GetStoreData, 9000);
  GetStoreData()

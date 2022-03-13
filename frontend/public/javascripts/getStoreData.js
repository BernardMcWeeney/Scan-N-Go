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
      let StoreUser_Dict = {};
      let StoreUserOrder_Dict = {};
      let StoreUserBasket_Dict = {};
      fetch(djangoServer_User, obj)
          .then(response => response.json()) // extract the json from the response you get from the server
          .then(async (data) => {
              console.log(data)

              // Gets all users in store that have scanned in between now and 35mins ago
              for (var i = 0; i < data.users.length; i++) {
                  console.log(data.users[i].username);
                  var currentTime = new Date().getTime();
                  var minutes = 3500;
                  var timeLimit = new Date(currentTime -minutes*60000).getTime();
                  var userScanInTime = new Date(data.users[i].store_login).getTime();

                  if(userScanInTime <= currentTime && userScanInTime >= timeLimit) {
                      //console.log(data.users[i].email)
                      StoreUser_Dict[data.users[i].id] = data.users[i]
                  }

              }

              for (var j = 0; j < data.baskets.length; j++) {

                  if(data.baskets[j].user_id_num in StoreUser_Dict && data.baskets[j].is_active === true ) {
                          StoreUserBasket_Dict[j] = data.baskets[j]

                      }
              }

              for (var l = 0; l < data.orders.length; l++) {

                  if(data.orders[l].user_id_num in StoreUser_Dict ) {
                          StoreUserOrder_Dict[l] = data.orders[l]

                      }
              }
              console.log(StoreUser_Dict)
              //console.log(StoreUser_Dict[19])
              console.log(StoreUserBasket_Dict)
              console.log(StoreUserOrder_Dict)

              document.getElementById("welcome-message").innerHTML= (data.name + " -  Admin DashBoard");
              document.getElementById("numberofuser").innerHTML= (Object.keys(StoreUser_Dict).length);
              document.getElementById("currenttime").innerHTML= (new Date().toLocaleTimeString());



          })
  }
  //var timer = setInterval(GetStoreData, 9000);
  GetStoreData()

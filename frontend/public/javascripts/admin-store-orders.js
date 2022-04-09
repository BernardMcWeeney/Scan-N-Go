
  function LoadCharts(chartoption) {
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
      let yValues = [50]
      fetch(djangoServer_User, obj)
          .then(response => response.json()) // extract the json from the response you get from the server
          .then(async (data) => {

          })
      return yValues
  }
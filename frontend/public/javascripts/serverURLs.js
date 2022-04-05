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
      alert(domain.hostname);
      alert(domain.hostname);
alert("ERROR: Cannot determine Backend Server (Django) URL");
    }
    //console.log("domain ", domain)
    //console.log('Backend Server URL', backendServerURL)
    return backendServerURL
  }

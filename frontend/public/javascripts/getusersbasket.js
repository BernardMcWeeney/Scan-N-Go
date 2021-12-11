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

function GetUserBasket() {
    let backendServerURL = backendServer()
    let djangoServer = backendServerURL + "baskets/"
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
      console.log(data)
      console.log(data[0]['items'])
      let bernsData = data[0]['items']
      for (var i = 0; i < bernsData.length; i++) { // for every product in the basket array
          console.log(bernsData)
          let prodcarticle = document.createElement("article");
          prodcarticle.className = "card card-body mb-3 prodcarticle";
          let preprodcarticle = document.getElementsByClassName("productdata");
          preprodcarticle[0].appendChild((prodcarticle));

          let prodcol = document.createElement("div");
          prodcol.className = "row align-items-center prodcol";
          let preprodcol = document.getElementsByClassName("prodcarticle");
          preprodcol[i].appendChild((prodcol));

          let prodcol1 = document.createElement("div");
          prodcol1.className = "col-md-6 prodcol1";
          let preprodcol1 = document.getElementsByClassName("prodcol");
          preprodcol1[i].appendChild((prodcol1));

          let figurediv = document.createElement("figure");
          figurediv.className = "itemside  productfigure";
          let prefigurediv = document.getElementsByClassName("prodcol1");
          prefigurediv[i].appendChild((figurediv));

          let imagediv = document.createElement("div");
          imagediv.className = "aside imagediv";
          let preimagediv = document.getElementsByClassName("productfigure");
          preimagediv[i].appendChild((imagediv));

          let cardimage = document.createElement('img');
          cardimage.className = "border img-sm productimage";
          cardimage.setAttribute("height","80");
          cardimage.setAttribute("width", "80");
          cardimage.setAttribute("src", backendServer() + "media/" + bernsData[i].product_image);
          console.log(backendServer() + "media/" + bernsData[i].product_image)
          cardimage.setAttribute("alt", "Product Image");
          cardimage.setAttribute("id", "productimage");
          let precardimage = document.getElementsByClassName("imagediv");
          precardimage[i].appendChild(cardimage);

          let figcaptiondiv = document.createElement("figcaption");
          figcaptiondiv.className = "info productinfo";
          let prefigcaptiondiv = document.getElementsByClassName("imagediv");
          prefigcaptiondiv[i].appendChild((figcaptiondiv));

          let preprodname = document.getElementsByClassName("productinfo");
          let prodname = document.createElement("p");
          prodname.className = "title text-dark producttitle";
          prodname.setAttribute("id", "productname");
          prodname.appendChild(document.createTextNode(data[i].name));
          preprodname[i].appendChild(prodname);

          let proddtag = document.createElement("span");
          proddtag.className = "text-muted small producttag";
          proddtag.setAttribute("id", "producttag");
          proddtag.appendChild(document.createTextNode("data[i].tag"));
          preprodname[i].appendChild(proddtag);

          let prodcol2 = document.createElement("div");
          prodcol2.className = "col prodcol2";
          let preprodcol2 = document.getElementsByClassName("prodcol");
          preprodcol2[i].appendChild((prodcol2));

          let qtydiv = document.createElement("div");
          qtydiv.className = "input-group input-spinner qtydiv";
          let preqtydiv = document.getElementsByClassName("prodcol2");
          preqtydiv[i].appendChild(qtydiv);

          let preinputdiv = document.getElementsByClassName("qtydiv");
          let inputdiv = document.createElement("div");
          inputdiv.className = "input-group-prepend inputdiv";
          preinputdiv[i].appendChild(inputdiv);

          let buttonplusdiv = document.createElement("button");
          buttonplusdiv.className = "btn btn-light buttonplusdiv";
          buttonplusdiv.setAttribute("id", "button-plus");
          buttonplusdiv.setAttribute("type", "button");
          let prebuttonplusdiv = document.getElementsByClassName("inputdiv");
          prebuttonplusdiv[i].appendChild(buttonplusdiv);

          let butplusdivi = document.createElement("i");
          butplusdivi.className = "fa fa-minus butplusdivi";
          let prebutplusdivi = document.getElementsByClassName("buttonplusdiv");
          prebutplusdivi[i].appendChild(butplusdivi);

          let qtyinputdiv = document.createElement("div");
          qtyinputdiv.className = "input-group-prepend qtyinputdiv";
          preinputdiv[i].appendChild(qtyinputdiv);

          let inputdiv1 = document.createElement("div");
          inputdiv1.className = "input-group-append inputdiv1";
          preinputdiv[i].appendChild(inputdiv1);

          let buttonminusdiv = document.createElement("button");
          buttonminusdiv.className = "btn btn-light buttonminusdiv";
          buttonminusdiv.setAttribute("id", "button-minus");
          buttonminusdiv.setAttribute("type", "button");
          let prebuttonminusdiv = document.getElementsByClassName("inputdiv");
          prebuttonminusdiv[i].appendChild(buttonminusdiv);

          let butminusdivi = document.createElement("i");
          butminusdivi.className = "fa fa-m butminusdivi";
          let prebutminusdivi = document.getElementsByClassName("buttonplusdiv");
          prebutminusdivi[i].appendChild(butminusdivi);

          let prodcol3 = document.createElement("div");
          prodcol3.className = "col prodcol3";
          let preprodcol3 = document.getElementsByClassName("prodcol");
          preprodcol3[i].appendChild((prodcol3));

          let pricewrap = document.createElement("div");
          pricewrap.className = "price-wrap pricewrap";
          let prepricewrap = document.getElementsByClassName("prodcol3");
          prepricewrap[i].appendChild((pricewrap));

          let subpricespan = document.createElement("span");
          subpricespan.className = "price h5 productprice";
          subpricespan.appendChild(document.createTextNode(data[i].price));
          let prepricewrapdiv = document.getElementsByClassName("subwrapdiv");
          prepricewrapdiv[i].appendChild(subpricespan);





      }
      } );
}

GetUserBasket()


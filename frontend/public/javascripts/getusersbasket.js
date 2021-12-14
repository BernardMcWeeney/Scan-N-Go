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

function UserWelcome() {
  var username = sessionStorage.getItem('username')
  document.getElementById("user-welcome-message").innerHTML = "Welcome to your Basket, " + username + "!"
}
window.onload = function() {
  UserWelcome();
};

function removefromcart(id,QTY) {
    let backendServerURL = backendServer()
    let djangoServer = backendServerURL + "remove/"
    let token = sessionStorage.getItem('access').toString()
    console.log("Access Token from sessionStorage: ", token)
    var obj12 = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Origin': '',
            'Host': 'api.producthunt.com',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            'product_id': id.toString(),
            'quantity' : QTY
        })
    }
    fetch(djangoServer, obj12)
        .then(response => response.json()) // extract the json from the response you get from the server
        .then(data => {
            console.log(data);
            alert("Removed Product From Cart");
        })
      .then(data => {
        window.location.href = "/basket";
      })
    };



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

      let UserCartData = data[0]['items'];
      let grandtotal = 0;
      console.log(UserCartData)
      for (var i = 0; i < UserCartData.length; i++) { // for every product in the basket array

          grandtotal = grandtotal + (UserCartData[i].product_price * UserCartData[i].quantity)
          console.log(UserCartData[i]);
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
          cardimage.setAttribute("src", backendServer() + "media/" + UserCartData[i].product_image);
          cardimage.setAttribute("alt", "Product Image");
          cardimage.setAttribute("id", "productimage");
          let anchor1 = document.createElement("a")
          anchor1.setAttribute("href", "/product/" + UserCartData[i].product_id_num)
          anchor1.appendChild(cardimage)
          anchor1.className = 'text-dark'
          let precardimage = document.getElementsByClassName("imagediv");
          precardimage[i].appendChild(anchor1);

          let figcaptiondiv = document.createElement("figcaption");
          figcaptiondiv.className = "info productinfo";
          let prefigcaptiondiv = document.getElementsByClassName("imagediv");
          prefigcaptiondiv[i].appendChild((figcaptiondiv));

          let preprodname = document.getElementsByClassName("productinfo");
          let prodname = document.createElement("p");
          prodname.className = "title text-dark producttitle";
          prodname.setAttribute("id", "productname");
          let anchor = document.createElement("a")
          anchor.setAttribute("href", "/product/" + UserCartData[i].product_id_num)
          anchor.innerHTML = UserCartData[i].product_name
          anchor.className = 'text-dark'
          prodname.appendChild(anchor);
          preprodname[i].appendChild(prodname);

          let proddtag = document.createElement("span");
          proddtag.className = "tag text-muted small producttag";
          proddtag.setAttribute("id", "producttag");
          proddtag.appendChild(document.createTextNode(UserCartData[i].product_tag));
          preprodname[i].appendChild(proddtag);

          let prodcol2 = document.createElement("div");
          prodcol2.className = "col prodcol2";
          let preprodcol2 = document.getElementsByClassName("prodcol");
          preprodcol2[i].appendChild((prodcol2));

          let prodQTY = document.createElement("p");
          prodQTY.className = "title text-dark prodQTY";
          prodQTY.id = UserCartData[i].product_id_num + "-qty-selector";
          prodQTY.appendChild(document.createTextNode("Quantity: " + UserCartData[i].quantity));
          let preprodQTY = document.getElementsByClassName("prodcol2");
          preprodQTY[i].appendChild(prodQTY);

          let prodcol3 = document.createElement("div");
          prodcol3.className = "col prodcol3";
          let preprodcol3 = document.getElementsByClassName("prodcol");
          preprodcol3[i].appendChild((prodcol3));

          let pricewrap = document.createElement("div");
          pricewrap.className = "price-wrap pricewrap";
          let prepricewrap = document.getElementsByClassName("prodcol3");
          prepricewrap[i].appendChild((pricewrap));

          let priceP = document.createElement("p");
          priceP.className = "price totalproductprice";
          priceP.appendChild(document.createTextNode("€"+ (UserCartData[i].product_price * UserCartData[i].quantity).toFixed(2)));
          let prepriceP = document.getElementsByClassName("pricewrap");
          prepriceP[i].appendChild(priceP);

          let subprice = document.createElement("small");
          subprice.className = "text-muted productprice";
          subprice.appendChild(document.createTextNode("€"+ UserCartData[i].product_price + " each"));
          prepriceP[i].appendChild(subprice);

          let prodcol4 = document.createElement("div");
          prodcol4.className = "col flex-grow-0 text-right prodcol4";
          let preprodcol4 = document.getElementsByClassName("prodcol");
          preprodcol4[i].appendChild((prodcol4));

          let remfromcart = document.createElement("a");
          var ProdID = "removefromcart(" + UserCartData[i].product_id_num.toString() + "," + UserCartData[i].quantity + ")"
          remfromcart.setAttribute('onclick', ProdID )
          remfromcart.id = UserCartData[i].product_id_num.toString() +"-remove-from-cart";
          remfromcart.className = "btn btn-primary removeproductbutton";
          let preremovefromcart = document.getElementsByClassName("prodcol4");
          preremovefromcart[i].appendChild(remfromcart);
          let removefromcarti = document.createElement("i");
          removefromcarti.className = "fas fa-shopping-cart productshoppingcart";
          removefromcarti.appendChild(document.createTextNode("Remove"));
          let preremovefromcarti = document.getElementsByClassName("removeproductbutton");
          preremovefromcarti[i].appendChild(removefromcarti);

          let checkoutcartbtn = document.getElementById("checkoutbtnconfirm");
          var BasketID = "checkoutcart(" + UserCartData[0].basket_id_num.toString() + ")"
          checkoutcartbtn.setAttribute('onclick', BasketID )
          document.getElementById("basket-items-payment-container").setAttribute('style','')
          document.getElementById("user-welcome-message-small").innerHTML = "Here is your basket with all your selected products! You can remove a product from your basket or alternatively checkout your basket from this page"
      }

      console.log(grandtotal);
      document.getElementById("grandpricetotal").innerHTML = grandtotal.toFixed(2);
      } );
}
GetUserBasket()


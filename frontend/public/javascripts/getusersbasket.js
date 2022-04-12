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

function UserWelcome() { // create personalised user welcome and add it to the user basket header
  var username = sessionStorage.getItem('username')
  fetch(backendServer() + "api_users", {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('access')
          }})
          .then(response => response.json())
          .then(data =>  {
              console.log(data)
                if (data === []) {
                    document.getElementById("user-welcome-message").innerHTML = "Welcome to your Basket, " + username + "!"
                } else {
                    document.getElementById("user-welcome-message").innerHTML = "Welcome to your Basket, " + data[0]['first_name'] + "!"
                }
          })

}
window.onload = function() {
  UserWelcome();
};

// remove item from cart (qty is specified as a parameter)
function removefromcart(id,QTY) {
    let backendServerURL = backendServer()
    let djangoServer = backendServerURL + "remove/"
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
            'product_id': id.toString(),
            'quantity' : QTY
        })
    }
    fetch(djangoServer, requestObject)
        .then(response => response.json()) // extract the json from the response you get from the server
        .then(data => {
            //console.log(data);
            alert("Removed Product From Cart");
        })
      .then(data => {
        window.location.href = "/basket";
      })
    };

// update item in cart (qty is specified as a parameter)
function updateqty(id,option,currentqty, availableqty) {
    let backendServerURL = backendServer()
    let djangoServer = backendServerURL
    let token = sessionStorage.getItem('access').toString()
    //console.log("Access Token from sessionStorage: ", token)


    if (currentqty >= availableqty && option === 1) {
        alert("Sorry! We only have " + availableqty + " available in stock\nPlease choose a smaller quantity to add to your basket")
        return
    }
        if (option === 0) {
                djangoServer = djangoServer + "remove/"
            }
        if (option === 1) {
            djangoServer = djangoServer + "add/"

        }
        var requestObject = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Origin': '',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                'product_id': id.toString(),
                'quantity': 1
            })
        }
        fetch(djangoServer, requestObject)
            .then(response => response.json()) // extract the json from the response you get from the server
            .then(data => {
                console.log(data);
            })
            .then(data => {
                window.location.href = "/basket";
            })
}

// get a users basket and basket items
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
        'Authorization': 'Bearer ' + token
      },}

    //console.log("sending data to ",djangoServer)
    fetch(djangoServer, obj)
      .then(response => response.json()) // extract the json from the response you get from the server
      .then(data => {

      let UserCartData = data[0]['items'];
      let grandtotal = 0;
      console.log(UserCartData)
      // for basket item in basket show the basket item on the basket page
      for (var i = 0; i < UserCartData.length; i++) { // for every product in the basket array

          grandtotal = grandtotal + (UserCartData[i].product_price * UserCartData[i].quantity)
          console.log(UserCartData[i].product_price);
          let prodcarticle = document.createElement("article");
          prodcarticle.className = "card card-body mb-3 prodcarticle";
          let preprodcarticle = document.getElementsByClassName("productdata");
          preprodcarticle[0].appendChild((prodcarticle));

          let prodcol = document.createElement("div");
          prodcol.className = "row gy-3 align-items-center prodcol";
          let preprodcol = document.getElementsByClassName("prodcarticle");
          preprodcol[i].appendChild((prodcol));

          let prodcol1 = document.createElement("div");
          prodcol1.className = "col-md-6 prodcol1";
          let preprodcol1 = document.getElementsByClassName("prodcol");
          preprodcol1[i].appendChild((prodcol1));

          let figurediv = document.createElement("figure");
          figurediv.className = "itemside align-items-center  productfigure";
          let prefigurediv = document.getElementsByClassName("prodcol1");
          prefigurediv[i].appendChild((figurediv));

          let imagediv = document.createElement("div");
          imagediv.className = "aside imagediv";
          let preimagediv = document.getElementsByClassName("productfigure");
          preimagediv[i].appendChild((imagediv));

          let cardimage = document.createElement('img');
          cardimage.className = "border img-sm img-thumbnail productimage";
          cardimage.setAttribute("height","80");
          cardimage.setAttribute("width", "80");
          cardimage.setAttribute("src", backendServer() + "media/" + UserCartData[i].product_image);
          cardimage.setAttribute("alt", "Product Image");
          cardimage.setAttribute("id", "productimage");
          let precardimage = document.getElementsByClassName("imagediv");
          precardimage[i].appendChild(cardimage);

          let figcaptiondiv = document.createElement("div");
          figcaptiondiv.className = "info productinfo";
          let prefigcaptiondiv = document.getElementsByClassName("productfigure");
          prefigcaptiondiv[i].appendChild((figcaptiondiv));

          let preprodname = document.getElementsByClassName("productinfo");
          let prodname = document.createElement("p");
          prodname.className = "title text-dark producttitle";
          prodname.setAttribute("id", "productname");
          prodname.innerHTML = UserCartData[i].product_name
          prodname.className = 'text-dark'
          preprodname[i].appendChild(prodname);

          let subprice = document.createElement("small");
          subprice.className = "text-muted productsubprice productprice";
          subprice.appendChild(document.createTextNode("€"+ (UserCartData[i].product_price).toFixed(2) + " each"));
          preprodname[i].appendChild(subprice);

          let proddtag = document.createElement("span");
          proddtag.className = "tag text-muted small producttag";
          proddtag.setAttribute("id", "producttag");
          proddtag.appendChild(document.createTextNode(UserCartData[i].product_tag));
          preprodname[i].appendChild(proddtag);

          let prodinputgroup = document.createElement("div");
          prodinputgroup.className = "input-group input-spinner prodinputgroup";
          let preprodinputgroup = document.getElementsByClassName("prodcol");
          preprodinputgroup[i].appendChild((prodinputgroup));

          let buttonminus = document.createElement("a");
          var minusprod = "updateqty(" + UserCartData[i].product_id_num.toString() + "," + "0" + "," + UserCartData[i].quantity.toString() + "," + UserCartData[i].available_product_qty.toString() + ")"
          buttonminus.setAttribute('onclick', minusprod )
          buttonminus.id = UserCartData[i].product_id_num.toString() +"-minus-from-cart";
          buttonminus.className = "btn btn-light buttonminus";
          let prebuttonminus = document.getElementsByClassName("prodinputgroup");
          prebuttonminus[i].appendChild((buttonminus));
          let minusbuttonicon = document.createElement("i");
          minusbuttonicon.className = "fa fa-minus minusbuttonicon";
          let preminusbuttonicon = document.getElementsByClassName("buttonminus");
          preminusbuttonicon[i].appendChild(minusbuttonicon);

          let prodqtyinput = document.createElement("input");
          prodqtyinput.className = "form-control prodqtyinput";
          prodqtyinput.setAttribute("type", "text" )
          prodqtyinput.setAttribute("value", UserCartData[i].quantity)
          let preprodqtyinput = document.getElementsByClassName("prodinputgroup");
          preprodqtyinput[i].appendChild((prodqtyinput));

          let buttonplus = document.createElement("a");
          var plusprod = "updateqty(" + UserCartData[i].product_id_num.toString() + "," + "1"+"," + UserCartData[i].quantity.toString() + "," + UserCartData[i].available_product_qty.toString() + ")"
          buttonplus.setAttribute('onclick', plusprod )
          buttonplus.id = UserCartData[i].product_id_num.toString() +"-plus-from-cart";
          buttonplus.className = "btn btn-light buttonplus";
          let prebuttonplus = document.getElementsByClassName("prodinputgroup");
          prebuttonplus[i].appendChild((buttonplus));
          let plusbuttonicon = document.createElement("i");
          plusbuttonicon.className = "fa fa-plus plusbuttonicon";
          let preplusbuttonicon = document.getElementsByClassName("buttonplus");
          preplusbuttonicon[i].appendChild(plusbuttonicon);

          let prodcol3 = document.createElement("div");
          prodcol3.className = "col prodcol3";
          let preprodcol3 = document.getElementsByClassName("prodcol");
          preprodcol3[i].appendChild((prodcol3));

          let priceP = document.createElement("h5");
          priceP.className = "price totalproductprice";
          priceP.appendChild(document.createTextNode("€"+ (UserCartData[i].product_price * UserCartData[i].quantity).toFixed(2)));
          let prepriceP = document.getElementsByClassName("prodcol3");
          prepriceP[i].appendChild(priceP);

          let prodcol4 = document.createElement("div");
          prodcol4.className = "col flex-grow-0 text-right prodcol4";
          let preprodcol4 = document.getElementsByClassName("prodcol");
          preprodcol4[i].appendChild((prodcol4));

          let remfromcart = document.createElement("a");
          var ProdID = "removefromcart(" + UserCartData[i].product_id_num.toString() + "," + UserCartData[i].quantity + ")"
          remfromcart.setAttribute('onclick', ProdID )
          remfromcart.id = UserCartData[i].product_id_num.toString() +"-remove-from-cart";
          remfromcart.className = "btn btn-light removeproductbutton";
          let preremovefromcart = document.getElementsByClassName("prodcol4");
          preremovefromcart[i].appendChild(remfromcart);
          let removefromcarti = document.createElement("i");
          removefromcarti.className = "fa fa-trash productshoppingcart";
          let preremovefromcarti = document.getElementsByClassName("removeproductbutton");
          preremovefromcarti[i].appendChild(removefromcarti);

          let checkoutcartbtn = document.getElementById("checkoutbtnconfirm");
          var BasketID = "checkoutcart(" + UserCartData[0].basket_id_num.toString() + ")"
          checkoutcartbtn.setAttribute('onclick', BasketID )
          document.getElementById("basket-items-payment-container").setAttribute('style','')
          document.getElementById("user-welcome-message-small").innerHTML = "Use this page to edit your basket of checkout"

          let applebtn = document.getElementById("applebtn");
          applebtn.setAttribute('onclick', BasketID )
          document.getElementById("basket-items-payment-container").setAttribute('style','')
          document.getElementById("user-welcome-message-small").innerHTML = "Use this page to edit your basket of checkout"

          let googlebtn = document.getElementById("googlebtn");
          googlebtn.setAttribute('onclick', BasketID )
          document.getElementById("basket-items-payment-container").setAttribute('style','')
          document.getElementById("user-welcome-message-small").innerHTML = "Use this page to edit your basket of checkout"
      }

      //console.log(grandtotal);
      document.getElementById("grandpricetotal").innerHTML = "€" + grandtotal.toFixed(2);
      } );
}
GetUserBasket()


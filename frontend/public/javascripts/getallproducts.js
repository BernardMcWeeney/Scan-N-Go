function backendServer() { // get backend URL
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

// add item to cart with ID (qty 1)
function addToCartFromID(id) {
    //console.log(id + "-qty-selector")
    let quantity = document.getElementById(id + "-qty-selector").value;
    let backendServerURL = backendServer()
    let djangoServer = backendServerURL + "add/"
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
        'quantity' : quantity
      })
    }
    //console.log("Sending:", requestObject)
    //console.log("to", djangoServer)

    fetch(djangoServer, requestObject)
      .then(response => response.json()) // extract the json from the response you get from the server
      .then(data => {
        //console.log(data);
        window.location.reload()
      }).then(alert("Added Product to Cart"))
  }

// get all products from product DB that contains searchterm
function GetAllProducts(searchterm) {
    let backendServerURL = backendServer()
    let djangoServer = backendServerURL + "products/"
    if (searchterm !== "") {
      var djangoServerURL = backendServerURL + "products/?product_name=" + searchterm
    } else {
      var djangoServerURL = djangoServer
    }
    //console.log("sending data to ",djangoServer)
    fetch(djangoServerURL)
      .then(response => response.json()) // extract the json from the response you get from the server
      .then(data => {
      //console.log(data)
      // for product in product list add the product to the results page
      for (var i = 0; i < data.length; i++) {

          let prodcol = document.createElement("div");
          prodcol.className = "card-product-list prodcol";
          let preprodcol = document.getElementsByClassName("productdata");
          preprodcol[0].appendChild((prodcol));

          let figurediv = document.createElement("figure");
          figurediv.className = "card card-product-grid card-lg  productfigure";
          let prefigurediv = document.getElementsByClassName("prodcol");
          prefigurediv[i].appendChild((figurediv));

          let anchor1 = document.createElement("a")
          anchor1.setAttribute("href", "/product/" + data[i].id)

          let cardimage = document.createElement('img');
          cardimage.className = "rounded mx-auto d-block productimage";
          cardimage.setAttribute("height","200");
          cardimage.setAttribute("width", "200");
          cardimage.setAttribute("src", data[i].productImage);
          cardimage.setAttribute("alt", "Product Image");
          cardimage.setAttribute("id", "productimage");
          let precardimage = document.getElementsByClassName("productfigure");
          anchor1.appendChild(cardimage)
          precardimage[i].appendChild(anchor1);

          let figcaptiondiv = document.createElement("figcaption");
          figcaptiondiv.className = "info-wrap productinfo";
          let prefigcaptiondiv = document.getElementsByClassName("productfigure");
          prefigcaptiondiv[i].appendChild((figcaptiondiv));

          let preprodname = document.getElementsByClassName("productinfo");
          let prodname = document.createElement("p");
          prodname.className = "title producttitle";
          prodname.setAttribute("id", "productname");
          let anchor = document.createElement("a")
          anchor.setAttribute("href", "/product/" + data[i].id)
          anchor.innerHTML = data[i].name
          anchor.className = 'text-dark'
          prodname.appendChild(anchor);

          preprodname[i].appendChild(prodname);

          let proddtag = document.createElement("span");
          proddtag.className = "tag producttag";
          proddtag.setAttribute("id", "producttag");
          proddtag.appendChild(document.createTextNode(data[i].product_tag));
          preprodname[i].appendChild(proddtag);


          var currentTabs = document.getElementsByClassName("btn btn-light");
          //console.log(currentTabs)
          // check is product's tag is in filter pane, if it is not there, add it
          let isTagged = false

          for (var counter = 0; counter < currentTabs.length; counter++) {
              //console.log('i', counter);
              if (currentTabs[counter].innerHTML === data[i].product_tag) {
                isTagged = true;
              };
          }

          if (isTagged == false) {
            let tagsPane = document.getElementById("product-tags-filter-pane");
            let tag = document.createElement("label");

            proddtag.className = "btn btn-light";
            let checkbox = document.createElement("input");
            checkbox.setAttribute("value", data[i].product_tag)
            checkbox.type = "checkbox"
            checkbox.className = "tag-checkbox"
            let spanner = document.createElement("span");
            spanner.className = "btn btn-light";
            spanner.style = "margin-left:8px;"
            spanner.innerHTML = data[i].product_tag
            tag.appendChild(checkbox)
            tag.appendChild(spanner)
            tagsPane.appendChild(tag)
        }



          let pricediv = document.createElement("div");
          pricediv.className = "bottom-wrap d-flex align-items-center productwrapdiv";
          prefigcaptiondiv[i].appendChild(pricediv);

          let subpricediv = document.createElement("div");
          subpricediv.className = "mr-3 subwrapdiv";
          let presubpricediv = document.getElementsByClassName("productwrapdiv");
          presubpricediv[i].appendChild(subpricediv);

          let subpricespan = document.createElement("span");
          subpricespan.className = "price h5 productprice";
          subpricespan.appendChild(document.createTextNode("€"+data[i].price));
          let prepricewrapdiv = document.getElementsByClassName("subwrapdiv");
          prepricewrapdiv[i].appendChild(subpricespan);

          let brele = document.createElement("br");
          prepricewrapdiv[i].appendChild(brele);

          let availabilitystatus = document.createElement("small");
          availabilitystatus.className = "text-success product-availability-status";

          // if product is out of stock, then mark it out of stock on the product tile
          if (data[i].product_quantity > 0){
              availabilitystatus.className = "text-success productinstock";
              availabilitystatus.appendChild(document.createTextNode("In Stock"));
          } else{
              availabilitystatus.className = "text-danger productoutstock";
              availabilitystatus.appendChild(document.createTextNode("Out of Stock"));
          }
          prepricewrapdiv[i].appendChild(availabilitystatus);

          let subquantdiv = document.createElement("div");
          subquantdiv.className = "ml-auto form-inline subquantdiv";
          let presubquantdiv = document.getElementsByClassName("productwrapdiv");
          presubquantdiv[i].appendChild(subquantdiv);

          let prodquantity = document.createElement("select");
          prodquantity.id = data[i].id + "-qty-selector";
          prodquantity.className = "form-control mr-2 productbottomwrap";
          let preprodquantity = document.getElementsByClassName("subquantdiv");
          preprodquantity[i].appendChild(prodquantity);

          let prodquantityoption = document.createElement("option");
          prodquantityoption.className = "quantity-option productquantity";

          // set product dropdown to max product stock
          for (var quantity = 1; quantity <= data[i].product_quantity; quantity++) {
              let prodquantityoption = document.createElement("option");
              prodquantityoption.setAttribute("value", quantity);
              prodquantityoption.appendChild(document.createTextNode(quantity));
              let preprodquantityoption = document.getElementsByClassName("productbottomwrap");
              preprodquantityoption[i].appendChild(prodquantityoption);
          }


          let addtocartlink = document.createElement("a");
          var ProdID = "addToCartFromID(" + data[i].id.toString() + ")"
          addtocartlink.setAttribute('onclick', ProdID )
          addtocartlink.id = "add-to-cart-a-link";
          addtocartlink.className = "btn btn-primary productbutton";
          let preaddtocart = document.getElementsByClassName("productwrapdiv");
          preaddtocart[i].appendChild(addtocartlink);
          let addtocarti = document.createElement("i");
          addtocarti.className = "fas fa-shopping-cart productshoppingcart";
          addtocarti.appendChild(document.createTextNode("Add to cart"));
          let preaddtocarti = document.getElementsByClassName("productbutton");
          preaddtocarti[i].appendChild(addtocarti);

          // if product is out of stock, remove add to cart functionality
          if (data[i].product_quantity == 0){
              document.getElementsByClassName("ml-auto form-inline subquantdiv")[i].style = "display:none"
             document.getElementsByClassName(" btn btn-primary productbutton")[i].style = "display:none"

          }

      }
      } );
}

GetAllProducts("")

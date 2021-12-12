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

function addToCart1(id) {
    console.log(id + "-qty-selector")
    let quantity = document.getElementById(id + "-qty-selector").value;
    let backendServerURL = backendServer()
    let djangoServer = backendServerURL + "add/"
    let token = sessionStorage.getItem('access').toString()
    console.log("Access Token from sessionStorage: ", token)
    var obj123 = {
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
        'quantity' : quantity
      })
    }

    fetch(djangoServer, obj123)
      .then(response => response.json()) // extract the json from the response you get from the server
      .then(data => {
        console.log(data);
        alert("Added Product to Cart");
      })
  }

function GetAllProducts(searchterm) {
    let backendServerURL = backendServer()
    let djangoServer = backendServerURL + "products/"
    if (searchterm !== "") {
      var djangoServerURL = backendServerURL + "products/?product_name=" + searchterm
    } else {
      var djangoServerURL = djangoServer
    }
    console.log("sending data to ",djangoServer)
    fetch(djangoServerURL)
      .then(response => response.json()) // extract the json from the response you get from the server
      .then(data => {
      console.log(data)
      for (var i = 0; i < data.length; i++) { // for every product in the array

          let prodcol = document.createElement("div");
          prodcol.className = "card-product-list prodcol";
          let preprodcol = document.getElementsByClassName("productdata");
          preprodcol[0].appendChild((prodcol));

          let figurediv = document.createElement("figure");
          figurediv.className = "card card-product-grid card-lg  productfigure";
          let prefigurediv = document.getElementsByClassName("prodcol");
          prefigurediv[i].appendChild((figurediv));

          let cardimage = document.createElement('img');
          cardimage.className = "rounded mx-auto d-block productimage";
          cardimage.setAttribute("height","200");
          cardimage.setAttribute("width", "200");
          cardimage.setAttribute("src", data[i].productImage);
          cardimage.setAttribute("alt", "Product Image");
          cardimage.setAttribute("id", "productimage");
          let precardimage = document.getElementsByClassName("productfigure");
          precardimage[i].appendChild(cardimage);

          let figcaptiondiv = document.createElement("figcaption");
          figcaptiondiv.className = "info-wrap productinfo";
          let prefigcaptiondiv = document.getElementsByClassName("productfigure");
          prefigcaptiondiv[i].appendChild((figcaptiondiv));

          let preprodname = document.getElementsByClassName("productinfo");
          let prodname = document.createElement("p");
          prodname.className = "title producttitle";
          prodname.setAttribute("id", "productname");
          prodname.appendChild(document.createTextNode(data[i].name));
          preprodname[i].appendChild(prodname);

          let proddtag = document.createElement("span");
          proddtag.className = "tag producttag";
          proddtag.setAttribute("id", "producttag");
          proddtag.appendChild(document.createTextNode(data[i].product_tag));
          preprodname[i].appendChild(proddtag);


          var currentTabs = document.getElementsByClassName("btn btn-light");
          console.log(currentTabs)

          let isTagged = false

          for (var counter = 0; counter < currentTabs.length; counter++) {
              console.log('i', counter);
              if (currentTabs[counter].innerHTML === data[i].product_tag) {
                isTagged = true;
              };
          }

          if (isTagged == false) {
            let tagsPane = document.getElementById("product-tags-filter-pane");
            let tag = document.createElement("label");
            proddtag.className = "btn btn-light";
            let checkbox = document.createElement("input");
            checkbox.type = "checkbox"
            let spanner = document.createElement("span");
            spanner.className = "btn btn-light";
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
          subpricespan.appendChild(document.createTextNode(data[i].price));
          let prepricewrapdiv = document.getElementsByClassName("subwrapdiv");
          prepricewrapdiv[i].appendChild(subpricespan);

          let brele = document.createElement("br");
          prepricewrapdiv[i].appendChild(brele);

          let availabilitystatus = document.createElement("small");
          availabilitystatus.className = "text-success product-availability-status";
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

          for (var quantity = 1; quantity <= data[i].product_quantity; quantity++) {
              let prodquantityoption = document.createElement("option");
              prodquantityoption.setAttribute("value", quantity);
              prodquantityoption.appendChild(document.createTextNode(quantity));
              let preprodquantityoption = document.getElementsByClassName("productbottomwrap");
              preprodquantityoption[i].appendChild(prodquantityoption);
          }

          let addtocartlink = document.createElement("a");
          var ProdID = "addToCart1(" + data[i].id.toString() + ")"
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

      }
      } );
}

GetAllProducts("")

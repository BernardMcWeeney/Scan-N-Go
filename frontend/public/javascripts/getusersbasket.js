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
    let djangoServer = backendServerURL + "products/"
    fetch(djangoServer)
      .then(response => response.json()) // extract the json from the response you get from the server
      .then(data => {
      console.log(data)
      for (var i = 0; i < data.length; i++) { // for every product in the array
          let figurediv = document.createElement("figure");
          figurediv.className = "card card-product-grid card-lg productfigure";
          let prefigurediv = document.getElementsByClassName("productcol");
          prefigurediv[0].appendChild((figurediv));

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

          let proddesc = document.createElement("p");
          proddesc.className = "text-muted productdescription";
          proddesc.setAttribute("id", "productdesc");
          proddesc.appendChild(document.createTextNode(data[i].description));
          preprodname[i].appendChild(proddesc);

          let proddtag = document.createElement("span");
          proddtag.className = "tag producttag";
          proddtag.setAttribute("id", "producttag");
          proddtag.appendChild(document.createTextNode("data[i].tag"));
          preprodname[i].appendChild(proddtag);

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

          let prodquantity = document.createElement("select");
          prodquantity.className = "form-control productbottomwrap";
          let preprodquantity = document.getElementsByClassName("productwrapdiv");
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
          let addtocart = document.createElement("a");
          addtocart.className = "btn btn-primary productbutton";
          addtocart.setAttribute("href", "#");
          let preaddtocart = document.getElementsByClassName("productwrapdiv");
          preaddtocart[i].appendChild(addtocart);

          let addtocartspan = document.createElement("span");
          addtocartspan.className = "text productaddtocart";
          addtocartspan.appendChild(document.createTextNode("Add to cart"));
          let preaddtocartspan = document.getElementsByClassName("productbutton");
          preaddtocartspan[i].appendChild(addtocartspan);

          let addtocarti = document.createElement("i");
          addtocarti.className = "fas fa-shopping-cart productshoppingcart";
          let preaddtocarti = document.getElementsByClassName("productbutton");
          preaddtocarti[i].appendChild(addtocarti);

      }
      } );
}

GetUserBasket()


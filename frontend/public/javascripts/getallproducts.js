function GetAllProducts() {
    let url = "http://127.0.0.1:8000/products/"
    fetch(url)
      .then(response => response.json()) // extract the json from the response you get from the server
      .then(data => {
      console.log(data)
      for (var i = 0; i < data.length; i++) { // for every product in the array

          let figurediv = document.createElement("figure");
          figurediv.className = "card card-product-grid card-lg";
          let prefigurediv = document.getElementsByClassName("col-md-3");
          prefigurediv[0].appendChild((figurediv));

          let cardimage = document.createElement('img');
          cardimage.className = "rounded mx-auto d-block";
          cardimage.setAttribute("height","200");
          cardimage.setAttribute("width", "200");
          cardimage.setAttribute("src", data[i].productImage);
          cardimage.setAttribute("alt", "Product Image");
          cardimage.setAttribute("id", "productimage");
          let precardimage = document.getElementsByClassName("card card-product-grid card-lg");
          precardimage[i].appendChild(cardimage);

          let figcaptiondiv = document.createElement("figcaption");
          figcaptiondiv.className = "info-wrap";
          let prefigcaptiondiv = document.getElementsByClassName("card card-product-grid card-lg");
          prefigcaptiondiv[i].appendChild((figcaptiondiv));

          let preprodname = document.getElementsByClassName("info-wrap");
          let prodname = document.createElement("p");
          prodname.className = "title";
          prodname.setAttribute("id", "productname");
          prodname.appendChild(document.createTextNode(data[i].name));
          preprodname[i].appendChild(prodname);

          let proddesc = document.createElement("p");
          proddesc.className = "text-muted";
          proddesc.setAttribute("id", "productdesc");
          proddesc.appendChild(document.createTextNode(data[i].description));
          preprodname[i].appendChild(proddesc);

          let proddtag = document.createElement("span");
          proddtag.className = "tag";
          proddtag.setAttribute("id", "producttag");
          proddtag.appendChild(document.createTextNode("data[i].tag"));
          preprodname[i].appendChild(proddtag);

          let pricediv = document.createElement("div");
          pricediv.className = "bottom-wrap d-flex align-items-center";
          prefigcaptiondiv[i].appendChild(pricediv);

          let subpricediv = document.createElement("div");
          subpricediv.className = "mr-3";
          let presubpricediv = document.getElementsByClassName("bottom-wrap d-flex align-items-center");
          presubpricediv[i].appendChild(subpricediv);

          let subpricespan = document.createElement("span");
          subpricespan.className = "price h5";
          subpricespan.appendChild(document.createTextNode(data[i].price));
          let prepricewrapdiv = document.getElementsByClassName("mr-3");
          prepricewrapdiv[i].appendChild(subpricespan);

          let brele = document.createElement("br");
          prepricewrapdiv[i].appendChild(brele);

          let availabilitystatus = document.createElement("small");
          availabilitystatus.className = "text-success";
          if (data[i].product_quantity > 0){
              availabilitystatus.className = "text-success";
              availabilitystatus.appendChild(document.createTextNode("In Stock"));
          } else{
              availabilitystatus.className = "text-danger";
              availabilitystatus.appendChild(document.createTextNode("Out of Stock"));
          }
          prepricewrapdiv[i].appendChild(availabilitystatus);

          let prodquantity = document.createElement("select");
          prodquantity.className = "form-control";
          let preprodquantity = document.getElementsByClassName("bottom-wrap d-flex align-items-center");
          preprodquantity[i].appendChild(prodquantity);

          let prodquantityoption = document.createElement("option");
          prodquantityoption.className = "quantity-option";
          for (var quantity = 1; quantity <= data[i].product_quantity; quantity++) {
              let prodquantityoption = document.createElement("option");
              prodquantityoption.className = "quantity-option";
              prodquantityoption.setAttribute("value", quantity);
              prodquantityoption.appendChild(document.createTextNode(quantity));
              let preprodquantityoption = document.getElementsByClassName("form-control");
              preprodquantityoption[i].appendChild(prodquantityoption);

          }



          let addtocart = document.createElement("a");
          addtocart.className = "btn btn-primary";
          let preaddtocart = document.getElementsByClassName("bottom-wrap d-flex align-items-center");
          preaddtocart[i].appendChild(addtocart);

          let addtocartspan = document.createElement("span");
          addtocartspan.className = "text";
          addtocartspan.appendChild(document.createTextNode("Add to cart"));
          let preaddtocartspan = document.getElementsByClassName("btn btn-primary");
          preaddtocartspan[i].appendChild(addtocartspan);

          let addtocarti = document.createElement("i");
          addtocarti.className = "fas fa-shopping-cart";
          let preaddtocarti = document.getElementsByClassName("btn btn-primary");
          preaddtocarti[i].appendChild(addtocarti);


          var h = document.createElement("H1"); // Create the H1 element
          var t = document.createTextNode(data[i].name); // Create a text element
          h.appendChild(t); // Append the text node to the H1 element
          document.body.appendChild(h); //  Append the H1 element to the document body

      }
      } );
}

GetAllProducts()


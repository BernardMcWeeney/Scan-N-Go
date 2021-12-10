function addToCart1(id) {
            url = "http://0.0.0.0:8000/add/"
            token = sessionStorage.getItem('access').toString()
            console.log(token)
            var obj = {
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
              })
            }

            fetch(url, obj)
              .then(response => response.json()) // extract the json from the response you get from the server
              .then(data => {
                console.log(data)
              })
          }

function GetAllProducts() {
    let url = "http://127.0.0.1:8000/products/"
    fetch(url)
      .then(response => response.json()) // extract the json from the response you get from the server
      .then(data => {
      console.log(data)
      for (var i = 0; i < data.length; i++) { // for every product in the array

          let prodcol = document.createElement("div");
          prodcol.className = "col-md-4 prodcol";
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

          let subquantdiv = document.createElement("div");
          subquantdiv.className = "ml-auto form-inline subquantdiv";
          let presubquantdiv = document.getElementsByClassName("productwrapdiv");
          presubquantdiv[i].appendChild(subquantdiv);

          let prodquantity = document.createElement("select");
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

GetAllProducts()

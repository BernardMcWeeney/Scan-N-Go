// get all products with the filter parameters given (tags, prices, searchterm)
function GetAllProductsFilter(tags, prices, searchterm)  {
    let queryString = "?product_name="
    queryString = queryString + searchterm + "&"
    queryString = queryString + "min_price=" + prices[0] + "&"
    queryString = queryString + "max_price=" + prices[1] + "&"
  //console.log('tags', tags)
    if (tags.length > 0) { queryString = queryString + 'tags=' + tags.join()}

    let backendServerURL = backendServer()
    let djangoServerURL = backendServerURL + "products" + queryString
    const productElements = document.getElementsByClassName("card-product-list prodcol");
      while(productElements.length > 0){
          productElements[0].parentNode.removeChild(productElements[0]);
    }
    //console.log("sending data to ",djangoServerURL)
    fetch(djangoServerURL)
      .then(response => response.json()) // extract the json from the response you get from the server
      .then(data => {
      //console.log(data)
      for (var i = 0; i < data.length; i++) { // for every product in the array

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

// scan the filters pane for selected values and call the GetAllProductsFilter function with these filters
function filter() {
  var searchTerm = document.getElementById('product-search-text-box').value
  var labels = document.getElementsByClassName('tag-checkbox')
  var value = ""
  var tagArray = []
  var priceArray = []
  for (let i = 0; i < labels.length; i++) {
    value = labels[i].value;
    if (labels[i].checked == true) {
      tagArray.push(value)
    }
  }
  //console.log("Tags to filter by: ",tagArray)

  var min_price = document.getElementById('min-price-input').value;
  var max_price = document.getElementById('max-price-input').value;
  if (min_price == "") {
    min_price = "0"
  }
  if (max_price == "") {
    max_price = "1000"
  }
  //console.log('min price is ', min_price)
  //console.log('max price is ', max_price)
  priceArray.push(min_price)
  priceArray.push(max_price)
  GetAllProductsFilter(tagArray, priceArray, searchTerm)
}

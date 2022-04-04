function backendServer() {
    url = window.location.href;
    let domain = (new URL(url));
    if (domain.hostname == "scanngo-frontend-app.azurewebsites.net") {
      var backendServerURL = "https://scanngo-backend-app.azurewebsites.net/";
    } else if ((domain.hostname == "127.0.0.1") || (domain.hostname == "localhost") || (domain.hostname == "0.0.0.0")) {
      var backendServerURL = "http://127.0.0.1:8000/";
    } else if (domain.hostname == "192.168.1.20") {
      var backendServerURL = "http://192.168.1.20:8000/";
    } else {
      alert("ERROR: Cannot determine Backend Server (Django) URL");
    }
    //console.log("domain ", domain)
    //console.log('Backend Server URL', backendServerURL)
    return backendServerURL
  }

// function to enable accordian, first should be open by default
function AccordianFunc(DivID) {
  var x = document.getElementById(DivID.id);

  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
  } else {
    x.className = x.className.replace(" w3-show", "");
  }
}

// function to get all orders for a particular user (logged in user)
function GetUserOrder() {
    let backendServerURL = backendServer()
    let djangoServer = backendServerURL + "orders/"
    let token = sessionStorage.getItem('access').toString()

    let djangoServer_User = backendServerURL + "api_users/"
    let djangoServer_BasketItems = backendServerURL + "basket_items/"

    var obj = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': '',
        'Authorization': 'Bearer ' + token
      },}
    var userdetails = []
    fetch(djangoServer_User, obj)
      .then(response => response.json()) // extract the json from the response you get from the server
      .then(async (data) => {
          let UserData = data;
          var detail = UserData[0]
          //appends username and user email to userdetails list to be used in receipt
          userdetails.push(detail.username)
          userdetails.push(detail.email)
    })

    //console.log("sending data to ",djangoServer)
    fetch(djangoServer, obj)
      .then(response => response.json()) // extract the json from the response you get from the server
      .then(async (data) => {

          let UserOrderData = data;
          console.log("log",UserOrderData)
            // for every order
          for (var i = 0; i < UserOrderData.length; i++) {
              console.log(UserOrderData[i]);

              let orderarticle = document.createElement("article");
              orderarticle.className = "card orderarticle";
              let preorderarticle = document.getElementsByClassName("OrderData");
              preorderarticle[0].appendChild((orderarticle));

              let cardheader = document.createElement("button");
              cardheader.className = "card-header cardheader accordion d-flex justify-content-between";
              var DivID = "AccordianFunc(ACC" + i+")";
              cardheader.setAttribute('onclick',DivID)
              let precardheader = document.getElementsByClassName("orderarticle");
              precardheader[i].appendChild((cardheader));

              let preheaderOrderID = document.getElementsByClassName("cardheader");
              let headerOrderID = document.createElement("strong");
              headerOrderID.className = "d-inline-block mr-3 headerOrderID";
              headerOrderID.appendChild(document.createTextNode("Order ID: " + UserOrderData[i].id));
              preheaderOrderID[i].appendChild((headerOrderID));

              let headerOrderDate = document.createElement("span");
              headerOrderDate.className = "d-inline-block mr-3 headerOrderDate";
              const orderdate = new Date(UserOrderData[i].date_ordered); // 1 for February
              const dateFormatter = new Intl.DateTimeFormat('en-IE');
              headerOrderDate.appendChild(document.createTextNode("Order Date: " + dateFormatter.format(orderdate)));
              preheaderOrderID[i].appendChild((headerOrderDate));

              let accordianBody = document.createElement("div");

              if (i == 0) {
                accordianBody.className = "accordianBody panel w3-show";

                let livereceiptpulse = document.createElement("div");
                livereceiptpulse.className = "circle pulse purple";
                let prelivereceiptpulse = document.getElementsByClassName("cardheader");
                prelivereceiptpulse[i].appendChild((livereceiptpulse));
                } else {
                  accordianBody.className = "accordianBody panel w3-hide";
                }
              accordianBody.setAttribute('id', 'ACC'+i)
              let preaccordianBody = document.getElementsByClassName("orderarticle");
              preaccordianBody[i].appendChild((accordianBody));

              let cardBody = document.createElement("div");
              cardBody.className = "card-body cardBody";
              let precardBody = document.getElementsByClassName("accordianBody");
              precardBody[i].appendChild((cardBody));

              let cardrow = document.createElement("div");
              cardrow.className = "row cardrow";
              let precardrow = document.getElementsByClassName("cardBody");
              precardrow[i].appendChild((cardrow));

              let precardrows = document.getElementsByClassName("cardrow");

              let locationrow = document.createElement("div");
              locationrow.className = "col-md-8 locationrow";
              precardrows[i].appendChild((locationrow));

              let timerow = document.createElement("div");
              timerow.className = "col-md-8 timerow";
              precardrows[i].appendChild((timerow));

              let contactrow = document.createElement("div");
              contactrow.className = "col-md-8 contactrow";
              precardrows[i].appendChild((contactrow));

              let paymentrow = document.createElement("div");
              paymentrow.className = "col-md-4 paymentrow";
              precardrows[i].appendChild((paymentrow));

              let locationtitle = document.createElement("h6");
              locationtitle.className = "text-muted locationtitle";
              locationtitle.appendChild(document.createTextNode("Location"));
              let prelocationtitle = document.getElementsByClassName("locationrow");
              prelocationtitle[i].appendChild((locationtitle));

              let prelocationinfo = document.getElementsByClassName("locationrow");
              let locationUser = document.createElement("h6");
              locationUser.className = "locationUser";
              locationUser.appendChild(document.createTextNode(userdetails[0]));
              prelocationinfo[i].appendChild((locationUser));

              let locationEmail = document.createElement("h6");
              locationEmail.className = "locationEmail";
              locationEmail.appendChild(document.createTextNode(userdetails[1]));
              prelocationinfo[i].appendChild((locationEmail));

              let locationseperator = document.createElement("hr");
              prelocationinfo[i].appendChild((locationseperator));

              let timetitle = document.createElement("h6");
              timetitle.className = "text-muted timetitle";
              timetitle.appendChild(document.createTextNode("When"));
              let pretimetitle = document.getElementsByClassName("timerow");
              pretimetitle[i].appendChild((timetitle));

              let locationTime = document.createElement("h6");
              locationTime.className = "locationTime";
              locationTime.appendChild(document.createTextNode(orderdate.toLocaleString()));
              pretimetitle[i].appendChild((locationTime));

              let timeseperator = document.createElement("hr");
              pretimetitle[i].appendChild((timeseperator));

              let contacttitle = document.createElement("h6");
              contacttitle.className = "text-muted contacttitle";
              contacttitle.appendChild(document.createTextNode("Contact"));
              let precontacttitle = document.getElementsByClassName("contactrow");
              precontacttitle[i].appendChild((contacttitle));

              let precontactinfo = document.getElementsByClassName("contactrow");
              let contactUser = document.createElement("h6");
              contactUser.className = "contactUser";
              contactUser.appendChild(document.createTextNode(userdetails[0]));
              precontactinfo[i].appendChild((contactUser));

              let contactEmail = document.createElement("h6");
              contactEmail.className = "contactEmail title";
              contactEmail.appendChild(document.createTextNode(userdetails[1]));
              precontactinfo[i].appendChild((contactEmail));

              let contactseperator = document.createElement("hr");
              precontactinfo[i].appendChild((contactseperator));

              let paymenttitle = document.createElement("h6");
              paymenttitle.className = "text-muted paymenttitle";
              paymenttitle.appendChild(document.createTextNode("Order Total"));
              let prepaymenttitle = document.getElementsByClassName("paymentrow");
              prepaymenttitle[i].appendChild((paymenttitle));

              let prepaymentinfo = document.getElementsByClassName("paymentrow");
              let paymentTotal = document.createElement("strong");
              paymentTotal.className = "paymentTotal grandpricetotal-"+UserOrderData[i].id;
              paymentTotal.appendChild(document.createTextNode("Total: €"));
              prepaymentinfo[i].appendChild((paymentTotal));

              let receipttable = document.createElement("div");
              receipttable.className = "table-responsive receipttable";
              let prereceipttable = document.getElementsByClassName("accordianBody");
              prereceipttable[i].appendChild((receipttable));

              let receiptTable = document.createElement("table");
              receiptTable.className = "table table-hover receiptTable";
              let prereceiptTable = document.getElementsByClassName("receipttable");
              prereceiptTable[i].appendChild((receiptTable));

              let Tablebody = document.createElement("tbody");
              Tablebody.className = "Tablebody-"+ UserOrderData[i].id;
              let preTablebody = document.getElementsByClassName("receiptTable");
              preTablebody[i].appendChild((Tablebody));

              await fetch(djangoServer_BasketItems, obj)
                  .then(BasketItems_response => BasketItems_response.json()) // extract the json from the response you get from the server
                  .then(basketdata => {
                      let UserBasketItemData = basketdata;
                      let grandtotal = 0
                    // for every basket item
                      for (var j = 0; j < UserBasketItemData.length; j++) {
                           if (UserBasketItemData[j].basket_id_num == UserOrderData[i].basket_id_num) {

                              let Tablebodyitem = document.createElement("tr");
                              Tablebodyitem.className = "Tablebodyitem-"+UserBasketItemData[j].id;
                              let preTablebodyitem = document.getElementsByClassName("Tablebody-"+ UserOrderData[i].id);
                              preTablebodyitem[0].appendChild((Tablebodyitem));

                              let preTableitem = document.getElementsByClassName("Tablebodyitem-"+UserBasketItemData[j].id);
                              let Tableimage = document.createElement("td");
                              Tableimage.className = "Tableimage-"+UserBasketItemData[j].id;
                              Tableimage.setAttribute("width", "65");
                              preTableitem[0].appendChild((Tableimage));

                              let productimage = document.createElement('img');
                              productimage.className = "img-xs border productimage-"+UserBasketItemData[j].id;
                              productimage.setAttribute("height","75");
                              productimage.setAttribute("width", "75");
                              productimage.setAttribute("src", backendServer() + "media/"+UserBasketItemData[j].product_image);
                              productimage.setAttribute("alt", "Product Image");
                              productimage.setAttribute("id", "productimage");
                              let preproductimage = document.getElementsByClassName("Tableimage-"+UserBasketItemData[j].id);
                              preproductimage[0].appendChild((productimage));

                              let TBprodinfo = document.createElement("td");
                              TBprodinfo.className = "TBprodinfo-"+UserBasketItemData[j].id;
                              preTableitem[0].appendChild((TBprodinfo));

                              let preprodname = document.getElementsByClassName("TBprodinfo-"+UserBasketItemData[j].id);
                              let prodname = document.createElement("h5");
                              prodname.className = "title prodname-"+UserBasketItemData[j].id;
                              prodname.appendChild(document.createTextNode(UserBasketItemData[j].product_name));
                              preprodname[0].appendChild((prodname));

                              let prodindvPrice = document.createElement("p");
                              prodindvPrice.className = "price text-muted prodindvPrice-"+UserBasketItemData[j].id;
                              prodindvPrice.appendChild(document.createTextNode("Price: €"+UserBasketItemData[j].product_price.toFixed(2)));
                              preprodname[0].appendChild((prodindvPrice));

                              let TBprodqty = document.createElement("p");
                              TBprodqty.className = "TBprodqty-"+UserBasketItemData[j].id;
                              preTableitem[0].appendChild((TBprodqty));

                              let prodqty = document.createElement("p");
                              prodqty.className = "price text-muted prodindvPrice-"+UserBasketItemData[j].id;
                              prodqty.appendChild(document.createTextNode("Quantity: "+UserBasketItemData[j].quantity));
                              preprodname[0].appendChild((prodqty));

                              let seperator = document.createElement("hr");
                              seperator.className = "seperator-"+UserBasketItemData[j].id;
                              preprodname[0].appendChild((seperator));

                              let prodtotalprice = document.createElement("p");
                              prodtotalprice.className = "title prodtotalprice-"+UserBasketItemData[j].id;
                              prodtotalprice.id = "prodtotalprice-"+UserBasketItemData[j].id;
                              prodtotalprice.appendChild(document.createTextNode("Total: €"+ (UserBasketItemData[j].product_price * UserBasketItemData[j].quantity).toFixed(2)));
                              preprodname[0].appendChild((prodtotalprice));

                              grandtotal = UserBasketItemData[j].product_price * UserBasketItemData[j].quantity + grandtotal
                           }
                      }
                      let pricetotal = document.getElementsByClassName("grandpricetotal-"+UserOrderData[i].id);

                      pricetotal[0].appendChild(document.createTextNode(grandtotal.toFixed(2)));
                  })

              }
          })
      }

GetUserOrder()

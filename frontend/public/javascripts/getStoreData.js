function backendServer() {
    url = window.location.href;
    let domain = (new URL(url));
    if (domain.hostname == "scanngo.ie") {
      var backendServerURL = "https://www.backend.scanngo.ie/";
    } else if (domain.hostname == "www.scanngo.ie") {
      var backendServerURL = "https://www.backend.scanngo.ie/";
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

function GetStoreData() {
      let backendServerURL = backendServer();
      if(sessionStorage.getItem("owned_store") === null ) {
          storenumber = "3"
      } else {
          storenumber = sessionStorage.getItem("owned_store")
      }
      let djangoServer_User = backendServerURL + "stores/" + storenumber

      let token = sessionStorage.getItem('access').toString()

      var obj = {
          method: 'GET',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Origin': '',
              'Authorization': 'Bearer ' + token
          },
      }
      let StoreUser_Dict = {};
      let StoreUser_List = [];
      let StoreUserBasket_List = [];
      let StoreDATA_Dict = {}
      fetch(djangoServer_User, obj)
          .then(response => response.json()) // extract the json from the response you get from the server
          .then(async (data) => {
              console.log(data)

              // Gets all users in store that have scanned in between now and 35mins ago
              for (var i = 0; i < data.users.length; i++) {
                  console.log(data.users[i].username);
                  var currentTime = new Date().getTime();
                  var minutes = 650000000; // valid minutes
                  var timeLimit = new Date(currentTime -minutes*60000).getTime();
                  var userScanInTime = new Date(data.users[i].store_login).getTime();

                  if(userScanInTime <= currentTime && userScanInTime >= timeLimit) {
                      //console.log(data.users[i].email)
                      StoreUser_Dict[data.users[i].id] = data.users[i]
                      StoreUser_List.push(data.users[i])
                  }

              }
                // gets valid users basket info
              for (var j = 0; j < data.baskets.length; j++) {

                  if(data.baskets[j].user_id_num in StoreUser_Dict && data.baskets[j].is_active === true ) {
                          StoreUserBasket_List.push(data.baskets[j])
                          StoreDATA_Dict[data.baskets[j].user_id_num] = data.baskets[j]

                      }
              }
              console.log(StoreUser_List)
              console.log(StoreUserBasket_List)
              console.log(StoreDATA_Dict)

               // auto clear dashboard before refresh
              function removeAllChildNodes(parent) {
                    while (parent.firstChild) {
                        parent.removeChild(parent.firstChild);
                    }
                }
              const container = document.querySelector('#userdatacard');
              removeAllChildNodes(container);

             // generate cards for users in store
              for (var usercount = 0; usercount < Object.keys(StoreDATA_Dict).length; usercount++) {

                 let userdatacardstart = document.getElementById("userdatacard");
                 let accordiondiv = document.createElement("div");
                 accordiondiv.id = "accordion"+usercount;
                 userdatacardstart.appendChild(accordiondiv);

                 let accordioncarddiv = document.createElement("div");
                 accordioncarddiv.className = "card";
                 accordioncarddiv.id = "accordioncarddiv"+usercount;
                 let preaccordioncarddiv = document.getElementById("accordion"+usercount);
                 preaccordioncarddiv.appendChild(accordioncarddiv);

                 let accordionheaderdiv = document.createElement("div");
                 accordionheaderdiv.className = "card-header";
                 accordionheaderdiv.id = "heading"+usercount;
                 let preaccordionheaderdiv = document.getElementById("accordioncarddiv"+usercount);
                 preaccordionheaderdiv.appendChild(accordionheaderdiv);

                 let accordionheaderh5 = document.createElement("h5");
                 accordionheaderh5.className = "mb-0";
                 accordionheaderh5.id = "accordionheaderh5"+usercount;
                 let preaccordionheaderh5 = document.getElementById("heading"+usercount);
                 preaccordionheaderh5.appendChild(accordionheaderh5);

                 let headerdiv = document.createElement("header");
                 headerdiv.className = "d-md-flex";
                 headerdiv.id = "headerdiv"+usercount;
                 let preheaderdiv = document.getElementById("accordionheaderh5"+usercount);
                 preheaderdiv.appendChild(headerdiv);

                 let flexdiv = document.createElement("div");
                 flexdiv.className = "flex-grow-1";
                 flexdiv.id = "flexdiv"+usercount;
                 let preflexdiv = document.getElementById("headerdiv"+usercount);
                 preflexdiv.appendChild(flexdiv);

                 let userprofilepic = document.createElement("img");
                 userprofilepic.style.borderRadius = "6px";
                 userprofilepic.className = "icon-md img-avatar";
                 userprofilepic.id = "userprofilepic"+usercount;
                 userprofilepic.setAttribute("height","80");
                 userprofilepic.setAttribute("width", "80");
                 userprofilepic.setAttribute("src", StoreUser_List[usercount].user_image);
                 let preuserprofilepic = document.getElementById("flexdiv"+usercount);
                 preuserprofilepic.appendChild(userprofilepic);

                 let userprofilepicname = document.createElement("span");

                 userprofilepicname.appendChild(document.createTextNode(StoreUser_List[usercount].first_name + " " + StoreUser_List[usercount].last_name + " (" + StoreUser_List[usercount].username + ")"));
                 preuserprofilepic.appendChild(userprofilepicname);

                 let expandbuttondiv = document.createElement("div");
                 expandbuttondiv.id = "expandbuttondiv"+usercount;
                 let preexpandbuttondiv = document.getElementById("headerdiv"+usercount);
                 preexpandbuttondiv.appendChild(expandbuttondiv);

                 let expandbuttonlink = document.createElement("a");
                 expandbuttonlink.id = "expandbuttondiv"+usercount;
                 expandbuttonlink.className = "btn btn-sm btn-primary";
                 expandbuttonlink.setAttribute("href","#");
                 expandbuttonlink.setAttribute("data-toggle","collapse");
                 expandbuttonlink.setAttribute("data-target","#collapse"+usercount);
                 expandbuttonlink.setAttribute("aria-expanded","true");
                 expandbuttonlink.setAttribute("aria-controls","#collapse"+usercount);
                 expandbuttonlink.appendChild(document.createTextNode("View Details"))
                 let preexpandbuttonlink = document.getElementById("expandbuttondiv"+usercount);
                 preexpandbuttonlink.appendChild(expandbuttonlink);

                 let accordiandetials = document.createElement("div");
                 accordiandetials.className = "collapse";
                 accordiandetials.id = "collapse"+usercount;
                 accordiandetials.setAttribute("data-parent","#accordion"+usercount);
                 accordiandetials.setAttribute("aria-labelledby","heading"+usercount);
                 preaccordionheaderdiv.appendChild(accordiandetials);

                 let accordiandetialsbody = document.createElement("div");
                 accordiandetialsbody.id = "accordiandetialsbody"+usercount;
                 accordiandetialsbody.className = "card-body";
                 let preaccordiandetialsbody = document.getElementById("collapse"+usercount);
                 preaccordiandetialsbody.appendChild(accordiandetialsbody);

                 let accordianbodyrow = document.createElement("div");
                 accordianbodyrow.id = "accordianbodyrow"+usercount;
                 accordianbodyrow.className = "row";
                 let preaccordianbodyrow = document.getElementById("accordiandetialsbody"+usercount);
                 preaccordianbodyrow.appendChild(accordianbodyrow);

                 let accordianuserinfodiv = document.createElement("div");
                 accordianuserinfodiv.id = "accordianuserinfodiv"+usercount;
                 accordianuserinfodiv.className = "col-md-8";
                 let preaccordianuserinfodiv = document.getElementById("accordianbodyrow"+usercount);
                 preaccordianuserinfodiv.appendChild(accordianuserinfodiv);

                 let userinfoh6 = document.createElement("h6");
                 userinfoh6.id = "userinfoh6"+usercount;
                 userinfoh6.className = "text-muted";
                 userinfoh6.appendChild(document.createTextNode("Details"));
                 let preuserinfoh6 = document.getElementById("accordianuserinfodiv"+usercount);
                 preuserinfoh6.appendChild(userinfoh6);

                 let userinfoName = document.createElement("p");
                 userinfoName.setAttribute("style","margin:0px");
                 userinfoName.appendChild(document.createTextNode(StoreUser_List[usercount].username));
                 preuserinfoh6.appendChild(userinfoName);

                 let userinfoPhone = document.createElement("p");
                 userinfoPhone.setAttribute("style","margin:0px");
                 userinfoPhone.appendChild(document.createTextNode("Phone: " + StoreUser_List[usercount].username));
                 preuserinfoh6.appendChild(userinfoPhone);

                 let userinfoEmail = document.createElement("p");
                 userinfoEmail.setAttribute("style","margin:0px");
                 userinfoEmail.appendChild(document.createTextNode("Email: " + StoreUser_List[usercount].email));
                 preuserinfoh6.appendChild(userinfoEmail);

                 let userinfoLocation = document.createElement("p");
                 userinfoLocation.setAttribute("style","margin:0px");
                 userinfoLocation.appendChild(document.createTextNode("Location: " + StoreUser_List[usercount].email));
                 preuserinfoh6.appendChild(userinfoLocation);

                 let accordianuserpaymentdiv = document.createElement("div");
                 accordianuserpaymentdiv.style.display = 'none';
                 accordianuserpaymentdiv.id = "accordianuserpaymentdiv"+usercount;
                 accordianuserpaymentdiv.className = "col-md-4";
                 preaccordianuserinfodiv.appendChild(accordianuserpaymentdiv);

                 let userpaymenth6 = document.createElement("h6");
                 userpaymenth6.id = "userpaymenth6"+usercount;
                 userpaymenth6.className = "text-muted";
                 userpaymenth6.appendChild(document.createTextNode("Payment"));
                 let preuserpaymenth6 = document.getElementById("accordianuserpaymentdiv"+usercount);
                 preuserpaymenth6.appendChild(userpaymenth6);

                 let usercardinfo = document.createElement("span");
                 usercardinfo.className = "text-success";
                 usercardinfo.setAttribute("style","margin:0px");
                 usercardinfo.appendChild(document.createTextNode("Visa **** 4216"));
                 preuserpaymenth6.appendChild(usercardinfo);

                 let usersubtotalinfo= document.createElement("p");
                 usersubtotalinfo.setAttribute("style","margin:0px");
                 usersubtotalinfo.appendChild(document.createTextNode("Subtotal: $356"));
                 preuserpaymenth6.appendChild(usersubtotalinfo);

                 let usertotalinfo = document.createElement("span");
                 usertotalinfo.className = "b";
                 usertotalinfo.setAttribute("style","margin:0px");
                 usertotalinfo.appendChild(document.createTextNode("Total: $456"));
                 preuserpaymenth6.appendChild(usertotalinfo);

                 //Information for users stats

                 // To Be Done


                 // user stats - 4 card group div
                  // card 1
                 let articlecardgroup = document.createElement("article");
                 articlecardgroup.style.display = "none";
                 articlecardgroup.id = "articlecardgroup"+usercount;
                 articlecardgroup.className = "card-group card-stat";
                 let prearticlecardgroup = document.getElementById("accordiandetialsbody"+usercount);
                 prearticlecardgroup.appendChild(articlecardgroup);

                 let articlefigure = document.createElement("figure");
                 articlefigure.id = "articlefigure"+usercount;
                 articlefigure.className = "card";
                 let prearticlefigure = document.getElementById("articlecardgroup"+usercount);
                 prearticlefigure.appendChild(articlefigure);

                 let figurediv = document.createElement("div");
                 figurediv.id = "figurediv"+usercount;
                 figurediv.className = "p-3";
                 let prefigurediv = document.getElementById("articlefigure"+usercount);
                 prefigurediv.appendChild(figurediv);

                 let figuretitle = document.createElement("h4");
                 figuretitle.id = "figuretitle"+usercount;
                 figuretitle.className = "title";
                 figuretitle.appendChild(document.createTextNode("40"));
                 let prefiguretitle = document.getElementById("figurediv"+usercount);
                 prefiguretitle.appendChild(figuretitle);

                 let figuretitleA = document.createElement("span");
                 figuretitleA.id = "figuretitleA"+usercount;
                 figuretitleA.className = "title";
                 figuretitleA.appendChild(document.createTextNode("Total User Orders"));
                 prefiguretitle.appendChild(figuretitleA);

                 //card 2
                 let articlefigure1 = document.createElement("figure");
                 articlefigure1.id = "articlefigure1"+usercount;
                 articlefigure1.className = "card";
                 let prearticlefigure1 = document.getElementById("articlecardgroup"+usercount);
                 prearticlefigure1.appendChild(articlefigure1);

                 let figurediv1 = document.createElement("div");
                 figurediv1.id = "figurediv1"+usercount;
                 figurediv1.className = "p-3";
                 let prefigurediv1 = document.getElementById("articlefigure1"+usercount);
                 prefigurediv1.appendChild(figurediv1);

                 let figuretitle1 = document.createElement("h4");
                 figuretitle1.id = "figuretitle1"+usercount;
                 figuretitle1.className = "title";
                 figuretitle1.appendChild(document.createTextNode("40"));
                 let prefiguretitle1 = document.getElementById("figurediv1"+usercount);
                 prefiguretitle1.appendChild(figuretitle1);

                 let figuretitleA1 = document.createElement("span");
                 figuretitleA1.id = "figuretitleA1"+usercount;
                 figuretitleA1.className = "title";
                 figuretitleA1.appendChild(document.createTextNode("Total Basket Items"));
                 prefiguretitle1.appendChild(figuretitleA1);

                 //card 3
                 let articlefigure2 = document.createElement("figure");
                 articlefigure2.id = "articlefigure2"+usercount;
                 articlefigure2.className = "card";
                 let prearticlefigure2 = document.getElementById("articlecardgroup"+usercount);
                 prearticlefigure2.appendChild(articlefigure2);

                 let figurediv2 = document.createElement("div");
                 figurediv2.id = "figurediv2"+usercount;
                 figurediv2.className = "p-3";
                 let prefigurediv2 = document.getElementById("articlefigure2"+usercount);
                 prefigurediv2.appendChild(figurediv2);

                 let figuretitle2 = document.createElement("h4");
                 figuretitle2.id = "figuretitle2"+usercount;
                 figuretitle2.className = "title";
                 figuretitle2.appendChild(document.createTextNode("40"));
                 let prefiguretitle2 = document.getElementById("figurediv2"+usercount);
                 prefiguretitle2.appendChild(figuretitle2);

                 let figuretitleA2 = document.createElement("span");
                 figuretitleA2.id = "figuretitleA2"+usercount;
                 figuretitleA2.className = "title";
                 figuretitleA2.appendChild(document.createTextNode("Total Basket Price"));
                 prefiguretitle2.appendChild(figuretitleA2);

                 //card 4
                 let articlefigure3 = document.createElement("figure");
                 articlefigure3.id = "articlefigure3"+usercount;
                 articlefigure3.className = "card";
                 let prearticlefigure3 = document.getElementById("articlecardgroup"+usercount);
                 prearticlefigure3.appendChild(articlefigure3);

                 let figurediv3 = document.createElement("div");
                 figurediv3.id = "figurediv3"+usercount;
                 figurediv3.className = "p-3";
                 let prefigurediv3 = document.getElementById("articlefigure3"+usercount);
                 prefigurediv3.appendChild(figurediv3);

                 let figuretitle3 = document.createElement("h4");
                 figuretitle3.id = "figuretitle3"+usercount;
                 figuretitle3.className = "title";
                 figuretitle3.appendChild(document.createTextNode("40"));
                 let prefiguretitle3 = document.getElementById("figurediv3"+usercount);
                 prefiguretitle3.appendChild(figuretitle3);

                 let figuretitleA3 = document.createElement("span");
                 figuretitleA3.id = "figuretitleA3"+usercount;
                 figuretitleA3.className = "title";
                 figuretitleA3.appendChild(document.createTextNode("Status"));
                 prefiguretitle3.appendChild(figuretitleA3);


                 // current users basket items

                 let tablediv = document.createElement("div");
                 tablediv.id = "tablediv"+StoreUserBasket_List[usercount].id;
                 tablediv.className = "table-responsive";
                 let pretablediv = document.getElementById("accordiandetialsbody"+usercount);
                 pretablediv.appendChild(tablediv);

                 let basketitemtable = document.createElement("table");
                 basketitemtable.id = "basketitemtable"+StoreUserBasket_List[usercount].id;
                 basketitemtable.className = "table table-hover";
                 let prebasketitemtable = document.getElementById("tablediv"+StoreUserBasket_List[usercount].id);
                 prebasketitemtable.appendChild(basketitemtable);

                 let tablebody = document.createElement("tbody");
                 tablebody.id = "tablebody"+StoreUserBasket_List[usercount].id;
                 let pretablebody = document.getElementById("basketitemtable"+StoreUserBasket_List[usercount].id);
                 pretablebody.appendChild(tablebody);

                 // Get basket items and populate table

                 //console.log(StoreUser_List[usercount].id)
                 //console.log(StoreDATA_Dict[StoreUser_List[usercount].id])
                 //console.log(Object.keys(StoreDATA_Dict[StoreUser_List[usercount].id].items).length)

                 for (let userbasket = 0; userbasket < Object.keys(StoreDATA_Dict[StoreUser_List[usercount].id].items).length; userbasket++) {
                     console.log("GRAPE!")
                     console.log(StoreDATA_Dict[StoreUser_List[usercount].id].items[userbasket])
                     let basketitemdata = StoreDATA_Dict[StoreUser_List[usercount].id].items[userbasket]

                     let tableTR = document.createElement("tr");
                     tableTR.id = "tableTR" + userbasket + StoreUser_List[usercount].id;
                     tableTR.className = "itembasket" + StoreUserBasket_List[usercount].id
                     let pretableTR = document.getElementById("tablebody" + StoreUserBasket_List[usercount].id);
                     pretableTR.appendChild(tableTR);

                     let tableTDimg = document.createElement("td");
                     tableTDimg.id = "tableTDimg" + userbasket + StoreUser_List[usercount].id;
                     tableTDimg.setAttribute("width", "65");
                     let pretableTDimg = document.getElementById("tableTR" + userbasket + StoreUser_List[usercount].id);
                     pretableTDimg.appendChild(tableTDimg);

                     // display product image
                      let tableProdimage = document.createElement("img");
                      tableProdimage.id = "tableProdimage" + userbasket + usercount;
                      tableProdimage.className = "img-xs border";
                      tableProdimage.setAttribute("src", backendServer() + "media/" + basketitemdata.product_image);
                      tableProdimage.setAttribute("width", "60");
                      tableProdimage.setAttribute("height", "60");
                      let pretableProdimage = document.getElementById("tableTDimg" + userbasket + StoreUser_List[usercount].id);
                      pretableProdimage.appendChild(tableProdimage);

                      let tableTDTitle = document.createElement("td");
                      tableTDTitle.id = "tableTDTitle" + userbasket + StoreUser_List[usercount].id;
                      tableTDTitle.setAttribute("width", "250");
                      pretableTDimg.appendChild(tableTDTitle);

                      // display product title
                      let TitleforProdTitle = document.createElement("h6");
                      TitleforProdTitle.id = "TitleforProdTitle" + userbasket + StoreUser_List[usercount].id;
                      TitleforProdTitle.setAttribute("style", "margin:0px");
                      TitleforProdTitle.appendChild(document.createTextNode("Product"));
                      let preTitleforProdTitle = document.getElementById("tableTDTitle" + userbasket + StoreUser_List[usercount].id);
                      preTitleforProdTitle.appendChild(TitleforProdTitle);

                      let ProductTitle = document.createElement("p");
                      ProductTitle.id = "ProductTitle" + userbasket + StoreUser_List[usercount].id;
                      ProductTitle.className = "title mb-0";
                      ProductTitle.appendChild(document.createTextNode(basketitemdata.product_name));
                      let preProductTitle = document.getElementById("tableTDTitle" + userbasket + StoreUser_List[usercount].id);
                      preProductTitle.appendChild(ProductTitle);

                      let tableTDTag = document.createElement("td");
                      tableTDTag.setAttribute("width", "250");
                      tableTDTag.id = "tableTDTag" + userbasket + StoreUser_List[usercount].id;
                      pretableTDimg.appendChild(tableTDTag);

                      // display TAG
                      let TitleforTAG = document.createElement("h6");
                      TitleforTAG.id = "TitleforTAG" + userbasket + StoreUser_List[usercount].id;
                      TitleforTAG.setAttribute("style", "margin:0px");
                      TitleforTAG.appendChild(document.createTextNode("Tag"));
                      let preTitleforTAG = document.getElementById("tableTDTag" + userbasket + StoreUser_List[usercount].id);
                      preTitleforTAG.appendChild(TitleforTAG);

                      // display product tags
                      let ProductTag = document.createElement("p");
                      ProductTag.id = "ProductTag" + userbasket + StoreUser_List[usercount].id;
                      ProductTag.setAttribute("style", "margin:0px");
                      ProductTag.appendChild(document.createTextNode(basketitemdata.product_tag));
                      preTitleforTAG.appendChild(ProductTag);

                      // display PRICE
                      let tableTDPrice = document.createElement("td");
                      tableTDPrice.setAttribute("width", "250");
                      tableTDPrice.id = "tableTDPrice" + userbasket + StoreUser_List[usercount].id;
                      pretableTDimg.appendChild(tableTDPrice);

                      let TitleforPrice = document.createElement("h6");
                      TitleforPrice.id = "TitleforPrice" + userbasket + StoreUser_List[usercount].id;
                      TitleforPrice.setAttribute("style", "margin:0px");
                      TitleforPrice.appendChild(document.createTextNode("Price"));
                      let preTitleforPrice = document.getElementById("tableTDPrice" + userbasket + StoreUser_List[usercount].id);
                      preTitleforPrice.appendChild(TitleforPrice);

                      // display product price
                      let ProductPrice = document.createElement("p");
                      ProductPrice.id = "ProductPrice" + userbasket + StoreUser_List[usercount].id;
                      ProductPrice.className = "price text-muted";
                      ProductPrice.appendChild(document.createTextNode("€" + basketitemdata.product_price));
                      preTitleforPrice.appendChild(ProductPrice);

                      // display product Quantity
                      let tableTDQTY = document.createElement("td");
                      tableTDQTY.id = "tableTDQTY" + userbasket + StoreUser_List[usercount].id;
                      tableTDQTY.setAttribute("width", "260");
                      pretableTDimg.appendChild(tableTDQTY);

                      let titleProductQty = document.createElement("h6");
                      titleProductQty.id = "titleProductQty" + userbasket + StoreUser_List[usercount].id;
                      titleProductQty.appendChild(document.createTextNode("Quantity"));
                      let pretitleProductQty = document.getElementById("tableTDQTY" + userbasket + StoreUser_List[usercount].id);
                      pretitleProductQty.appendChild(titleProductQty);

                      let ProductQty = document.createElement("p");
                      ProductQty.id = "ProductQty" + userbasket + StoreUser_List[usercount].id;
                      ProductQty.appendChild(document.createTextNode(basketitemdata.quantity));
                      pretitleProductQty.appendChild(ProductQty);


                 }



              //Dashboard Useful info
              document.getElementById("ActiveUsers").innerHTML= (StoreUser_List.length);
              document.getElementById("CurrentTime").innerHTML= (new Date().toLocaleTimeString());

              let validbasketcount = 0
                  for (var validbasket = 0; validbasket < StoreUserBasket_List.length; validbasket++) {
                      if(StoreUserBasket_List[validbasket].items.length != 0) {
                          validbasketcount = validbasketcount + 1
                      }
                  }
              document.getElementById("EmptyBaskets").innerHTML= (StoreUser_List.length - validbasketcount);
              document.getElementById("InuseBaskets").innerHTML= (validbasketcount);








              }

          })
  }
  //var timer = setInterval(GetStoreData, 9000);
  GetStoreData()

function checkForUpdate() {
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

      fetch(djangoServer_User, obj)
          .then(response => response.json()) // extract the json from the response you get from the server
          .then(async (data) => {
              var oldBasketsInfo = JSON.parse(sessionStorage.getItem('baskets'))
              var oldUsersInfo = JSON.parse(sessionStorage.getItem('users'))
              var newBasketsInfo = data.baskets
              var newUsersInfo = data.users

              console.log('Old baskets info', JSON.stringify(oldBasketsInfo))
              console.log('New baskets info', JSON.stringify(newBasketsInfo))
              console.log('Old users info', oldUsersInfo)
              console.log('New users info', newUsersInfo)

              if (JSON.stringify(oldBasketsInfo) !== JSON.stringify(newBasketsInfo) || JSON.stringify(oldUsersInfo) !== JSON.stringify(newUsersInfo)) {
                  console.log('Change has been detected')
                  GetStoreData()
              } else {
                  console.log('Nothing has changed in the store')

              }
          })


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
      let StoreORDERDATA_Dict = {}
      fetch(djangoServer_User, obj)
          .then(response => response.json()) // extract the json from the response you get from the server
          .then(async (data) => {

              console.log(data)
              sessionStorage.setItem('users',JSON.stringify(data.users))
              sessionStorage.setItem('baskets',JSON.stringify(data.baskets))
              console.log('Users from session storage', JSON.parse(sessionStorage.getItem('users')))
              console.log('Baskets from session storage', JSON.parse(sessionStorage.getItem('baskets')))
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

              // gets valid users order info
              console.log(data.orders.length)
              for (var l = 0; l < data.orders.length; l++) {
                  if(data.orders[l].user_id_num in StoreUser_Dict) {
                      console.log(data.orders[l])
                      StoreORDERDATA_Dict[data.orders[l].user_id_num] = 0
                  }
              }
              for (var l = 0; l < data.orders.length; l++) {
                  if(data.orders[l].user_id_num in StoreUser_Dict) {
                      StoreORDERDATA_Dict[data.orders[l].user_id_num] = StoreORDERDATA_Dict[data.orders[l].user_id_num] +1
                  }
              }

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

                 let accordionheaderh5 = document.createElement("div");
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
                 flexdiv.className = "itemside align-items-center";
                 flexdiv.id = "flexdiv"+usercount;
                 let preflexdiv = document.getElementById("headerdiv"+usercount);
                 preflexdiv.appendChild(flexdiv);

                 let asideuserclass = document.createElement("div");
                 asideuserclass.className = "aside";
                 asideuserclass.id = "asideuserclass"+usercount;
                 let preasideuserclass = document.getElementById("flexdiv"+usercount);
                 preasideuserclass.appendChild(asideuserclass);

                 let userprofilepic = document.createElement("img");
                 userprofilepic.style.borderRadius = "6px";
                 userprofilepic.className = "icon-md img-avatar";
                 userprofilepic.id = "userprofilepic"+usercount;
                 userprofilepic.setAttribute("height","80");
                 userprofilepic.setAttribute("width", "80");
                 userprofilepic.setAttribute("src", StoreUser_List[usercount].user_image);
                 let preuserprofilepic = document.getElementById("asideuserclass"+usercount);
                 preuserprofilepic.appendChild(userprofilepic);

                 let userdetailssection = document.createElement("div");
                 userdetailssection.className = "d-flex justify-content-center";
                 userdetailssection.style = "margin-left: 20px";
                 userdetailssection.id = "userdetailssection"+usercount;
                 let preuserdetailssection = document.getElementById("flexdiv"+usercount);
                 preuserdetailssection.appendChild(userdetailssection);

                 let detailssectiondiv = document.createElement("div");
                 detailssectiondiv.className = "mb-3";
                 detailssectiondiv.id = "detailssectiondiv"+usercount;
                 let predetailssectiondiv = document.getElementById("userdetailssection"+usercount);
                 predetailssectiondiv.appendChild(detailssectiondiv);

                 let userdetaildiv = document.createElement("div");
                 userdetaildiv.className = "d-flex justify-content";
                 userdetaildiv.id = "userdetaildiv"+usercount;
                 let preuserdetaildiv = document.getElementById("detailssectiondiv"+usercount);
                 preuserdetaildiv.appendChild(userdetaildiv);

                 let userdetailname = document.createElement("span");
                 userdetailname.className = "title";
                 userdetailname.id = "userdetailname"+usercount;
                 userdetailname.appendChild(document.createTextNode("Name: "+ StoreUser_List[usercount].first_name + " " + StoreUser_List[usercount].last_name))
                 let preuserdetailname = document.getElementById("userdetaildiv"+usercount);
                 preuserdetailname.appendChild(userdetailname);

                 let userdetailemail = document.createElement("span");
                 userdetailemail.className = "title";
                 userdetailemail.id = "userdetailemail"+usercount;
                 userdetailemail.style = "margin-left: 40px";
                 userdetailemail.appendChild(document.createTextNode("Email: "+StoreUser_List[usercount].email))
                 preuserdetailname.appendChild(userdetailemail);

                 let userdetailusername = document.createElement("span");
                 userdetailusername.className = "title";
                 userdetailusername.id = "userdetailusername"+usercount;
                 userdetailusername.style = "margin-left: 40px";
                 userdetailusername.appendChild(document.createTextNode("Username: "+StoreUser_List[usercount].username))
                 preuserdetailname.appendChild(userdetailusername);

                 let sectiondivider = document.createElement("hr");
                 preuserdetaildiv.appendChild(sectiondivider);

                  // tag 1
                  console.log("tag" + usercount)
                  console.log(StoreDATA_Dict[StoreUser_List[usercount].id])
                 let tag1 = document.createElement("div");
                 tag1.className = "tag";
                 tag1.id = "tag1"+usercount;
                 preuserdetaildiv.appendChild(tag1);
                 let tagicon1 = document.createElement("i");
                 tagicon1.className = "me-2 text fa fa-shopping-basket";
                 tagicon1.id = "tagicon1"+usercount;
                 let pretagicon1 = document.getElementById("tag1"+usercount);
                 pretagicon1.appendChild(tagicon1);
                 let taginfo1 = document.createElement("span");
                 taginfo1.id = "taginfo1"+usercount;
                 taginfo1.appendChild(document.createTextNode("Items: " + StoreDATA_Dict[StoreUser_List[usercount].id].items.length))
                 pretagicon1.appendChild(taginfo1);

                    // tag 2
                 let tag2 = document.createElement("div");
                 tag2.className = "tag";
                 tag2.id = "tag2"+usercount;
                 preuserdetaildiv.appendChild(tag2);
                 let tagicon2 = document.createElement("i");
                 tagicon2.className = "me-2 text fa fa-money";
                 tagicon2.id = "tagicon2"+usercount;
                 let pretagicon2 = document.getElementById("tag2"+usercount);
                 pretagicon2.appendChild(tagicon2);
                 let taginfo2 = document.createElement("span");
                 taginfo2.id = "taginfo2"+usercount;
                 taginfo2.appendChild(document.createTextNode("Value: "+0))
                 pretagicon2.appendChild(taginfo2);


                // tag 3
                 let tag3 = document.createElement("div");
                 tag3.className = "tag";
                 tag3.id = "tag3"+usercount;
                 preuserdetaildiv.appendChild(tag3);
                 let tagicon3 = document.createElement("i");
                 tagicon3.className = "me-2 text fa fa-clock-o";
                 tagicon3.id = "tagicon3"+usercount;
                 let pretagicon3 = document.getElementById("tag3"+usercount);
                 pretagicon3.appendChild(tagicon3);
                 let taginfo3 = document.createElement("span");
                 taginfo3.id = "taginfo3"+usercount;
                 taginfo3.appendChild(document.createTextNode("Time: "+10))
                 pretagicon3.appendChild(taginfo3);


                     // tag 4
                 let tag4 = document.createElement("div");
                 tag4.className = "tag";
                 tag4.id = "tag4"+usercount;
                 preuserdetaildiv.appendChild(tag4);
                 let tagicon4 = document.createElement("i");
                 tagicon4.className = "me-2 text fa fa-archive";
                 tagicon4.id = "tagicon4"+usercount;
                 let pretagicon4 = document.getElementById("tag4"+usercount);
                 pretagicon4.appendChild(tagicon4);
                 let taginfo4 = document.createElement("span");
                 taginfo4.id = "taginfo4"+usercount;
                 taginfo4.appendChild(document.createTextNode("Orders: "+10))
                 pretagicon4.appendChild(taginfo4);


                 let expandbuttonlink = document.createElement("a");
                 expandbuttonlink.id = "expandbuttondiv"+usercount;
                 expandbuttonlink.className = "btn btn-sm btn-primary";
                 expandbuttonlink.style = "margin-left: 40px";
                 expandbuttonlink.setAttribute("href","#");
                 expandbuttonlink.setAttribute("data-toggle","collapse");
                 expandbuttonlink.setAttribute("data-target","#collapse"+usercount);
                 expandbuttonlink.setAttribute("aria-expanded","true");
                 expandbuttonlink.setAttribute("aria-controls","#collapse"+usercount);
                 expandbuttonlink.appendChild(document.createTextNode("View Basket"))
                 preuserdetaildiv.appendChild(expandbuttonlink);


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

                  let grandtotal = 0;
                 for (let userbasket = 0; userbasket < Object.keys(StoreDATA_Dict[StoreUser_List[usercount].id].items).length; userbasket++) {
                     //console.log("GRAPE!")
                     //console.log(StoreDATA_Dict[StoreUser_List[usercount].id].items[userbasket])
                     let basketitemdata = StoreDATA_Dict[StoreUser_List[usercount].id].items[userbasket]

                     grandtotal = grandtotal + (basketitemdata.product_price * basketitemdata.quantity)

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
              document.getElementById("taginfo2"+usercount).innerHTML= ("Value: "+ grandtotal.toFixed(2));

              let currenttime = new Date().getTime()
              let usertime = new Date(StoreUser_List[usercount].store_login).getTime()
              let usertimevalue = currenttime - usertime
                  if (new Date(usertimevalue).toISOString().substr(11, 8) >= "00:20:00"){
                    document.getElementById("taginfo3"+usercount).innerHTML= ("Time: "+ new Date(usertimevalue).toISOString().substr(11, 8));
                    document.getElementById("tag3"+usercount).style = "background-color: #bd2130"
                  } else {
                    document.getElementById("taginfo3"+usercount).innerHTML= ("Time: "+ new Date(usertimevalue).toISOString().substr(11, 8));
                  }

              let ordernumber = StoreORDERDATA_Dict[StoreUser_List[usercount].id]
              if (ordernumber === undefined){
                  document.getElementById("taginfo4"+usercount).innerHTML= ("Orders: 0!")
                  document.getElementById("tag4"+usercount).style = "background-color: #bd2130"
              }  else {
                  document.getElementById("taginfo4"+usercount).innerHTML= ("Orders: "+ StoreORDERDATA_Dict[StoreUser_List[usercount].id]);
              }

              }
          })
  }
  var timer = setInterval(checkForUpdate, 1000);
  GetStoreData()

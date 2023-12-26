
var data;
var party_Id;
async function loadInvoiceData(){
fillPartyData('selectParty');
}

loadInvoiceData();

async function fillPartyData(selectParty){
    const partyres = await fetch("https://localhost:44357/api/Parties");
    Partydata = await partyres.json();
   console.log(Partydata)

   for(let i=0;i<Partydata.length;i++){

    var html1=` <option value="${Partydata[i].id}">${Partydata[i].partyName}</option>`;
    document.getElementById(selectParty).insertAdjacentHTML("beforeend",html1)
   }
}

async function fillProductData(selectParty,selectProduct){
    var PartyId =Number(document.getElementById(selectParty).value);
    const res = await fetch(`https://localhost:44357/api/Parties/${PartyId}`);
    data = await res.json();
   console.log(data.partyName)

   const Assignres = await fetch("https://localhost:44357/api/AssignParties");
   var Assigndata = await Assignres.json();
 

  const Products = Assigndata.filter((element) => element.partyName==data.partyName);
  var productNames=[];
  var productId=[];
  for(let i=0;i<Products.length;i++){
    productNames.push(Products[i].productName)
  }
  console.log(productNames)

  const Productres = await fetch("https://localhost:44357/api/Products");
  var Productdata = await Productres.json();

  var filterProducts=[];
  for(let i=0;i<productNames.length;i++){

    filterProducts.push(Productdata.find((element) => element.productName==productNames[i]));

}
  for(let i=0;i<filterProducts.length;i++){
    productId.push(filterProducts[i].id)
  }
console.log(productId)
document.getElementById(selectProduct).innerHTML='';
var html2=` <option >select products</option>`;
    document.getElementById(selectProduct).insertAdjacentHTML("beforeend",html2)

   for(let i=0;i<productId.length;i++){

    var html1=` <option value="${productId[i]}">${productNames[i]}</option>`;
    document.getElementById(selectProduct).insertAdjacentHTML("beforeend",html1)
   }
}

async function fillRate(selectProduct,rate){
    var ProductId =Number(document.getElementById(selectProduct).value);
    console.log(ProductId)
    const res = await fetch(`https://localhost:44357/api/Products/${ProductId}`);
    data = await res.json();
   console.log(data)

    const ProductRatesres = await fetch(`https://localhost:44357/api/ProductRates`);
    var ProductRatedata = await ProductRatesres.json();
    var product = ProductRatedata.findLast((element) => element.productName == data.productName);

    document.getElementById(rate).value=product.rate;
}

function deleteProduct(id){

  id=Number(id)
    console.log(typeof id)
   
    fetch(`https://localhost:44357/api/invoices?partyId=${party_Id}&productId=${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }).then(req=>fillInvoiceProducts())
     
}

function createInvoice(){
  var Party =  Number(document.getElementById('selectParty').value);
  var Product = Number(document.getElementById('selectProduct').value);
  var rateOfProduct = Number(document.getElementById('rate').value);
  var quantity = Number(document.getElementById('quantity').value);
  var date = document.getElementById('date').value;

  fetch("https://localhost:44357/api/invoices", {
  method: "POST",
  body: JSON.stringify({
    PartyId: Party,
    ProductId:Product,
    RateOfProduct:rateOfProduct,
    Quantity:quantity,
    DateOfInvoice:date
  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }
})
  .then((response) => window.location.href = "/Invoice.html");
console.log("created")

}

function closeModel(){
  console.log('close')
  $('.fade').hide();
  location.reload();
}

async function edit(id){
  console.log(id)
  party_Id=id
  document.getElementById('exampleModal').style.display='block';
  fillInvoiceProducts();

}
async function fillInvoiceProducts(){

  const res = await fetch(`https://localhost:44357/api/invoices/${party_Id}`);
    data = await res.json();
    console.log("----------------")
   console.log(data)
   document.getElementById('ProductList').innerHTML=''
   for(let i=0;i<data.length;i++){
   var html = `<tr>
   <th scope="row">${data[i].id}</th>
   <td>${data[i].productName}</td>
   <td> <input type="number" placeholder="rate" style="width: 50px; margin-left: 10px;" id="rate${data[i].id}" min="0" value="${data[i].rateOfProduct}" readonly/></td>
   <td>  <input type="number" placeholder="Quantity" style="width: 40px; margin-left: 10px;" id="quantity${data[i].id}" min="0" value="${data[i].quantity}"/></td>
   <td> <input type="text" id="date${data[i].id}" style="width: 7vw; margin-left: 10px;" value="${data[i].dateOfInvoice}"></td>
   <td>${data[i].total}</td>
   <td><button id="${data[i].id}" class="edit-btn" onclick="updateInvoiceProduct(id)">Update</button></td>
   <td><button id="${data[i].id}" class="del-btn" onclick="deleteProduct(id)">delete</button></td>
 </tr>`;

 document.getElementById('ProductList').insertAdjacentHTML("beforeend",html)
   }
}

function updateInvoiceProduct(productId){

    var rateOfProduct = Number(document.getElementById(`rate${productId}`).value);
    var quantity = Number(document.getElementById(`quantity${productId}`).value);
    var date = document.getElementById(`date${productId}`).value;
    party_Id=Number(party_Id);
    productId=Number(productId)
    console.log("quantity :- "+quantity)
fetch(`https://localhost:44357/api/invoices/${party_Id}`, {
  method: "PUT",
  body: JSON.stringify({
    id:productId,
    RateOfProduct:rateOfProduct,
    quantity:quantity,
    dateOfInvoice:date
  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }
}).then( req=> fillInvoiceProducts())
 ;

}

function view(partyid){
  localStorage.setItem("partyId",partyid);
  window.location.href = "/GenerateInvoice.html";
}

function create(){
  window.location.href = "/CreateInvoice.html";
}
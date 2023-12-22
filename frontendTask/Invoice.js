
var data;
var InvoiceId;
async function loadPartyDate(){
   const res = await fetch("https://localhost:44357/api/invoices");
    data = await res.json();
   console.log(data)

   for(let i=0;i<data.length;i++){
   var html = `<tr>
   <th scope="row">${data[i].id}</th>
   <td>${data[i].partyName}</td>
   <td>${data[i].productName}</td>
   <td>${data[i].dateOfInvoice}</td>
   <td>${data[i].rateOfProduct}</td>
   <td>${data[i].quantity}</td>
   <td>${data[i].total}</td>
   <td><button id="${data[i].id}" class="edit-btn" onclick="edit(id)">Edit</button></td>
 </tr>`;

 document.getElementById('bodyList').insertAdjacentHTML("beforeend",html)
   }
fillPartyData('selectParty');
  
}

loadPartyDate();

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

function deleteInvoice(id){
    id=id.slice(1,id.length)
    console.log(id)
   
    fetch(`https://localhost:44357/api/invoices/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
     
    // location.reload();
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
  .then((response) => response.json())
  .then((json) => console.log(json));
console.log("created")
  location.reload();
}

function closeModel(){
  console.log('close')
  $('.fade').hide();
}

async function edit(id){
  console.log(id)
  InvoiceId=id
  document.getElementById('exampleModal').style.display='block';
  
fillPartyData('selectParty2');

}
function editFromModel(){

    var Party =  Number(document.getElementById('selectParty2').value);
    var Product = Number(document.getElementById('selectProduct2').value);
    var rateOfProduct = Number(document.getElementById('rate2').value);
    var quantity = Number(document.getElementById('quantity2').value);
    var date = document.getElementById('date2').value;

fetch(`https://localhost:44357/api/invoices/${InvoiceId}`, {
  method: "PUT",
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
  .then((response) => response.json())
  .then((json) => console.log(json));
location.reload();
}

var data;
var AssignId;
async function loadPartyDate(){
   const res = await fetch("https://localhost:44357/api/AssignParties");
    data = await res.json();
   console.log(data)

   for(let i=0;i<data.length;i++){
   var html = `<tr>
   <th scope="row">${data[i].id}</th>
   <td>${data[i].partyName}</td>
   <td>${data[i].productName}</td>
   <td><button id="${data[i].id}" class="edit-btn" onclick="edit(id)">Edit</button></td>
   <td><button id="/${data[i].id}" class="del-btn"  onclick="deleteAssign(id)">Delete</button></td>
 </tr>`;

 document.getElementById('bodyList').insertAdjacentHTML("beforeend",html)
   }
fillPartyData('selectParty');
fillProductData('selectProduct');
  
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
async function fillProductData(selectProduct){
    const productres = await fetch("https://localhost:44357/api/Products");
    Productdata = await productres.json();
   console.log(Productdata)

   for(let i=0;i<Productdata.length;i++){

    var html1=` <option value="${Productdata[i].id}">${Productdata[i].productName}</option>`;
    document.getElementById(selectProduct).insertAdjacentHTML("beforeend",html1)
   }
}

function deleteAssign(id){
    id=id.slice(1,id.length)
    console.log(id)
   
    fetch(`https://localhost:44357/api/AssignParties/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }).then(res=>location.reload());
}

function createAssign(){
  var Party = Number(document.getElementById('selectParty').value);
  var Product = Number(document.getElementById('selectProduct').value);

  fetch("https://localhost:44357/api/AssignParties", {
  method: "POST",
  body: JSON.stringify({
    PartyId: Party,
    ProductId:Product
  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }
})
  .then((response) => location.reload());
}

function closeModel(){
  console.log('close')
  $('.fade').hide();
}

async function edit(id){
  console.log(id)
  AssignId=id
  document.getElementById('exampleModal').style.display='block';
  
fillPartyData('selectParty2');
fillProductData('selectProduct2');

}
function editFromModel(){

    var Party = Number(document.getElementById('selectParty2').value);
    var Product = Number(document.getElementById('selectProduct2').value);

fetch(`https://localhost:44357/api/AssignParties/${AssignId}`, {
  method: "PUT",
  body: JSON.stringify({
    PartyId: Party,
    ProductId:Product
  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }
})
  .then((response) => response.json())
  .then((json) => console.log(json));
location.reload();
}
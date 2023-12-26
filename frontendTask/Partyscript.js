
var data;
var PartyId;
async function loadPartyDate(){
   const res = await fetch("https://localhost:44357/api/Parties");
    data = await res.json();
   console.log(data)

   for(let i=0;i<data.length;i++){
   var html = `<tr>
   <th scope="row">${data[i].id}</th>
   <td>${data[i].partyName}</td>
   <td><button id="${data[i].id}" class="edit-btn" onclick="edit(id)">Edit</button></td>
   <td><button id="/${data[i].id}" class="del-btn" onclick="deleteParty(id)">Delete</button></td>
 </tr>`;

 document.getElementById('bodyList').insertAdjacentHTML("beforeend",html)
   }
}

loadPartyDate();


function deleteParty(id){
    id=id.slice(1,id.length)
    console.log(id)
   
    fetch(`https://localhost:44357/api/Parties/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }).then(res=>location.reload())
 
}

function createParty(){
  var Partyname = document.getElementById('partyName').value;
  console.log(Partyname)

  fetch("https://localhost:44357/api/Parties", {
  method: "POST",
  body: JSON.stringify({
    partyName: Partyname
  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }
})
  .then((response) =>  location.reload());

}

function closeModel(){
  console.log('close')
  $('.fade').hide();
}

async function edit(id){
  console.log(id)
  PartyId=id
  document.getElementById('exampleModal').style.display='block';
  
const res = await fetch(`https://localhost:44357/api/Parties/${id}`);
data = await res.json();
console.log(data)

document.getElementById('partyNameEdit').value=data.partyName;

}
function editFromModel(){
console.log("party id "+ PartyId)
var name= document.getElementById('partyNameEdit').value;
fetch(`https://localhost:44357/api/Parties/${PartyId}`, {
  method: "PUT",
  body: JSON.stringify({
    partyName: name
  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }
})
  .then((response) => response.json())
  .then((json) => console.log(json));
location.reload();
}
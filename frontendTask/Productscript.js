
var data;
var productId;
async function loadproductDate(){
   const res = await fetch("https://localhost:44357/api/Products");
    data = await res.json();
   console.log(data)

   for(let i=0;i<data.length;i++){
   var html = `<tr>
   <th scope="row">${data[i].id}</th>
   <td>${data[i].productName}</td>
   <td><button id="${data[i].id}" class="edit-btn" onclick="edit(id)">Edit</button></td>
   <td><button id="/${data[i].id}" class="del-btn"  onclick="deleteproduct(id)">Delete</button></td>
 </tr>`;

 document.getElementById('bodyList').insertAdjacentHTML("beforeend",html)
   }
}

loadproductDate();


function deleteproduct(id){
    id=id.slice(1,id.length)
    console.log(id)
   
    fetch(`https://localhost:44357/api/Products/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
     
    location.reload();
}

function createproduct(){
  var productname = document.getElementById('productName').value;
  console.log(productname)

  fetch("https://localhost:44357/api/Products", {
  method: "POST",
  body: JSON.stringify({
    productName: productname
  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }
})
  .then((response) => response.json())
  .then((json) => console.log(json));

  location.reload();
}

function closeModel(){
  console.log('close')
  $('.fade').hide();
}

async function edit(id){
  console.log(id)
  productId=id
  document.getElementById('exampleModal').style.display='block';
  
const res = await fetch(`https://localhost:44357/api/Products/${id}`);
data = await res.json();
console.log(data)

document.getElementById('productNameEdit').value=data.productName;

}
function editFromModel(){
console.log("product id "+ productId)
var name= document.getElementById('productNameEdit').value;
fetch(`https://localhost:44357/api/Products/${productId}`, {
  method: "PUT",
  body: JSON.stringify({
    productName: name
  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }
})
  .then((response) => response.json())
  .then((json) => console.log(json));
location.reload();
}

var party_Id = Number(localStorage.getItem("partyId"));
document.getElementById('number').innerHTML=party_Id;


async function getPartyName(){
const res = await fetch(`https://localhost:44357/api/Parties/${party_Id}`);
    data = await res.json();
   console.log(data)
   document.getElementById('partyName').innerHTML=data.partyName;
   }
getPartyName();

async function InvoiceProducts(){
 var date;
    const res = await fetch(`https://localhost:44357/api/invoices/${party_Id}`);
      data = await res.json();
      console.log("----------------")
     console.log(data)
     document.getElementById('productsList').innerHTML=''
     for(let i=0;i<data.length;i++){
     var html = `
    <td><span  >${data[i].productName}</span></td>
    <td><span data-prefix>$</span><span  >${data[i].rateOfProduct}</span></td>
    <td><span data-prefix>x</span><span>${data[i].quantity}</span></td>
    <td><span data-prefix>$</span><span>${data[i].total}</span></td>
   </tr>`;
  
   document.getElementById('productsList').insertAdjacentHTML("beforeend",html);
   date=data[i].dateOfInvoice;
     }
     document.getElementById('date').innerHTML=date;
  }
  InvoiceProducts();

  async function InvoiceTotal(){
       const res = await fetch("https://localhost:44357/api/invoices");
        data = await res.json();
       console.log(data)
    
       for(let i=0;i<data.length;i++){
    if(data[i].id==party_Id){
        document.getElementById('total').innerHTML=data[i].total
    }
    
       }
       var total =Number(document.getElementById('total').innerHTML);
      var paid=Number(document.getElementById('paid').innerHTML=0);
       document.getElementById('balance').innerHTML=total-paid

    
      
    }
    
InvoiceTotal();

document.getElementById('download').addEventListener('click',
function(){
    window.print();
}
);
function keepPurchaseId(){
    let id = 0
    let strId = window.location.search.split("=")
    if(strId.length>1){
      id = strId[1]
    }
    return id
  }


function getPurchase() {
  let id = keepPurchaseId()
  axios.get(`http://localhost:3000/purchases/${id}`)
    .then(res => {
      let purchase = res.data
      let code = document.getElementById("protocol")
      let total = document.getElementById("total")
      code.innerText = purchase.id
      total.innerText = `R$ ${purchase.total}`
      console.log(res);
    }).catch(err => {
      console.error(err);
    })
}

getPurchase()
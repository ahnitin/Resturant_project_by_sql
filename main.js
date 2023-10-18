
axios.get("http://localhost:5000/get")
.then(res =>{
    for(let i=0;i<res.data.allUsers.length;i++)
    {
        StoreUserOnScreen(res.data.allUsers[i]);
    }
})
function resturantwork(event){
    event.preventDefault();
    let price = document.getElementById("price").value;
    let table = document.getElementById("table").value;
    let menu = document.getElementById("menu").value;
    let extra = document.getElementById("extra").value;

    console.log(price,table,menu,extra);
    let obj ={
        price,
        table,
        menu,
        extra
    }
    AddUserToCloud(obj);
    function AddUserToCloud(obj)
    {
        axios.post("http://localhost:5000/post",obj)
        .then(res=> StoreUserOnScreen(res.data.newUserDetail))
        .catch(err=> console.log(err))
    }
}
function StoreUserOnScreen(obj)
{
    let childEle = document.createElement("li");
    let Parent1 = document.getElementById("table1");
    let Parent2 = document.getElementById("table2");
    let Parent3 = document.getElementById("table3");
    let Parent4 = document.getElementById("table4");
    let Parent5 = document.getElementById("table5");
    childEle.className ="list-group-item list-group-item-action list-group-item-light"; 
    childEle.textContent = obj.table +"--"+obj.price+"--"+obj.menu+"--"+obj.extra+"--"+obj.id;
    
    const deleteBtm = document.createElement("input");
    deleteBtm.value = "DeleteBill";
    deleteBtm.type = "button";
    deleteBtm.className ="btn btn-outline-danger";
    if(obj.table == "Table1")
    {
        Parent1.appendChild(childEle);
        childEle.appendChild(deleteBtm);
    }
    if(obj.table == "Table2")
    {
        Parent2.append(childEle);
        childEle.appendChild(deleteBtm);
    }
    if(obj.table == "Table3")
    {
        Parent3.appendChild(childEle);
        childEle.appendChild(deleteBtm);
    }
    if(obj.table == "Table4")
    {
        Parent4.appendChild(childEle);
        childEle.appendChild(deleteBtm);
    }
    if(obj.table == "Table5")
    {
        Parent5.appendChild(childEle);
        childEle.appendChild(deleteBtm);
    }

    deleteBtm.onclick =()=>{
        DeleteTheBillAttable(obj.id,obj.table)
    };
}
function DeleteTheBillAttable(userid,tableno)
{
    var ParentEle;
    if(tableno == "Table1")
    {
        ParentEle = document.getElementById("table1")
    }
    if(tableno == "Table2")
    {
        ParentEle = document.getElementById("table2")
    }
    if(tableno == "Table3")
    {
        ParentEle = document.getElementById("table3")
    }
    if(tableno == "Table4")
    {
        ParentEle = document.getElementById("table4")
    }
    if(tableno == "Table5")
    {
        ParentEle = document.getElementById("table5")
    }

    for(let i=0;i<ParentEle.children.length;i++)
    {
        let child = ParentEle.children[i];
        if(child.textContent.includes(userid))
        {
            ParentEle.removeChild(child)
            break;
        }
    }
    axios.delete("http://localhost:5000/delete/"+userid)
    .then(res=>{
        console.log("user Deleted",userId);
    })
    .catch(err=> console.log(err));
}


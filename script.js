let title = document.getElementById("title");
// price
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");

let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let updata = document.getElementById("updata");

// search block



// Get Total
let totalResult = 0;
function getTotal(){
    if(price.value != ""){
        totalResult = +price.value 
        + +taxes.value + +ads.value 
        - +discount.value;
        total.innerText = totalResult;
        total.style.backgroundColor = "rgb(0 169 0)"
    }else {
        totalResult = "";
       total.innerText = totalResult;
       total.style.backgroundColor = "#ee3b3b";
    }
}


// create product

let dataPro;

if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product);
}else{
    dataPro = [];
}

submit.onclick = () => {
    let date = new Date().getTime();
    getTotal();
    let data = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: totalResult,
        category: category.value,
        date: `${date}`,  
    }

    if(count.value < 0){
        count.value = Math.abs(count.value);
    }else{

        if(count.value !== ""  && typeof parseInt(count.value) === "number"){
            
            for(let i = 0;i < Math.abs(count.value);i++){
                dataPro.push(data);
            }
            localStorage.setItem("product", JSON.stringify(dataPro));
            if(updata.style.display !== "block"){
                clearData();
            }
            showDate();
        }else {
    
            dataPro.push(data);
            localStorage.setItem("product", JSON.stringify(dataPro) ) 
            showDate();
            if(updata.style.display !== "block"){
                clearData();
            }
        }
    }

    backgroundColorTableData();
    setTimeout(backgroundColorTableData, 4000);
    messages("تم اضافه عنصر جديد");
}

// Clear inputs
function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerText = '';
    count.value = '';
    category.value = '';
};

function addData(){
    let phonesArry = ["سامسونج", "هواوي", "Xiaomi", "Apple", "OPPO", "شركة فيفو"];
    let randomTitle = Math.ceil(Math.random() * phonesArry.length - 1);
    title.value = phonesArry[randomTitle];
    price.value = Math.ceil(Math.random() * 20000);
    taxes.value = Math.ceil(Math.random() * 2000);
    ads.value = Math.ceil(Math.random() * 200);
    discount.value = Math.ceil(Math.random() * 400);
    category.value = 'Phone';
    getTotal();
};

function showDate() {    
    let table = '';
    for(let i = 0;i < dataPro.length;i++){
        let item = dataPro[i];
        let date = new Date(Number(item.date));
        let Fulldate = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()} `
        table +=  `
            <tr>
                <td> ${i + 1} </td>
                <td> ${item.title} </td>
                <td> ${item.price} </td>
                <td> ${item.taxes} </td>
                <td> ${item.ads} </td>
                <td> ${item.discount} </td>
                <td> ${item.total} </td>
                <td> ${item.category} </td>
                <td> ${Fulldate} </td>
                <td> <button onclick="updataButton(${i})" id="update">Upate</button> </td>
                <td> <button onclick="deleteData(${i})" id="delete">Delete</button> </td>
            </tr>
        `; 
    }
    document.getElementById("tbody").innerHTML = table;
    let btnDelete = document.getElementById("deleteAll");
    if(dataPro.length > 0){
        btnDelete.innerHTML = `
            <button onclick="deletaAll()"> delete All (${dataPro.length }) </button>
        `;
    }else{
        btnDelete.innerHTML = ``;
    }

    
    

}

showDate() 

// Delete

function deleteData(i) {
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);
    showDate();
    messages("تم حذف العنصر");
}

function deletaAll() {
    localStorage.removeItem("product");
    dataPro.splice(0);
    showDate();
    messages("تم حذف جميع الملفات")
}

// Updata Button

function updataButton(id) {
    let dp = dataPro[id]
    title.value = dp.title;
    price.value = dp.price;
    taxes.value = dp.taxes;
    ads.value = dp.ads;
    discount.value = dp.discount;
    category.value = dp.category;
    getTotal();
    updata.style.display = "block";
    setTimeout(() => {
        updata.innerHTML = "Updata";
        updata.style.width = "100%";
    })

    updata.onclick = function () {

        let date = new Date().getTime();
        let data = {
            title: title.value,
            price: price.value,
            taxes: taxes.value,
            ads: ads.value,
            discount: discount.value,
            total: totalResult,
            category: category.value,
            date: `${date}`, 
        }



        dataPro.splice( id, 1, data);
        localStorage.product = JSON.stringify(dataPro);
        showDate();
        
        updata.style.width = "0%";
        updata.innerHTML = "";
        setTimeout( () => {
            updata.removeAttribute("style");
        },1000);
        clearData();
        messages("تم تحديث العنصر");
    }
    
};

function backgroundColorTableData() {
    let lastElementTableRow = document.querySelectorAll(".outputs table tbody tr");
    let lengthTr = lastElementTableRow.length - 1;

    lastElementTableRow[lengthTr].style.transition = "1s";
    if((+dataPro[dataPro.length - 1].date + 1000 * 3) > new Date().getTime()){
        lastElementTableRow[lengthTr].style.backgroundColor = "#60ff8794";

    }else {
        lastElementTableRow[lengthTr].style.backgroundColor = null;
    }
    
    window.onload = () => {
        lastElementTableRow[lengthTr].removeAttribute("style");
    }
}

backgroundColorTableData();

// messages

function messages(msg) {
    let messagesParint = document.getElementById("messages");
    messagesParint.innerHTML += ` <span class='msg'> ${msg} </span>`;
    let messages = document.querySelectorAll("#messages .msg");


    for(let i = 0;i < messages.length;i++){
        messages[i].style.display = "block";
        setTimeout(() => {
            messages[i].style.transform = "translateX(0px)";
        });
        setTimeout(() => {
            messages[i].style.transform = "translateX(250px)";
            setTimeout(() => {
                messages[i].remove()
            },500);
        }, 2000)
    }
}


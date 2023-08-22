// 3. logic to show customers detail

let moveToAddCustomer = () => {
    window.location.href = "addCustomer.html";
}


let sessionToken = JSON.parse(localStorage.getItem("sessionToken"));

let userData = [{
    "uuid": "test4284ab3c329946538f72bc83c88afa19",
    "first_name": "Kooper k",
    "last_name": "Rambo",
    "street": "Sandorean",
    "address": null,
    "city": "Kongo",
    "state": "Columbia",
    "email": "kanipo@gmail.com",
    "phone": "(987)654-1230"
},
{
    "uuid": "test43476009e9de4157bb4be2135a4766dc",
    "first_name": "mohit",
    "last_name": "Thorat",
    "street": " MH",
    "address": "NIgdi",
    "city": "pune",
    "state": "MH",
    "email": "mohit@gmail.com",
    "phone": "9881465554"
},
{
    "uuid": "test4b462c0445ad4076ace874c6a24c41d9",
    "first_name": "Jane",
    "last_name": "Doe",
    "street": "Elvnu Street",
    "address": "H no 2 ",
    "city": "Delhi",
    "state": "Delhi",
    "email": "sam@gmail.com",
    "phone": "12345678"
},
{
    "uuid": "test51a44739676342dd8de9ceabc8e7ec4b",
    "first_name": "Jane",
    "last_name": "Doe",
    "street": "Elvnu Street",
    "address": "H no 2 ",
    "city": "Delhi",
    "state": "Delhi",
    "email": "sam@gmail.com",
    "phone": "12345678"
},
{
    "uuid": "test5314f8e6dcc5451884707bf5fa828c7f",
    "first_name": "Prasanth",
    "last_name": "Shetty",
    "street": "Park Avenue",
    "address": "No: 123455",
    "city": "New York",
    "state": "New York",
    "email": "avengers@gmail.com",
    "phone": "0987654321"
},
{
    "uuid": "test57e062d1ea404086968a6d07980f148c",
    "first_name": "Jane",
    "last_name": "Doe",
    "street": "Elvnu Street",
    "address": "H no 2 ",
    "city": "Delhi",
    "state": "Delhi",
    "email": "sam@gmail.com",
    "phone": "12345678"
},
{
    "uuid": "test5c74da2cd04a4fc9acb717a0294fb7a3",
    "first_name": "John",
    "last_name": "Doe",
    "street": "123 Main St",
    "address": "Anytown",
    "city": "arizone house no.1",
    "state": "CA",
    "email": "john@example.com",
    "phone": "555-1234"
},
{
    "uuid": "test606e218642544f0781c60e185ad86551",
    "first_name": "John",
    "last_name": "Doe",
    "street": "123 Main St",
    "address": "Anytown",
    "city": "arizone house no.1",
    "state": "CA",
    "email": "john@example.com",
    "phone": "555-1234"
}];

userData.forEach(user => {

    let tr = document.createElement("tr");

    let firstName = document.createElement("td");
    firstName.innerText = user.first_name;
    firstName.setAttribute("class", "first_name")

    let lastName = document.createElement("td");
    lastName.innerText = user.last_name;
    lastName.setAttribute("class", "last_name");

    let address = document.createElement("td");
    address.innerText = user.address;
    address.setAttribute("class", "address");

    let street = document.createElement("td");
    street.innerText = user.street;
    street.setAttribute("class", "street");

    let city = document.createElement("td");
    city.innerText = user.city;
    city.setAttribute("class", "city");

    let state = document.createElement("td");
    state.innerText = user.state;
    state.setAttribute("class", "state");

    let email = document.createElement("td");
    email.innerText = user.email;
    email.setAttribute("class", "email");

    let phone = document.createElement("td");
    phone.innerText = user.phone;
    phone.setAttribute("class", "phone");

    // action
    let action = document.createElement("td");
    action.setAttribute("class","action");

    let box = document.createElement("div");

    let del = document.createElement("h4");
    del.innerText = "DELETE";
    del.addEventListener("click", deleteRecord);

    let updt = document.createElement("h4");
    updt.innerText = "UPDATE";
    updt.addEventListener("click", updateRecord);

    box.append(del,updt);
    action.append(box);

    tr.append(firstName,lastName,address,street,city,state,email,phone,action);

    document.querySelector("tbody").append(tr);
});

function formTable(userData){

    userData.forEach(user => {

        let tr = document.createElement("tr");

        let firstName = document.createElement("td");
        firstName.innerText = user.first_name;
        firstName.setAttribute("class", "first_name")

        let lastName = document.createElement("td");
        lastName.innerText = user.last_name;
        lastName.setAttribute("class", "last_name");

        let address = document.createElement("td");
        address.innerText = user.address;
        address.setAttribute("class", "address");

        let street = document.createElement("td");
        street.innerText = user.street;
        street.setAttribute("class", "street");

        let city = document.createElement("td");
        city.innerText = user.city;
        city.setAttribute("class", "city");

        let state = document.createElement("td");
        state.innerText = user.state;
        state.setAttribute("class", "state");

        let email = document.createElement("td");
        email.innerText = user.email;
        email.setAttribute("class", "email");

        let phone = document.createElement("td");
        phone.innerText = user.phone;
        phone.setAttribute("class", "phone");

        // action
        let action = document.createElement("td");
        action.setAttribute("class","action");

        let box = document.createElement("div");

        let del = document.createElement("h4");
        del.innerText = "DELETE";
        del.addEventListener("click", deleteRecord);

        let updt = document.createElement("h4");
        updt.innerText = "UPDATE";
        updt.addEventListener("click", updateRecord);

        box.append(del,updt);
        action.append(box);

        tr.append(firstName,lastName,address,street,city,state,email,phone,action);

        document.querySelector("tbody").append(tr);
    });
}


let createTable = () => {

    let queryParams = new URLSearchParams({
        cmd : "get_customer_list"
    });
    
    fetch("https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp" + `?${queryParams}`, {

        method : "GET",
        headers : {
            "content-type" : "application/json",
            Authorization : `Bearer ${sessionToken}`
        }
    })
    .then((response) => {
        if(response.status == 200 || response.status == 201){
            userData = response.json();
        }
        else{
            alert("Data is Empty, No customer details found!")
        }
    })
    .catch(rej => {
        alert("Invalid Authorization, Please Login First");
    })

    if(userData.length > 0){
        formTable(userData);
    }
}


// 4. delete record from table

function deleteRecord(event){

    let selectedCustomer = event.target.parentNode.parentNode.parentNode;
    let email = document.querySelector(".email").innerText;

    let customerUuid = null;

    userData.forEach(customer => {
        if(customer.email == email){
            customerUuid = customer.uuid;
        }
    })

    let queryParams = new URLSearchParams({
        cmd : "delete",
        uuid : customerUuid
    });
    
    fetch("https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp"+`?${queryParams}`, {

        method : "POST",
        headers : {
            "content-type" : "application/json",
            Authorization : `Bearer ${sessionToken}`
        }
    })
    .then(response => {

        if(response.status == 500){
            alert("Error not deleted!");
        }
        if(response.status == 400){
            alert("Uuid not found");
        }
        if(response.status == 200){
            alert("Data deleted successfully...")
        }
    })

    // removing from table
    selectedCustomer.remove();
}


// 5. updating record and redirect to addCustomerForm to make neccessary updation

function updateRecord(event){
    
    // let cus = event.target.parentNode.parentNode.parentNode;

    let email = document.querySelector(".email").innerText;

    let customerUuid = null;

    userData.forEach(customer => {
        if(customer.email == email){
            customerUuid = customer.uuid;
        }
    })

    let customer = {
        "uuid" : customerUuid,
        "first_name" : document.querySelector(".first_name").innerText,
        "last_name" : document.querySelector(".last_name").innerText,
        "street" : document.querySelector(".street").innerText,
        "address" : document.querySelector(".address").innerText,
        "city" : document.querySelector(".city").innerText,
        "state" : document.querySelector(".state").innerText,
        "email" : document.querySelector(".email").innerText,
        "phone" : document.querySelector(".phone").innerText
    }

    localStorage.setItem("updateUser",JSON.stringify(customer));

    // update the required details 
    window.location.href = "addCustomer.html";

}
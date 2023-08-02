// 3. logic to show customers detail

let moveToAddCustomer = () => {
    window.location.href = "addCustomer.html";
}


let sessionToken = JSON.parse(localStorage.getItem("sessionToken"));

let userData = [];


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

    let queryParams = new URLSearchParams({
        cmd : "delete",
        // uuid : selectedCustomer.customerUuid
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

    let customer = {
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
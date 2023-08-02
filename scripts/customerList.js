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

        let lastName = document.createElement("td");
        lastName.innerText = user.last_name;

        let address = document.createElement("td");
        address.innerText = user.address;

        let street = document.createElement("td");
        street.innerText = user.street;

        let city = document.createElement("td");
        city.innerText = user.city;

        let state = document.createElement("td");
        state.innerText = user.state;

        let email = document.createElement("td");
        email.innerText = user.email;

        let phone = document.createElement("td");
        phone.innerText = user.phone;

        // action
        let action = document.createElement("td");
        action.setAttribute("id","action");

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

    let userUuid = event.target.parentNode.uuid;
    
    let queryParams = new URLSearchParams({
        cmd : "delete",
        uuid : userUuid
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
    event.target.parentNode.remove();
}


// 5. updating record and redirect to addCustomerForm to make neccessary updation

function updateRecord(event){

    let user = event.target.parentNode;

    localStorage.setItem("updateUser",JSON.stringify(user));

    // update the required details 
    window.location.href = "addCustomer.html";

}
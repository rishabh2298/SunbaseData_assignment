// 2. logic for adding new customer to database

    
let isUpdateRequired = JSON.parse(localStorage.getItem("updateUser")) || null;

let sessionToken = JSON.parse(localStorage.getItem("sessionToken")) || null;

let addNewCustomer = (event) => {

    event.preventDefault();

    let customer = {
        firstName : document.querySelector("#firstName").value,
        lastName : document.querySelector("#lastName").value,
        street : document.querySelector("#street").value,
        address : document.querySelector("#address").value,
        city : document.querySelector("#city").value,
        state : document.querySelector("#state").value,
        email : document.querySelector("#email").value,
        phone : document.querySelector("#phone").value
    }


    // this means user is already added I have to update it only
    if(isUpdateRequired != null){
        updateRecord(customer);
        localStorage.removeItem("updateUser");
        window.location.href = "customerList.html"
        return;
    }


    const queryParams = new URLSearchParams({
        cmd : 'create'
    });

    if(sessionToken != null){

        fetch("https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp"+`?${queryParams}`, {

            method : "POST",
            headers : {
                "content-type" : "application/json",
                Authorization : `Bearer ${sessionToken}`
            },
            body : JSON.stringify({
                "first_name" : customer.firstName,
                "last_name" : customer.lastName,
                "street" : customer.street,
                "address" : customer.address,
                "city" : customer.city,
                "state" : customer.state,
                "email" : customer.email,
                "phone" : customer.phone
            })
        })
        .then(response => {
            response.json().then(data => alert("Customer is successfully created"))
        })
        .catch(reject => {
            alert("First name and last name are mandatory parameters");
        })
    }
    else{
        alert("Invalid Authorization, Please login first !");
    }
}


document.querySelector("#customerForm").addEventListener("submit", addNewCustomer)



// 5. update record and redirect to customer List table

// this will auto fill data in inputs if there is any updation
function autoFillOldData(oldCustomer){

    document.querySelector("#firstName").value = oldCustomer.first_name,
    document.querySelector("#lastName").value = oldCustomer.last_name,
    document.querySelector("#street").value = oldCustomer.street,
    document.querySelector("#address").value = oldCustomer.address,
    document.querySelector("#city").value = oldCustomer.city,
    document.querySelector("#state").value = oldCustomer.state,
    document.querySelector("#email").value = oldCustomer.email,
    document.querySelector("#phone").value = oldCustomer.phone

}

if(isUpdateRequired != null){
    autoFillOldData(isUpdateRequired);
}


function updateRecord(customer){

    oldUserUuid = isUpdateRequired.uuid;

    let queryParams = new URLSearchParams({
        cmd : "update",
        uuid : oldUserUuid
    });

    if(sessionToken != null){

        fetch("https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp" + `?${queryParams}`, {

            method : "POST",
            headers : {
                "content-type" : "application/json",
                Authorization : `Bearer ${sessionToken}`
            },
            body : JSON.stringify({
                "first_name" : customer.firstName,
                "last_name" : customer.lastName,
                "street" : customer.street,
                "address" : customer.address,
                "city" : customer.city,
                "state" : customer.state,
                "email" : customer.email,
                "phone" : customer.phone
            })
        })
        .then(response => {
            if(response.status == 500){
                alert("Uuid not found!");
            }
            if(response.status == 400){
                alert("Body is empty, please fill all data correctly");
            }
            if(response.status == 200){
                alert("updation is successful...");
            }
        })
    }
    else{
        alert("Invalid Authorization, please Login first!");
    }

}
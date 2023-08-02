// logic for adding new customer to database


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

    const queryParams = new URLSearchParams({
        cmd : 'create'
    });

    let sessionToken = JSON.parse(localStorage.getItem("sessionToken")) || null;

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

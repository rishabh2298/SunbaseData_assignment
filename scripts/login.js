// login logic


let submitLoginForm = (event) => {

    event.preventDefault();

    let user = {
        userId : document.querySelector("#loginId").value,
        userPassword : document.querySelector("#loginPassword").value
    }

    if(user.userId == "test@sunbasedata.com" && user.userPassword == "Test@123"){
        
        fetch("https://qa2.sunbasedata.com/sunbase/portal/api/assignment_auth.jsp", {

            method : "POST",
            headers : {
                "content-type" : "application/json",
            },
            body : JSON.stringify({
                "login_id" : user.userId,
                "password" : user.userPassword
            })
        }) 
        .then(response => {
            
            if(response.status == 200 || response.status == 201){
                let sessionToken = null;
                response.json().then(data => {
                    sessionToken = data.access_token;
                    alert("Login Successfull")
                })
                localStorage.setItem("sessionToken",JSON.stringify(sessionToken));
                window.location.href = "customerList.html";
            }
            else{
                response.json().then(alert("Invalid authorization"))
            }
        })

    }
    else{
        alert("Please Enter valid userId or userPassword !")
    }
}


document.querySelector("#loginForm").addEventListener("submit", submitLoginForm);

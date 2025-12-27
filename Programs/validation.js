function validate() {

    function gotoNextSteps () {
    if (userFound) {
        alert("Login successful! Welcome");
        sessionStorage.setItem("user",emailId1);
        return true;
    } else {
        alert("Invalid username or password. Please try again.");
        return false;
    }
        }

    let user1 = {emailId:"raj@gmail.com",password:"raj@123"};
    let user2 = {emailId:"ravi@gmail.com",password:"ravi@453"};
    let user3 = {emailId:"ramesh@gmail.com",password:"ramesh@786"};
    let user4 = {emailId:"shruthi@gmail.com",password:"shruthi@425"}
    let user5 = {emailId:"karunya@gmail.com",password:"karunya@723"}
    let users =  [];
    users.push(user1);
    users.push(user2);
    users.push(user3);
    users.push(user4)
    users.push(user5)

    let emailId1 = document.getElementById("emailId").value 
    let formPassword1 = document.getElementById("password").value

   // Check if the entered credentials match any in the array
    const userFound = users.find(user => 
        user.emailId === emailId1 && user.password === formPassword1
    );
    

    
//     document.getElementById("password").addEventListener("keypress", function(e) {
//     if (e.key === "Enter") {
//     gotoNextSteps();
//     exit;
//     }
// } );

gotoNextSteps();

}

function resetForm(){
    window.location.href="login.html";
}


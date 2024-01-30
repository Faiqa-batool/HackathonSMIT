function switchAccount () {
    document.getElementById("container").style.display = "none";
    document.getElementById("container2").style.display = "flex";
    document.title = "Sign Up Page";
}

function switchAccount2 () {
    document.getElementById("container").style.display = "flex";
    document.getElementById("container2").style.display = "none";
    document.title = "Login Page";
}
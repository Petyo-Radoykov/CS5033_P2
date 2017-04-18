function logout() {
    alert("You will be logged out.");
    window.localStorage.removeItem("accessToken");
    window.localStorage.removeItem("userType");
    window.localStorage.removeItem("userName");
    window.location.href = "../index.html";
}

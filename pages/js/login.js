//straight away when this code runs, determine whether or not the user's token is stored in the local storage.
//If it is already stored they are already logged in and we can skip to directing them to the correct page.
if (window.localStorage.getItem("accessToken") !== 'undefined') {
    if (window.localStorage.getItem("accessToken") != null) {
        if (window.localStorage.getItem("accessToken").length > 0) {
            redirectWithoutData();
        }
    }
}
function login(event) {
    event.preventDefault();

    var name = $('#name').val();
    var pass = $('#pass').val();

    var url = serverBasePath + "authenticate";
    $.post(url, {name: name, password: pass}, function(data, status){
        if(data.success) {
            window.localStorage.setItem("accessToken", data.token);
            window.localStorage.setItem("userType", data.user_type);
            window.localStorage.setItem("userName", name);
            if (data.user_type==='Patient') {
                window.localStorage.setItem("patientHealthcareIdNumber", data.user_id);
            } else if (data.user_type==='Doctor') {
                window.localStorage.setItem("doctorIdNumber", data.user_id);
            }
            redirect(data);
        } else {
            $('#msg').text("\t" + data.message).css("color", "red");
        }
    });
}

function redirectWithoutData() {
    var userType = window.localStorage.getItem("userType");
    if (window.localStorage.getItem("accessToken").length>0 &&
            window.localStorage.getItem("userName").length>0) {
        if (userType === "Doctor") {
            window.location.href = "doctor/welcome.html";
        } else if (userType === "Nurse") {
            window.location.href = "nurse/welcome.html";
        } else {
            window.location.href = "patient/welcome.html";
        }
    } else {
        logout();
    }
}

function redirect(data) {
    if (data.user_type === "Doctor") {
        window.location.href = "doctor/welcome.html";
    } else if (data.user_type === "Nurse") {
        window.location.href = "nurse/welcome.html";
    } else {
        window.location.href = "patient/welcome.html";
    }
}
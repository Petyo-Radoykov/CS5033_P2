function logout() {
    alert("You will be logged out.");
    removeLocalStorageVars();
    window.location.href = "../index.html";
}

function check_token_present(accessToken) {
    //check that there is a stored access token for user.
    //if it is not valid, none of the other functionality on the page will work,
    //since every request must have a valid token added. So there is no security concern
    //caused by not separately validating token here.
    //it is however worth checking that the token has been set in the browser, because
    //otherwise emailed links etc would cause the page to be loaded with no data and no
    //functionality working (not a security concern, but looks messy).

    if (accessToken==='undefined' || accessToken === null || accessToken.length==0) {
        removeLocalStorageVars();
        window.location.href = "../error.html";
    }
}

function removeLocalStorageVars() {
    window.localStorage.removeItem("accessToken");
    window.localStorage.removeItem("userType");
    window.localStorage.removeItem("userName");
    window.localStorage.removeItem("patientHealthcareIdNumber");
}

function findDoctorNameInList(doctorList, doctorId) {
    var doctorName = "Unknown Doctor";
    //Look round the list of doctors to find the name of the doctor with the given ID
    $.each(doctorList, function (key, value) {
        if (value._id===doctorId) {
            doctorName = value.name;
        }
    });
    return doctorName;
}

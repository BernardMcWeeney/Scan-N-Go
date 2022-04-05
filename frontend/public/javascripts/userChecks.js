function redirectAdmin() {
    if (sessionStorage.getItem("admin") === "true") {
        location.href = '/admin';
    }
}

function redirectUser() {
    if (sessionStorage.getItem("admin") === "false") {
        location.href = '/';
    }
}
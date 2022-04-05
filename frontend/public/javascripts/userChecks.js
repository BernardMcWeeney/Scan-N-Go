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

function redirectStoreLoggedInUser() {
    if (sessionStorage.getItem('storeID') !== '5' && sessionStorage.getItem('storeID') !== null) {
        location.href = '/';
    }
}

function redirectNonStoreLoggedInUser() {
    if (sessionStorage.getItem('storeID') === '5') {
        location.href = '/store-scanner';
    } else if (sessionStorage.getItem('storeID') === null) {
        location.href = '/store-scanner';
    }
}
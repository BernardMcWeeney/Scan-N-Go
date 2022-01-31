async function logout() {
  window.sessionStorage.clear() // logs out user
}

async function goHome() {
  window.location.href="/login/true"
}

function displayLogoutMsg() {
  logout().then(value => {
  goHome()
})
}



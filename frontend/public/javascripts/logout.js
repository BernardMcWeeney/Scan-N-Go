async function logout() {
  window.sessionStorage.clear()
}

async function goHome() {
  window.location.href="/login/true"
}

function displayLogoutMsg() {
  logout().then(value => {
  goHome()
})
}



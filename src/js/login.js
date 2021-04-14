async function login() {
    id = document.getElementById('userId').value
    error = document.getElementById('error')
    error.style.display = "block"

    if(id != "") {
        await fetch(`http://.../api/users/${id}`, {method: 'GET'})
        .then(response => {
            if(response.ok) {
                response.json().then(data => {
                    error.innerHTML = "Bem vindo, " + data.username
                })
                
                setTimeout(()=>{
                    window.location.href = `dashboard.html?id=${id}`
                },2000)
            }
            else {
                error.innerHTML = "ID incorreto"
            }
        })
    }
    else {
        error.innerHTML = "Campo Vazio"
    }
}

async function loggedUser() {
    const urlParams = new URLSearchParams(window.location.search);
    userId = urlParams.get('id');
    // console.log(userId)

    await fetch(`http://.../api/users/${userId}`, {method: 'GET'})
        .then(response => response.json()
            .then(data => {
                user = data
            })
        )
}
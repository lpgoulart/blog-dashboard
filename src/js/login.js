async function login() {
    id = document.getElementById('userId').value
    error = document.getElementById('error')
    error.style.display = "block"

    if(id != "") {
        await fetch(`http://localhost:3333/api/users/${id}`, {method: 'GET'})
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
    // console.log(id)

    await fetch(`http://localhost:3333/api/users/${userId}`, {method: 'GET'})
        .then(response => response.json()
            .then(data => {
                // console.log(data)
            })
        )
}
function toggleMenu() {
    console.log('aqui')
    document.getElementById('aside').classList.toggle('w-100')
    document.getElementById('logo').classList.toggle('w-100')

    document.getElementById('home').classList.toggle('d-none')
    document.getElementById('posts').classList.toggle('d-none')
    document.getElementById('config').classList.toggle('d-none')

}

function excluirConfirmation(id) {
    var modal = document.getElementById("myModal");

    const content = `
    
        <div class="modal-content">
            <span class="close">&times;</span>
            <div>
                <h3>Deletar Post</h3>
                <br>
                <p>
                    Deseja mesmo deletar esse Post?
                </p>
                <div class="buttons">
                    <button class="voltar" onclick="closeModal()"><i class="fas fa-arrow-left"></i> Cancelar</button>
                    <button class="delete" onclick="excluir('${id}'); closeModal()"><i class="far fa-trash-alt"></i> Deletar</button>
                </div>
            </div>
        </div>
    `

    modal.innerHTML = content

    modal.style.display = "block";

    var span = document.getElementsByClassName("close")[0];

    span.onclick = function () {
        modal.style.display = "none";
    }
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

function closeModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
}

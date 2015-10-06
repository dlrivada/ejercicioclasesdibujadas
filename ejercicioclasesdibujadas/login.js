if (sessionStorage.getItem("Usuario")) {
    location.replace("pupitres.html");
}

function login() {
    var elemento = document.getElementById("txtUsuario").value;
    if (elemento === "") {
        alert("Nombre vacío");
        return;
    }
    sessionStorage.setItem("nombre", elemento);
    location.replace("pupitres.html");

}

document.getElementById("btnEnviar").addEventListener("click", login);
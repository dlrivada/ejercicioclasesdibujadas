if (sessionStorage.getItem("Usuario")) {
    location.replace("pupitres.html");
}

function login() {
    if (document.getElementById("txtUsuario").value === "") {
        alert("Nombre vacío");
        return;
    }
    sessionStorage.setItem("nombre", document.getElementById("txtUsuario").value);
    location.replace("pupitres.html");

}

document.getElementById("btnEnviar").addEventListener("click", login);
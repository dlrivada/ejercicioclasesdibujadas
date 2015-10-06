"use strict";

if (!sessionStorage.getItem("nombre")) {
    location.replace("index.html");
}

$(document).ready(function() {
    var url = "https://alumnoscurso.azure-mobile.net/Tables/clase05";
    var disposicion = [];

    function procesarJson(datos) {
        var canvas = document.getElementById("divCanvas");
        var ctx = canvas.getContext("2d");

        ctx.fillStyle ="red";
        ctx.fillRect(datos.x, datos.y, datos.w, datos.h);
    }

    function recuperarOffline() {
        var longitud = 0;

        if (localStorage["elementos"]) {
            disposicion = JSON.parse(localStorage("elementos"));
            longitud = disposicion.length;
            for (var i = 0; i < longitud; i++) {
                procesarJson(disposicion[i]);
            }
        }
    }

    var guardar = function () {
        var data = {
            nombre: sessionStorage.getItem("nombre"),
            x: $("#txtX").val(),
            y: $("#txtY").val(),
            w: $("#txtW").val(),
            h: $("#txtH").val()
        }

        disposicion.push(data);
        procesarJson(data);

        $.ajax({
            method: "POST",
            url: url,
            data: JSON.stringify(data),
            dataType: "json",
            headers: {
                "Content-Type": "application/json"
            },
            success: function () {
                alert("Guardado");
            },
            error: function () {
                alert("Error al guardar");
            }
        });
        localStorage["elemtos"] = JSON.stringify(disposicion);
    }


    function refrescar() {
        var filtro = "?$filter=nombre eq '" + localStorage["nombre"] + "'";
        $.get(url + filtro, null, function(res) {
            var l = res.length;
            for (var i = 0; i < l; i++) {
                procesarJson(res[i]);
            }
        } );
    }

    //cargarDatos();

    $("#btnRecargar").click(refrescar);
    $("#btnOk").click(guardar);

});

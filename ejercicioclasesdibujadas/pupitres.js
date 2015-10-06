"use strict";


if (!sessionStorage.getItem("nombre")) {
    location.replace("index.html");
}


$(document).ready(function() {
    var url = "https://alumnoscurso.azure-mobile.net/Tables/clase05";

    function procesarJson(datos) {
        var strTabla = "";

        $.each(datos, function (key, fila) {
            $("#img1").clone().appendTo("#divCanvas");

            strTabla += "<tr><td>" + fila.x + "</td><td>" + fila.y + "</td><td>" + fila.w + "</td><td>" + fila.h + "</td><td>" + fila.nombre + "</td></tr>";
        });

        $("#cursos").html(strTabla);
    }

    function cargarDatos() {
        $.getJSON(url, null, procesarJson);
    }

    var alta = function () {
        var data = {
            nombre: sessionStorage.getItem("nombre"),
            x: $("#txtX").val(),
            y: $("#txtY").val(),
            w: $("#txtW").val(),
            h: $("#txtH").val(),
        }

        $.ajax({
            method: "POST",
            url: url,
            data: JSON.stringify(data),
            dataType: "json",
            headers: {
                "Content-Type": "application/json"
            },
            success: function () {
                cargarDatos();
            },
            error: function () {
                alert("Error al guardar");
            }
        });
    }

    cargarDatos();

    $("#btnRecargar").click(cargarDatos);
    $("#btnOk").click(alta);

});

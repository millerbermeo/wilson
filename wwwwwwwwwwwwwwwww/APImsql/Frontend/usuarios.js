

setInterval(() => {
    listarUsuarios();
}, 500)

var modalUsuario = new bootstrap.Modal(document.getElementById('modalUsuario'), {
    keyboard: false
})



function listarUsuarioID(idusuario) {
    document.querySelector('#uno').style.display = "none"

    document.querySelector('#dos').style.display = "block"

    fetch(`http://localhost:3000/usuario/consultar/${idusuario}`,{
        method: 'GET'
    })

        .then(response => response.json())

        .then(data => {
          
            data.forEach(element => {
                document.getElementById('identificacion').value = element.idusuario;
                document.getElementById('nombres').value = element.nombres;
                document.getElementById('direccion').value = element.direccion;
                document.getElementById('telefono').value = element.telefono;
                document.getElementById('correo').value = element.correo
                document.getElementById('rol').value = element.rol
            })
        
            modalUsuario.show();
        }
        );
}



function listarUsuarios() {

    fetch('http://localhost:3000/usuario/listar')

        .then(response => response.json())

        .then(data => {
            let filas = '';
            data.forEach(element => {
                filas += `<tr>`;
                filas += `<td>${element.idusuario}</td>`;
                filas += `<td>${element.nombres}</td>`;
                filas += `<td>${element.direccion}</td>`;
                filas += `<td>${element.telefono}</td>`;
                filas += `<td>${element.correo}</td>`;
                filas += `<td class="mx-auto">
                        <a class="btn btn-danger" href="javascript:eliminarUsuario(${element.idusuario})">Eliminar</a>
                        <a class="btn btn-primary" href="javascript:listarUsuarioID(${element.idusuario})">actualizar</a>
                    </td>`;
                filas += `</tr>`;
            })
            document.getElementById('table-usuarios').innerHTML = filas;
        }
        );
}
function message(icon, position, title, timer) {
    Swal.fire({
        title: title,
        icon: icon,
        position: position,
        showConfirmButton: false,
        timer: timer
    })
}
function eliminarUsuario(idusuario) {

    fetch(`http://localhost:3000/usuario/eliminar/${idusuario}`,
        {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            if (data.status == 200) {
                message("success", "top-end", `${data.message}`, 1500);
                listarUsuarios();
            }

            if (data.status == 403) {
                message("warning", "top-end", `${data.message}`, 1500);
                listarUsuarios();
            }

            if (data.status == 500) {
                message("error", "top-end", `${data.message}`, 1500);
                listarUsuarios();
            }
        });
}

function nuevoUsuario() {
    cleanForm()
    document.querySelector('#uno').style.display = "block"
    document.querySelector('#dos').style.display = "none"
    modalUsuario.show();
};

const registrarUsuarios = () => {

    const nombres = document.getElementById('nombres').value;
    const direccion = document.getElementById('direccion').value;
    const correo = document.getElementById('correo').value;
    const telefono = document.getElementById('telefono').value;
    const rol = document.getElementById('rol').value;
    const password = document.getElementById('password').value;


    const datos = new URLSearchParams();
    datos.append("nombres", nombres);
    datos.append("direccion", direccion);
    datos.append("correo", correo);
    datos.append("telefono", telefono);
    datos.append("rol", rol);
    datos.append("password", password);


    fetch(`http://localhost:3000/usuario/registrar`, {
        method: 'POST',
        body: datos
    })
        .then(response => response.json())
        .then(data => {

            if (data.status == 200) {
                message("success", "top-end", `${data.message}`, 1500);
                listarUsuarios();
            } else if (data.status == 403) {
                message("warning", "top-end", `${data.message}`, 1500);
                listarUsuarios();
            } else if (data.status == 500) {
                message("error", "top-end", `${data.message}`, 1500);
                listarUsuarios();
            }
            modalUsuario.hide();
        })
        .catch(error => {
            // Manejar errores de red u otros errores
            console.error('Error al enviar la solicitud:', error);
        });
}



const actualizarUsuarios = () => {



    const nombres = document.getElementById('nombres').value;
    const direccion = document.getElementById('direccion').value;
    const correo = document.getElementById('correo').value;
    const telefono = document.getElementById('telefono').value;
    const rol = document.getElementById('rol').value;
    const password = document.getElementById('password').value;


    const datos = new URLSearchParams();
    datos.append("nombres", nombres);
    datos.append("direccion", direccion);
    datos.append("correo", correo);
    datos.append("telefono", telefono);
    datos.append("rol", rol);
    datos.append("password", password);


    fetch(`http://localhost:3000/usuario/actualizar/${document.getElementById('identificacion').value}`, {
        method: 'PUT',
        body: datos
    })
        .then(response => response.json())
        .then(data => {

            if (data.status == 200) {
                message("success", "top-end", `${data.message}`, 1500);
                listarUsuarios();
            } else if (data.status == 403) {
                message("warning", "top-end", `${data.message}`, 1500);
                listarUsuarios();
            } else if (data.status == 500) {
                message("error", "top-end", `${data.message}`, 1500);
                listarUsuarios();
            }

            modalUsuario.hide();
        })
        .catch(error => {
            // Manejar errores de red u otros errores
            console.error('Error al enviar la solicitud:', error);
        });
}



const cleanForm = () => {
    document.getElementById('nombres').value = '';
    document.getElementById('direccion').value = '';
    document.getElementById('correo').value;
    document.getElementById('telefono').value = '';
    document.getElementById('password').value = '';

}

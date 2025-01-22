/* Configuración Inicial */

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, doc, getDoc, updateDoc, deleteDoc }
    from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAcbnPQ0yAaf7jwoQB4H7Fph_M14-vnK4E",
    authDomain: "prueba-f6ad5.firebaseapp.com",
    projectId: "prueba-f6ad5",
    storageBucket: "prueba-f6ad5.firebasestorage.app",
    messagingSenderId: "85022242798",
    appId: "1:85022242798:web:8f172ef97bebb54b5c40ff"
};

const app = initializeApp(firebaseConfig);

/*Código distinto a la configuración adicional de nuestra Cloud Firestore */

let db = getFirestore(app);
let pacientesRef = collection(db, "pacientes");
let pacientesSelect = document.getElementById("pacientesSelect");

async function cargarPacientes() {
    pacientesSelect.innerHTML = '<option value="">---Selecciona Un Paciente---</option>';
    try {
        let querySnapshot = await getDocs(pacientesRef);
        querySnapshot.forEach((doc) => {
            let paciente = doc.data();
            let option = document.createElement("option");
            option.value = doc.id; // Almacena el ID del documento en el valor de la opción
            option.text = paciente.apellido;
            pacientesSelect.add(option);
        });
    } catch(e) {
        console.error(`iNo Fue Posible Cargar La Lista De Documentos Debido Al Error ${e}!`);
        alert("iNo Fue Posible Cargar La Lista De Pacientes!");
    }
}
cargarPacientes().then();

function limpiarCampos() {
    document.getElementById("nombre").value = "";
    document.getElementById("apellido").value = "";
    document.getElementById("sexo").selectedIndex = 0;
    document.getElementById("programaInscripcion").selectedIndex = 0;
    document.getElementById("pago").selectedIndex = 0;
    pacientesSelect.selectedIndex = 0;
}


let registrar = document.getElementById("registrar");
registrar.addEventListener("click", async () => {
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let sexo = document.getElementById("sexo").value;
    let programaInscripcion = document.getElementById("programaInscripcion").value;
    let pago = document.getElementById("pago").value;

    if (nombre === "" || apellido === "" || sexo === "default" || programaInscripcion === "default" || pago === "default") {
        alert("iPor Favor, Completa Toda La Información Solicitada!");
        return;
    }

    try {
        let nuevoPaciente = {
            nombre: nombre,
            apellido: apellido,
            sexo: sexo,
            programaInscripcion: programaInscripcion,
            pago: pago
        };

        let docRef = await addDoc(pacientesRef, nuevoPaciente);
        console.log(`Documento Registrado Con El ID ${docRef.id}`);
        alert("¡Paciente Registrado Con Éxito!");
        limpiarCampos();
        await cargarPacientes();
    } catch(e) {
        console.error(`iNo Fue Posible Agregar El Documento Debido Al Error ${e}!`);
        alert("Error Al Registrar El Paciente.");
    }
});

async function mostrarPaciente(pacienteId) {
    try {
        let docRef = doc(db, "pacientes", pacienteId);
        let docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            let paciente = docSnap.data();
            document.getElementById("nombre").value = paciente.nombre;
            document.getElementById("apellido").value = paciente.apellido;
            document.getElementById("sexo").value = paciente.sexo;
            document.getElementById("programaInscripcion").value = paciente.programaInscripcion;
            document.getElementById("pago").value = paciente.pago;
        } else {
            console.log("iEl Documento No Existe!");
            alert("¡El Paciente No Existe!");
        }
    } catch (e) {
        console.error(`¡No Fue Posible Mostrar El Documento Debido Al Error ${e}!`);
        alert("iNo Fue Posible Mostrar El Documento!");
    }
}

pacientesSelect.addEventListener("change", () => {
    let pacienteId = pacientesSelect.value;
    if (pacienteId)
        mostrarPaciente(pacienteId).then();
    else
        limpiarCampos();
});

let actualizar = document.getElementById("actualizar");
actualizar.addEventListener("click", async () => {
    let pacienteId = pacientesSelect.value;
    let nombre = document.querySelector("#nombre").value;
    let apellido = document.querySelector("#apellido").value;
    let sexo = document.querySelector("#sexo").value;
    let programaInscripcion = document.querySelector("#programaInscripcion").value;
    let pago = document.querySelector("#pago").value;

    if (nombre === "" || apellido === "" || sexo === "default" || programaInscripcion === "default" || pago === "default") {
        alert("iPor Favor, Completa Toda La Información Solicitada!");
        return;
    }

    if (pacienteId) {
        try {
            let pacienteRef = doc(db, "pacientes", pacienteId);

            let pacienteActualizado = {
                nombre: document.getElementById("nombre").value,
                apellido: document.getElementById("apellido").value,
                sexo: sexo,
                programaInscripcion: programaInscripcion,
                pago: pago
            };

            await updateDoc(pacienteRef, pacienteActualizado);
            console.log("iDocumento Actualizado Con Éxito!");
            alert("iPaciente Actualizado Con Éxito!");
            await cargarPacientes();
        } catch(e) {
            console.error(`iNo Fue Posible Actualizar El Documento Debido Al Error ${e}!`);
            alert("iNo Fue Posible Actualizar Al Paciente!");
        }
    } else {
        alert("iPor Favor, Selecciona Un Paciente De La Lista!");
    }
});

let eliminar = document.getElementById("eliminar");
eliminar.addEventListener("click", async () => {
    let pacienteId = pacientesSelect.value;
    if (pacienteId) {
        try {
            await deleteDoc(doc(db, "pacientes", pacienteId));
            console.log("¡Documento Eliminado Con Éxito!");
            alert("¡Paciente Eliminado Con Éxito!");
            limpiarCampos();
            await cargarPacientes();
        } catch(e) {
            console.error(`¡No Fue Posible Eliminar El Documento Debido Al Error ${e}!`);
            alert("¡No Fue Posible Eliminar Al Paciente!");
        }
    } else {
        alert("¡Por Favor, Selecciona Un Paciente De La Lista!");
    }
});

let limpiar = document.getElementById("limpiar");
limpiar.addEventListener("click", () => {
    limpiarCampos();
});


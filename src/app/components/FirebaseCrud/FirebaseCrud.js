"use client";

import FirebaseConfig from "../FirebaseConfig/FirebaseConfig";
import { get, ref, set, onValue, remove, update } from "firebase/database";
import { useState } from "react";
import './Style.css'

const database = FirebaseConfig();

function FirebaseCrud() {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [telefono, setTelefono] = useState("");
    const [email, setEmail] = useState("");

    //validacion de datos
    let isNullOrWhiteSpace = (value) => {
        value = value.toString();
        return (value === null || value.replaceAll(' ', '').length < 1);
    }

    // ----------------- INSERTAR REGISTRO -----------------
    const insertarRegistro = (e) => {
     
        e.preventDefault();
        if (isNullOrWhiteSpace(nombre) || isNullOrWhiteSpace(apellido) || isNullOrWhiteSpace(telefono) || isNullOrWhiteSpace(email)) {
            alert("Todos los campos son obligatorios");
            return;
        }
        const dbref = ref(database);

        set(ref(database, 'contactos/' + nombre), {
            apellido: apellido,
            telefono: telefono,
            email: email
        });

        alert("Registro insertado");
        
        // get(child(dbref, `contactos/${nombre}`)).then((snapshot) => {
        //     if (snapshot.exists()) { // si existe el registro en la base de datos
        //         alert("El registro ya existe, intente con otro nombre");
        //     } else {
        //         set(ref(database, 'contactos/' + nombre), {
        //             apellido: apellido,
        //             telefono: telefono,
        //             email: email
        //         });

        //         alert("Registro insertado");
        //     }
        // }).catch((error) => {
        //     console.error(error);
        //     alert("Ha ocurrido un error");
        // });
        setNombre("");
        setApellido("");
        setTelefono("");
        setEmail("");

    }

    // ----------------- ACTUALIZAR REGISTRO -----------------
    const actualizarRegistro = (e) => {
        
        e.preventDefault();
        if (isNullOrWhiteSpace(nombre)) {
            alert("El campo nombre es obligatorio para actualizar el registro");
            return;
        }
        const dbref = ref(database);
        get(child(dbref, `contactos/${nombre}`)).then((snapshot) => {
            if (snapshot.exists()) { // si existe el registro en la base de datos
                update(ref(database, 'contactos/' + nombre), {
                    apellido: apellido,
                    telefono: telefono,
                    email: email
                }).then(() => {
                    alert("El registro se ha actualizado");
                }).catch((error) => {
                    console.error(error);
                    alert("Ha ocurrido un error");
                });
                alert("El registro se ha actualizado");
            } else {
                alert("El registro no existe");
            }
        }).catch((error) => {
            console.error(error);
            alert("Ha ocurrido un error");
        });
        setNombre("");
        setApellido("");
        setTelefono("");
        setEmail("");

    }


    // ----------------- Eliminar REGISTRO -----------------
    const EliminarRegistro = (e) => {
        const dbref = ref(database);
        e.preventDefault();
        if (isNullOrWhiteSpace(nombre)) {
            alert("El campo nombre es obligatorio para Eliminar el registro");
            return;
        }

        get(child(dbref, `contactos/${nombre}`)).then((snapshot) => {
            if (snapshot.exists()) { // si existe el registro en la base de datos
                remove(ref(database, 'contactos/' + nombre), {
                });
                alert("El registro se ha eliminado correctamente");
            } else {
                alert("El registro no existe");
            }
        }).catch((error) => {
            console.error(error);
            alert("Ha ocurrido un error");
        });
        setNombre("");
        setApellido("");
        setTelefono("");
        setEmail("");

    }

    // -----------------SELECCIONAR REGISTRO -----------------

    const selecionarDatos = () => {
        const dbref = ref(database);

        if (isNullOrWhiteSpace(nombre)) {
            alert("El campo nombre es obligatorio");
            return;
        }


    }





    return (
        <div>
            <h1>CRUD - Firebase </h1>
            <form>
                <label>Nombre</label><br />
                <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} /><br />
                <label>Apellido</label><br />
                <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} /><br />
                <label>Telefono</label><br />
                <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} /><br />
                <label>Email</label><br />
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
                <button onClick={insertarRegistro} >Insertar Registro</button>
                <button onClick={actualizarRegistro} >Actualizar Registro</button>
                <button onClick={EliminarRegistro}>Eliminar Registro</button>
                <button onClick={selecionarDatos} >Seleccionar Registro</button>


            </form>
        </div>
    )

}


export default FirebaseCrud;
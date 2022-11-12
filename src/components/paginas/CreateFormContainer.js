import React, { useState } from 'react'
import { useFormPersonalizado } from '../../hooks/useFormPersonalizado';
import FormularioProducto from '../FormularioProducto'

const initialForm = {
    nombre:"",
    description:"",
    imagenUrl:"",
    precio:"",
    stock:"",
};

function validarUrl(urlValidar){
    let url;
    try{
        url = new URL(urlValidar);
    }catch(_) {
        return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
}

const validationsForm = (form) => {
    let errors = {};
    if(!form.nombre.trim()){
        errors.name = "El campo NOMBRE esta vacio";
    }

    if(isNaN(form.precio) || form.precio <= 0){
        errors.precio = "No es un precio valido";
    }

    if(!Number.isInteger(parseFloat(form.stock))){
        errors.stock = "No es un numero de stock valido";
    }
    
    if(!validarUrl(form.imagenUrl)){
        errors.imagenUrl = "No es una URL valida";
    }
    return errors;
};

function CreateFormContainer() {    
   
    const onSubmit = (formData) => {
        console.log('Agregando producto nombre:', {formData});
    }

    const {
        form,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
    } = useFormPersonalizado(
        initialForm,
        validationsForm,
        onSubmit,
    );
    
  return (
    <div>
        <FormularioProducto
            handleSubmit={handleSubmit}
            errors={errors}
            handleBlur={handleBlur}
            handleChange={handleChange}
            form={form}
        ></FormularioProducto>
    </div>
  )
}

export default CreateFormContainer
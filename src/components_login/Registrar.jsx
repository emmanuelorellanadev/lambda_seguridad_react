import React, { useState, useEffect} from 'react';
import axios from 'axios';

export const Registrar = ( props ) => {

    const [registroslogin, setRegistrosLogin] = useState([]);
    const [usuario, setUsuario] = useState('');
    const [password, setPass] = useState('');
    const [estado, setEstado] = useState('');
    const [rol, setRol] = useState('');

    //Boton guardar
    const botonGuardar = (e) => {
        e.preventDefault();
        var miObjeto = {usuario, password, estado, rol };
        setRegistrosLogin([...registroslogin, miObjeto]);
        limpiarFormulario();
    }

    // useEffect(() => {
        
    //     const fetchData = async() => {
    //         const url = 'http://localhost:8080/role';
            
    //         try {
                
    //             const response = await axios.get(url, {
    //             headers: { "x-token": sessionStorage.getItem('lambdaToken') }
    //             })
    //             setRoles(response.data.roles)
                
    //         } catch (error) {
    //             throw Error(error);    
    //         }
            
    //     }
        
    //     fetchData()
    //     // roles.map( r => console.log(r.id, r.role_name));
    // }, [setUsuario])

// const getRole = async() => {

//         const url = 'http://localhost:8080/role';

        //Consulta la base de datos usando axios
        
            // const rolesFetched = await axios.get(url, {
            //     headers: { "x-token": sessionStorage.getItem('lambdaToken') }
            //     })
            //     .then(resp => {
            //         console.log(resp.data)
            //         setRoles(resp.data)
            //         console.log(roles);
            //     } )
            //     .catch( err => console.log(err))



        // consulta la base de datos usando fetch
       
        //consulta a base de datos usando fetch       
        // const rolesFetched  = []; 
        // await fetch(url, { headers: { "x-token": sessionStorage.getItem('lambdaToken') } })
        //     .then( (response) => { return response.json() } )
        //     .then( (r) => {
        //         console.log(r); 
        //         setRoles(r);
        //         console.log(roles); 
        //     })
        //     .catch( ( e ) => console.log( e ) )

        // console.log('inicio');
    // }

    // const limpiarFormulario = () => {
    //     setUsuario('');
    //     setPass('');
    //     setEstado('');
    //     setRol('');
    //     document.getElementById('miFormulario').reset();
        
    // } 

//vista
    return (
        <div className='bg-light' style={{ marginTop:20, padding: 20}}>
            <div className='h3'>
                Formulario De Registro de Usuarios
                <br />
                <form id='miFormulario' >
                    <div className='row' style={{ marginTop: 20}}>
                        <div className='col-6'>
                            <input className='form-control form-control-lg text-center' type="text" placeholder='Digite El Nombre del Usuario' onChange={ (e) => setUsuario(e.target.value)} required  />
                        </div>
                        <div className='col-6'>
                            <input className='form-control form-control-lg text-center' type="password" autoComplete='off' placeholder='Digite La Contrasena' onChange={ (e) => setPass(e.target.value)} required/>
                        </div>
                    </div>
                    <div className='row' style={{ marginTop: 20}}>
                        <div className='col-6'>
                            <select className='form-select form-select-lg text-center' onChange={ (e) => setRol(e.target.value)} required>
                                <option value="">selecciona Opcion</option>
                                { 
                                    props.rols.map( (r) => {
                                        return <option value={r.id} key={r.id}>{r.role_name}</option>
                                    } 
                                    )
                                }
                            </select>
                        </div>
                        <div className='col-6'>
                            <label className='form-check-label' htmlFor="estadoUsuario">Estado</label>
                            <input className='form-check-input' type='checkbox' id='estadoUsuario' onChange={ (e) => setEstado(e.target.value)}  />  
                        </div>
                    </div>
                    <div className='row' style={{marginTop: 20}}>
                        <div className='col'>
                            <button className='btn btn-primary btn-lg'>Guardar Datos</button>
                        </div>
                    </div>
                 </form>
            </div>
        </div>
    )
}
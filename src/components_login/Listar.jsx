import React, {useState, useEffect} from 'react';
import axios from 'axios';

export const Listar = () => {
    const [usuarios, setUsuarios] = useState([]);

    
    const recuperaUsuarios = async() => {
        const url = 'http://localhost:8080/user'
        
        await axios.get(url, {
            headers: { "x-token": sessionStorage.getItem('lambdaToken') }
        })
        .then( async usuariosDB => await setUsuarios(usuariosDB.data.users))
        .catch( error => console.log(error))
    }
    
    useEffect( () => {
        recuperaUsuarios()
    }, [])

    const editaUsuario = (idUsuario) => {
        alert(`Editar usuario ${idUsuario}`);
    }

    const eliminarUsuario = (idUsuario) => {
        alert(`Eliminar usuario ${idUsuario}`);
    }

    return (
        <>
            <div className='bg-light' style={{ marginTop: 20, padding: 20 }}>
                <div className='h3'>
                    Listado de Usuarios
                </div>
                <div className='table-responsive' >
                    <table className='table table-bordered table-hover' style={{ marginTop: 12}}>
                        <thead className='text-center' style={{background: 'lightgrey'}}>
                            <tr >
                                <th>#</th>
                                <th>Usuario</th>
                                <th>Role</th>
                                <th>Estado</th>
                                <th>Editar</th>
                                <th>Elimina</th>
                            </tr>      
                        </thead>
                        <tbody className='text-center align-baseline'>
                            {
                                usuarios.map( ( usuario ) => {
                                    return (<tr key={usuario.id}>
                                        <th>{usuario.id}</th>
                                        <th>{usuario.user_name}</th>
                                        <th>{usuario.RoleId}</th>
                                        <th><input type='checkbox' checked={usuario.user_status} disabled/></th>
                                        <th><button className='btn btn-primary' type="button" onClick={ () => editaUsuario( usuario.id ) }>Editar</button></th>
                                        <th><button className='btn btn-outline-danger' onClick={() => {eliminarUsuario(usuario.id)}}><i className='bi bi-trash3-fill'></i></button></th>
                                    </tr>)
                                })

                                
                            }
                        </tbody>
                    </table>
                </div>
                
            </div>
        </>
    )
}
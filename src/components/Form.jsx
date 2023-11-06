import { useState } from "react";
import './Form.css';

const Form = () => {
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [address, setAddress] = useState('');
    const [cellphone, setCellphone] = useState('');
    const [list, setList] = useState([]);
    const [editingIndex, setEditingIndex] = useState(-1);

    const registerData = (e) => {
        e.preventDefault();

        if (!name || !lastname || !address || !cellphone) {
            alert('Todos los campos son obligatorios');
            return;
        }

        // Validar que la longitud del número de teléfono sea al menos 10 caracteres
        if (cellphone.length < 10) {
            alert('La longitud mínima del número debe ser de 10');
            return;
        }

        // Validar que el registro no existe en la lista
        if (list.some((item, index) => (
            index !== editingIndex &&
            item.name === name &&
            item.lastname === lastname
        ))) {
            alert('El registro ya existe en la lista');
            return;
        }

        if (editingIndex === -1) {
            // Agregar nuevo elemento
            setList([
                ...list,
                { name, lastname, address, cellphone }
            ]);
        } else {
            // Actualizar elemento existente
            const updatedList = [...list];
            updatedList[editingIndex] = { name, lastname, address, cellphone };
            setList(updatedList);
            setEditingIndex(-1);
        }

        e.target.reset();
        setName('');
        setLastname('');
        setAddress('');
        setCellphone('');
    }

    const editItem = (index) => {
        const selectedItem = list[index];
        setName(selectedItem.name);
        setLastname(selectedItem.lastname);
        setAddress(selectedItem.address);
        setCellphone(selectedItem.cellphone);
        setEditingIndex(index);
    }

    const removeItem = (index) => {
        const updatedList = list.filter((_, i) => i !== index);
        setList(updatedList);
        setEditingIndex(-1);
    }

    return (
        <>
            <div className="form_cont">
                <h2 className="text-center text-primary">Formulario</h2>
                <form onSubmit={registerData}>
                    <div className="input_group">
                        <p>Nombre</p>
                        <input
                            type="text"
                            placeholder="Ingresa un nombre"
                            className="form-control mb-3"
                            onChange={(e) => setName(e.target.value.trim())}
                            value={name}
                        />
                        <p>Apellido</p>
                        <input
                            type="text"
                            placeholder="Ingresa un apellido"
                            className="form-control mb-3"
                            onChange={(e) => setLastname(e.target.value.trim())}
                            value={lastname}
                        />
                    </div>
                    <div className="input_group">
                        <p>Dirección</p>
                        <input
                            type="text"
                            placeholder="Ingresa dirección"
                            className="form-control mb-3"
                            onChange={(e) => setAddress(e.target.value.trim())}
                            value={address}
                        />
                        <p>Teléfono</p>
                        <input
                            type="text"
                            placeholder="Ingresa teléfono"
                            className="form-control mb-3"
                            onChange={(e) => setCellphone(e.target.value.trim())}
                            value={cellphone}
                        />
                    </div>
                    <div className='d-grid gap-2'>
                        <button className="btn btn-outline-primary" type="submit">
                            {editingIndex === -1 ? "Guardar" : "Actualizar"}
                        </button>
                    </div>
                </form>
            </div>
            <div className="list_cont">
                <h2 className="text-center text-primary mt-5">Listar Registros</h2>
                <hr />
                <ol className="list-group">
                    {list.map((item, index) => (
                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <span className="mr-2">{item.name}</span>
                                <span className="mr-2">{item.lastname}</span>
                                <span className="mr-2">{item.address}</span>
                                <span>{item.cellphone}</span>
                                <button
                                    className="btn_edit"
                                    onClick={() => editItem(index)}
                                >
                                    Editar
                                </button>
                                <button
                                    className="btn_delete"
                                    onClick={() => removeItem(index)}
                                >
                                    Eliminar
                                </button>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        </>
    );
}

export default Form;

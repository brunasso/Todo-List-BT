import React, { useState, useEffect } from "react";

//create your first component
const Home = () => {
	let [listaDeTareas, setListaDeTareas] = useState([]);
	const [nuevaTarea, setNuevaTarea] = useState("");
	const user = 'brunasso';
	const urlUser = `https://playground.4geeks.com/todo/users/${user}`;
	const urlTodo = 'https://playground.4geeks.com/todo/todos/'


	const addNewTask = async(evento) => {
		if (evento.key === "Enter") {
			const resp = await fetch(`${urlTodo}${user}`, {
				method: "POST",
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					label: nuevaTarea,
					is_done: false
				})
			});
			if(resp.ok){
				renderTasks();
			}
			setNuevaTarea("");
		}
	}

	const createUser = async() => {
		try {
			const userAdd = await fetch(urlUser, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				}
			})
			if(userAdd.status == '200') renderTasks()
		} catch (error) {
			console.error("Error al intentar agregar usuario")
		}
	}

	const renderTasks = async() => {
		try {
			const datos = await fetch(urlUser)
			if (datos.status == '404') {
				createUser();
				return ""
			}

			const informacion = await datos.json();
			setListaDeTareas(informacion.todos)

		} catch (error) {
			console.error("Hubo un error al cargar tareas");
			setListaDeTareas([]);
		}

	}

	const deleteTask = async(index) =>{
		try {
			const deletedTask = await fetch(`${urlTodo}${index}`, {
				method: 'DELETE',			
			})		
			if (deletedTask.ok) {
				renderTasks();
			}
		} catch (error) {
			console.error("Error al eliminar tarea")
		}
	}

	const deleteUser = async() =>{
		try {
			const deletedUser = await fetch(urlUser, {
				method: 'DELETE',			
			})		
			if (deletedUser.ok) {
				setListaDeTareas([]);
				renderTasks();
			}
		} catch (error) {
			console.error("Error al eliminar usuario")
		}
	}

	useEffect(()=>{
		renderTasks();
	},[])

	return (
		<div className="container mt-5">
			<h1 className="text-center mt-5">Todos</h1>
			<div className="mx-auto col-6">
				<div className="input-group mb-3">
					<input
						type="text"
						className="form-control"
						placeholder="Qué necesitas hacer?"
						value={nuevaTarea}
						id="tarea"
						onChange={(evento) => setNuevaTarea(evento.target.value)}
						onKeyUp={(evento) => {
							addNewTask(evento);
						}}
					/>
				</div>
				<div className="list-group">
					{listaDeTareas.map(task => (
						<div className="list-group-item d-flex justify-content-between align-items-center" key={task.id}>
							{task.label}
							<i onClick={() => {

								deleteTask(task.id)
								/* const aux = listaDeTareas.filter((_task, ind) => ind !== index);
								setListaDeTareas(aux); */
							}} className="fa-solid fa-trash icono-oculto"></i>
						</div>
					))}
				</div>
				<div className="btn-group-vertical mt-3 d-flex w-50 mx-auto">
					<button type="button" className="btn btn-secondary"
						onClick={()=>{
							deleteUser();
						}}>
						Borrar el usuario y las tareas</button>
				</div>

				<br />
				<span>
					{listaDeTareas.length === 0 ? "No hay tareas. Añade una nueva!" : `${listaDeTareas.length} items left`}
				</span>
			</div>
		</div>
	);
};

export default Home;

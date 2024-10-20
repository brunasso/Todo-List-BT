import React, { useState } from "react";

//create your first component
const Home = () => {
	let [listaDeTareas, setListaDeTareas] = useState(["bañarse", "limpiar", "cocinar", "aprender react"]);
	const [nuevaTarea, setNuevaTarea] = useState("");
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
						onChange={(evento) => setNuevaTarea(evento.target.value)}
						onKeyUp={(evento) => {
							if (evento.key === "Enter") {
								setListaDeTareas([...listaDeTareas, nuevaTarea]);
								setNuevaTarea("");
							}
						}}
					/>
				</div>
				<div className="list-group">
					{listaDeTareas.map((tarea, index) => (
						<div className="list-group-item d-flex justify-content-between align-items-center" key={index}>
							{tarea}
							<i onClick={() => {
								const aux = listaDeTareas.filter((_task, ind) => ind !== index);
								setListaDeTareas(aux);
							}} className="fa-solid fa-trash icono-oculto"></i>
						</div>
					))}
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

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				},
			],
			user: null,
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			signup: async (email, password) => {
				try {

					const bodyData = {
						email: email,
						password: password,
					}

					const options = {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(bodyData)
					};

					// fetching data from the backend
					const response = await fetch(`${process.env.BACKEND_URL}/api/signup`, options);
					const msg = await response.json()

					// don't forget to return something, that is how the async resolves
					return msg;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			login: async (email, password, navigate) => {
				const resp = await fetch(`https://sturdy-tribble-g4q96jj9547j2x54-3001.app.github.dev/api/login`, { 
					 method: "POST",
					 headers: { "Content-Type": "application/json" },
					 body: JSON.stringify({ email, password }) 
				})
		   
				if(!resp.ok) throw Error("There was a problem in the login request")
		   
				if(resp.status === 401){
					 throw("Invalid credentials")
				}
				else if(resp.status === 400){
					 throw ("Invalid email or password format")
				}
				const data = await resp.json()
				// Guarda el token en la localStorage
				// También deberías almacenar el usuario en la store utilizando la función setItem
				localStorage.setItem("jwt-token", data.token);
				setStore({ user: data.user });
				navigate("/private")
		   
				return data
		   },
		   logout: () => {
			// Elimina el token del localStorage
			localStorage.removeItem("jwt-token");
			// También puedes limpiar otros datos relacionados con la autenticación, como el usuario en la store
			setStore({ user: null });
		}
	}

	};
};

export default getState;

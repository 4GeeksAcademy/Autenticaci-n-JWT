const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			user: null,
			storeToken: false,
			characters: [],

		},

		actions: {
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
			//----------------------------------------------------------------------------------------------------------------------//

			login: async (email, password, navigate) => {
				const resp = await fetch(`${process.env.BACKEND_URL}/api/login`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ email, password })
				})

				if (!resp.ok) throw Error("There was a problem in the login request")

				if (resp.status === 401) {
					throw ("Invalid credentials")
				}
				else if (resp.status === 400) {
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

			//----------------------------------------------------------------------------------------------------------------------//
			logout: () => {
				// Elimina el token del localStorage
				localStorage.removeItem("jwt-token");
				// También puedes limpiar otros datos relacionados con la autenticación, como el usuario en la store
				setStore({ user: null });
			},

			//----------------------------------------------------------------------------------------------------------------------//
			autenticar: (token) => {
				const options = {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						"Authorization": "Bearer " + token
					}

				}
				fetch(`${process.env.BACKEND_URL}/api/private`, options)
					.then(response => {
						if (response.status === 200) {
							response.json()
						} else {
							throw Error("Problema en el request")
						}
					})
					.then(response => setStore({ storeToken: true }))
					.catch(error => console.log(error))
			},

			//----------------------------------------------------------------------------------------------------------------------//
			gotCharacters: async () => {
				try {
					const options = {
						method: 'GET',
						headers: { 'Accept': 'application/json' },
					};

					const response = await fetch('https://thronesapi.com/api/v2/Characters', options);

					if (!response.ok) {
						throw new Error(`HTTP error! Status: ${response.status}`);
					}

					const data = await response.json();
					console.log(data);
					setStore({ characters: data });
				} catch (error) {
					console.error('Error:', error.message);
				}
			},


		}

	};

};

export default getState;

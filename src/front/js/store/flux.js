const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      islogin: localStorage.getItem("token") !== "" ? false : true,
    },
    actions: {
      // Use getActions to call a function within a fuction
      loginFirst: async (email, password) => {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        };
        try {
          console.log(email, password);
          const response = await fetch(
            `${process.env.BACKEND_URL}/api/user/login`,
            options
          );

          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
          }
          const data = await response.json();
		  console.log(data)
          localStorage.setItem("token", data.access_token);
          setStore({ token: data.access_token });
          
          
        } catch (error) {
          console.log(error);
        }
      },

      registerFunction: async (data) => {
        console.log(data);
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        };
        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/api/user`,
            options
          );

          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
          }
        } catch (error) {
          console.log(error);
        }
      },

      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      isLogin: () => {
        const store = getStore();
        setStore({
          ...store,
          isLogin: true,
        });
      },

      getMessage: async () => {
        // try{
        // 	// fetching data from the backend
        // 	const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
        // 	const data = await resp.json()
        // 	setStore({ message: data.message })
        // 	// don't forget to return something, that is how the async resolves
        // 	return data;
        // }catch(error){
        // 	console.log("Error loading message from backend", error)
        // }
        console.log("Hola");
      },
      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },
    },
  };
};

export default getState;

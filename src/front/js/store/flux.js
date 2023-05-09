const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      token: localStorage.getItem("token") || null,
      artistName: "",
      username: "",
      comments: [],
    },
    actions: {
      // Use getActions to call a function within a fuction

      addComments: async(data) => {
        
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        };
        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/api/user/login`,
            options
          );

          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
          }
          const data = await response.json();
          console.log(data);
          localStorage.setItem("token", data.access_token);
          setStore({ token: data.access_token });
          setStore({ artistName: data.artist_name });
          setStore({ username: data.username });
          return true;
        } catch (error) {
          console.log(error);
          return false;
        }

      },
      
      getComments: async (song_id) => {
        const store = getStore();

        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.token}`,
          },
        };
        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/api/comments/${song_id}`,
            options
          );

          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
          }
          const data = await response.json();
          console.log(data);
          setStore({ comments: data });
          return true;
        } catch (error) {
          console.log(error);
          return false;
        }
      },

      loginFirst: async (data) => {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        };
        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/api/user/login`,
            options
          );

          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
          }
          const data = await response.json();
          console.log(data);
          localStorage.setItem("token", data.access_token);
          setStore({ token: data.access_token });
          setStore({ artistName: data.artist_name });
          setStore({ username: data.username });
          return true;
        } catch (error) {
          console.log(error);
          return false;
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
          return true;
        } catch (error) {
          console.log(error);
          return false;
        }
      },

      logout: () => {
        localStorage.removeItem("token");
        setStore({ token: null });
        return true;
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
    },
  };
};

export default getState;

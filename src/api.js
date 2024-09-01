export const BASE_URL = "http://localhost:3000";

export const Request = {
  postUser: async (user) => {
    const checkResponse = await fetch(
      `${BASE_URL}/users?username=${user.username}`
    );
    const existingUsers = await checkResponse.json();

    if (existingUsers.length > 0) {
      throw new Error("Username already taken");
    }
    const response = await fetch(`${BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      throw new Error(`HTTP failed with status code of ${response.status}`);
    }
    return response.json();
  },
  getShoes: async () => {
    try {
      const response = await fetch(`${BASE_URL}/shoes`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data; // Ensure it returns the correct structure
    } catch (error) {
      console.error("Error fetching data: ", error);
      return [];
    }
  },

  createFavorite: async (userId, shoeId, name) => {
    fetch(`${BASE_URL}/favorites`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, shoeId, name }),
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Failed to create Favorite");
      }
      return response;
    });
  },
  getAllFavorite: async () => {
    return fetch("http://localhost:3000/favorites").then((response) => {
      if (!response.ok) {
        throw new Error("Failed to get Favorites");
      }
      return response.json();
    });
  },

  removeFavorite: async ({ favoriteId }) =>
    fetch(`http://localhost:3000/favorites/${favoriteId}`, {
      method: "DELETE",
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Failed To remove favorites");
      }
      return response;
    }),

  addToCart: async (userId, shoeId, name, price) => {
    fetch(`${BASE_URL}/carts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, shoeId, name, price }),
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Failed to create cart");
      }
      return response;
    });
  },
  getAllCarts: async () => {
    return fetch("http://localhost:3000/carts").then((response) => {
      if (!response.ok) {
        throw new Error("Failed to get carts");
      }
      return response.json();
    });
  },
  getACart: async ({ userId }) => {
    return fetch(`http://localhost:3000/carts?userId=${userId}`).then(
      (response) => {
        if (!response.ok) {
          throw new Error("Failed to get carts");
        }
        return response.json();
      }
    );
  },

  removeFromCart: async ({ cartId }) =>
    fetch(`http://localhost:3000/carts/${cartId}`, {
      method: "DELETE",
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Failed To remove carts");
      }
      return response;
    }),
};

export const getShoes = Request.getShoes;
export const createFavorite = Request.createFavorite;
export const getAllFavorite = Request.getAllFavorite;
export const removeFavorite = Request.removeFavorite;
export const addToCart = Request.addToCart;
export const getAllCarts = Request.getAllCarts;
export const getACart = Request.getACart;
export const removeFromCart = Request.removeFromCart;

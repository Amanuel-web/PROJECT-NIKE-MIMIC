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
    const response = await fetch(`${BASE_URL}/favorites`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, shoeId, name }),
    });
    if (!response.ok) {
      throw new Error("Failed to create Favorite");
    }
    return response.json();
  },
  getFavorite: async ({ userId }) => {
    return fetch(`http://localhost:3000/favorites?userId=${userId}`).then(
      (response) => {
        if (!response.ok) {
          throw new Error("Failed to get carts");
        }
        return response.json();
      }
    );
  },

  removeFavorite: async ({ favoriteId }) => {
    const response = await fetch(`${BASE_URL}/favorites/${favoriteId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to remove favorite");
    }
    return response;
  },

  addToCart: async (userId, shoeId, name, price) => {
    const response = await fetch(`${BASE_URL}/carts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, shoeId, name, price }),
    });
    if (!response.ok) {
      throw new Error("Failed to create cart");
    }
    return response.json();
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

  removeFromCart: async ({ cartId }) => {
    const response = await fetch(`${BASE_URL}/carts/${cartId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to remove cart item");
    }
    return response;
  },
};

export const getShoes = Request.getShoes;
export const createFavorite = Request.createFavorite;
export const getFavorite = Request.getFavorite;
export const removeFavorite = Request.removeFavorite;
export const addToCart = Request.addToCart;
export const getACart = Request.getACart;
export const removeFromCart = Request.removeFromCart;

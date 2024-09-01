import { createFavorite, getAllFavorite, removeFavorite } from "../src/api";

export const FavoriteToggle = async ({ userId, shoeId }) => {
  const allFavorite = await getAllFavorite();
  const matchingFavorite = allFavorite.find(
    (favorite) => favorite.userId === userId && favorite.shoeId === shoeId
  );

  if (!matchingFavorite) {
    return await createFavorite({ userId, shoeId });
  }

  return await removeFavorite(matchingFavorite.id);
};

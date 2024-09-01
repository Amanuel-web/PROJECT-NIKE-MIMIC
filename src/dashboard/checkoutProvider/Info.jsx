import * as React from "react";
import PropTypes from "prop-types";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { getACart } from "../../api";
import { useUser } from "../../providers/UserProvider";

function Info({ totalPrice }) {
  const [products, setProducts] = React.useState([]);
  const { user } = useUser();

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const cartItems = await getACart({ userId: user });
        setProducts(cartItems);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchProducts();
  }, [user]);
  return (
    <React.Fragment>
      <Typography variant="subtitle2" color="white">
        Total
      </Typography>
      <Typography variant="h4" gutterBottom>
        {totalPrice}
      </Typography>
      <List disablePadding>
        {products.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText sx={{ mr: 2 }} primary={product.name} />
            <Typography variant="body1" fontWeight="medium">
              {product.price}
            </Typography>
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  );
}

Info.propTypes = {
  totalPrice: PropTypes.string.isRequired,
};

export default Info;

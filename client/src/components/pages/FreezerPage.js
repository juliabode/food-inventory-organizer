import React, { useState, useContext } from 'react';
import { Trans } from 'react-i18next';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import { AppContext } from '../../App.js';
import Products from '../products/Products';
import ProductDialog from '../products/ProductDialog';
import IProduct from '../../utils/schema/product.js';
import { getAllProducts } from '../../utils/api/products';

import './Freezer.css';

const FreezerPage = () => {
  const context = useContext(AppContext);

  const [productToEdit, setProductToEdit] = useState({ ...IProduct });
  const [openProductDialog, setOpenProductDialog] = useState(false);

  function getUpdatedProductList() {
    getAllProducts().then((result) => context.products.set(result));
  }

  function editProduct(product) {
    setProductToEdit({ ...product });
    setOpenProductDialog(true);
  }

  return (
    <Container maxWidth="lg" className="jss13">
      <Grid container spacing={3}>
        {/* Add new Products */}
        <Grid item xs={12}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setOpenProductDialog(true)}
            startIcon={<AddCircleIcon />}
            className="jss110"
          >
            <Trans>freezer.products.add.button</Trans>
          </Button>
          <ProductDialog
            getUpdatedProductList={getUpdatedProductList}
            productToEdit={productToEdit}
            setProductToEdit={setProductToEdit}
            openProductDialog={openProductDialog}
            setOpenProductDialog={setOpenProductDialog}
          />
        </Grid>
        <div className="jss11" />
        {/* All Products */}
        <Grid item xs={12}>
          <Paper className="jss14">
            <Products
              products={context.products.get}
              editProduct={editProduct}
              getUpdatedProductList={getUpdatedProductList}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FreezerPage;

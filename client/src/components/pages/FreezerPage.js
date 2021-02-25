import React, { useState, useContext } from 'react';
import { Trans } from 'react-i18next';

import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import Paper from '@material-ui/core/Paper';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import TuneIcon from '@material-ui/icons/Tune';

import { AppContext } from '../../App.js';
import Products from '../products/Products';
import ProductDialog from '../products/ProductDialog';
import ProductFilter from '../products/ProductFilter';
import IProduct from '../../utils/schema/product.js';
import { getAllProducts, filterAllProducts } from '../../utils/api/products';
import { PAGE_SIZE } from '../../utils/constants';

import './Freezer.css';

const FreezerPage = () => {
  const context = useContext(AppContext);

  const [productToEdit, setProductToEdit] = useState({ ...IProduct });
  const [openProductDialog, setOpenProductDialog] = useState(false);
  const [openFilters, setOpenFilters] = useState(false);
  const [filterData, setFilterData] = useState();

  const pagesCount = Math.ceil(context.pagination.totals.get / PAGE_SIZE);

  function getUpdatedProductList(sort, direction) {
    getAllProducts({
      sort: sort || context.sorting.sort.get,
      direction: direction || context.sorting.direction.get,
    }).then((result) => {
      context.products.set(result);
      context.pagination.totals.set(result.length);
    });
  }

  function editProduct(product) {
    setProductToEdit({ ...product });
    setOpenProductDialog(true);
  }

  const handlePageChange = (event, value) => {
    context.pagination.page.set(value);
  };

  const filterProducts = (sort, direction) => {
    filterAllProducts({
      sort: sort || context.sorting.sort.get,
      direction: direction || context.sorting.direction.get,
      ...filterData,
    }).then((result) => {
      context.products.set(result);
      context.pagination.totals.set(result.length);
      context.pagination.page.set(1);
    });
  };

  return (
    <Container maxWidth="lg" className="jss13">
      <Grid container spacing={3}>
        {/* Add new Products */}
        <Grid item xs={6}>
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
        <Grid item xs={6}>
          <Grid container spacing={3} justify="flex-end">
            <Grid item>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => setOpenFilters(!openFilters)}
                startIcon={<TuneIcon />}
                className="jss110"
              >
                <Trans>freezer.products.filter.open</Trans>
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Collapse in={openFilters} className="collapse">
          <Grid item xs={12}>
            <Paper className="jss14">
              <ProductFilter
                getUpdatedProductList={getUpdatedProductList}
                filterData={filterData}
                setFilterData={setFilterData}
                filterProducts={filterProducts}
              ></ProductFilter>
            </Paper>
          </Grid>
        </Collapse>
        {/* All Products */}
        <Grid item xs={12}>
          <Paper className="jss14">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Products
                  products={context.products.get}
                  editProduct={editProduct}
                  getUpdatedProductList={getUpdatedProductList}
                  page={context.pagination.page.get}
                  sorting={context.sorting}
                  filterProducts={filterProducts}
                />
              </Grid>
              <Grid item xs={12}>
                <Grid container justify="center">
                  <Pagination
                    count={pagesCount}
                    page={context.pagination.page.get}
                    variant="outlined"
                    onChange={handlePageChange}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FreezerPage;

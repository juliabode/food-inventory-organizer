import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { mainListItems } from '../common/listItems';
import Products from '../products/Products';
import AddProduct from '../products/AddProduct';
import './Freezer.css';

export default class Freezer extends React.Component {
  constructor() {
    super();

    this.state = {
      products: [],
      productToEdit: {},
      openProductDialog: false,
      auth: btoa('admin:' + process.env.REACT_APP_ADMIN_PASS),
    };

    this.getAllProducts = this.getAllProducts.bind(this);
    this.onProductDelete = this.onProductDelete.bind(this);
    this.addProduct = this.addProduct.bind(this);
    this.editProduct = this.editProduct.bind(this);
    this.changeProduct = this.changeProduct.bind(this);
    this.handleDialog = this.handleDialog.bind(this);
  }

  handleDialog(isOpen) {
    this.setState({
      productToEdit: {
        name: '',
        notes: '',
        quantity: '',
        type: '',
        mhd: null,
        freezeDate: null,
        freezerLocation: '',
        compartement: null,
      },
      openProductDialog: isOpen,
    });
  }

  getAllProducts() {
    fetch('/api/products', {
      headers: {
        /* TO BE REMOVED WHEN CREATING USER ACCOUNTS! */
        Authorization: 'Basic ' + this.state.auth,
      },
    })
      .then((res) => res.json())
      .then((products) => this.setState({ products }));
  }

  onProductDelete(productId) {
    this.setState({
      products: this.state.products.filter((entry) => {
        return entry._id !== productId;
      }),
    });
  }

  addProduct(newProduct) {
    this.setState({
      products: [...this.state.products, newProduct],
    });
  }

  editProduct(product) {
    this.setState({ productToEdit: { ...product }, openProductDialog: true });
  }

  changeProduct(productData) {
    this.setState({
      products: this.state.products.map((product) =>
        product._id === productData._id ? { ...productData } : product
      ),
    });
  }

  render() {
    return (
      <div className="jss1">
        <CssBaseline />
        <AppBar position="absolute" className="jss4 jss5">
          <Toolbar className="jss2">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              className="jss6 jss7"
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className="jss8"
            >
              Freezer
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: 'jss9',
          }}
        >
          <div className="jss3">
            <IconButton>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>{mainListItems}</List>
        </Drawer>
        <main className="jss12">
          <div className="jss11" />
          <Container maxWidth="lg" className="jss13">
            <Grid container spacing={3}>
              {/* Add new Products */}
              <Grid item xs={12}>
                <AddProduct
                  productToEdit={this.state.productToEdit}
                  addProduct={this.addProduct}
                  changeProduct={this.changeProduct}
                  openDialog={this.state.openProductDialog}
                  handleDialog={this.handleDialog}
                />
              </Grid>
              <div className="jss11" />
              {/* All Products */}
              <Grid item xs={12}>
                <Paper className="jss14">
                  <Products
                    products={this.state.products}
                    getAllProducts={this.getAllProducts}
                    onProductDelete={this.onProductDelete}
                    editProduct={this.editProduct}
                  />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </main>
      </div>
    );
  }
}

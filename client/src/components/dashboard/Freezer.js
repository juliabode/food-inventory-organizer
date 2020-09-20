import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
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
    );
  }
}

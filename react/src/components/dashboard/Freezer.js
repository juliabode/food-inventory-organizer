import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
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
      'products': [],
      'auth': btoa('admin:' + process.env.REACT_APP_ADMIN_PASS)
    };

    this.getAllProducts = this.getAllProducts.bind(this);
    this.onProductDelete = this.onProductDelete.bind(this);
  }

  getAllProducts() {
    fetch('/api/products', {
      headers: {
        /* TO BE REMOVED WHEN CREATING USER ACCOUNTS! */
        'Authorization': 'Basic ' + this.state.auth
      }
    }).then(res => res.json())
      .then(products => this.setState({ products }));
  }

  onProductDelete(productId) {
    this.setState({
      products:
        this.state.products
          .filter(entry => {
            return entry._id !== productId
          })
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
            <Typography component="h1" variant="h6" color="inherit" noWrap className="jss8">
              Freezer
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          open='open'
          classes={{
            paper: "jss9"
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
          <div className="jss11"/>
          <Container maxWidth="lg" className="jss13">
            <Grid container spacing={3}>
              {/* All Products */}
              <Grid item xs={12}>
                <Paper className="jss14">
                  <Products
                    products={this.state.products}
                    getAllProducts={this.getAllProducts}
                    onProductDelete={this.onProductDelete} />
                </Paper>
              </Grid>
              <div className="jss11"/>
              {/* Recent Products */}
              <Grid item xs={12}>
                <Paper  className="jss14">
                  <AddProduct />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </main>
      </div>
    )
  }
}

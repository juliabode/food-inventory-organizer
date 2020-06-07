import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import DateFnsUtils from '@date-io/date-fns';
import { Trans } from 'react-i18next';
import {
  MuiPickersUtilsProvider,
  DatePicker
} from '@material-ui/pickers';

export default class AddProductForm extends React.Component {

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      name: '',
      notes: '',
      quantity: '',
      type: '',
      mhd: null,
      freezeDate: null,
      freezerLocation: '',
      compartement: '',
      auth: btoa('admin:' + process.env.REACT_APP_ADMIN_PASS)
    };
  }

  onDateChange = (freezeDate) => {
    this.setState({ freezeDate });
  }

  onMhdChange = (mhd) => {
    this.setState({ mhd });
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = {
      'name': this.state.name,
      'notes': this.state.notes,
      'freezeDate': this.state.freezeDate,
      'mhd': this.state.mhd,
      'quantity': this.state.quantity,
      'type': this.state.type,
      'freezerLocation': this.state.freezerLocation,
      'compartment': this.state.compartment
    };

    fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        /* TO BE REMOVED WHEN CREATING USER ACCOUNTS! */
        'Authorization': 'Basic ' + this.state.auth
      },
      body: JSON.stringify(data)
    });
  }

  render() {
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          <Trans>freezer.products.add.title</Trans>
        </Typography>
        <form onSubmit={this.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                id="name"
                name="name"
                label=<Trans>freezer.products.add.form.name</Trans>
                fullWidth
                required
                value={this.state.name}
                onChange={this.onChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
            </Grid>

            <Grid item xs={12} sm={6}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  format="dd. MM. yyyy"
                  label=<Trans>freezer.products.add.form.freezeDate</Trans>
                  name="freezeDate"
                  fullWidth
                  value={this.state.freezeDate}
                  onChange={this.onDateChange}
                />
              </MuiPickersUtilsProvider>
            </Grid>

            <Grid item xs={12} sm={6}>
            </Grid>

            <Grid item xs={12} sm={6}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  format="dd. MM. yyyy"
                  label=<Trans>freezer.products.add.form.bestBefore</Trans>
                  fullWidth
                  name="mhd"
                  value={this.state.mhd}
                  onChange={this.onMhdChange}
                />
              </MuiPickersUtilsProvider>
            </Grid>

            <Grid item xs={12} sm={6}>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="type-label"><Trans>freezer.products.add.form.type.label</Trans></InputLabel>
                <Select
                  labelId="type-label"
                  id="type"
                  name="type"
                  required
                  value={this.state.type}
                  onChange={this.onChange}
                >
                  <MenuItem value="fish"><Trans>freezer.products.add.form.type.fish</Trans></MenuItem>
                  <MenuItem value="meat"><Trans>freezer.products.add.form.type.meat</Trans></MenuItem>
                  <MenuItem value="vegetable"><Trans>freezer.products.add.form.type.vegetable</Trans></MenuItem>
                  <MenuItem value="fruit"><Trans>freezer.products.add.form.type.fruit</Trans></MenuItem>
                  <MenuItem value="fruit"><Trans>freezer.products.add.form.type.bread</Trans></MenuItem>
                  <MenuItem value="misc"><Trans>freezer.products.add.form.type.misc</Trans></MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                id="quantity"
                label=<Trans>freezer.products.add.form.quantity</Trans>
                name="quantity"
                type="number"
                fullWidth
                value={this.state.quantity}
                onChange={this.onChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="freezerLocation-label"><Trans>freezer.products.add.form.freezerLocation.label</Trans></InputLabel>
                <Select
                  labelId="freezerLocation-label"
                  id="freezerLocation"
                  name="freezerLocation"
                  required
                  value={this.state.freezerLocation}
                  onChange={this.onChange}
                >
                  <MenuItem value="cellarChest"><Trans>freezer.products.add.form.freezerLocation.cellarChest</Trans></MenuItem>
                  <MenuItem value="cellar"><Trans>freezer.products.add.form.freezerLocation.cellar</Trans></MenuItem>
                  <MenuItem value="parents"><Trans>freezer.products.add.form.freezerLocation.parents</Trans></MenuItem>
                  <MenuItem value="grandfather"><Trans>freezer.products.add.form.freezerLocation.grandfather</Trans></MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                id="compartment"
                label=<Trans>freezer.products.add.form.compartment</Trans>
                name="compartment"
                type="number"
                inputProps={{ min: "1", max: "4" }}
                fullWidth
                value={this.state.compartment}
                onChange={this.onChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                id="notes"
                label=<Trans>freezer.products.add.form.notes</Trans>
                name="notes"
                fullWidth
                value={this.state.notes}
                onChange={this.onChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button variant="contained" color="primary" type="submit">
                <Trans>freezer.products.add.form.saveData</Trans>
              </Button>
            </Grid>
          </Grid>
        </form>
      </React.Fragment>
    );
  }
}

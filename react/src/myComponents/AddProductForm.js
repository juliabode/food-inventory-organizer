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
      freezeDate: null
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
      'type': this.state.type
    };

    fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
  }

  render() {
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Insert new product
        </Typography>
        <form onSubmit={this.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                id="name"
                name="name"
                label="Name"
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
                  label="Datum"
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
                  label="Mindesthaltbarkeit"
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
                <InputLabel id="type-label">Type</InputLabel>
                <Select
                  labelId="type-label"
                  id="type"
                  name="type"
                  required
                  value={this.state.type}
                  onChange={this.onChange}
                >
                  <MenuItem value="fish">Fisch</MenuItem>
                  <MenuItem value="meat">Fleisch</MenuItem>
                  <MenuItem value="vegetable">Gemüse</MenuItem>
                  <MenuItem value="fruit">Obst</MenuItem>
                  <MenuItem value="misc">Verschiedenes</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                id="quantity"
                label="Quantity"
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
              <TextField
                id="notes"
                label="Notes"
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
                Send data!
              </Button>
            </Grid>
          </Grid>
        </form>
      </React.Fragment>
    );
  }
}

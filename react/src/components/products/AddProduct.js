import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import DateFnsUtils from '@date-io/date-fns';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Trans } from 'react-i18next';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';

export default class AddProductForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDialog = this.handleDialog.bind(this);

    this.state = {
      name: '',
      notes: '',
      quantity: '',
      type: '',
      mhd: null,
      freezeDate: null,
      freezerLocation: '',
      compartement: '',
      openDialog: false,
      auth: btoa('admin:' + process.env.REACT_APP_ADMIN_PASS),
    };
  }

  onDateChange = (freezeDate) => {
    this.setState({ freezeDate });
  };

  onMhdChange = (mhd) => {
    this.setState({ mhd });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleDialog(isOpen) {
    this.setState({ openDialog: isOpen });
  }

  resetForm() {
    this.setState({
      name: '',
      notes: '',
      quantity: '',
      type: '',
      mhd: null,
      freezeDate: null,
      freezerLocation: '',
      compartement: '',
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = {
      name: this.state.name,
      notes: this.state.notes,
      freezeDate: this.state.freezeDate,
      mhd: this.state.mhd,
      quantity: this.state.quantity,
      type: this.state.type,
      freezerLocation: this.state.freezerLocation,
      compartment: this.state.compartment,
    };

    fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        /* TO BE REMOVED WHEN CREATING USER ACCOUNTS! */
        Authorization: 'Basic ' + this.state.auth,
      },
      body: JSON.stringify(data),
    }).then(() => {
      this.handleDialog(false);
      this.resetForm();
      this.props.addProduct(data);
    });
  }

  render() {
    return (
      <React.Fragment>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => this.handleDialog(true)}
          startIcon={<AddCircleIcon />}
          className="jss110"
        >
          <Trans>freezer.products.add.button</Trans>
        </Button>
        <Dialog
          open={this.state.openDialog}
          onClose={() => this.handleDialog(false)}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            <Trans>freezer.products.add.title</Trans>
          </DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit} className="jss226">
              <TextField
                id="name"
                name="name"
                variant="outlined"
                label=<Trans>freezer.products.add.form.name</Trans>
                fullWidth
                required
                value={this.state.name}
                onChange={this.onChange}
              />

              <div className="jss111">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DatePicker
                    format="dd. MM. yyyy"
                    label=<Trans>freezer.products.add.form.freezeDate</Trans>
                    name="freezeDate"
                    autoOk
                    inputVariant="outlined"
                    value={this.state.freezeDate}
                    onChange={this.onDateChange}
                  />
                </MuiPickersUtilsProvider>

                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DatePicker
                    format="dd. MM. yyyy"
                    label=<Trans>freezer.products.add.form.bestBefore</Trans>
                    autoOk
                    name="mhd"
                    inputVariant="outlined"
                    value={this.state.mhd}
                    onChange={this.onMhdChange}
                  />
                </MuiPickersUtilsProvider>
              </div>

              <FormControl fullWidth variant="outlined">
                <InputLabel id="type-label">
                  <Trans>freezer.products.add.form.type.label</Trans>
                </InputLabel>
                <Select
                  labelId="type-label"
                  id="type"
                  name="type"
                  required
                  value={this.state.type}
                  onChange={this.onChange}
                >
                  <MenuItem value="fish">
                    <Trans>freezer.products.add.form.type.fish</Trans>
                  </MenuItem>
                  <MenuItem value="meat">
                    <Trans>freezer.products.add.form.type.meat</Trans>
                  </MenuItem>
                  <MenuItem value="vegetable">
                    <Trans>freezer.products.add.form.type.vegetable</Trans>
                  </MenuItem>
                  <MenuItem value="fruit">
                    <Trans>freezer.products.add.form.type.fruit</Trans>
                  </MenuItem>
                  <MenuItem value="fruit">
                    <Trans>freezer.products.add.form.type.bread</Trans>
                  </MenuItem>
                  <MenuItem value="misc">
                    <Trans>freezer.products.add.form.type.misc</Trans>
                  </MenuItem>
                </Select>
              </FormControl>

              <TextField
                id="quantity"
                label=<Trans>freezer.products.add.form.quantity</Trans>
                name="quantity"
                type="number"
                fullWidth
                variant="outlined"
                value={this.state.quantity}
                onChange={this.onChange}
              />

              <div className="jss111">
                <FormControl variant="outlined">
                  <InputLabel id="freezerLocation-label">
                    <Trans>
                      freezer.products.add.form.freezerLocation.label
                    </Trans>
                  </InputLabel>
                  <Select
                    labelId="freezerLocation-label"
                    id="freezerLocation"
                    name="freezerLocation"
                    required
                    value={this.state.freezerLocation}
                    onChange={this.onChange}
                  >
                    <MenuItem value="cellarChest">
                      <Trans>
                        freezer.products.add.form.freezerLocation.cellarChest
                      </Trans>
                    </MenuItem>
                    <MenuItem value="cellar">
                      <Trans>
                        freezer.products.add.form.freezerLocation.cellar
                      </Trans>
                    </MenuItem>
                    <MenuItem value="parents">
                      <Trans>
                        freezer.products.add.form.freezerLocation.parents
                      </Trans>
                    </MenuItem>
                    <MenuItem value="grandfather">
                      <Trans>
                        freezer.products.add.form.freezerLocation.grandfather
                      </Trans>
                    </MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  id="compartment"
                  label=<Trans>freezer.products.add.form.compartment</Trans>
                  name="compartment"
                  type="number"
                  inputProps={{ min: '1', max: '4' }}
                  variant="outlined"
                  value={this.state.compartment}
                  onChange={this.onChange}
                />
              </div>

              <TextField
                id="notes"
                label=<Trans>freezer.products.add.form.notes</Trans>
                name="notes"
                fullWidth
                value={this.state.notes}
                onChange={this.onChange}
                variant="outlined"
              />
            </form>
          </DialogContent>
          <DialogActions className="jss112">
            <Button onClick={() => this.handleDialog(false)} color="primary">
              <Trans>freezer.products.add.form.cancel</Trans>
            </Button>

            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={this.handleSubmit}
            >
              <Trans>freezer.products.add.form.saveData</Trans>
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

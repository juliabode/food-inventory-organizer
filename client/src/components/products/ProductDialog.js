import React from 'react';
import { Trans } from 'react-i18next';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

import DateFnsUtils from '@date-io/date-fns';

import { updateProduct, addNewProduct } from '../../utils/api/products';
import IProduct from '../../utils/schema/product.js';

const ProductDialog = (props) => {
  const {
    openProductDialog,
    setOpenProductDialog,
    productToEdit,
    setProductToEdit,
    getUpdatedProductList,
  } = { ...props };

  const foodTypes = [
    'fish',
    'meat',
    'vegetable',
    'fruit',
    'herbs',
    'readyMeal',
    'misc',
  ];

  const freezerLocations = ['cellarChest', 'cellar', 'parents', 'grandfather'];

  function handleSubmit(event) {
    event.preventDefault();
    const data = { ...productToEdit };

    if (productToEdit._id) {
      data._id = productToEdit._id;
      updateProduct(data).then(() => {
        resetDialogForm();
        getUpdatedProductList(data);
      });
    } else {
      addNewProduct(data).then(() => {
        resetDialogForm();
        getUpdatedProductList(data);
      });
    }
  }

  function onDateChange(freezeDate) {
    setProductToEdit({ ...productToEdit, freezeDate });
  }

  function onMhdChange(mhd) {
    setProductToEdit({ ...productToEdit, mhd });
  }

  function onChange(e) {
    setProductToEdit({ ...productToEdit, [e.target.name]: e.target.value });
  }

  function resetDialogForm() {
    setOpenProductDialog(false);
    setProductToEdit({ IProduct });
  }

  return (
    <>
      <Dialog
        open={openProductDialog}
        onClose={() => resetDialogForm()}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          <Trans>freezer.products.add.title</Trans>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={() => handleSubmit()} className="jss226">
            <TextField
              id="name"
              name="name"
              variant="outlined"
              label={<Trans>freezer.products.add.form.name</Trans>}
              fullWidth
              required
              value={productToEdit.name ?? ''}
              onChange={(e) => onChange(e)}
            />
            <div className="jss111">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  format="dd. MM. yyyy"
                  label={<Trans>freezer.products.add.form.freezeDate</Trans>}
                  name="freezeDate"
                  autoOk
                  inputVariant="outlined"
                  value={productToEdit.freezeDate ?? null}
                  onChange={(freezeDate) => onDateChange(freezeDate)}
                />
              </MuiPickersUtilsProvider>

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  format="dd. MM. yyyy"
                  label={<Trans>freezer.products.add.form.bestBefore</Trans>}
                  autoOk
                  name="mhd"
                  inputVariant="outlined"
                  value={productToEdit.mhd ?? null}
                  onChange={(mhd) => onMhdChange(mhd)}
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
                value={productToEdit.type ?? ''}
                onChange={(e) => onChange(e)}
              >
                {foodTypes.map((foodType) => (
                  <MenuItem key={foodType} value={foodType}>
                    <Trans>freezer.products.add.form.type.{foodType}</Trans>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              id="quantity"
              label={<Trans>freezer.products.add.form.quantity</Trans>}
              name="quantity"
              type="number"
              fullWidth
              variant="outlined"
              value={productToEdit.quantity ?? ''}
              onChange={(e) => onChange(e)}
            />

            <div className="jss111">
              <FormControl variant="outlined">
                <InputLabel id="freezerLocation-label">
                  <Trans>freezer.products.add.form.freezerLocation.label</Trans>
                </InputLabel>
                <Select
                  labelId="freezerLocation-label"
                  id="freezerLocation"
                  name="freezerLocation"
                  required
                  value={productToEdit.freezerLocation ?? ''}
                  onChange={(e) => onChange(e)}
                >
                  {freezerLocations.map((freezerLocation) => (
                    <MenuItem key={freezerLocation} value={freezerLocation}>
                      <Trans>
                        freezer.products.add.form.freezerLocation.
                        {freezerLocation}
                      </Trans>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                id="compartment"
                label={<Trans>freezer.products.add.form.compartment</Trans>}
                name="compartment"
                type="number"
                inputProps={{ min: '1', max: '4' }}
                variant="outlined"
                value={productToEdit.compartment ?? ''}
                onChange={(e) => onChange(e)}
              />
            </div>

            <TextField
              id="notes"
              label={<Trans>freezer.products.add.form.notes</Trans>}
              name="notes"
              fullWidth
              value={productToEdit.notes ?? ''}
              onChange={(e) => onChange(e)}
              variant="outlined"
            />
          </form>
        </DialogContent>
        <DialogActions className="jss112">
          <Button onClick={() => resetDialogForm()} color="primary">
            <Trans>freezer.products.add.form.cancel</Trans>
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={(event) => handleSubmit(event)}
          >
            <Trans>freezer.products.add.form.saveData</Trans>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProductDialog;

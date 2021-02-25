import React from 'react';
import { Trans } from 'react-i18next';

import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const ProductFilter = (props) => {
  const { getUpdatedProductList, filterData, setFilterData, filterProducts } = {
    ...props,
  };

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
    filterProducts();
  }

  function onChange(e) {
    setFilterData({ ...filterData, [e.target.name]: e.target.value });
  }

  function removeFilters() {
    setFilterData({});
    getUpdatedProductList();
  }

  return (
    <>
      <form onSubmit={() => handleSubmit()}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="type-label">
                <Trans>freezer.products.add.form.type.label</Trans>
              </InputLabel>
              <Select
                labelId="type-label"
                id="type"
                name="type"
                required
                value={filterData?.type ?? ''}
                onChange={(e) => onChange(e)}
              >
                {foodTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    <Trans>freezer.products.add.form.type.{type}</Trans>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="freezerLocation-label">
                <Trans>freezer.products.add.form.freezerLocation.label</Trans>
              </InputLabel>
              <Select
                labelId="freezerLocation-label"
                id="freezerLocation"
                name="freezerLocation"
                required
                value={filterData?.freezerLocation ?? ''}
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
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={3} justify="flex-end">
              <Grid item>
                <Button onClick={() => removeFilters()} color="primary">
                  <Trans>freezer.products.filter.resetFilters</Trans>
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  onClick={(event) => handleSubmit(event)}
                >
                  <Trans>global.search</Trans>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default ProductFilter;

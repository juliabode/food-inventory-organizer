import React, { useState } from 'react';
import { Trans } from 'react-i18next';
import moment from 'moment';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import Title from '../common/Title';
import { removeProduct } from '../../utils/api/products';

const Products = (props) => {
  const { products, editProduct, getUpdatedProductList } = { ...props };
  const [open, setOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState();

  const tableHeaders = [
    { headerName: 'name' },
    { headerName: 'freezeDate' },
    { headerName: 'bestBefore' },
    { headerName: 'type' },
    { headerName: 'quantity', align: 'right' },
    { headerName: 'freezerLocation' },
    { headerName: 'compartment' },
    { headerName: 'notes' },
  ];

  function deleteProduct() {
    setOpen(false);
    removeProduct({ _id: activeProduct }).then((result) =>
      getUpdatedProductList()
    );
    setActiveProduct('');
  }

  return (
    <>
      <Title>
        <Trans>freezer.products.title</Trans>
      </Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            {tableHeaders.map((tableHeader) => (
              <TableCell key={tableHeader.headerName} align={tableHeader.align}>
                <Trans>
                  freezer.products.table.header.{tableHeader.headerName}
                </Trans>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product._id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>
                {product.freezeDate
                  ? moment(product.freezeDate).format('DD. MM. YYYY')
                  : ''}
              </TableCell>
              <TableCell>
                {product.mhd ? moment(product.mhd).format('DD. MM. YYYY') : ''}
              </TableCell>
              <TableCell>
                {product.type ? (
                  <Trans>freezer.products.table.type.{product.type}</Trans>
                ) : (
                  ''
                )}
              </TableCell>
              <TableCell align="right">{product.quantity}</TableCell>
              <TableCell>
                {product.freezerLocation ? (
                  <Trans>
                    freezer.products.table.freezerLocation.
                    {product.freezerLocation}
                  </Trans>
                ) : (
                  ''
                )}
              </TableCell>
              <TableCell>{product.compartment}</TableCell>
              <TableCell>{product.notes}</TableCell>
              <TableCell>
                <IconButton
                  aria-label="edit"
                  size="small"
                  onClick={() => editProduct(product)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  size="small"
                  onClick={() => {
                    setOpen(true);
                    setActiveProduct(product._id);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>{'Do you really want to remove the Product?'}</DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            <Trans>freezer.products.add.form.cancel</Trans>
          </Button>
          <Button
            onClick={() => deleteProduct()}
            variant="contained"
            color="primary"
          >
            <Trans>freezer.products.add.form.saveData</Trans>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Products;

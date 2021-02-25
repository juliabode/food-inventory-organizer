import React, { useState } from 'react';
import cn from 'classnames';
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
import ArrowDropDownRoundedIcon from '@material-ui/icons/ArrowDropDownRounded';
import ArrowDropUpRoundedIcon from '@material-ui/icons/ArrowDropUpRounded';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import Title from '../common/Title';
import { removeProduct } from '../../utils/api/products';
import { PAGE_SIZE } from '../../utils/constants';
import styles from './products.module.scss';

const Products = (props) => {
  const {
    products,
    editProduct,
    getUpdatedProductList,
    page,
    sorting,
    filterProducts,
  } = {
    ...props,
  };
  const [open, setOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState();

  const tableHeaders = [
    { headerName: 'name', sortable: true },
    { headerName: 'freezeDate', sortable: true },
    { headerName: 'mhd', sortable: true },
    { headerName: 'type', sortable: true },
    { headerName: 'quantity', align: 'right' },
    { headerName: 'freezerLocation', sortable: true },
    { headerName: 'compartment' },
    { headerName: 'notes' },
    { headerName: '' },
  ];

  const entryStart = (page - 1) * PAGE_SIZE;
  const entryEnd = entryStart + PAGE_SIZE;

  const sortProductList = (sortName, direction) => {
    sorting.sort.set(sortName);
    sorting.direction.set(direction);
    filterProducts(sortName, direction);
  };

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
          <TableRow className={styles.tableHead}>
            {tableHeaders.map((tableHeader) => (
              <TableCell key={tableHeader.headerName} align={tableHeader.align}>
                {tableHeader.headerName && (
                  <>
                    {tableHeader.sortable ? (
                      <div
                        className={cn(styles.clickableHeader, {
                          [styles[`direction${sorting.direction.get}`]]:
                            sorting.sort.get === tableHeader.headerName,
                        })}
                        onClick={() =>
                          sortProductList(
                            tableHeader.headerName,
                            sorting.sort.get !== tableHeader.headerName
                              ? sorting.direction.get
                              : sorting.direction.get === 'DESC'
                              ? 'ASC'
                              : 'DESC'
                          )
                        }
                      >
                        <Trans>
                          freezer.products.table.header.{tableHeader.headerName}
                        </Trans>
                        <span className={styles.sortableArrows}>
                          <ArrowDropUpRoundedIcon />
                          <ArrowDropDownRoundedIcon />
                        </span>
                      </div>
                    ) : (
                      <Trans>
                        freezer.products.table.header.{tableHeader.headerName}
                      </Trans>
                    )}
                  </>
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {products.slice(entryStart, entryEnd).map((product) => (
            <TableRow key={product._id} className={styles.tableRow}>
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
        <DialogTitle>
          <Trans>freezer.products.delete.title</Trans>
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            <Trans>global.cancel</Trans>
          </Button>
          <Button
            onClick={() => deleteProduct()}
            variant="contained"
            color="primary"
          >
            <Trans>global.ok</Trans>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Products;

import React from 'react';
import { Trans } from 'react-i18next';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import moment from 'moment';
import Title from './Title';

export default class Orders extends React.Component {
  state = {products: []}

  componentDidMount() {
    fetch('/api/products')
      .then(res => res.json())
      .then(products => this.setState({ products }));
  }

  render() {
    return (
      <React.Fragment>
        <Title><Trans>freezer.products.title</Trans></Title>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell><Trans>freezer.products.table.header.name</Trans></TableCell>
              <TableCell><Trans>freezer.products.table.header.freezeDate</Trans></TableCell>
              <TableCell><Trans>freezer.products.table.header.bestBefore</Trans></TableCell>
              <TableCell><Trans>freezer.products.table.header.type</Trans></TableCell>
              <TableCell align="right"><Trans>freezer.products.table.header.quantity</Trans></TableCell>
              <TableCell><Trans>freezer.products.table.header.freezerLocation</Trans></TableCell>
              <TableCell><Trans>freezer.products.table.header.compartment</Trans></TableCell>
              <TableCell><Trans>freezer.products.table.header.notes</Trans></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.products.map((product) => (
              <TableRow key={product._id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{moment(product.freezeDate).format('DD. MM. YYYY')}</TableCell>
                <TableCell>{moment(product.mhd).format('DD. MM. YYYY')}</TableCell>
                <TableCell><Trans>freezer.products.table.type.{product.type}</Trans></TableCell>
                <TableCell align="right">{product.quantity}</TableCell>
                <TableCell><Trans>freezer.products.table.freezerLocation.{product.freezerLocation}</Trans></TableCell>
                <TableCell>{product.compartment}</TableCell>
                <TableCell>{product.notes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </React.Fragment>
    );
  }
}

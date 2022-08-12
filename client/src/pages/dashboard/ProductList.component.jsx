import { useDispatch } from 'react-redux';
import { filter } from 'lodash';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom';
import Moment from 'react-moment';
// material
import {
  Card,
  Table,
  Stack,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Link,
  Avatar
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
// components
import SearchNotFound from '../../components/SearchNotFound';
import Scrollbar from '../../components/ScrollBar.component';
import { TableListHead, TableListToolbar, TableMoreMenu } from '../../components/dashboard/table';

import { selectProducts } from '../../app/products/products.selector';

import { getProductAll } from '../../app/products/products.action';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'title', label: 'Product Name', alignRight: false },
  { id: 'validity', label: 'Expire At', alignRight: false },
  { id: 'business', label: 'Merchant', alignRight: false },
  { id: 'type', label: 'Category', alignRight: false },
  { id: 'price', label: 'Price (points)', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.title.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function ProductList() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductAll());
    // eslint-disable-next-line
  }, []);

  const products = useSelector(selectProducts)

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = products.map((n) => n.title);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, title) => {
    const selectedIndex = selected.indexOf(title);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, title);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - products.length) : 0;

  const filteredProducts = applySortFilter(products, getComparator(order, orderBy), filterName);

  const isProductNotFound = filteredProducts.length === 0;

  return (
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Product List
          </Typography>
          <Button variant="contained" component={RouterLink} to="/dashboard/product/new" startIcon={<AddIcon />}>
            New Product
          </Button>
        </Stack>

        <Card>
          <TableListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={products.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, title, validity, business, type, price } = row;
                    const isItemSelected = selected.indexOf(title) !== -1;

                    return (
                      <TableRow
                        hover
                        key={id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, title)} />
                        </TableCell>
                        <TableCell component="th" scope="row" >
                          <Link component={RouterLink} to={`/dashboard/product/${id}`} underline='none'>
                            <Typography variant="subtitle2" noWrap color='text.primary'>
                              {title}
                            </Typography>
                          </Link>
                        </TableCell>
                        <TableCell align="left"><Moment format='DD MMMM YYYY'>{validity}</Moment></TableCell>
                        <TableCell align="left">{business}</TableCell>
                        <TableCell align="left">{type}</TableCell>
                        <TableCell align="left">{price}</TableCell>
                        <TableCell align="right">
                          <TableMoreMenu id={id} />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isProductNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={products.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
  );
}

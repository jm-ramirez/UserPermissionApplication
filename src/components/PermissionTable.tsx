import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { TypePermissions } from '../model/types';
import { getPermissions } from '../services/api';
import { CircularProgress, TableHead } from '@mui/material';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

export const PermissionTable = () => {  
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(true);
  const [permissionList, setPermissionList] = React.useState<TypePermissions[] | null>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const formatFecha = (date: Date, format = "DD/MM/YYYY") => {
    return moment(date, ["MM-DD-YYYY", "YYYY-MM-DD"]).format(format);
  };

  function handleEditClick(id: number) {
    navigate(`/new-permission/${id}`);
  }

  React.useEffect(() => {
    getPermissions()
      .then((data) => {
        setPermissionList(data);
      })
      .catch(() => {
        setPermissionList([]);
      })
      .finally(() => setIsLoading(false));
  }, []);
  
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="right">Id</StyledTableCell>
            <StyledTableCell align="right">Nombre</StyledTableCell>
            <StyledTableCell align="right">Apellido</StyledTableCell>
            <StyledTableCell align="right">Tipo</StyledTableCell>
            <StyledTableCell align="right">Fecha</StyledTableCell>
            <StyledTableCell align="right">Editar</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody style={{justifyContent: 'center', alignItems: 'center'}}>
          {isLoading ? ( // Muestra el indicador de carga si isLoading es true
          <TableRow style={{ height: 90 }}>
            <TableCell colSpan={6} align="center">
              <CircularProgress/>
            </TableCell>
          </TableRow>
          ) : ((rowsPerPage > 0 && permissionList !== null && permissionList.length > 0)
            ? permissionList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: TypePermissions) => (              
            <StyledTableRow key={row.id}>
              <TableCell style={{ width: 50 }} align="right">
                {row.id}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.nombreEmpleado}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.apellidoEmpleado}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.permissionTypes?.descripcion}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {formatFecha(row.fechaPermiso)}
              </TableCell>
              <TableCell style={{ width: 50 }} align="right">
                <IconButton
                  color="primary"
                  onClick={() => handleEditClick(row.id)}
                >
                  <EditIcon />
                </IconButton>
              </TableCell>
            </StyledTableRow>
            )) 
          : 
            <TableRow style={{ height: 70 }}>
              <TableCell colSpan={6} align="center">
                No hay registros
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              labelRowsPerPage='Registros por página'
              labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
              rowsPerPageOptions={[5, 10, 25]}
              colSpan={6}
              count={permissionList?.length??0}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

import { DataGrid, GridToolbarContainer, GridToolbarExport, GridActionsCellItem, gridPageCountSelector, gridPageSelector, useGridApiContext, useGridSelector, } from '@mui/x-data-grid';
import { gql, useLazyQuery } from "@apollo/client";
import { useState } from 'react'; 
import Search  from "../../styles/components/search";
import { styleTable } from '../../styles/components/table'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LoadinPage from '../LoadingPage' 
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';

const QUERY_USER_NAME = gql`
query GetPatientByName($nome: String!) {
  getPatientByName(nome: $nome) {
    nome estado cpf celular data_nasc cidade
  }
}
`

const QUERY_USER_CPF = gql`
query GetPatientByCPF($cpf: String!) { 
  getPatientByCPF(cpf: $cpf) {
    nome estado cpf celular data_nasc cidade
  } 
}
`
/* CONFIG COLUMNS TABLE */
const columns = [
    { field: 'nome', headerName: 'Nome', width: 220 },
    { field: 'cpf', headerName: 'CPF', width: 130 },
    { field: 'data_nasc', headerName: 'Data nascimento', width: 145 },
    { field: 'cidade', headerName: 'Cidade', width: 130 },
    { field: 'estado', headerName: 'Estado', width: 80 },
    { field: 'celular', headerName: 'Celular', width: 130 },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Perfil',
      width: 100,
      cellClassName: 'actions',
      getActions: ( id ) => {
        
        return [
          <GridActionsCellItem icon={<InfoOutlinedIcon/>} label="Delete"
            onClick={()=> open(`/usuario/${id.row.cpf}`, '_self')} 
            color="inherit"
            key={()=>Math.random()}
          />,
        ];
      },
    },
];

/* BUTTON EXPORT AND PAGINATION TABLE */
function CustomFooter() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <GridToolbarContainer sx={{ display: 'flex', justifyContent: 'space-between', mb: '10px'}}>
      <GridToolbarExport color="success" sx={{ml: 1}}/>
      <Pagination
      color="success"
      count={pageCount}
      page={page + 1}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
    </GridToolbarContainer>
  );
}

const TableDataGrid = () => {
    /* FILTER SEARCH */
    const [filterSearch, setFilterSearch ] = useState('0')
    const nameFilter = ['nome', 'cpf'] 

    /* QUERY API */
    const queryFilter = [QUERY_USER_NAME, QUERY_USER_CPF]

    const [searchInput, setSearchInput] = useState('')
    let [valueNameVariable, {data, loading, error}] = useLazyQuery(queryFilter[filterSearch])
    
    /* SEARCH & VARIABLE QUERY */
    function searchPatient(){
      valueNameVariable({ variables: { [nameFilter[filterSearch]]: searchInput } }) 
    } 

    /* LOADING PAGE */
    if(loading){ return <LoadinPage/>}

    
    if(error){ console.log('Houve um erro!' + error); rows = []}
 
    function handleInputSearch(e) { setSearchInput(e.target.value) }

    let rows = (data !== undefined  && (data.getPatientByName || data.getPatientByCPF) ) || [] 

    /* NO ROW TABLE */
    function CustomNoRowsOverlay() {
      return (
          <Box sx={{ maxWidth: '600px', margin: '0 auto', mt: '300px', px: '20px', textAlign: 'center', fontSize: '16px'}}>
            {(data === undefined ? 
            <p>Pesquise por um paciente ou clique em pesquisar com campo vazio para exibir todos pacientes</p> 
            : 
            <p>Nenhum paciente encontrado</p>)}
            </Box>
      );
    }
   
return (
        <> 
        <Search>
          <select value={filterSearch} onChange={e=>setFilterSearch(e.target.value)}> 
            {nameFilter.map( (filter, index) => <option key={index} value={index}>{filter}</option> )}
          </select>
            <input onChange={handleInputSearch} value={searchInput} type="text" placeholder="Pesquisar..."/>
            <button onClick={()=>searchPatient()}>Pesquisar</button>
        </Search>
       
        <DataGrid 
        components={{ Footer: CustomFooter, NoRowsOverlay: CustomNoRowsOverlay }}
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]} 
        getRowId={()=>Math.random()}
        style={styleTable}
        disableSelectionOnClick
        disableDensitySelector
        disableColumnMenu
        disableVirtualization
         
      /> 
        </>
     );
}
 
export default TableDataGrid;
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import { styleFormInfoPatient } from "../../styles/default";
import { Box, Card, CardContent, CardHeader, Divider, Grid } from '@mui/material';
import { DataGrid, GridToolbarContainer, gridPageSelector, gridPageCountSelector, GridToolbarExport, useGridApiContext, useGridSelector } from '@mui/x-data-grid';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import LoadinPage from '../LoadingPage';
import Pagination from '@mui/material/Pagination';

/* CONFIG COLUMNS  */
const columnsDataCardiac = [
    { field: 'ind_card', headerName: 'Indice cardiaco', width: 220 }, 
    { field: 'EPOC', headerName: 'EPOC', width: 220 }, 
]
const columnsDataPulmonary = [
    { field: 'ind_pulm', headerName: 'Indice pulmonar', width: 220 }, 
    { field: 'EPOC', headerName: 'EPOC', width: 220 }, 
]

/* BUTTON EXPORT AND PAGINATION TABLE */
function CustomFooter() {
    const apiRef = useGridApiContext()
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
  
/* NO ROW */
function CustomNoRowsOverlay() {
return (
    <Box sx={{ margin: '0 auto', mt: '300px'}}>Nenhum paciente encontrado</Box>
);
}
 
const ExamPatient = ({dataExamCardiac,dataExamPulmonary}) => {
 
    /* TOGGLE OPEN INFO */
    const [[open1, setOpen1], [open2, setOpen2]]
    = 
    [useState(false),useState(false)]
  
    /* SELECT DATE */
    const MenuProps = {PaperProps:{style:{maxHeight: 48 * 4.5 + 8, width: 250}}};
    const selectDateExamCardiac = dataExamCardiac.map( exam => exam.data)
    const selectDateExamPulmonary = dataExamPulmonary.map( exam => exam.data)

    const [selectDateCardiac, setSelectDateCardiac] = useState(selectDateExamCardiac[0])
    const handleChangeSelectCardiac = (event) => { setSelectDateCardiac(event.target.value);};
    
    const [selectDatePulmonary, setSelectDatePulmonary] = useState(selectDateExamPulmonary[0])
    const handleChangeSelectPulmonary = (event) => { setSelectDatePulmonary(event.target.value);};

    /* LOADING CONTENT */
    if(dataExamCardiac.length === 0 || dataExamCardiac === undefined || dataExamPulmonary === undefined || dataExamPulmonary.length === 0){ return <LoadinPage/>}

    /* DATA EXAM */
    const rowDataPulmonary = dataExamPulmonary.filter( exam => exam.data == selectDatePulmonary)[0].exame || []

    const rowDataCardiac = dataExamCardiac.filter(exam => exam.data == selectDateCardiac)[0].exame || []


   
    return (
        <>
<Card style={styleFormInfoPatient}>
        <CardHeader title="Exames"/>
        <Divider sx={{mb: 1}}/>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item md={12} xs={12}>

{/* EXAME CARDIACO */}
<List sx={{ width: '100%', maxWidth: "100%"}} component="nav" aria-labelledby="lista-infomaçoes">
    <ListItemButton onClick={()=>setOpen1(!open1)} sx={{ background: '#f2f2f2', borderRadius: 1 }}>
    <ListItemText primary="Cardiaco" />
    {open1 ? <ExpandLess /> : <ExpandMore />}
    </ListItemButton> 
    <Collapse in={open1} timeout="auto" unmountOnExit> 
    <DataGrid
        sx={{height: 375, my: 3}}
        columns={columnsDataCardiac}
        rows={rowDataCardiac}
        getRowId={()=>Math.random()}
        pageSize={5}
        rowsPerPageOptions={[5]} 
        components={{
        Footer: CustomFooter,
        NoRowsOverlay: CustomNoRowsOverlay,
        }}
        disableColumnMenu
    />
{/* SELECT DATE */}
<FormControl sx={{ mb: 3, minWidth: 150 }}>
        <InputLabel id="demo-simple-select-autowidth-label" color="success">Data</InputLabel>
        <Select labelId="demo-simple-select-autowidth-label" id="demo-simple-select-autowidth" value={selectDateCardiac} onChange={handleChangeSelectCardiac}  label="Data" MenuProps={MenuProps} color="success">
          
          {selectDateExamCardiac.map( (data, index) => {
              return(
                <MenuItem key={index} value={data}>{data.replace(/(\d{2})(\d{2})(\d{4})/, "$1/$2/$3")}</MenuItem>
              )
          })}
           
        </Select>
</FormControl>
    </Collapse>
</List>

{/* EXAME PULMONAR */}
<List sx={{ width: '100%', maxWidth: "100%"}} component="nav" aria-labelledby="lista-infomaçoes">
    <ListItemButton onClick={()=>setOpen2(!open2)} sx={{ background: '#f2f2f2', borderRadius: 1 }}>
    <ListItemText primary="Pulmonar" />
    {open2 ? <ExpandLess /> : <ExpandMore />}
    </ListItemButton> 
    <Collapse in={open2} timeout="auto" unmountOnExit> 
    <DataGrid
        sx={{height: 375, my: 3}}
        columns={columnsDataPulmonary}
        rows={rowDataPulmonary}
        getRowId={()=>Math.random()}
        pageSize={5}
        rowsPerPageOptions={[5]} 
        components={{
        Footer: CustomFooter,
        NoRowsOverlay: CustomNoRowsOverlay,
        }}
        disableColumnMenu
    />
{/* SELECT DATE */}
<FormControl sx={{ mb: 3, minWidth: 150 }}>
        <InputLabel id="demo-simple-select-autowidth-label" color="success">Data</InputLabel>
        <Select labelId="demo-simple-select-autowidth-label" id="demo-simple-select-autowidth" value={selectDatePulmonary} onChange={handleChangeSelectPulmonary}  label="Data" MenuProps={MenuProps} color="success">
          
          {selectDateExamPulmonary.map( (data, index) => {
              return(
                <MenuItem key={index} value={data}>{data.replace(/(\d{2})(\d{2})(\d{4})/, "$1/$2/$3")}</MenuItem>
              )
          })}
           
        </Select>
</FormControl>
    </Collapse>
</List>
            </Grid> 
            </Grid>
            </CardContent>

</Card>
        </>
    );
}

export default ExamPatient;
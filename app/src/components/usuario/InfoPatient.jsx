import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import { styleFormInfoPatient } from "../../styles/default";
import { Card, CardContent, CardHeader, Divider, Grid, TextField } from '@mui/material';
import LoadinPage from '../LoadingPage';

const InfoPatient = ({dataPatient}) => {

    /* TOGGLE OPEN INFO */
    const [[open1, setOpen1], [open2, setOpen2], [open3, setOpen3], [open4, setOpen4], [open5, setOpen5] ]
    = 
    [useState(false),useState(false),useState(false),useState(false),useState(false)]

    /* LOADING CONTENT */
    if(dataPatient.length === 0 || dataPatient === undefined ){ return <LoadinPage/>}

    return ( 
        <>
        <Card style={styleFormInfoPatient} sx={{mt: 3}}>
        <CardHeader title="Perfil"/>
        <Divider sx={{mb: 1}}/>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
              <TextField fullWidth color="success" label="Nome" name="nome" variant="outlined" value={dataPatient.nome}/>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField fullWidth color="success" label="Data nascismento" name="nascismento"  variant="outlined" value={dataPatient.data_nasc}/>
            </Grid> 
            <Grid item md={6} xs={12}>
              <TextField fullWidth color="success" label="Idade" name="idade" variant="outlined" value={dataPatient.idade}/>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField fullWidth color="success" label="Sexo" name="Sexo"  variant="outlined" value={dataPatient.sexo}/>
            </Grid>

{/* DOCUMENTO */}
<Grid item md={12} xs={12}>
    <List
      sx={{ width: '100%', maxWidth: "100%" }}
      component="nav"
      aria-labelledby="lista-infomaçoes" 
    > 
      <ListItemButton onClick={()=>setOpen1(!open1)} sx={{ background: '#f2f2f2', borderRadius: 1 }}>
        <ListItemText primary="Documento" />
        {open1 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={open1} timeout="auto" unmountOnExit>
      <Grid container spacing={3} sx={{pt: 3}}>
            <Grid item md={6} xs={12}>
              <TextField fullWidth color="success" label="CPF" name="cpf" variant="outlined" value={dataPatient.cpf}/>
            </Grid> 
            <Grid item md={6} xs={12}>
              <TextField fullWidth color="success" label="RG" name="rg"  variant="outlined" value={dataPatient.rg}/>
            </Grid>
      </Grid>
      </Collapse>
    </List>
</Grid>

{/* FILIAÇÃO */}
<Grid item md={12} xs={12}>
    <List
      sx={{ width: '100%', maxWidth: "100%" }}
      component="nav"
      aria-labelledby="lista-infomaçoes" 
    > 
      <ListItemButton onClick={()=>setOpen2(!open2)} sx={{ background: '#f2f2f2', borderRadius: 1 }}>
        <ListItemText primary="Filiação" />
        {open2 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={open2} timeout="auto" unmountOnExit>
      <Grid container spacing={3} sx={{pt: 3}}>
            <Grid item md={6} xs={12}>
              <TextField fullWidth color="success" label="Mãe" name="Mãe"  variant="outlined" value={dataPatient.mae}/>
            </Grid> 
            <Grid item md={6} xs={12}>
              <TextField fullWidth color="success" label="Pai" name="Pai"  variant="outlined" value={dataPatient.pai}/>
            </Grid> 
      </Grid>
      </Collapse>
    </List>
</Grid>

{/* CONTATO */}
<Grid item md={12} xs={12}>
    <List
      sx={{ width: '100%', maxWidth: "100%" }}
      component="nav"
      aria-labelledby="lista-infomaçoes" 
    > 
      <ListItemButton onClick={()=>setOpen3(!open3)} sx={{ background: '#f2f2f2', borderRadius: 1 }}>
        <ListItemText primary="Contato" />
        {open3 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={open3} timeout="auto" unmountOnExit>
      <Grid container spacing={3} sx={{pt: 3}}>
            <Grid item md={6} xs={12}>
              <TextField fullWidth color="success" label="Telefone fixo" name="fixo"  variant="outlined" value={dataPatient.telefone_fixo}/>
            </Grid> 
            <Grid item md={6} xs={12}>
              <TextField fullWidth color="success" label="Celular" name="Celular"  variant="outlined" value={dataPatient.celular}/>
            </Grid> 
            <Grid item md={6} xs={12}>
              <TextField fullWidth color="success" label="Email" name="Email"  variant="outlined" value={dataPatient.email}/>
            </Grid> 
            <Grid item md={6} xs={12}>
              <TextField fullWidth color="success" label="Senha" name="Senha"  variant="outlined" value={dataPatient.senha}/>
            </Grid> 
      </Grid>
      </Collapse>
    </List>
</Grid>

{/* ENDEREÇO */}
<Grid item md={12} xs={12}>
    <List
      sx={{ width: '100%', maxWidth: "100%" }}
      component="nav"
      aria-labelledby="lista-infomaçoes" 
    > 
      <ListItemButton onClick={()=>setOpen4(!open4)} sx={{ background: '#f2f2f2', borderRadius: 1 }}>
        <ListItemText primary="Endereço" />
        {open4 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={open4} timeout="auto" unmountOnExit>
      <Grid container spacing={3} sx={{pt: 3}}>
      <Grid item md={6} xs={12}>
              <TextField fullWidth color="success" label="CEP" name="CEP"  variant="outlined" value={dataPatient.cep}/>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField fullWidth color="success" label="Endereco" name="Endereco"  variant="outlined" value={dataPatient.endereco}/>
            </Grid> 
            <Grid item md={6} xs={12}>
              <TextField fullWidth color="success" label="Número" name="Número"  variant="outlined" value={dataPatient.numero}/>
            </Grid> 
            <Grid item md={6} xs={12}>
              <TextField fullWidth color="success" label="Bairro" name="Bairro"  variant="outlined" value={dataPatient.bairro}/>
            </Grid> 
            <Grid item md={6} xs={12}>
              <TextField fullWidth color="success" label="Cidade" name="Cidade"  variant="outlined" value={dataPatient.cidade}/>
            </Grid> 
            <Grid item md={6} xs={12}>
              <TextField fullWidth color="success" label="Estado" name="Estado"  variant="outlined" value={dataPatient.estado}/>
            </Grid>
      </Grid>
      </Collapse>
    </List>
</Grid>

{/* CARACTERISTICAS */}
<Grid item md={12} xs={12}>
    <List
      sx={{ width: '100%', maxWidth: "100%" }}
      component="nav"
      aria-labelledby="lista-infomaçoes" 
    > 
      <ListItemButton onClick={()=>setOpen5(!open5)} sx={{ background: '#f2f2f2', borderRadius: 1 }}>
        <ListItemText primary="Caracteristicas" />
        {open5 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={open5} timeout="auto" unmountOnExit>
      <Grid container spacing={3} sx={{pt: 3}}> 
            <Grid item md={6} xs={12}>
              <TextField fullWidth color="success" label="Altura" name="Altura"  variant="outlined" value={dataPatient.altura}/>
            </Grid> 
            <Grid item md={6} xs={12}>
              <TextField fullWidth color="success" label="Peso" name="Peso"  variant="outlined" value={dataPatient.peso}/>
            </Grid> 
            <Grid item md={6} xs={12}>
              <TextField fullWidth color="success" label="Tipo sanguineo" name="sanguineo"  variant="outlined" value={dataPatient.tipo_sanguineo}/>
            </Grid> 
            <Grid item md={6} xs={12}>
              <TextField fullWidth color="success" label="Cor" name="Cor"  variant="outlined" value={dataPatient.cor}/>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField fullWidth color="success" label="Signo" name="Signo"  variant="outlined" value={dataPatient.signo}/>
            </Grid>
      </Grid>
      </Collapse>
    </List>
</Grid>


</Grid>
</CardContent> 
</Card> 
        </>
     );
}
 
export default InfoPatient;
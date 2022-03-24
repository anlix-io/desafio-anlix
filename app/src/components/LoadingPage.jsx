import { CircularProgress } from "@mui/material";
import Box from '@mui/material/Box';

const styleLoading = {
    width: '70px',
    height: '70px',
     
    display: 'block'
}

const styleBoxLoading = {width: "100%", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',height: '90vh'}

const LoadinPage = () => {
    return ( 
        <>
            <Box style={styleBoxLoading}>
            <CircularProgress style={styleLoading} />
            <h2 style={{marginTop: "20px"}}>Carregando conteúdo</h2>
            </Box>
        </>
     );
}
 
export default LoadinPage;
 
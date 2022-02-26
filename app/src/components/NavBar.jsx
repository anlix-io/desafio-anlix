import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar'; 
import Typography from '@mui/material/Typography'; 
import Container from '@mui/material/Container'; 
import Button from '@mui/material/Button';
import Link from 'next/link'; 

const pages = ['pacientes', 'exames'];

const NavBar = () => {

const styledNavBar = {boxShadow: 'rgb(145 158 171 / 24%) 0px 0px 2px 0px, rgb(145 158 171 / 24%) 0px 16px 32px -4px', background: '#00ab55',}

    return (
        <>
          <AppBar position="static" style={styledNavBar}>
            <Container maxWidth="xl">
              <Toolbar disableGutters>

<Link passHref href="/">
<Typography variant="h6" noWrap component="div" sx={{ cursor: 'pointer',mr: 2, display: { xs: 'none', md: 'flex' } }}> OnlyMedical </Typography>
</Link>

<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
  {pages.map((page) => (
    <Button key={page} sx={{ my: 2, color: 'white', display: 'block' }}>{page}</Button>
  ))}
</Box>

              </Toolbar>
            </Container>
          </AppBar>
        </>
     );
}
 
export default NavBar;

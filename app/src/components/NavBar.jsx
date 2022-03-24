import Link from 'next/link';
import ContainernavBar from '../styles/components/navBar';
import {Container} from '../styles/default'

const NavBar = () => {
  
    return (
         <ContainernavBar>
           
            <Container>
            <nav>
                <Link href="/"><a>OnlyMedical</a></Link>
            </nav>
            </Container>
           
          </ContainernavBar>
     );
}
 
export default NavBar;

import NavBar from "../components/NavBar";
import GlobalStyle from "../styles/globalStyles";
import { Container } from "../styles/default"; 
import ErrorPage404 from "../styles/components/errorPage404";
import Link from "next/link";
import HeadPage from "../components/HeadPage";

const Error404 = () => {
    return ( 
    <>
    <HeadPage titlePage={'404 - página não encontrada - OnlyMedical'}/>
    <GlobalStyle/>
    <NavBar/>
    <Container>
        <ErrorPage404>
            <span>404</span>
            <h1>Página não encontrada!</h1>
            <Link href="/"><a>retornar para pagina principal</a></Link>
        </ErrorPage404>
    </Container>
    </>
    );
}
 
export default Error404;
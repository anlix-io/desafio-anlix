import { client } from '../../config/client-graphql';
import { ApolloProvider } from '@apollo/client';
import { useRouter } from 'next/router';
import DataPatient from '../../components/usuario/DataPatient' 
import GlobalStyle from "../../styles/globalStyles";
import { Container } from '../../styles/default'; 
import NavBar from '../../components/NavBar';

const User = () => {
    const cpf = useRouter().query.user 

    return ( 
        <> 
        <GlobalStyle/>
        <ApolloProvider client={client}>
            <NavBar/>
            <Container>
                <DataPatient cpf={cpf}/>
            </Container>
        </ApolloProvider>
        </>
     );
}
 
export default User;
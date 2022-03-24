import GlobalStyle from "../styles/globalStyles";
import { Container } from "../styles/default";
import { client } from '../config/client-graphql';
import { ApolloProvider } from '@apollo/client';
import TableDataGrid from "../components/home/TableDataGrid";
import NavMenu from "../components/NavBar";
import HeadPage from "../components/HeadPage";

export default function Home() {
 
  return (
      <>
      <HeadPage titlePage={'Home - OnlyMedical'}/>
      <GlobalStyle/>
      <ApolloProvider client={client}>
         <NavMenu/>
        <Container>
          <TableDataGrid/>
        </Container>
      </ApolloProvider>
  </>
  );
}

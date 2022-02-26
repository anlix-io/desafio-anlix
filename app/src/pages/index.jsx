import GlobalStyle from "../styles/globalStyles";
import { Container } from "../styles/default";
import { client } from '../config/client-graphql';
import { ApolloProvider, gql } from '@apollo/client';
import TableDataGrid from "../components/home/TableDataGrid";
import Head from "next/head";
import NavMenu from "../components/NavBar";

export default function Home() {
 
  return (
      <>
      <Head><title>Home</title></Head>
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

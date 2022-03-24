import Head from 'next/head'

const HeadPage = ({titlePage}) => {
    return (
    <Head>
        <title>{titlePage}</title>
        <meta name="description" content="Gerenciamento de dados"/> 
        <meta name="keywords" content="onlymedical"/> 
        <meta name="author" content="Samuel Claudino"/> 
        <meta name="copyright" content="Samuel Claudino 2022"/> 
        <meta name="theme-color" content="#00ab55"/> 
        <meta httpEquiv="content-language" content="pt-br"/> 
        <meta property="og:title" content="OnlyMedical"/> 
        <meta property="og:description" content="Gerenciamento de dados"/>
    </Head>
    );
}
 
export default HeadPage;
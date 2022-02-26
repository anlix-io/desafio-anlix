import styled from "styled-components";

const Table = styled.table`
    border-collapse: collapse;

    thead tr th{
        text-align: left;
        padding: 16px;
        border-bottom: 1px solid rgb(241, 243, 244);
    }
    thead tr{ border-bottom: 1px solid rgb(241, 243, 244); }

    tbody{
        overflow-x: scroll;
        td{
            border-bottom: 1px solid rgb(241, 243, 244);
            padding: 16px;
        }
        tr{
            &:hover{
                background-color: #f6f7f8;
            }
        }
    }
`
const ContainerTable = styled.div`
    width: 100%;
    box-shadow: rgb(145 158 171 / 24%) 0px 0px 2px 0px, rgb(145 158 171 / 24%) 0px 16px 32px -4px;
    border-radius: 16px;
    overflow-x: auto;
    
    ::-webkit-scrollbar {
        height: 15px; 
    }
   
    ::-webkit-scrollbar-thumb {
        background: #00000025;
        border-radius: 20px;
        border: 4px solid white;
    }
 
`
const styleTable = { boxShadow: 'rgb(145 158 171 / 24%) 0px 0px 2px 0px, rgb(145 158 171 / 24%) 0px 16px 32px -4px', border: 'none', borderRadius: '16px', height: '640px'}

export {Table, ContainerTable, styleTable}
import styled from "styled-components";

const Search = styled.div`
    box-shadow: rgb(145 158 171 / 24%) 0px 0px 2px 0px, rgb(145 158 171 / 24%) 0px 16px 32px -4px;
    width: 100%;
    height: 55px;
    padding: 0px 20px;
    border-radius: 16px; 
    display: flex;
    background-color: white;
    margin-top: 20px;
    margin-bottom: 40px;

    select{
        margin-right: 10px;
        padding-right: 5px;
        cursor: pointer;
        text-transform: uppercase;
        font-size: 14px;
        font-weight: 500;
    }

    input{
        width: 100%;
        padding: 10px 0;
        font-size: 18px;
        font-weight: 600;

        &::placeholder{
            color: #96a2af;
        }
    }
    button{
        background-color: #00ab55;
        border-radius: 16px;
        margin: 10px 0;
        margin-left: 20px;
        font-weight: 600;
        color: white;
        padding: 0 25px;
        box-shadow: rgb(0 171 85 / 24%) 0px 1px 16px 0px;
        cursor: pointer;
    }
`

export default Search
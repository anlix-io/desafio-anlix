import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
	*{
	    margin: 0;
        padding: 0;
        box-sizing: border-box;
        background: none;
        border: none;
        outline: none; 
        font-family: 'Segoe UI';

        .css-18lolh3-MuiDataGrid-root .MuiDataGrid-columnHeader:focus, .css-18lolh3-MuiDataGrid-root .MuiDataGrid-cell:focus {
        outline: none;
        }

        .css-18lolh3-MuiDataGrid-root .MuiDataGrid-cell {
            border-bottom: 1px solid rgb(241, 243, 244);
        }
        
        .css-okt5j6-MuiDataGrid-columnHeaders {
            border-bottom: 1px solid rgb(241, 243, 244);
        }

        .css-18lolh3-MuiDataGrid-root .MuiDataGrid-columnHeader:focus-within, .css-18lolh3-MuiDataGrid-root .MuiDataGrid-cell:focus-within {
        outline: none;
        }
   }
`

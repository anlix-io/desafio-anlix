import { Button, Card, CardHeader, Divider, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { styleFormInfoPatient } from '../../styles/default'
import LoadinPage from '../LoadingPage'
const Chart = dynamic( () => import('react-apexcharts'),{ ssr: false })


const DashBoardExam = ({dataExamCardiac,dataExamPulmonary}) => {
   
    /* SELECT DATE */
    const MenuProps = {PaperProps:{style:{maxHeight: 48 * 4.5 + 8, width: 250}}};
    const selectDateExamCardiac = dataExamCardiac.map( exam => exam.data)
    const selectDateExamPulmonary = dataExamPulmonary.map( exam => exam.data)

    const [selectDateCardiac, setSelectDateCardiac] = useState(selectDateExamCardiac[0])
    const handleChangeSelectCardiac = (event) => { setSelectDateCardiac(event.target.value);};
    
    const [selectDatePulmonary, setSelectDatePulmonary] = useState(selectDateExamPulmonary[0])
    const handleChangeSelectPulmonary = (event) => { setSelectDatePulmonary(event.target.value);};

    /* OPTION DASHBOARD */
    const [optionDashBoard, setOptionDashBoard] = useState(true)
  
    /* LOADING CONTENT */
    if(dataExamCardiac.length === 0 || dataExamCardiac === undefined || dataExamPulmonary === undefined || dataExamPulmonary.length === 0){ return <LoadinPage/>}
    
    /* DASHBOARD EXAM */
    const rowDataCardiac = dataExamCardiac.filter( exam => exam.data === selectDateCardiac)[0].exame
    const ind_card = rowDataCardiac.map( exam => exam.ind_card)
    const EPOC = rowDataCardiac.map( exam => exam.EPOC) 

    /* DATA INPUT DASHBOARD */
    const series = [{
        name: optionDashBoard === true ? 'Indice cardiaco' : 'EPOC',
        data: optionDashBoard === true ? ind_card : EPOC
    }]

    /* CONFIG DASHBOARD */
    const options = {
        chart: { 
          type: 'area',
          stacked: false,
          height: 350,
          zoom: {
            enabled: false
          },
        },
        dataLabels: {
          enabled: false
        },
        markers: {
          size: 0,
        },
        colors: optionDashBoard === true ? ['#d40101'] : ['#01d47c'],
        fill: {
          type: 'gradient',
          colors: optionDashBoard === true ? '#ff4e83' : '#4effd3',
          gradient: {
              shadeIntensity: 1,
              inverseColors: false,
              opacityFrom: 0.65,
              opacityTo: 0.75,
              stops: [20, 100, 100, 100]
            },
        },
        yaxis: {
          labels: {
              style: {
                  colors: '#8e8da4',
              }, 
          },
          axisBorder: {
              show: false,
          },
          axisTicks: {
              show: false
          }
        },
        tooltip: {
          shared: true
        },
        legend: {
          position: 'top',
          horizontalAlign: 'right',
          offsetX: -10
        }
      }

    return ( 
        <>
        <Card style={styleFormInfoPatient}>
        <CardHeader title="Dashboard exames"/>
         
        <Divider sx={{mb: 1}}/>
        
        <Chart style={{padding: "16px"}} options={options} series={series} type="area" width={"100%"} height={500} />

        {/* SELECT DATE */}
        <FormControl sx={{ mb: 3, mx: "16px", minWidth: 150 }}>
                <InputLabel id="demo-simple-select-autowidth-label" color="success">Data</InputLabel>
                <Select labelId="demo-simple-select-autowidth-label" id="demo-simple-select-autowidth" value={selectDateCardiac} onChange={handleChangeSelectCardiac} label="Data" MenuProps={MenuProps} color="success">
                
                {selectDateExamCardiac.map( (data, index) => {
                    return(<MenuItem key={index} value={data}>{data.replace(/(\d{2})(\d{2})(\d{4})/, "$1/$2/$3")}</MenuItem>)
                })}
                
                </Select>
        </FormControl>
        
        {/* OPTION TYPE */}
        <Button onClick={()=>setOptionDashBoard(true)} style={{height: '56px', marginRight: '16px'}} variant="outlined" size="large" color="error">Indice cardiaco</Button>
        <Button onClick={()=>setOptionDashBoard(false)} style={{height: '56px', marginRight: '16px'}} variant="outlined" color="success" size="large">EPOC</Button>
        </Card>
        
        
        </>
     );
}
 
export default DashBoardExam;
import { Button, Card, CardHeader, Divider, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { styleFormInfoPatient } from '../../styles/default'
import LoadinPage from '../LoadingPage'
const Chart = dynamic( () => import('react-apexcharts'),{ ssr: false })


const DashBoardExam = ({dataExamCardiac,dataExamPulmonary}) => {
   
    /* SELECT DATE */
    const MenuProps = {PaperProps:{style:{maxHeight: 48 * 4.5 + 8, width: 250}}};
  
    /* SELECT EXAM */ 
    const dataExamName = ['Cardiaco', 'Pulmonar']

    const dataExamDashBoard = [dataExamCardiac, dataExamPulmonary]

    /* OPTION */
    const [selectExamDashBoard, setSelectExamDashBoard] = useState('0')
    
    /* DATE */
    const dateExamDashBoard = dataExamDashBoard[selectExamDashBoard].map( exam => exam.data)
    
    const [selectDateExam, setSelectDateExam] = useState(dateExamDashBoard[0])

    const handleChangeSelectExam = (event) => { 
    setSelectDateExam(event.target.value);}; 
   
    /* OPTION DASHBOARD */
    const [optionDashBoard, setOptionDashBoard] = useState(true)
  
    /* LOADING CONTENT */
    if(dataExamCardiac.length === 0 || dataExamCardiac === undefined || dataExamPulmonary === undefined || dataExamPulmonary.length === 0){ return <LoadinPage/>}
    
    /* DASHBOARD EXAM */
    const rowDataExam = dataExamDashBoard[selectExamDashBoard].filter( exam => exam.data === selectDateExam)[0].exame 

    const indice_exam = rowDataExam.map( exam => exam.ind_card || exam.ind_pulm)
    const EPOC = rowDataExam.map( exam => exam.EPOC)

    /* DATA INPUT DASHBOARD */
    const series = [{
        name: optionDashBoard === true ? `Indice ${dataExamName[selectExamDashBoard]}` : 'EPOC',
        data: optionDashBoard === true ? indice_exam : EPOC
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

        {/* SELECT EXAM */}
        <FormControl sx={{ mb: 3, ml: "16px", minWidth: 150 }}>
                <InputLabel id="demo-simple-select-autowidth-label" color="success">Exame</InputLabel>
                <Select labelId="demo-simple-select-autowidth-label" id="demo-simple-select-autowidth" value={selectExamDashBoard} 
                onChange={(e)=> setSelectExamDashBoard(e.target.value)} label="Exame" MenuProps={MenuProps} color="success" >
                
                 {dataExamName.map( (exam, index)=> { 

                   return <MenuItem key={index} value={index}>{exam}</MenuItem>
                 })}
                
                </Select>
        </FormControl>

        {/* SELECT DATE */}
        <FormControl sx={{ mb: 3, mx: "16px", minWidth: 150 }}>
                <InputLabel id="demo-simple-select-autowidth-label" color="success">Data</InputLabel>
                <Select labelId="demo-simple-select-autowidth-label" id="demo-simple-select-autowidth" value={selectDateExam} onChange={handleChangeSelectExam} label="Data" MenuProps={MenuProps} color="success">
                
                {dateExamDashBoard.map( (data, index) => {
                    return(<MenuItem key={index} value={data}>{data.replace(/(\d{2})(\d{2})(\d{4})/, "$1/$2/$3")}</MenuItem>)
                })}
                
                </Select>
        </FormControl>
        
        {/* OPTION TYPE */}
        <Button onClick={()=>setOptionDashBoard(true)} style={{height: '56px', marginRight: '16px'}} variant="outlined" size="large" color="error">{`Indice ${dataExamName[selectExamDashBoard]}`}</Button>
        <Button onClick={()=>setOptionDashBoard(false)} style={{height: '56px', marginRight: '16px'}} variant="outlined" color="success" size="large">EPOC</Button>
        </Card>
        
        
        </>
     );
}
 
export default DashBoardExam;
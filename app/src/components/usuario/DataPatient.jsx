import { gql, useQuery } from "@apollo/client";
import DashBoardExam from "./DashBoardExam";
import ExamPatient from "./ExamPatient";
import InfoPatient from "./InfoPatient";
import LoadinPage from '../LoadingPage'
import HeadPage from "../HeadPage";


const QUERT_PATIENT = gql`
    query GetPatientByCPF($cpf: String!) {
        getPatientByCPF(cpf: $cpf) { nome idade cpf rg data_nasc sexo signo mae pai email senha cep endereco numero bairro cidade estado telefone_fixo celular altura peso tipo_sanguineo cor

        indiceCardiaco { data exame { ind_card EPOC } }
        indicePulmonar { data exame { EPOC ind_pulm } }
        }
    }
`

const DataPatient = ( {cpf} ) => {

  const { loading, error, data } = useQuery(QUERT_PATIENT, {variables:{ cpf: String(cpf)}})

  if(loading){ return <LoadinPage/> }

  let dataPatient = data && data.getPatientByCPF[0] || []
  let dataExamCardiac = dataPatient.indiceCardiaco  || []
  let dataExamPulmonary = dataPatient.indicePulmonar  || []

  return (
    <>
    <HeadPage titlePage={`Perfil - ${dataPatient.nome} - OnlyMedical`}/>
 
    <InfoPatient dataPatient={dataPatient}></InfoPatient>

    <ExamPatient dataExamCardiac={dataExamCardiac} dataExamPulmonary={dataExamPulmonary}/>

    <DashBoardExam dataExamCardiac={dataExamCardiac} dataExamPulmonary={dataExamPulmonary}/>
    </>
  );
}
 
export default DataPatient;
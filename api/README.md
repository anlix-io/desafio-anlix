# Como utilziar a API

### Tecnologias utilizadas no desenvolvimento:
* GraphQL
* Babel
* Apollo-Server

A escolha do GraphQL foi pelo grande volume de dados a serem processados evitando o overfetching.

<br/>

## Iniciando projeto

Instale as dependencias
```bash
npm install
```

Faça o processo de build
```bash
npm run build
```

Inicie o servidor
```bash
npm start
```

Para modo desenlvedor utilize o ``npm run dev``

<br/>

# Exemplos de Query

Após iniciar o servidor abra o API Client  [http://localhost:4000](http://localhost:4000)

<br/>
<br/>

* Consultar em uma única chamada, todas as características de um paciente, com os valores mais recentes de cada uma. 

``` bash
    query BuscarPorCPF($cpf: String!) { 
        getPatientByCPF(cpf: $cpf) {
            nome idade cpf rg data_nasc sexo signo mae pai email senha cep endereco 
            numero bairro cidade estado telefone_fixo celular altura peso tipo_sanguineo cor
            
            indiceCardiaco { 
                data
                exame { EPOC ind_card }
            }
            indicePulmonar {
                data
                exame { EPOC ind_pulm }
            }
        } 
    }
```
Insira os valores na variaveis .json
``` json
{
  "cpf": "041.897.838-70"
}
```

<br/>
<hr/>

* Consultar pacientes que contenham um nome ou parte de um nome a ser especificado na chamada da API.
``` bash
    query BuscarPorNome($nome: String!) {
        getPatientByName(nome: $nome) {
            nome idade cpf rg data_nasc sexo signo mae pai email senha cep endereco 
            numero bairro cidade estado telefone_fixo celular altura peso tipo_sanguineo cor
            
            indiceCardiaco { 
                data
                exame { EPOC ind_card }
            }
            indicePulmonar {
                data
                exame { EPOC ind_pulm }
            }
        }
    }
```
Insira os valores na variaveis .json
``` json
{
  "nome": "Alexandre"
}
```

<br/>
<hr/>

* Consultar, para cada paciente, cada uma das características individualmente e cada uma delas sendo a mais recente disponível.
``` bash
    query BuscarExameDePaciente($cpf: String!) {
        getPatientByCPF(cpf: $cpf) {
            nome cpf rg data_nasc

            indiceCardiaco {
                data
                exame { EPOC ind_card }
            }
        }
    }
```
Para mudar o exame: ``indiceCardiaco `` ou ``indicePulmonar``
Insira os valores na variaveis .json
``` json
{
  "cpf": "041.897.838-70"
}
```


<br/>
<hr/>

* Consultar para uma determinada data (dia, mês e ano), todas as características existentes de todos os pacientes da base de dados.
``` bash
    query BuscarExameEPacientePorData($data: String!) {
        getExamCardiacByDate(data: $data) {
            data
            exame {
            EPOC
            ind_card
                paciente {
                nome idade cpf rg data_nasc sexo signo mae pai email senha cep endereco 
                numero bairro cidade estado telefone_fixo celular altura peso tipo_sanguineo cor
                }
            }
        }
    }
```
Para mudar o exame: ``getExamCardiacByDate `` ou ``getExamPulmonaryByDate``

Insira os valores na variaveis .json
``` json
{
  "data": "01062021"
}
```

<br/>
<hr/>

* Consultar uma característica qualquer de um paciente para um intervalo de datas a ser especificado na chamada da API.

``` bash
    query BuscarExamePorIntervalo($dataInicial: String!, $dataFinal: String!, $cpf: String!) {
        getExamCardiacWithInterval(dataInicial: $dataInicial, dataFinal: $dataFinal, CPF: $cpf) {
            data
            exame { 
                EPOC 
                ind_card
                paciente { nome cpf }
            }
        }
    }
```

Para mudar o exame: `` getExamCardiacWithInterval `` ou ``getExamPulmonaryWithInterval``
Insira os valores na variaveis .json
``` json

{
  "cpf": "041.897.838-70",
  "dataInicial": "21062021",
  "dataFinal": "30032021"
}
```

<br/>
<hr/>

* Consultar o valor mais recente de uma característica de um paciente que esteja entre um intervalo de valores a ser especificado na chamada da API.
``` bash
    query BuscarExamePorIntervalorValor($valorInicial: String!, $valorFinal: String!, $cpf: String!) {
        getExamCardiacWithIntervalValue(valorInicial: $valorInicial, valorFinal: $valorFinal, CPF: $cpf) {
            data
            exame {
            EPOC
            ind_card
            paciente { nome cpf }
            }
        }
    }
```

Para mudar o exame: `` getExamCardiacWithIntervalValue `` ou ``getExamPulmonaryWithIntervalValue``

Insira os valores na variaveis .json

``` json
{   
  "cpf": "222.491.969-74",
  "valorInicial": "0.74",
  "valorFinal": "0.8"
}
```


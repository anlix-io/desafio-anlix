# DesafioAnlix:

Projeto foi feito em nodejs.

### Instalando:
```
    npm install
```

### executando:
```
    npm start
```

### testando:

Caso prefira tem uma coleção postman disponivel na pasta POSTMAN.

#### exemplos de Chamadas:

----

* Consultar, para cada paciente, cada uma das características individualmente e cada uma delas sendo a mais recente disponível;
http://localhost:3000/cpfIndiceRecent?cpf={819.263.701-80}&typeIndice={cardiaco}

----

* Consultar em uma única chamada, todas as características de um paciente, com os valores mais recentes de cada uma;
http://localhost:3000/cpfRecent?cpf={819.263.701-80}

----

* Consultar para uma determinada data (dia, mês e ano), todas as características existentes de todos os pacientes da base de dados;
http://localhost:3000/dataGeral?date={01/06/2021}

----

* Consultar uma característica qualquer de um paciente para um intervalo de datas a ser especificado na chamada da API;
http://localhost:3000/indiceCpfDate?cpf={819.263.701-80}&typeIndice={pulmonar}&dateInicial={01/04/2021}&dateFinal={13/06/2021}

----

* Consultar o valor mais recente de uma característica de um paciente que esteja entre um intervalo de valores a ser especificado na chamada da API;
http://localhost:3000/indiceFilter?cpf={974.642.524-20}&typeIndice={pulmonar}&indiceInicial={0.1}&indiceFinal={0.4}

----

* Consultar pacientes que contenham um nome ou parte de um nome a ser especificado na chamada da API.
http://localhost:3000/pacients?nome={diego}

----
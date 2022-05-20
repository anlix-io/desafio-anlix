const express = require('express')
const routes = express.Router()
const SqlString = require('sqlstring')
const pg = require('pg')
const Pool = require('pg').Pool

const pool = new Pool({
  user: 'anlix',
  host: 'db',
  database: 'hospital',
  password: '1234',
})

routes.get('/', (req,res) => {
	return res.json({"Menssagem": "Olá mundo!"})
})

routes.get('/HeartFeature/:cpf', (req,res) => {
	const sql = `SELECT ind_cardiaco
	 FROM indice_cardiaco
	 INNER JOIN paciente ON paciente.cpf = indice_cardiaco.cpf
	 WHERE paciente.cpf=?
	 ORDER BY indice_cardiaco.data_hora DESC limit 1`

	pool.query(SqlString.format(sql, req.params.cpf),
	 (error, results) => {
    if (error) {
    	throw error
    }
    res.status(200).json(results.rows)
  })
})

routes.get('/LungFeature/:cpf', (req,res) => {
	const sql = `
		SELECT ind_pulmonar
	 	FROM indice_pulmonar
	 	INNER JOIN paciente ON paciente.cpf = indice_pulmonar.cpf
	 	WHERE paciente.cpf=?
	 	ORDER BY indice_pulmonar.data_hora DESC limit 1`

	pool.query(SqlString.format(sql, req.params.cpf),
	 (error, results) => {
    if (error) {
    	throw error
    }
    res.status(200).json(results.rows)
  })
})

routes.get('/AllLastFeatures/:cpf', (req,res) => {
	 const sql =`
	 			SELECT indice_cardiaco.ind_cardiaco, indice_pulmonar.ind_pulmonar
	 			FROM paciente
	 			INNER JOIN indice_cardiaco ON indice_cardiaco.cpf = paciente.cpf
	 			INNER JOIN indice_pulmonar ON indice_pulmonar.cpf = paciente.cpf
	 			WHERE paciente.cpf=?
	 			ORDER BY indice_cardiaco.data_hora DESC,
	 			indice_pulmonar.data_hora DESC limit 1;


	 `

	 pool.query(SqlString.format(sql, req.params.cpf),
	 (error, results) => {
    if (error) {
    	throw error
    }
    res.status(200).json(results.rows)
  })
	})

routes.get('/allIndicesForData/:data', (req,res) => {
	 const sql =`
	 			SELECT paciente.cpf, CAST(ind_cardiaco as VARCHAR),
	 				CAST(null as VARCHAR) as ind_pulmonar,
	 				TO_CHAR(data_hora, 'YYYY-MM-DD') as data
	 				FROM indice_cardiaco
	 				INNER JOIN paciente ON paciente.cpf = indice_cardiaco.cpf
	 				WHERE TO_CHAR(data_hora, 'YYYY-MM-DD')=?
	 			UNION ALL
	 			SELECT paciente.cpf, CAST(null as VARCHAR)as ind_cardiaco,
	 				CAST(ind_pulmonar as VARCHAR),
	 				TO_CHAR(data_hora, 'YYYY-MM-DD') as data
	 				FROM indice_pulmonar
	 				INNER JOIN paciente ON paciente.cpf = indice_pulmonar.cpf
	 				WHERE TO_CHAR(data_hora, 'YYYY-MM-DD')=?;
	 			`



	 const [dia, mes, ano] = req.params.data.split('-')
	 const data = [ano, mes, dia].join('-')
 
	 pool.query(SqlString.format(sql, [data,data]),
	 (error, results) => {
    if (error) {
    	throw error
    }
    res.status(200).json(results.rows)
  })
	})


routes.get('/CharacteristicBetweenDates', (req, res) => {
	let cpf = req.body.cpf
	let caracteristica = req.body.caracteristica
	let teste = req.body.data_inicial
	let [dia_inicial, mes_inicial, ano_inicial] = teste.split('-')
	let [dia_final, mes_final, ano_final] = req.body.data_final.split('-')
	const data_inicial = [ano_inicial, mes_inicial, dia_inicial].join('-')
	const data_final = [ano_final, mes_final, dia_final].join('-')
	const parametros = [data_inicial, data_final, cpf]

	const sql_cardiaco = `
				SELECT paciente.cpf, indice_cardiaco.ind_cardiaco, indice_cardiaco.data_hora
				FROM paciente
				INNER JOIN indice_cardiaco ON indice_cardiaco.cpf = paciente.cpf
				WHERE ?::date >= indice_cardiaco.data_hora  AND indice_cardiaco.data_hora <= ?::date 
				AND paciente.cpf = ?
	`

	const sql_pulmonar = `
				SELECT paciente.cpf, indice_pulmonar.ind_pulmonar, indice_pulmonar.data_hora
				FROM paciente
				INNER JOIN indice_pulmonar ON indice_pulmonar.cpf = paciente.cpf
				WHERE ?::date >= indice_pulmonar.data_hora  AND indice_pulmonar.data_hora <= ?::date 
				AND paciente.cpf = ?
	`
	if(caracteristica === 'cardiaco'){
		pool.query(SqlString.format(sql_cardiaco, parametros),
	 	(error, results) => {
   		if (error) {
    		throw error
    }
    	res.status(200).json(results.rows)
  })
	}
	else{
		pool.query(SqlString.format(sql_pulmonar, parametros),
	 	(error, results) => {
   		if (error) {
    		throw error
    }
    	res.status(200).json(results.rows)
  })		
	}

})

routes.get('/LastCharacteristicBetweenDates', (req, res) => {
	let cpf = req.body.cpf
	let caracteristica = req.body.caracteristica
	let teste = req.body.data_inicial
	let [dia_inicial, mes_inicial, ano_inicial] = teste.split('-')
	let [dia_final, mes_final, ano_final] = req.body.data_final.split('-')
	const data_inicial = [ano_inicial, mes_inicial, dia_inicial].join('-')
	const data_final = [ano_final, mes_final, dia_final].join('-')
	const parametros = [data_inicial, data_final, cpf]

	const sql_cardiaco = `
				SELECT paciente.cpf, indice_cardiaco.ind_cardiaco, indice_cardiaco.data_hora
				FROM paciente
				INNER JOIN indice_cardiaco ON indice_cardiaco.cpf = paciente.cpf
				WHERE ?::date >= indice_cardiaco.data_hora  AND indice_cardiaco.data_hora <= ?::date 
				AND paciente.cpf = ?
				ORDER BY indice_cardiaco.data_hora DESC limit 1
	`

	const sql_pulmonar = `
				SELECT paciente.cpf, indice_pulmonar.ind_pulmonar, indice_pulmonar.data_hora
				FROM paciente
				INNER JOIN indice_pulmonar ON indice_pulmonar.cpf = paciente.cpf
				WHERE ?::date >= indice_pulmonar.data_hora  AND indice_pulmonar.data_hora <= ?::date 
				AND paciente.cpf = ?
				ORDER BY indice_pulmonar.data_hora DESC limit 1
	`
	if(caracteristica === 'cardiaco'){
		pool.query(SqlString.format(sql_cardiaco, parametros),
	 	(error, results) => {
   		if (error) {
    		throw error
    }
    	res.status(200).json(results.rows)
  })
	}
	else{
		pool.query(SqlString.format(sql_pulmonar, parametros),
	 	(error, results) => {
   		if (error) {
    		throw error
    }
    	res.status(200).json(results.rows)
  })		
	}

})

routes.get('/ConsultPatientByName', (req, res) => {
	const nome = '%'+req.body.nome+'%'
	const sql = `
			SELECT * 
			FROM paciente
			WHERE nome LIKE ?
	`
		pool.query(SqlString.format(sql, nome),
	 	(error, results) => {
   		if (error) {
    		throw error
    }
    	res.status(200).json(results.rows)
  })	
})


module.exports = routes

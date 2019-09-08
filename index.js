const csv = require("csv-parse");
const fs = require("fs");

const express = require('express')
const app = express()
const port = 8080
const cors = require('cors')

app.use(cors())

app.get('/stock/:name', async (req, res) => {
	//first route return the proper row

	let result
	let mydata = await new Promise ((resolve) => {
		let first = true
		stream = fs.createReadStream('similarity.csv')
		stream
		.pipe(csv())
		.on('data', data => {
			console.log(data[1])
			if(data[1] === req.params.name){
				result = [data[3],data[4],data[5],data[6],data[7]]
				console.log("FINISHED QUERYTING")
				resolve()
			}
		})
		stream.on('close', () => {
			resolve()
		})
	})
	await mydata
	console.log(result)
	res.json(result)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

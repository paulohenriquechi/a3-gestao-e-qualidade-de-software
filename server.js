import express from 'express'

const app = express()

app.use(express.json())

const port = 3000

app.get('/', (req, res) => {
  res.send('get')
})

app.post('/', (req, res) => {
  res.send('create')
})

app.get('/', (req, res) => {
  res.send('show')
})

app.put('/', (req, res) => {
  res.send('update')
})

app.delete('/', (req, res) => {
  res.send('delete')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
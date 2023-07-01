import jsonServer from 'json-server';

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

server.use('/api', router);
server.use('/gastos', router);

server.post('/gastos', (req, res) => {
  const nuevoGasto = req.body;
  res.json(nuevoGasto);
});

server.delete('/gastos', (req, res) => {
  const borrarGasto = req.body
})

const port = 3000;
server.listen(port, () => {
  console.log(`JSON Server está corriendo en http://localhost:${port}`);
});
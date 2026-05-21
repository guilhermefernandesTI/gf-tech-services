const express = require('express');
const path = require('node:path');
const { createDatabase } = require('./database');
const { createServiceRepository } = require('./serviceRepository');
const { validateService } = require('./validators');

const app = express();
const repository = createServiceRepository(createDatabase());
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/api/services', async (request, response) => {
  const services = await repository.list();
  response.json(services);
});

app.get('/api/services/:id', async (request, response) => {
  const service = await repository.findById(request.params.id);

  if (!service) {
    response.status(404).json({ message: 'Servico nao encontrado.' });
    return;
  }

  response.json(service);
});

app.post('/api/services', async (request, response) => {
  const errors = validateService(request.body);

  if (errors.length > 0) {
    response.status(400).json({ errors });
    return;
  }

  const service = await repository.create(request.body);
  response.status(201).json(service);
});

app.put('/api/services/:id', async (request, response) => {
  const errors = validateService(request.body);

  if (errors.length > 0) {
    response.status(400).json({ errors });
    return;
  }

  const service = await repository.update(request.params.id, request.body);

  if (!service) {
    response.status(404).json({ message: 'Servico nao encontrado.' });
    return;
  }

  response.json(service);
});

app.delete('/api/services/:id', async (request, response) => {
  const removed = await repository.remove(request.params.id);

  if (!removed) {
    response.status(404).json({ message: 'Servico nao encontrado.' });
    return;
  }

  response.status(204).send();
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`GF Tech Services rodando em http://localhost:${port}`);
  });
}

module.exports = app;

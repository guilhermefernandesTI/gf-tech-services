const assert = require('node:assert/strict');
const test = require('node:test');
const { createServiceRepository } = require('../src/serviceRepository');

function createMemoryDatabase() {
  const state = {
    services: []
  };

  return {
    async read() {
      return JSON.parse(JSON.stringify(state));
    },
    async write(data) {
      state.services = data.services;
    }
  };
}

const validService = {
  customerName: 'Maria Souza',
  customerPhone: '18999999999',
  equipment: 'Notebook Dell',
  description: 'Formatacao e instalacao de programas',
  status: 'Aberto',
  price: 180
};

test('cria e lista servicos', async () => {
  const repository = createServiceRepository(createMemoryDatabase());
  const created = await repository.create(validService);
  const services = await repository.list();

  assert.equal(services.length, 1);
  assert.equal(created.customerName, 'Maria Souza');
  assert.ok(created.id);
});

test('atualiza um servico existente', async () => {
  const repository = createServiceRepository(createMemoryDatabase());
  const created = await repository.create(validService);

  const updated = await repository.update(created.id, {
    ...validService,
    status: 'Concluido',
    price: 220
  });

  assert.equal(updated.status, 'Concluido');
  assert.equal(updated.price, 220);
});

test('remove um servico existente', async () => {
  const repository = createServiceRepository(createMemoryDatabase());
  const created = await repository.create(validService);

  const removed = await repository.remove(created.id);
  const services = await repository.list();

  assert.equal(removed, true);
  assert.equal(services.length, 0);
});

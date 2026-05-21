const assert = require('node:assert/strict');
const test = require('node:test');
const { validateService } = require('../src/validators');

test('aceita um servico valido', () => {
  const errors = validateService({
    customerName: 'Joao Pereira',
    customerPhone: '18988887777',
    equipment: 'Computador',
    description: 'Limpeza interna e troca de pasta termica',
    status: 'Em andamento',
    price: '150'
  });

  assert.deepEqual(errors, []);
});

test('recusa dados obrigatorios ausentes', () => {
  const errors = validateService({});

  assert.equal(errors.length, 4);
});

test('recusa status invalido', () => {
  const errors = validateService({
    customerName: 'Joao Pereira',
    customerPhone: '18988887777',
    equipment: 'Computador',
    description: 'Limpeza interna',
    status: 'Finalizado'
  });

  assert.ok(errors.includes('Status invalido.'));
});

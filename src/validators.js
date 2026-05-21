const VALID_STATUS = ['Aberto', 'Em andamento', 'Concluido', 'Cancelado'];

function validateService(input) {
  const errors = [];

  if (!input.customerName || input.customerName.trim().length < 3) {
    errors.push('Informe o nome do cliente com pelo menos 3 caracteres.');
  }

  if (!input.customerPhone || input.customerPhone.trim().length < 8) {
    errors.push('Informe um telefone valido para contato.');
  }

  if (!input.equipment || input.equipment.trim().length < 2) {
    errors.push('Informe o equipamento atendido.');
  }

  if (!input.description || input.description.trim().length < 5) {
    errors.push('Descreva o servico realizado ou solicitado.');
  }

  if (input.status && !VALID_STATUS.includes(input.status)) {
    errors.push('Status invalido.');
  }

  if (input.price && Number.isNaN(Number(input.price))) {
    errors.push('Informe um valor numerico para o preco.');
  }

  return errors;
}

module.exports = {
  VALID_STATUS,
  validateService
};

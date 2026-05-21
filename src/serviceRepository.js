const { randomUUID } = require('node:crypto');

function createServiceRepository(database) {
  async function list() {
    const data = await database.read();
    return data.services;
  }

  async function findById(id) {
    const services = await list();
    return services.find((service) => service.id === id) || null;
  }

  async function create(input) {
    const data = await database.read();
    const now = new Date().toISOString();
    const service = {
      id: randomUUID(),
      customerName: input.customerName,
      customerPhone: input.customerPhone,
      equipment: input.equipment,
      description: input.description,
      status: input.status || 'Aberto',
      price: Number(input.price || 0),
      createdAt: now,
      updatedAt: now
    };

    data.services.push(service);
    await database.write(data);
    return service;
  }

  async function update(id, input) {
    const data = await database.read();
    const index = data.services.findIndex((service) => service.id === id);

    if (index === -1) {
      return null;
    }

    const current = data.services[index];
    const updated = {
      ...current,
      customerName: input.customerName,
      customerPhone: input.customerPhone,
      equipment: input.equipment,
      description: input.description,
      status: input.status,
      price: Number(input.price || 0),
      updatedAt: new Date().toISOString()
    };

    data.services[index] = updated;
    await database.write(data);
    return updated;
  }

  async function remove(id) {
    const data = await database.read();
    const nextServices = data.services.filter((service) => service.id !== id);

    if (nextServices.length === data.services.length) {
      return false;
    }

    data.services = nextServices;
    await database.write(data);
    return true;
  }

  return {
    list,
    findById,
    create,
    update,
    remove
  };
}

module.exports = {
  createServiceRepository
};

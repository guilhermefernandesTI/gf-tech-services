const apiUrl = '/api/services';
const form = document.querySelector('#service-form');
const formMessage = document.querySelector('#form-message');
const servicesList = document.querySelector('#services-list');
const serviceCount = document.querySelector('#service-count');
const searchInput = document.querySelector('#search');
const cancelEditButton = document.querySelector('#cancel-edit');

let services = [];

function getFormData() {
  return {
    customerName: document.querySelector('#customer-name').value.trim(),
    customerPhone: document.querySelector('#customer-phone').value.trim(),
    equipment: document.querySelector('#equipment').value.trim(),
    description: document.querySelector('#description').value.trim(),
    status: document.querySelector('#status').value,
    price: document.querySelector('#price').value
  };
}

function resetForm() {
  form.reset();
  document.querySelector('#service-id').value = '';
  document.querySelector('#price').value = '0';
  formMessage.textContent = '';
  form.querySelector('button[type="submit"]').textContent = 'Salvar';
}

function formatCurrency(value) {
  return Number(value || 0).toLocaleString('pt-BR', {
    currency: 'BRL',
    style: 'currency'
  });
}

function renderServices() {
  const query = searchInput.value.trim().toLowerCase();
  const filteredServices = services.filter((service) => {
    const content = `${service.customerName} ${service.equipment} ${service.status}`.toLowerCase();
    return content.includes(query);
  });

  serviceCount.textContent = `${services.length} servico${services.length === 1 ? '' : 's'}`;

  if (filteredServices.length === 0) {
    servicesList.innerHTML = '<p class="empty">Nenhum atendimento encontrado.</p>';
    return;
  }

  servicesList.innerHTML = filteredServices.map((service) => `
    <article class="service-card">
      <header>
        <div>
          <h3>${service.customerName}</h3>
          <p class="service-meta">${service.customerPhone} | ${service.equipment}</p>
        </div>
        <span class="badge">${service.status}</span>
      </header>
      <p>${service.description}</p>
      <p class="service-meta">Valor: ${formatCurrency(service.price)}</p>
      <div class="card-actions">
        <button type="button" data-action="edit" data-id="${service.id}">Editar</button>
        <button type="button" class="danger" data-action="delete" data-id="${service.id}">Excluir</button>
      </div>
    </article>
  `).join('');
}

async function loadServices() {
  const response = await fetch(apiUrl);
  services = await response.json();
  renderServices();
}

async function saveService(event) {
  event.preventDefault();
  const id = document.querySelector('#service-id').value;
  const method = id ? 'PUT' : 'POST';
  const url = id ? `${apiUrl}/${id}` : apiUrl;

  const response = await fetch(url, {
    body: JSON.stringify(getFormData()),
    headers: {
      'Content-Type': 'application/json'
    },
    method
  });

  if (!response.ok) {
    const error = await response.json();
    formMessage.textContent = error.errors ? error.errors.join(' ') : error.message;
    return;
  }

  resetForm();
  await loadServices();
}

function editService(id) {
  const service = services.find((item) => item.id === id);

  if (!service) {
    return;
  }

  document.querySelector('#service-id').value = service.id;
  document.querySelector('#customer-name').value = service.customerName;
  document.querySelector('#customer-phone').value = service.customerPhone;
  document.querySelector('#equipment').value = service.equipment;
  document.querySelector('#description').value = service.description;
  document.querySelector('#status').value = service.status;
  document.querySelector('#price').value = service.price;
  form.querySelector('button[type="submit"]').textContent = 'Atualizar';
}

async function deleteService(id) {
  const response = await fetch(`${apiUrl}/${id}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    await loadServices();
  }
}

servicesList.addEventListener('click', async (event) => {
  const button = event.target.closest('button[data-action]');

  if (!button) {
    return;
  }

  if (button.dataset.action === 'edit') {
    editService(button.dataset.id);
  }

  if (button.dataset.action === 'delete') {
    await deleteService(button.dataset.id);
  }
});

form.addEventListener('submit', saveService);
searchInput.addEventListener('input', renderServices);
cancelEditButton.addEventListener('click', resetForm);

loadServices();

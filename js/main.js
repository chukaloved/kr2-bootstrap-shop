document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('[data-filter]');
  const catalogItems = document.querySelectorAll('[data-category]');
  const counter = document.getElementById('catalog-count');

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      let shown = 0;

      filterButtons.forEach((btn) => btn.classList.toggle('active', btn === button));

      catalogItems.forEach((item) => {
        const visible = filter === 'all' || item.dataset.category === filter;
        item.classList.toggle('d-none', !visible);
        if (visible) {
          shown++;
        }
      });

      if (counter) {
        counter.textContent = shown;
      }
    });
  });

  document.querySelectorAll('.needs-validation').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
      }

      form.classList.remove('was-validated');
      form.reset();

      const modalElement = form.closest('.modal');
      if (modalElement) {
        bootstrap.Modal.getOrCreateInstance(modalElement).hide();
      }

      const toastElement = document.getElementById(form.dataset.toast);
      if (toastElement) {
        bootstrap.Toast.getOrCreateInstance(toastElement).show();
      }
    });
  });
});

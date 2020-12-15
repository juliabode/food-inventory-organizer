const auth = btoa('admin:' + process.env.REACT_APP_ADMIN_PASS);

export const getAllProducts = async () =>
  fetch('/api/products', {
    headers: {
      /* TO BE REMOVED WHEN CREATING USER ACCOUNTS! */
      Authorization: 'Basic ' + auth,
    },
  }).then((res) => res.json());

export const addNewProduct = async (data) =>
  fetch('/api/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      /* TO BE REMOVED WHEN CREATING USER ACCOUNTS! */
      Authorization: 'Basic ' + auth,
    },
    body: JSON.stringify(data),
  }).then(() => {});

export const updateProduct = async (data) =>
  fetch('/api/products/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      /* TO BE REMOVED WHEN CREATING USER ACCOUNTS! */
      Authorization: 'Basic ' + auth,
    },
    body: JSON.stringify(data),
  }).then({});

export const removeProduct = async (data) =>
  fetch('/api/products/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      /* TO BE REMOVED WHEN CREATING USER ACCOUNTS! */
      Authorization: 'Basic ' + auth,
    },
    body: JSON.stringify(data),
  }).then(() => {});

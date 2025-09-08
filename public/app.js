// Firebase configuration (replace with your own project credentials)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();

let quoteNumber = 100000;
let products = [];
let subtotal = 0;
let discount = 0;
let total = 0;

// Load company info from Firestore
async function loadCompany() {
  const doc = await db.collection('config').doc('company').get();
  if (doc.exists) {
    const data = doc.data();
    document.getElementById('company-name').textContent = data.name;
    document.getElementById('company-slogan').textContent = data.slogan;
    quoteNumber = data.lastQuote || 100000;
    document.getElementById('quote-number').textContent = quoteNumber;
    if (data.logoUrl) {
      document.getElementById('company-logo').src = data.logoUrl;
    }
  }
}

function openModal(id) {
  document.getElementById(id).classList.remove('hidden');
}
function closeModal(id) {
  document.getElementById(id).classList.add('hidden');
}

// Client logic
const clientAction = document.getElementById('client-action');
clientAction.addEventListener('click', () => openModal('client-form'));

document.getElementById('client-save').addEventListener('click', async () => {
  const name = document.getElementById('client-name').value;
  if (!name) return alert('Nombre obligatorio');
  const client = {
    name,
    phone: document.getElementById('client-phone').value,
    id: document.getElementById('client-id').value,
    company: document.getElementById('client-company').value,
  };
  await db.collection('clients').add(client);
  closeModal('client-form');
});

// Seller logic
const sellerAction = document.getElementById('seller-action');
sellerAction.addEventListener('click', () => openModal('seller-form'));

document.getElementById('seller-save').addEventListener('click', async () => {
  const name = document.getElementById('seller-name').value;
  if (!name) return alert('Nombre obligatorio');
  const seller = {
    name,
    phone: document.getElementById('seller-phone').value,
  };
  await db.collection('sellers').add(seller);
  closeModal('seller-form');
});

// Product logic
const productAction = document.getElementById('product-action');
productAction.addEventListener('click', () => openModal('product-form'));

document.getElementById('prod-save').addEventListener('click', async () => {
  const code = document.getElementById('prod-code').value;
  const desc = document.getElementById('prod-desc').value;
  const price = parseFloat(document.getElementById('prod-price').value) || 0;
  const file = document.getElementById('prod-image').files[0];
  let imageUrl = '';
  if (file) {
    const ref = storage.ref('products/' + file.name);
    await ref.put(file);
    imageUrl = await ref.getDownloadURL();
  }
  await db.collection('products').add({ code, desc, price, imageUrl, created: new Date() });
  closeModal('product-form');
});

// Add product to current quote
const productAdd = document.getElementById('product-add');
productAdd.addEventListener('click', () => {
  const select = document.getElementById('product-select');
  const option = select.selectedOptions[0];
  if (!option) return;
  const data = JSON.parse(option.dataset.product);
  const qty = parseFloat(prompt('Cantidad', '1')) || 1;
  const unitPrice = parseFloat(prompt('Precio unitario', data.price)) || data.price;
  const disc = parseFloat(prompt('Descuento %', '0')) || 0;
  const rowSubtotal = qty * unitPrice * (1 - disc / 100);
  products.push({ ...data, qty, unitPrice, disc, subtotal: rowSubtotal });
  renderTable();
});

function renderTable() {
  const tbody = document.querySelector('#product-table tbody');
  tbody.innerHTML = '';
  subtotal = 0;
  discount = 0;
  products.forEach((p, idx) => {
    subtotal += p.qty * p.unitPrice;
    discount += p.qty * p.unitPrice - p.subtotal;
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${idx + 1}</td><td>${p.code}</td><td>${p.desc}</td>` +
      `<td>${p.qty}</td><td>${p.unitPrice.toFixed(2)}</td>` +
      `<td>${p.disc}%</td><td>${p.subtotal.toFixed(2)}</td>`;
    tbody.appendChild(tr);
  });
  total = subtotal - discount;
  document.getElementById('subtotal').textContent = subtotal.toFixed(2);
  document.getElementById('discount').textContent = discount.toFixed(2);
  document.getElementById('total').textContent = total.toFixed(2);
}

// Generate PDF using jsPDF
const genPdfBtn = document.getElementById('generate-pdf');
genPdfBtn.addEventListener('click', () => {
  const doc = new jspdf.jsPDF();
  doc.text(`Cotización N° ${quoteNumber}`, 10, 10);
  doc.text(`Subtotal: ${subtotal.toFixed(2)}`, 10, 20);
  doc.text(`Descuento: ${discount.toFixed(2)}`, 10, 30);
  doc.text(`Total: ${total.toFixed(2)}`, 10, 40);
  const terms = [
    document.getElementById('term1').value,
    document.getElementById('term2').value,
    document.getElementById('term3').value,
    document.getElementById('term4').value,
  ];
  doc.text('Términos:', 10, 60);
  terms.forEach((t, i) => doc.text(`- ${t}`, 10, 70 + i * 10));
  doc.save(`cotizacion_${quoteNumber}.pdf`);
});

loadCompany();

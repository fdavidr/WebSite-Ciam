const functions = require('firebase-functions');
const admin = require('firebase-admin');
const PDFDocument = require('pdfkit');

admin.initializeApp();
const db = admin.firestore();

// HTTP function to create quote PDF
exports.generateQuote = functions.https.onRequest(async (req, res) => {
  const data = req.body; // {company, client, seller, products, terms}
  try {
    const docRef = db.collection('config').doc('company');
    const companySnap = await docRef.get();
    let quoteNumber = 100000;
    if (companySnap.exists) {
      quoteNumber = (companySnap.data().lastQuote || 99999) + 1;
      await docRef.update({ lastQuote: quoteNumber });
    }
    const pdf = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="cotizacion_${quoteNumber}.pdf"`);
    pdf.text(`Cotización N° ${quoteNumber}`);
    pdf.text(`${data.company.name}`);
    pdf.text(`${data.company.slogan}`);
    pdf.moveDown();
    pdf.text(`Cliente: ${data.client.name}`);
    pdf.text(`Vendedor: ${data.seller.name}`);
    pdf.moveDown();
    data.products.forEach((p, i) => {
      pdf.text(`${i + 1}. ${p.desc} x${p.qty} - ${p.subtotal}`);
    });
    pdf.moveDown();
    pdf.text(`Subtotal: ${data.subtotal}`);
    pdf.text(`Descuento: ${data.discount}`);
    pdf.text(`Total: ${data.total}`);
    pdf.moveDown();
    data.terms.forEach(t => pdf.text(t));
    pdf.end();
    pdf.pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.toString());
  }
});

// Step 1: Import the parts of the module you want to use
import { MercadoPagoConfig, Payment } from 'mercadopago';

// Step 2: Initialize the client object
const client = new MercadoPagoConfig({ accessToken: 'TEST-6911095786828805-012920-ea489eceb452b4f44e83a2dd96191b83-594195943', options: { timeout: 5000, idempotencyKey: 'abc' } });

// Step 3: Initialize the API object
const payment = new Payment(client);

// Step 4: Create the request object
const body = {
	transaction_amount: 12.34,
	description: 'pago por clase',
	payment_method_id: '<PAYMENT_METHOD_ID>',
	payer: {
		email: 'silvamaxiblas@gmail.com'
	},
};

// Step 5: Create request options object - Optional
const requestOptions = {
	idempotencyKey: 'abc',
};

// Step 6: Make the request
payment.create({ body, requestOptions }).then(console.log).catch(console.log);
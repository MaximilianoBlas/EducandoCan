import axios from 'axios';

const accessToken = 'TEST-6911095786828805-012920-ea489eceb452b4f44e83a2dd96191b83-594195943'

export const instance = axios.create({
  baseURL: 'https://api.mercadopago.com',
  headers: {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  },
});


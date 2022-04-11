import axios from 'axios';
import { SERVER_URL, ROLL_NUMBER, ML_SERVER_URL } from '../utils/constants';


export function getInvoiceAPI(page_number) {
  return axios.get(
    `${SERVER_URL}${ROLL_NUMBER}/InvoiceCRUD`, {
    params: { page: page_number }
  }
  )
}



export function searchAPI(cust_number) {
  return axios.get(
    `${SERVER_URL}${ROLL_NUMBER}/Search`, {
    params: { search: cust_number }
  }
  )
}

export function addInvoiceAPI(payload) {
  return axios.post(
    `${SERVER_URL}${ROLL_NUMBER}/InvoiceCRUD`, payload
  )
}

export function putInvoiceAPI(payload) {
  return axios.put(
    `${SERVER_URL}${ROLL_NUMBER}/InvoiceCRUD`, payload
  )
}
export function advancedSearch(payload) {
  return axios.post(
    `${SERVER_URL}${ROLL_NUMBER}/Search`, payload
  )
}
export function analyticsView(payload) {
  return axios.post(
    `${SERVER_URL}${ROLL_NUMBER}/Search`, payload
  )
}

export function deleteInvoiceAPI(payload) {
  return axios.delete(
    `${SERVER_URL}${ROLL_NUMBER}/InvoiceCRUD`, { data: payload }
  )
}

export function predictAPI(payload) {
  return axios.post(
    `${ML_SERVER_URL}/predict`, payload
  )
}
import { api } from 'src/boot/axios';
import { ExpensePaginatedResponse, ExpenseResponse } from 'src/types';

export async function getExpenses(
  page = 1,
  limit = 10
): Promise<ExpensePaginatedResponse> {
  try {
    const response = await api.get(`/expenses?page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`
        }
      }
    );

    return response.data as ExpensePaginatedResponse;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function getExpense(id: number): Promise<ExpenseResponse> {
  try {
    const response = await api.get(`/expense?id=${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`
        }
      }
    );

    return response.data as ExpenseResponse;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

import { api } from 'src/boot/axios';
import { ExpensePaginatedResponse, ExpenseData, ExpenseRequest } from 'src/types';

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

export async function createExpense(
  expense: ExpenseRequest
): Promise<ExpenseData> {
  try {
    const response = await api.post('/expenses', expense, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
      },
    });

    return response.data as ExpenseData;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function getExpense(id: number): Promise<ExpenseData> {
  try {
    const response = await api.get(`/expense?id=${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`
        }
      }
    );

    return response.data as ExpenseData;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function updateExpense(expense: ExpenseData): Promise<void> {
  try {
    await api.put(`/expenses/${expense.id}`, expense, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
      },
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function deleteExpense(id: number): Promise<void> {
  try {
    await api.delete(`/expenses/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
      },
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
}

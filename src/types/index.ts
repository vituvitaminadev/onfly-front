export interface AuthRequest {
  name: string,
  email: string,
  password: string,
  passwordConfirmation: string
}

export interface AuthResponse {
  token: string
}

export interface User {
  name: string,
  email: string,
}

export interface ExpenseRequest {
  description: string;
  date: string;
  value: number;
};

export interface MetaData {
  current_page: number;
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
};

export interface ExpensePaginatedResponse {
  data: ExpenseResponse[];
  meta: MetaData;
};

export interface ExpenseResponse {
  id: number;
  description: string;
  date: string;
  value: number;
  user_id: number;
};

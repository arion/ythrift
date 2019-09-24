export interface IUser {
  id: number;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface IActualRow {
  id: number;
  actualCents: number;
  categoryId: number;
  date: string;
  createdAt: string;
  updatedAt: string;
  description: string;
}

export interface IBudgetRow {
  id: number;
  year: number;
  month: number;
  budgetCents: number;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
}

export interface ICategory {
  id: number;
  name: string;
  kind: 'expense' | 'income';
  parentId: number | null;
  actualRows: IActualRow[];
  budgetRow?: IBudgetRow | null;
  userId: number;
  archivedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

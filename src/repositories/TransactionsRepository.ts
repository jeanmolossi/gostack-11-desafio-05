import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const startBalance: Balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };
    const reducer = (
      balance: Balance,
      currentTransaction: Transaction,
    ): Balance => {
      switch (currentTransaction.type) {
        case 'income': {
          balance.income += currentTransaction.value;
          break;
        }
        case 'outcome': {
          balance.outcome += currentTransaction.value;
          break;
        }
        default:
          break;
      }

      return balance;
    };

    const { income, outcome } = this.transactions.reduce(reducer, startBalance);
    const total = income - outcome;

    return { income, outcome, total };
  }

  public create({ title, value, type }: Omit<Transaction, 'id'>): Transaction {
    const newTransaction = new Transaction({ title, value, type });
    this.transactions.push(newTransaction);

    return newTransaction;
  }
}

export default TransactionsRepository;

# Database Design for Budge Bloom

## Database Schema

### Users

- id: int
- username: string
- password: string
- email: string
- is_verified: boolean
- is_active: boolean
- reset_token: string
- created_at: datetime
- updated_at: datetime
- is_deleted: boolean
- deleted_at: datetime

### Wallets

- id: int
- user_id: int
- name: string
- initial_balance: float
- current_balance: float
- currency: string
- created_at: datetime
- updated_at: datetime
- is_deleted: boolean
- deleted_at: datetime

### Categories

- id: int
- user_id: int (nullable)
- name: string
- color: string
- icon: string

### Labels

- id: int
- user_id: int (nullable)
- name: string

### Transactions

- id: int
- user_id: int
- wallet_id: int
- category_id: int [ => Foreign Key to Categories Table]
- date: datetime
- note: string (255) (nullable)
- amount: float
- type: string (enum: income, expense and transfer)
- label_id: int (nullable) [ => Foreign Key to Labels Table]
- created_at: datetime
- updated_at: datetime
- is_deleted: boolean
- deleted_at: datetime

### Recurring Transactions

- id: int
- user_id: int
- wallet_id: int
- transaction_id: int
- recurring_type: string (enum: daily, weekly, monthly, yearly)
- recurring_start_date: datetime (nullable) (default: current date)
- recurring_end_date: datetime (nullable) (default: null)
- reminder: string (nullable) (enum: none, 1 day before,... 1 week before)
- created_at: datetime
- updated_at: datetime
- is_deleted: boolean
- deleted_at: datetime

### Budgets

- id: int
- user_id: int
- wallet_id: int
- name: string
- amount: float
- currency: string (preset to all common currencies)
- categories: array of int (nullable) [ => Foreign Key to Categories Table]
- period: string (enum: daily, weekly, monthly, yearly)
- start_date: datetime (nullable) (default: current date)
- end_date: datetime (nullable) (default: null)
- created_at: datetime
- updated_at: datetime
- is_deleted: boolean
- deleted_at: datetime
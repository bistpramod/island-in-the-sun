class Account:
    def __init__(self, acc_no, balance):
        self.acc_no = acc_no
        self.balance = balance

    def debit(self, amount):
        if amount <= self.balance:
            self.balance -= amount
        else:
            print("Insufficient balance")

    def credit(self, amount):
        self.balance += amount

    def show_balance(self):
        print("Balance:", self.balance)

a1 = Account(101, 5000)
a1.debit(1000)
a1.credit(500)
a1.show_balance()

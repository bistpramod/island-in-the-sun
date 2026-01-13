def add_student():
    with open("students.txt", "a") as f:
        name = input("Enter name: ")
        marks = input("Enter marks: ")
        f.write(f"{name},{marks}\n")

def view_students():
    with open("students.txt", "r") as f:
        for line in f:
            name, marks = line.strip().split(",")
            print(name, marks)

while True:
    print("1. Add Student")
    print("2. View Students")
    print("3. Exit")

    choice = input("Enter choice: ")

    if choice == "1":
        add_student()
    elif choice == "2":
        view_students()
    else:
        break

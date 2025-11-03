# Python optimization examples

# Example 1: Inefficient list operations
def find_common_elements(list1, list2):
    common = []
    for item in list1:
        if item in list2:  # O(n) lookup in list
            common.append(item)
    return common

# Better: Use sets for O(1) lookup
# def find_common_elements(list1, list2):
#     return list(set(list1) & set(list2))


# Example 2: String concatenation in loop
def build_message(words):
    message = ""
    for word in words:
        message = message + word + " "  # Creates new string each time
    return message

# Better: Use join()
# def build_message(words):
#     return " ".join(words)


# Example 3: Unnecessary list comprehension
def sum_of_squares(numbers):
    squares = [x**2 for x in numbers]  # Creates intermediate list
    return sum(squares)

# Better: Use generator expression
# def sum_of_squares(numbers):
#     return sum(x**2 for x in numbers)


# Example 4: Multiple database calls in loop
def get_user_details(user_ids):
    users = []
    for user_id in user_ids:
        user = database.query(f"SELECT * FROM users WHERE id = {user_id}")
        users.append(user)
    return users

# Better: Single query with IN clause
# def get_user_details(user_ids):
#     ids = ",".join(map(str, user_ids))
#     return database.query(f"SELECT * FROM users WHERE id IN ({ids})")


# Example 5: Reading file line by line inefficiently
def count_words(filename):
    with open(filename, 'r') as f:
        content = f.read()  # Loads entire file into memory
        words = content.split()
        return len(words)

# Better for large files: Process line by line
# def count_words(filename):
#     count = 0
#     with open(filename, 'r') as f:
#         for line in f:
#             count += len(line.split())
#     return count

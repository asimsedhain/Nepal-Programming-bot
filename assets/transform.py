import json


with open("./leetcode-question-list.json") as f:
    questions = json.load(f)
print("Transforming Files")
transformed_questions = []
for question in questions:
    transformed_question = {"Id": int(question["id"]), "Title":question["title"], "Url": question["url"], "Difficulty": question["difficulty"].lower(), "Topic": question["topic"]}
    transformed_questions.append(transformed_question)

with open("./leetcode-transformed-question-list.json", "w") as f:
    json.dump(transformed_questions, f)

print("Done")




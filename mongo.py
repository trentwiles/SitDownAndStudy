from pymongo import MongoClient

client = MongoClient('mongodb://localhost:27017/')  # replace with your MongoDB URI if different

db = client['historydb']

# Create a new collection (if it doesn't exist, it will be created when you insert data)
collection = db['history']

# Example: Inserting a document into the collection
document = {"uuid": "0", "history": ["_DATABASE_INSTALL_WAS_A_SUCCESS"]}
collection.insert_one(document)

print("MongoDB install taken care of")
# Installer

# check for node
if ! command -v node &> /dev/null
then
    echo "Please install docker, then rerun the script"
fi

# nodeJS
cd frontend
npm i
cd ..
cd backend
npm i
cd ..

# check for docker
if ! command -v docker &> /dev/null
then
    echo "Please install docker, then rerun the script"
fi

docker pull mongodb/mongodb-community-server:latest
docker run --name mongodb -p 27017:27017 -d mongodb/mongodb-community-server:latest

# check for python
if ! command -v python &> /dev/null
then
    echo "Please install Python, then rerun the script"
fi

pip3 install pymongo
python3 mongo.py

echo "All set! You're now ready to run."

# All set
# To recap: installed node modules, set up mongodb, and populated mongodb with sample data
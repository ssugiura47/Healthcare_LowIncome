from flask import Flask, render_template, jsonify, Response
import pymongo
import json
from sqlalchemy import create_engine
import pandas as pd

app = Flask(__name__)

# setup mongo connection
conn = "mongodb://localhost:27017"
client = pymongo.MongoClient(conn)

# connect to mongo db and collection
db = client.HealthcareProject
ca_counties = db.ca_counties
medical_county = db.medical_county
medically_underserved = db.medically_underserved_df

# connect to sql and collection
engine = create_engine("postgresql://admin2:12345@localhost:5433/Healthcare_LowIncome")
# engine = create_engine("postgresql://admin2:12345@localhost:5432/Healthcare_LowIncome")
connection = engine.connect()

@app.route("/")
def index():
    # render an index.html template and pass in the data you retrieved from the database
    return render_template("index.html")

@app.route("/ca_counties")
def scrape():
    # write a statement that finds all the items in the db and sets it to a variable
    ca_counties_ = list(ca_counties.find())
    return Response(json.dumps(ca_counties_,default=str),mimetype="application/json")

@app.route("/medical_county")
def scrape1():
    # write a statement that finds all the items in the db and sets it to a variable
    medical_county_ = list(medical_county.find())
    return Response(json.dumps(medical_county_,default=str),mimetype="application/json")

@app.route("/medically_underserved")
def scrape2():
    # write a statement that finds all the items in the db and sets it to a variable
    medically_underserved_ = list(medically_underserved.find())
    return Response(json.dumps(medically_underserved_,default=str),mimetype="application/json")

@app.route("/low_income_ca")
def scrape3():
    low_income_ca = pd.read_sql('select * from low_income', connection)
    return low_income_ca.to_json()

@app.route("/low_income_race")
def scrape4():
    low_income_race = pd.read_sql('select * from low_income_race', connection)
    return low_income_race.to_json()


if __name__ == "__main__":
    app.run(debug=True)

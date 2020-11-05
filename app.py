from flask import Flask, render_template, jsonify, Response
import pymongo
import json

app = Flask(__name__)

# setup mongo connection
conn = "mongodb://localhost:27017"
client = pymongo.MongoClient(conn)

# connect to mongo db and collection
db = client.HealthcareProject
low_income_ca = db.low_income_ca
low_income_race = db.low_income_race
ca_counties = db.ca_counties
medical_county = db.medical_county
medically_underserved = db.medically_underserved_df

@app.route("/")
def index():
    # write a statement that finds all the items in the db and sets it to a variable
    ca_counties_ = list(ca_counties.find())
    # render an index.html template and pass it the data you retrieved from the database
    return Response(json.dumps(ca_counties_,default=str),mimetype="application/json")

@app.route("/ca_counties")
def scrape():
    # write a statement that finds all the items in the db and sets it to a variable
    ca_counties_ = list(ca_counties.find())
    # render an index.html template and pass it the data you retrieved from the database
    return Response(json.dumps(ca_counties_,default=str),mimetype="application/json")

@app.route("/medical_county")
def scrape():
    # write a statement that finds all the items in the db and sets it to a variable
    medical_county_ = list(medical_county.find())
    # render an index.html template and pass it the data you retrieved from the database
    return Response(json.dumps(medical_county_,default=str),mimetype="application/json")

@app.route("/medically_underserved")
def scrape():
    # write a statement that finds all the items in the db and sets it to a variable
    medically_underserved_ = list(medically_underserved.find())
    # render an index.html template and pass it the data you retrieved from the database
    return Response(json.dumps(medically_underserved_,default=str),mimetype="application/json")

if __name__ == "__main__":
    app.run(debug=True)

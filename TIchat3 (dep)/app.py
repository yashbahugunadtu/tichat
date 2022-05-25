from flask import Flask, request, render_template, jsonify
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
#cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///todo.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class User(db.Model):
    userno = db.Column(db.String(10), primary_key=True)
    username = db.Column(db.String(200), nullable=False)
    
class Messages(db.Model):
    senderno = db.Column(db.String(10), primary_key=True)
    receiverno = db.Column(db.String(10), nullable=False)
    message = db.Column(db.String(255), nullable=False)
    time = db.Column(db.DateTime,  primary_key=True, default=datetime.utcnow)

'''
def getKey(username, to):
    l = [username, to]
    l.sort()
    k = l[0] + l[1]
    return k
'''


def getMessages1(sender, receiver):

        lst1 = Messages.query.with_entities(Messages.message, Messages.time).filter_by(senderno=sender, receiverno=receiver).all()
        lst2 = Messages.query.with_entities(Messages.message, Messages.time).filter_by(senderno=receiver, receiverno=sender).all()
        lstr = []
        
        for m, t in lst1:
            lstr.append((t, 1, m))

        for m, t in lst2:
            lstr.append((t, 2, m))
        
        lstr.sort()

        return lstr

#@app.route('/',methods = ['POST'])
#@cross_origin()
home_address="https://tichat3.herokuapp.com/"

@app.route('/')
def index():
    return render_template("index.html", domain=home_address)



@app.route('/user/<username>/<no>', methods=['GET', 'POST'])
@cross_origin()
def chats(username, no, methods=['GET', 'POST']):
    if request.method == "POST":
        q = User.query.with_entities(User.username, User.userno).all()
        res = {}
        for uname, uno in q:
            if (no != uno):
                res[uno] = uname
        return res 
    else:
        lst = User.query.filter_by(userno=no).all()
        if len(lst) == 0:
            newUser = User(userno=no, username=username)
            db.session.add(newUser)
            db.session.commit() 
        return render_template("chats.html", username=username, userno=no, domain=home_address)   



@app.route('/chat/<username>/<userno>/<receivername>/<receiverno>/', methods=['GET', 'POST'])
@cross_origin()
def messageFunction(username, userno, receivername,receiverno, methods=['GET', 'POST']):
    #k = getKey(userno, receiverno)
    if request.method == "POST":
        if request.get_json(force=True).get("id") == "0":
            messages = getMessages1(userno, receiverno)
            return jsonify(messages)
        else:
            inp = request.get_json(force=True).get("input")           

            newMessage = Messages(senderno=userno, receiverno=receiverno, message=inp)
            db.session.add(newMessage)
            db.session.commit()
            #messages[k] += res
            return {"message": inp}
    else:
        messages = ""
        return render_template("chat.html", username=username, userno=userno, receivername=receivername, receiverno=receiverno, domain=home_address)


if __name__ == "__main__":
    app.run(debug = True)

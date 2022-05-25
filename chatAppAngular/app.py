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

    def __repr__(self) -> str:
        return f"{self.sno} - {self.title}"

class Messages(db.Model):
    senderno = db.Column(db.String(10), primary_key=True)
    receiverno = db.Column(db.String(10), nullable=False)
    message = db.Column(db.String(255), nullable=False)
    time = db.Column(db.DateTime,  primary_key=True, default=datetime.utcnow)
    def __repr__(self) -> str:
        return f"{self.sno} - {self.title}"

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


@app.route('/', methods = ['GET', 'POST'])
def index(methods=['GET', 'POST']):
    return render_template("index.html")

@app.route('/user/<username>/<usernumber>', methods=['GET', 'POST'])
@cross_origin()
def chats(username, usernumber, methods=['GET', 'POST']):
    if request.method == "POST":
        q = User.query.with_entities(User.username, User.userno).all()
        res = {}
        for uname, uno in q:
            if (uno != usernumber):
                res[uno] = uname
        return res 
    else:
        lst = User.query.filter_by(userno=usernumber).all()
        if len(lst) == 0:
            newUser = User(userno=usernumber, username=username)
            db.session.add(newUser)
            db.session.commit() 
        return render_template("application.html")   


@app.route('/chat/<username>/<userno>/<receivername>/<receiverno>', methods=['GET', 'POST'])
@cross_origin()
def messageFunction(username, userno, receivername,receiverno, methods=['GET', 'POST']):
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


if __name__ == "__main__":
    app.run(debug = True)

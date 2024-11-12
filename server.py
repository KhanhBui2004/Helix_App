from app import create_app
from flask_cors import CORS

app = create_app()
<<<<<<< HEAD
=======
CORS(app, resources={
    r"/api/*": {
        "origins": "http://localhost:3000",
        "methods": ["GET", "POST", "PUT", "DELETE"],
        "allow_headers": ["Content-Type", "Authorization"],
        "supports_credentials": True
    }
})
>>>>>>> 1d6981ae40c2e412f5bb556a0c31a144c943f2c8

if __name__ == "__main__":
    app.run(debug=True)

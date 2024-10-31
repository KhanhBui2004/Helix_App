from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.services.user_service import (
    get_user_profile,
    update_user_profile,
    delete_user,
    search_user,
    get_user_by_username
)
from werkzeug.utils import secure_filename
import os

user_bp = Blueprint('user', __name__)

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'mp4', 'avi'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@user_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    user_id = get_jwt_identity()
    result = get_user_profile(user_id)
    return jsonify(result)

@user_bp.route('/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    user_id = get_jwt_identity()
    data = request.form.to_dict()  # Đọc dữ liệu từ form
    print(f"Received data: {data}")  # Kiểm tra dữ liệu nhận được

    media_url = None
    # Kiểm tra xem có file hay không và xử lý lưu file
    if 'files' in request.files:  # 'files' là key cho file trong form-data
        file = request.files['files']
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            media_folder = os.path.join('app/media', f'user_id_{user_id}')
            os.makedirs(media_folder, exist_ok=True)
            file_path = os.path.join(media_folder, filename)
            file.save(file_path)
            media_url = f'/media/user_id_{user_id}/{filename}'
    
    data.pop('username', None)
    data.pop('password', None)

    data['media_url'] = media_url
    result = update_user_profile(user_id, data)
    return jsonify(result), result.get('status', 400)

@user_bp.route('/delete', methods=['DELETE'])
@jwt_required()
def delete():
    user_id = get_jwt_identity()
    result = delete_user(user_id)
    return jsonify(result), result.get('status', 400)

#Delete user by user_id if you are admin
@user_bp.route('/delete/<int:user_id>', methods=['DELETE'])
@jwt_required()
def delete_user_by_admin(user_id):
    user_id = get_jwt_identity()
    if user_id != 1:
        return jsonify({'message': 'Permission denied', 'status': 403}), 403
    result = delete_user(user_id)
    return jsonify(result), result.get('status', 400)

#Search user by username
@user_bp.route('/search', methods=['GET'])
def search():
    username = request.args.get('username') # Get username from query string
    result = search_user(username)
    return jsonify(result), result.get('status', 400)

#Get user by username
@user_bp.route('/<username>', methods=['GET'])
def get_user(username):
    result = get_user_by_username(username)
    return jsonify(result), result.get('status', 400)
    
    

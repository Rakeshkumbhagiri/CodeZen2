from flask import Flask, request, jsonify
from flask_cors import CORS
from model import repair_code

app = Flask(__name__)
CORS(app)

@app.route('/api/repair', methods=['POST'])
def repair():
    data = request.get_json()
    
    if not data or 'buggy_code' not in data:
        return jsonify({'error': 'No buggy_code provided'}), 400

    buggy_code = data['buggy_code']
    try:
        fixed_code = repair_code(buggy_code)
        return jsonify({
            'fixed_code': fixed_code,
            'success': True
        })
    except Exception as e:
        return jsonify({
            'error': str(e),
            'success': False
        }), 500

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "ok"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)

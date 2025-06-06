from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
from utils.execute_py_code import execute_py_code # type: ignore
from utils.execute_r_code import execute_r_code # type: ignore
import mimetypes


app = Flask(__name__)
CORS(app)  

# Creating a path to store visualizations
os.makedirs('static/visualizations', exist_ok=True)

mimetypes.add_type('text/html', '.html')
mimetypes.add_type('image/png', '.png')

@app.route('/api/visualize', methods=['POST'])
def visualize():
    
    
    req = request.json
    code = req.get('code')
    lang = req.get('lang', '').lower()
    

    if not code:
        return jsonify({'error': 'No code provided'}), 400
    
    if lang not in ['python', 'r']:
        return jsonify({'error': 'Language must be either "python" or "r"'}), 400
    
    try:
        # For python code 
        if lang == 'python':
            output = execute_py_code(code)

        elif lang == 'r':
            output = execute_r_code(code)
            
        filename = os.path.basename(output)
        visualization_path = f'/static/visualizations/{filename}'

        is_interactive = filename.endswith('.html')
        
        return jsonify({
            'success': True,
            'visualizationPath': visualization_path,
            'isInteractive': is_interactive,
            'message': 'Visualization generated and saved successfully'
        })
        # R execution pending
            
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@app.route('/static/visualizations/<path:filename>')
def get_visualization(filename):
    return send_from_directory('static/visualizations', filename)

if __name__ == '__main__':
    app.run(debug=True, port=5000, threaded=True)
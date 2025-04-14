import os
import uuid
import matplotlib
matplotlib.use('Agg')  
import time

def execute_py_code(code):


    filename = f"{uuid.uuid4()}.png"
    output = os.path.join('static', 'visualizations', filename).replace('\\', '/')
    
    # Appending code to save the visualization
    save_output = code + f"""
# Save the visualization
try:
    if 'plt' in locals() or 'plt' in globals():  # Checking if plt is available
        plt.savefig('{output}')
except Exception as e:
    print(f"Error saving visualization: {{e}}")
"""
    # Executing the code

    try:
        exec(save_output, {}, {})

        time.sleep(2)

        if os.path.exists(output):
            return output
        else:
            time.sleep(2)
            if os.path.exists(output):
                return output
            else:
                raise Exception("Visualization file not created")
            
    except Exception as e:
        raise Exception(f"Error executing Python code: {str(e)}")
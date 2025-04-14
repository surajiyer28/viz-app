import os
import uuid
import matplotlib
matplotlib.use('Agg')  
import time

def execute_py_code(code):

    file_uuid = str(uuid.uuid4())

    if 'plotly' in code and ('import plotly' in code or 'from plotly' in code):
        filename = f"{file_uuid}.html"
        output = os.path.join('static', 'visualizations', filename).replace('\\', '/')
        
        # Append code to save the Plotly visualization as HTML
        save_output = code + f"""
# Save the Plotly visualization as HTML
try:
    if 'fig' in locals() or 'fig' in globals():
        import plotly.io as pio
        config = {{'scrollZoom': True, 'displayModeBar': True}}
        pio.write_html(fig, '{output}', auto_open=False, config=config)
except Exception as e:
    print(f"Error saving Plotly visualization: {{e}}")
"""
    else:

        filename = f"{file_uuid}.png"
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
    # Executing the python code

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
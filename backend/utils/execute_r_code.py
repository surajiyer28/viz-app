import os
import uuid
import subprocess
import tempfile
import time

def execute_r_code(code):

    file_uuid = str(uuid.uuid4())
    
    if 'plotly' in code and ('library(plotly)' in code or 'require(plotly)' in code):
        filename = f"{file_uuid}.html"
        output = os.path.join('static', 'visualizations', filename).replace('\\', '/')
        
        # Append code to save the Plotly visualization in R as HTML
        save_output = """
pdf(NULL)
""" + code + f"""
# Save the Plotly visualization as HTML
tryCatch({{
  if(exists("p") || exists("fig")) {{
    # Determine which variable holds the plotly object
    plot_obj <- if(exists("p")) p else if(exists("fig")) fig else NULL
    
    if(!is.null(plot_obj)) {{
      htmlwidgets::saveWidget(plot_obj, '{output}')
    }}
  }}
}}, error = function(e) {{
  print(paste("Error saving R Plotly visualization:", e$message))
}})
"""
    else:
        filename = f"{file_uuid}.png"
        output = os.path.join('static', 'visualizations', filename).replace('\\', '/')
        
        # Appending R code to save the visualization
        save_output = """
pdf(NULL)
""" + code + f"""
# Save the R visualization
png('{output}', width = 800, height = 600)
# If there's an existing plot, print it
if(exists("p")) {{
  print(p)
}}
dev.off()
"""
    # creating a temporary R script 
    with tempfile.NamedTemporaryFile(suffix='.R', delete=False) as f:
        f.write(save_output.encode('utf-8'))
        r_script_path = f.name
    
    try:
        # Execute the R script
        process = subprocess.run(['Rscript', r_script_path], 
                                capture_output=True, 
                                text=True, 
                                check=True)
        
        # Deleting the temp R script
        if os.path.exists(r_script_path):
            os.unlink(r_script_path)
        
        time.sleep(2)
        
        if os.path.exists(output):
            return output
        else:
            time.sleep(2)
            if os.path.exists(output):
                return output
            else:
                raise Exception("R visualization file not created. R output: " + process.stdout + "\nError: " + process.stderr)
    
    except subprocess.CalledProcessError as e:
        if os.path.exists(r_script_path):
            os.unlink(r_script_path)
            
        raise Exception(f"Error executing R code: {e.stderr}")
        
    except Exception as e:
        if os.path.exists(r_script_path):
            os.unlink(r_script_path)
            
        raise Exception(f"Error executing R code: {str(e)}")
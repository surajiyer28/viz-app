# VIZ-APP


## A. Brief overview of the design and tools used
The app is a language agnostic data visualization web app that currently supports creating visualizations with Python and R. A dual panel design is implemented with a code editing area provided on the left hand side along with an option to select the execution environment, while the visualization outputs are displayed on the right hand side (for desktop view).
The frontend is developed using Angular 19, with a component based responsive design. The application uses Observables, Services and HTTP Client for user interaction and backend API calls. 
The backend is developed using Flask (using Flask-CORS for cross origin requests from angular frontend). Both the environments support static and interactive visualizations using the below libraries:

## Supported Libraries

### Python
- Matplotlib
- Plotly
- Seaborn

### R
- ggplot2
- Plotly

## B. Description of any issues encountered, and steps taken to resolve them

 - One of the challenges I faced was displaying of interactive visualizations, which were produced in HTML format. This was due to a security restriction in Angular which blocks unsafe URLs (HTML visualizations) by default. I was able to fix this using SafeResourceUrl type in angular which allowed to bypass the security measure and display the HTML visualization files.

## Features

- Create visualizations using Python or R code
- Support for both static (PNG) and interactive (HTML) visualizations
- Simple and intuitive user interface

## Setup

### Prerequisites

- Node.js and npm
- Angular CLI
- Python 3.x
- R (if using R visualizations)

### Frontend Setup

```bash
# Install dependencies
npm install

# Start the Angular development server
npm start
```

The application will be available at http://localhost:4200

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create and activate a virtual environment (optional)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install Python dependencies
pip install -r requirements.txt

# Install R packages (if using R)
Rscript r_requirements.R

# Start the Flask server
python app.py
```

The backend API will be available at http://localhost:5000

## Usage

1. Choose your preferred language (Python or R)
2. Write your visualization code in the editor
3. Click "Generate Visualization" to see the results



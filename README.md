
# Weather Warehouse

  

**Weather Warehouse** is a full-stack weather application that presents users with current weather, forecast, historical, and additional weather-related data. The project is divided into two main parts: a Node.js/Express backend serving APIs and a React (with TypeScript) frontend that provides a modern, interactive user interface.

  

---

  

## Technologies & Packages

  

### Backend

-  **Node.js** – JavaScript runtime for the server.

-  **Express** – Minimalist web framework for building API endpoints.

-  **CORS** – Middleware to enable cross-origin resource sharing.

  

### Frontend

-  **React & TypeScript** – For building a robust, component-driven UI.

-  **Material UI** – Implements Google's Material Design for theming and UI components.

-  **React Router** – Handles routing within the single-page application.

-  **TanStack React Query** – Manages data fetching, caching, and synchronization.

-  **Local Storage** – Persists the user's theme (light or dark) across sessions.

  

### Additional Tools

-  **Git** – Version control system to track and manage changes.

-  **Prettier** – Code formatting tool.



## Installation & Running the Project

### Prerequisites

-   Node.js (v22.14.0)
-   Python 3.10 (https://www.python.org/downloads/release/python-3100/)
-   pip (https://bootstrap.pypa.io/get-pip.py)
-   npm (11.3.0)
-   Git
-   SQL Server 2022 Developer Edition (https://www.microsoft.com/hu-hu/sql-server/sql-server-downloads)
-   SQL Server Management Studio (20.2.1) (Basic install, use customize, select without azure, default instance, mixed auth, add current user, use strong password) (https://learn.microsoft.com/en-us/ssms/download-sql-server-management-studio-ssms#download-ssms)

### Setup Steps

1.  **Clone the Repository:**
	```
    git  clone https://github.com/soosbarna12/szakdolgozat/
    cd  weather-warehouse
    ```
    
2.  **Backend Setup:**
    ```
    cd  .\backend
    npm  install
    python -m venv venv
    python get-pip.py
    venv\Scripts\activate
    pip install -r .\requirements.txt
    python -m ipykernel install --user
    node  app.js
    ```

3. **Data Warehouse Setup:**
    ```
    Make sure SQL Server is running (enable TCP/IP in SQL Server Configuration)
    Open SQL Server Management Studio
    Enter the login credentials to connect to database (set encryption to optional, trust server certificate)
    Download .bak database backup file from Google Drive
    Right click on Databases and Restore Database
    ```
    
3.  **Frontend Setup:**
    ```
    cd  .\frontend    
    npm  install    
    npm  run dev
    ```
    The React frontend application will start at  http://localhost:3000.

#   Run tests
##  Frontend tests
    cd  .\frontend
    npm run test-snap

## Backend tests
    cd  .\backend
    npm run test-snap

# Services
## Meteostat Bulk Data
    These scripts are for saving the raw weather data for the warehouse

# Git and Project Management

-   **Version Control:**  Git is used to track changes. Use meaningful commit messages and regularly push your changes.


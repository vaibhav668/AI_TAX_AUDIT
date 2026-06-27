# AI Tax Audit Agent

## Overview

AI Tax Audit Agent is a full-stack application designed to automate the financial auditing process by combining transaction management, receipt processing, document verification, and intelligent audit reporting into a single workflow.

The system allows organizations to import financial transactions, upload supporting documents, perform automated reconciliation, identify inconsistencies, generate audit alerts, and produce detailed audit reports.

---

## Features

* User authentication and authorization
* Transaction management (Create, Read, Update, Delete)
* Bulk transaction import from CSV files
* Receipt upload and management
* OCR-based text extraction from receipts
* Automated transaction and receipt matching
* Matching score generation
* Audit gap analysis
* Intelligent audit alert generation
* AI-assisted audit recommendations
* PDF audit report generation
* RESTful API built with FastAPI
* Interactive frontend dashboard

---

## Technology Stack

### Backend

* Python
* FastAPI
* SQLAlchemy
* PostgreSQL
* Alembic
* Pydantic
* JWT Authentication

### AI & Document Processing

* PaddleOCR
* OpenCV
* LangGraph
* LangChain
* OCR Pipeline
* Rule-Based Matching Engine

### Frontend

* HTML
* CSS
* JavaScript

---

## Project Structure

```text
AI-Tax-Audit-Agent/
│
├── backend/
│   ├── app/
│   ├── uploads/
│   ├── reports/
│   └── requirements.txt
│
├── frontend/
│
├── alembic/
│
├── alembic.ini
│
└── README.md
```

---

## System Workflow

1. User uploads transaction data.
2. Receipt documents are uploaded.
3. OCR extracts text from receipts.
4. Transactions are matched with receipts.
5. Matching scores are calculated.
6. Missing information and inconsistencies are detected.
7. Audit alerts are generated.
8. AI produces audit recommendations.
9. A complete audit report is generated.

---

## Installation

### Clone the repository

```bash
git clone https://github.com/vaibhav668/Tax_Audit_Agent.git
cd Tax_Audit_Agent
```

### Create a virtual environment

```bash
conda create -n tax_audit python=3.10
conda activate tax_audit
```

### Install dependencies

```bash
pip install -r backend/requirements.txt
```

### Configure environment variables

Create a `.env` file inside the backend directory and configure the required environment variables.

Example:

```env
DATABASE_URL=
SECRET_KEY=
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
```

---

## Database Setup

Run database migrations using Alembic.

```bash
alembic upgrade head
```

---

## Running the Backend

```bash
cd backend
uvicorn app.main:app --reload
```

API Documentation:

```
http://127.0.0.1:8000/docs
```

---

## Running the Frontend

Open the frontend using Live Server or any static web server.

```
frontend/index.html
```

---

## API Modules

* Authentication
* Users
* Transactions
* Transaction Import
* Receipt Management
* OCR Processing
* Matching Engine
* Audit Alerts
* Gap Analysis
* Report Generation

---

## Future Improvements

* Multi-user organization support
* Cloud storage integration
* Email notifications
* Dashboard analytics
* Invoice processing
* AI-powered fraud detection
* Multi-currency support
* Role-based access control enhancements

---

## License

This project is intended for educational and research purposes.

---

## Author

**Vaibhav Pokhriyal**

B.Tech Computer Science and Engineering (AI & ML)

Govind Ballabh Pant Institute of Engineering and Technology

GitHub: https://github.com/vaibhav668

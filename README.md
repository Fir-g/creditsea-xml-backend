# Credit Report Processing API

This project is an API for processing and managing credit reports. It allows users to upload XML files containing credit report data, which are then parsed, stored in a MongoDB database, and made available for retrieval via API endpoints.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/credit-report-api.git
    cd credit-report-api
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Set up environment variables:
    - Copy the [.env_example](http://_vscodecontentref_/0) file to [.env](http://_vscodecontentref_/1) and update the values as needed.

4. Start the server:
    ```sh
    npm run server
    ```

## Usage

To use the API, you need to send HTTP requests to the endpoints described below. You can use tools like Postman or cURL to interact with the API.

## API Endpoints

### Upload a Credit Report

- **URL:** `/api/upload`
- **Method:** `POST`
- **Description:** Upload an XML file containing credit report data.
- **Request:**
    - [file](http://_vscodecontentref_/2): The XML file to be uploaded.
- **Response:**
    - [message](http://_vscodecontentref_/3): Success message.
    - [id](http://_vscodecontentref_/4): The ID of the processed credit report.

### Fetch All Reports

- **URL:** `/api/reports`
- **Method:** `GET`
- **Description:** Fetch all credit reports.
- **Response:**
    - An array of credit report objects.

### Fetch a Single Report by ID

- **URL:** `/api/reports/:id`
- **Method:** `GET`
- **Description:** Fetch a single credit report by its ID.
- **Response:**
    - A credit report object

| Endpoint | Description | Method |
|----------|-------------|---------|
| `/upload` | Uploads a credit report file | POST |
| `/reports` | Retrieves all credit reports | GET |
| `/reports/:id` | Retrieves a specific report | GET |

## Project Structure
```.env
.env_example
.gitignore
index.js
models/
  ├── CreditReport.js
package.json
src/
  ├── app.js
  ├── config/
  │   ├── database.js
  │   ├── multer.js
  ├── controllers/
  │   ├── creditReportController.js
  ├── dao/
  │   ├── creditReportDao.js
  ├── models/
  │   ├── CreditReport.js
  ├── routes/
  │   ├── creditReportRoutes.js
  ├── services/
  │   ├── creditReportService.js
  ├── utils/
  │   ├── errorHandler.js
  │   ├── xmlParser.js
uploads/ ```
## Environment Variables

The following environment variables need to be set in the [.env] file:

- [PORT](): The port on which the server will run (default: 3000).
- [MONGO_URI]:): The URI for connecting to the MongoDB database.



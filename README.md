# url_shortner_server

## Description
A URL shortener service that allows users to shorten long URLs and redirect to the original URL using the shortened version. This service is built using Node.js and Express, and it stores URL mappings in a MongoDB database. The service provides a simple API for creating and retrieving shortened URLs.

## Installation
1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/url_shortner_server.git
    ```
2. Navigate to the project directory:
    ```sh
    cd url_shortner_server
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```

## Usage
1. Start the server:
    ```sh
    npm start
    ```
2. Use the API to shorten URLs and redirect:
    - To shorten a URL, send a POST request to `/shorten` with the original URL.
    - To redirect, use the shortened URL provided by the service.

### Example
To shorten a URL with an expiry time of 10 minutes, use the following curl command:
```sh
curl --location 'http://localhost:3005/shorten-url/v1/generate' \
--header 'Content-Type: application/json' \
--data '{
    "url": "https://site.com/end-point",
    "expiry": {
        "value": 10,
        "unit": "minute"
    }
}'
```

#### Sample Response
```json
{
    "status": "Success",
    "message": "Shorten URL generated successfully.",
    "statusCode": 200,
    "response": {
        "shorten_url": "http://localhost:3005/shorten-url/v1/00JamIhJ",
        "expiry_timestamp": "2025-02-05T13:04:55.498Z"
    }
}
```

## License
This project is licensed under the MIT License.
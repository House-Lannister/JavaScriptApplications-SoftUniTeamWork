define(function() {
    var PARSE_APP_ID = 'bSQ7Oyfo5ODbslHZ1ZKcs7akRHeQZRdqmiUM26Fc',
        PARSE_REST_API_KEY = 'lKFUeIuEfilTlWGVPjI9wXKLhITgdhbMgIlKKN7k';

    return (function() {
        var makeRequest = function makeRequest(method, headers, url, data, success, error) {
            return $.ajax({
                type: method,
                headers: headers,
                url: url,
                contentType: 'application/json',
                data: JSON.stringify(data),
                success: success,
                error: error
            })
        };

        function makeGetRequest(headers, url, success, error) {
            return makeRequest('GET', headers, url, undefined, success, error);
        }

        function makePutRequest(headers, url, data, success, error) {
            return makeRequest('PUT', headers, url, data, success, error);
        }

        function makePostRequest(headers, url, data, success, error) {
            return makeRequest('POST', headers, url, data, success, error);
        }

        function makeDeleteRequest(headers, url, success, error) {
            return makeRequest('DELETE', headers, url, undefined, success, error);
        }

        return {
            get: makeGetRequest,
            put: makePutRequest,
            post: makePostRequest,
            remove: makeDeleteRequest
        }
    }());
});
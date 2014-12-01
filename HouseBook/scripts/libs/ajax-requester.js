define(function() {
    var PARSE_APP_ID = 'bSQ7Oyfo5ODbslHZ1ZKcs7akRHeQZRdqmiUM26Fc',
        PARSE_REST_API_KEY = 'lKFUeIuEfilTlWGVPjI9wXKLhITgdhbMgIlKKN7k';

    return (function() {
        var makeRequest = function makeRequest(method, url, data, success, error) {
            return $.ajax({
                type: method,
                headers: {
                    "X-Parse-Application-Id": PARSE_APP_ID,
                    "X-Parse-REST-API-Key": PARSE_REST_API_KEY
                },
                url: url,
                contentType: 'application/json',
                data: JSON.stringify(data),
                success: success,
                error: error
            })
        };

        function makeGetRequest(url, success, error) {
            return makeRequest('GET', url, null, success, error);
        }

        function makePutRequest(url, data, success, error) {
            return makeRequest('PUT', url, data, success, error);
        }

        function makePostRequest(url, data, success, error) {
            return makeRequest('POST', url, data, success, error);
        }

        function makeDeleteRequest(url, success, error) {
            return makeRequest('DELETE', url, null, success, error);
        }

        return {
            get: makeGetRequest,
            put: makePutRequest,
            post: makePostRequest,
            delete: makeDeleteRequest
        }
    }());
});
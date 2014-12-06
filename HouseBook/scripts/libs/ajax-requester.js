define(['q'], function(Q) {

    return (function() {
        var makeRequest = function makeRequest(method, headers, url, data) {
            var defer = Q.defer();


            $.ajax({
                type: method,
                headers: headers,
                url: url,
                contentType: 'application/json',
                data: JSON.stringify(data),
                success: function(data) {
                    defer.resolve(data);
                },
                error: function(error) {
                    defer.reject(error);
                }
            });

            return defer.promise;
        };

        function makeGetRequest(headers, url) {
            return makeRequest('GET', headers, url, undefined);
        }

        function makePutRequest(headers, url, data) {
            return makeRequest('PUT', headers, url, data);
        }

        function makePostRequest(headers, url, data) {
            return makeRequest('POST', headers, url, data);
        }

        function makeDeleteRequest(headers, url) {
            return makeRequest('DELETE', headers, url, undefined);
        }

        function makeLoginRequest(headers, url, data) {
            return $.ajax({
                type: 'GET',
                headers: headers,
                url: url,
                contentType: 'application/json',
                data: data
            })
        }

        return {
            get: makeGetRequest,
            put: makePutRequest,
            post: makePostRequest,
            remove: makeDeleteRequest,
            login: makeLoginRequest
        }
    }());
});
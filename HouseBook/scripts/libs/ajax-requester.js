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
            var deferLog = Q.defer();

            return $.ajax({
                type: 'GET',
                headers: headers,
                url: url,
                contentType: 'application/json',
                data: data,
                success: function(data) {
                    deferLog.resolve(data);
                },
                error: function(error) {
                    deferLog.reject(error);
                }
            });

            return deferLog.promise;
        }

        function makeUploadFileRequest(headers, url, file) {
            var deferUpload = Q.defer();
            var fileHeaders = headers;
            return $.ajax({
                type: 'POST',
                beforeSend: function(request) {
                    request.setRequestHeader("X-Parse-Application-Id", fileHeaders['X-Parse-Application-Id']);
                    request.setRequestHeader("X-Parse-REST-API-Key", fileHeaders['X-Parse-REST-API-Key']);
                    request.setRequestHeader("Content-Type", file.type);
                },
                url: url,
                processData: false,
                contentType: false,
                data: file,
                success: function(data) {
                    console.log("File available at: " + data.url);
                    //alert("File available at: " + data.url);
                    deferUpload.resolve(data);
                },
                error: function(error) {
                    deferUpload.reject(error);
                }
            });

            return deferLog.promise;
        }

        return {
            get: makeGetRequest,
            put: makePutRequest,
            post: makePostRequest,
            remove: makeDeleteRequest,
            login: makeLoginRequest,
            upload: makeUploadFileRequest
        }
    }());
});
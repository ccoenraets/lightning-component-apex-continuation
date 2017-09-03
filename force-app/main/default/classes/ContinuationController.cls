global with sharing class ContinuationController {

    public ContinuationController() {
        String hostname = URL.getSalesforceBaseUrl().getHost();
        String mydomain = hostname.substring(0, hostname.indexOf('--c'));
        String lcBaseURL = 'https://' + mydomain + '.lightning.force.com';
        Map<String, String> headers = Apexpages.currentPage().getHeaders();	
        headers.put('X-Frame-Options', 'ALLOW-FROM ' + lcBaseURL);
        headers.put('Content-Security-Policy', 'frame-ancestors ' + lcBaseURL);
    }

    @AuraEnabled
    public static String getVFBaseURL() {
        User user = [SELECT fullPhotoUrl FROM User WHERE userType = 'Standard' LIMIT 1]; 
        // The above query returns a URL like https://my-domain-dev-ed--c.na50.content.force.com/profilephoto/001/A
        // Let's use the two first fragments of that URL to create the VF base URL 
        List<String> fragments = user.fullPhotoUrl.split('\\.');
        return fragments[0] + '.' + fragments[1] + '.visual.force.com';
    }

    // Called via JavaScript Remoting
    @RemoteAction
    global static Object invoke(String methodName, String[] params) {

        if (methodName == 'getProducts') {
            // Make an HTTPRequest as we normally would
            // Remember to configure a Remote Site Setting for the service!
            String url = 'https://long-running.herokuapp.com/products?latency=' + params[0];
            HttpRequest req = new HttpRequest();
            req.setMethod('GET');
            req.setEndpoint(url);

            // Create a Continuation for the HTTPRequest        
            Continuation con = new Continuation(60);
            con.state = con.addHttpRequest(req);
            con.continuationMethod = 'callback';        

            // Return it to the system for processing
            return con;
        } else if (methodName == 'getProduct') {
            // Make an HTTPRequest as we normally would
            // Remember to configure a Remote Site Setting for the service!
            String url = 'https://long-running.herokuapp.com/products/' + params[0] + '?latency=' + params[1];
            HttpRequest req = new HttpRequest();
            req.setMethod('GET');
            req.setEndpoint(url);

            // Create a Continuation for the HTTPRequest        
            Continuation con = new Continuation(60);
            con.state = con.addHttpRequest(req);
            con.continuationMethod = 'callback';        

            // Return it to the system for processing
            return con;
        } else {
            return null;
        }
    }

    global static Object callback(Object state) {
        HttpResponse response = Continuation.getResponse((String)state);
        Integer statusCode = response.getStatusCode();
        if (statusCode >= 2000) {
            return 'Continuation error: ' + statusCode;
        }
        return response.getBody();
    }

}
global with sharing class SimpleContinuationController {

    // This value can be externalized in a Custom Setting or calculated based on the VF URL
    global static String lcOrigin = 'https://momentum-efficiency-4004-dev-ed.lightning.force.com';
    
    public SimpleContinuationController() {
        Apexpages.currentPage().getHeaders().put('X-Frame-Options', 'ALLOW-FROM ' + lcOrigin);
        Apexpages.currentPage().getHeaders().put('Content-Security-Policy', 'frame-ancestors ' + lcOrigin);
    }

    // Called via JavaScript Remoting
    @RemoteAction
    global static Object callService(Integer count){

        // Make an HTTPRequest as we normally would
        // Remember to configure a Remote Site Setting for the service!
        String url = 'https://node-count.herokuapp.com/'+count;
        HttpRequest req = new HttpRequest();
        req.setMethod('GET');
        req.setEndpoint(url);

        // Create a Continuation for the HTTPRequest        
        Continuation con = new Continuation(60);
        con.state = con.addHttpRequest(req);
        con.continuationMethod = 'callback';        

        // Return it to the system for processing
        return con;
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
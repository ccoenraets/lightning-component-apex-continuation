({
    doInit : function(component, event, helper) {
        var vfOrigin = "https://" + component.get("v.vfHost");
		window.addEventListener("message", function(event) {
			if (event.origin !== vfOrigin) {
				// Not the expected origin: reject message
				return;
			}
			// Only handle messages we are interested in
			if (event.data.name === "com.mycompany.chatmessage") {
				vfResponse = event.data.payload;
				component.set("v.vfResponse", vfResponse);
			}
		}, false);
	},

	sendToVF : function(component, event, helper) {
        var vfOrigin = "https://" + component.get("v.vfHost");
		var vfWindow = component.find("vfFrame").getElement().contentWindow;
		var message = {
			name: "com.mycompany.chatmessage",
			payload: component.get("v.count")
		};
        vfWindow.postMessage(message, vfOrigin);
	}
})
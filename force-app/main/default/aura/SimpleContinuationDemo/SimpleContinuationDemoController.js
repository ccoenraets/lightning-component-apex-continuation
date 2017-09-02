({
	doInit: function (component, event, helper) {
		var vfBaseURL = "https://" + component.get("v.vfHost");
		// Listen for messages posted by the iframed VF page
		window.addEventListener("message", function (event) {
			if (event.origin !== vfBaseURL) {
				// Not the expected origin: reject message
				return;
			}
			// Only handle messages we are interested in
			if (event.data.topic === "com.mycompany.message") {
				var result = event.data.result;
				component.set("v.result", result);
			}
		}, false);
	},

	callService: function (component, event, helper) {
		var vfBaseURL = "https://" + component.get("v.vfHost");
		var vf = component.find("vfFrame").getElement().contentWindow;
		var message = {
			topic: "com.mycompany.message",
			payload: component.get("v.count")
		};
		vf.postMessage(message, vfBaseURL);
	}
})
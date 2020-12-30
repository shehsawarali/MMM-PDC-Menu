Module.register("MMM-PDC", {
	
	menu: ["Today's menu has not been updated."],
	
	start: function() {
		this.count = 0;
		var timer = setInterval(() => {
			this.updateDom();
			this.count++;
		}, 10000)
	},
	
	getDom: function() {
		var element = document.createElement("div");
		element.className = "myContent";
		element.innerHTML = "Hello from PDC!";
		var subElement = document.createElement("p");
		subElement.id = "COUNT";
		element.appendChild(subElement);
		return element;
	},
	
	notificationReceived: function(notification, payload, sender) {
		console.log(notification);
		if(notification == 'ALL_MODULES_STARTED'){
			this.sendSocketNotification("CONFIG",this.config)
			//var timer = setInterval(() => {
				console.log("Ask for menu");
				this.sendSocketNotification("getPdcMenu", null);
			//}, 10000)
		}
	},
	socketNotificationReceived: function(notification, payload) {
		console.log(notification);
		if(notification == "dis response"){
			var elem = document.getElementById("COUNT");
			elem.innerHTML = "Count:" + payload;
		}
		
		if(notification == "PdcMenu"){
			console.log(payload);
		}
	},
})

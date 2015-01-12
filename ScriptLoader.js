ScriptLoader = function() {
	this.waitingList = [];
	this.isLoading = false;
};

ScriptLoader.prototype = {
	load: function(url) {
		if (this.waitingList.length == 0) {
			this.loadScript(url);
		} else {
			this.waitingList.push(url);
		}
	},
	
	loadScript: function(url) {
		var self = this;
		this.isLoading = true;
		$.getScript( "ajax/test.js" )
		  .done(function( script, textStatus ) {
			  self.remove(url);
			  if (self.waitingList.length == 0) {
				  self.isLoading = false;
			  } else {
				  self.loadScript(self.waitingList[0]);
			  }
		  })
		  .fail(function( jqxhr, settings, exception ) {
		});
	},
	
	removeUrl: function(url) {
		var index = this.waitingList.indexOf(url);
		if (index != -1) {
			this.waitingList.splice(index,1);
		}
	}
	
};
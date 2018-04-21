var mainUrlInputElem = $("body").find(".main-url");
var app = {	
	shortUrlInputElem: $(".short-url"),
	shortUrl: function(element_obj){
		var main_url_elem = $(".main-url"),
			long_url = main_url_elem.val(),
			validator = validation.validateUrl(long_url);
			if(!validator){
				validation.showError(main_url_elem);
				return false;
			}
		$(".loader-div").append(app.getLoader());
		$.ajax({
			url: $(element_obj.element).data("url"),
			type:"post",
			data:{long_url:long_url,action:"shortUrl"},
			success:function(response){
				$(".short-url").val(window.location.href + response);
				app.getTopUrls(100);
				app.handleInputs();
			}
		});
	},
	handleInputs: function(){
		$(".main-url").val("");
		$(".short-url").removeAttr("disabled").select();
		$("body").find(".pre-loader").remove();
	},
	getLoader: function(){
		return "<img src='assets/img/loader.gif' class='pre-loader text-center' style='width:60px'>";
	},
	getTopUrls: function(length){
		$.ajax({
			url: "controller.php",
			type:"post",
			data:{action:"getTopUrls", length:length},
			success:function(response){				
				var short_urls = JSON.parse(response),
					list = app.makeUrlList(short_urls);
				$(".top-100-urls").find("ul").empty().append(list);				
				$(".top-100-urls").find(".pre-loader").remove();
			}
		});
	},
	makeUrlList: function(url_arr){
		var list = "";
		$(url_arr).each(function(){
			var url = window.location.href + this;
			list += "<li><a target='_blank' href="+ url +">"+ url +"</li>";
		});
		return list;
	}
};
var validation = {
	showError: function(element){
		$(element).before("<p style='color:#ff0000'>Please enter valid url</p>");
		$(element).css("border","1px solid #ff0000");
	},
	validateUrl: function(url_input){
		var re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
		return (!re.test(url_input) ? false : true);
	}	
};

$(function(){
	$(".top-100-urls").append(app.getLoader());
	app.getTopUrls(100);
});
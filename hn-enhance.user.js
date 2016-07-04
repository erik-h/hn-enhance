// ==UserScript==
// @name        hn-enhance
// @namespace   http://erikh.me
// @version     0.1
// @description Add some enhancements to Hacker News!
// @author      youdulayo
// @include     *news.ycombinator.com/*
// @grant       none
// ==/UserScript==

(function() {
	// A function that loads jQuery and calls a callback function when jQuery has finished loading
	// Source: https://web.archive.org/web/20130804120117/http://erikvold.com/blog/index.cfm/2010/6/14/using-jquery-with-a-user-script
	function addJQuery(callback) {
		var script = document.createElement("script");
		script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
		script.addEventListener("load", function () {
			var script = document.createElement("script");
			script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
			document.body.appendChild(script);
		}, false);
		document.body.appendChild(script);
	}

	function main() {
		// Return a jQuery object that contains the anchor tag
		// that will open both the article and comments links
		function buildMultiLink(article, comments) {
			var $lc = jQ("<a href='#'>Link + Comments</a>");
			$lc.click(function(e) {
				e.preventDefault();
				window.open(comments);
				window.open(article);
			});

			// Use a wrapper span so we get a nice little pipe before the anchor
			return jQ("<span> | </span>").append($lc);
		}

		// Loop through each story
		jQ(".athing").each(function() {
			// The row containing the comments link, author, etc
			// (always appears right after its corresponding article)
			var $linkRow = jQ(this).next();

			//
			// The article and comments URLs
			//
			var article = jQ(this).find(".title > a").attr("href");
			var comments = $linkRow.find("td > a[href^=item\\?id\\=]").attr("href");

			if (typeof comments !== "undefined") {
				// Only append if we actually have a comment link;
				// some stories (e.g. "FooBar is hiring ...") don't have a comment link.
				$linkRow.find(".subtext").append(buildMultiLink(article, comments));
			}
		});
	}


	// Load jQuery and execute the main function
	addJQuery(main);
})();

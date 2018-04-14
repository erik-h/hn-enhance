// ==UserScript==
// @name        hn-enhance
// @namespace   http://erikh.me
// @version     0.1
// @description Add some enhancements to Hacker News!
// @author      erik-h
// @include     *news.ycombinator.com/*
// @grant       none
// ==/UserScript==

(function() {
	// Return a span that contains the anchor tag that will open both
	// the article and comments links
	function buildMultiLink(article, comments) {
		var linkAndComment = document.createElement("a");
		linkAndComment.appendChild(document.createTextNode("Link + Comments"));
		linkAndComment.addEventListener("click", function(e) {
			e.preventDefault();
			window.open(comments);
			window.open(article);
		});

		// Use a wrapper span so we get a nice little pipe before the anchor
		var wrapper = document.createElement("span");
		wrapper.appendChild(document.createTextNode(" | "));
		wrapper.appendChild(linkAndComment);
		return wrapper;
	}

	var stories = document.getElementsByClassName("athing");
	// Loop through each story
	for (var i = 0; i < stories.length; i++) {
		var linkRow = stories[i].nextSibling;

		var articleLink = stories[i].querySelector("td.title > a").href;
		var comments = linkRow.querySelector("td > a[href^=item\\?id\\=]");

		if (typeof comments !== "undefined") {
			// Append the "Link + Comments" href after the existing links
			// subtext for the story
			linkRow.querySelector(".subtext")
				.appendChild(buildMultiLink(articleLink, comments.href));
		}
	}
})();

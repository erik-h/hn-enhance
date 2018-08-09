// ==UserScript==
// @name        hn-enhance
// @namespace   http://erikh.me
// @version     0.1
// @description Add some enhancements to Hacker News!
// @author      erik-h
// @include     *news.ycombinator.com/*
// @grant       none
// ==/UserScript==

(() => {
	// Return a span that contains the anchor tag that will open both
	// the article and comments links
	const buildMultiLink = (article, comments) => {
		let linkAndComment = document.createElement("a");

		let linkCommentText;
		if (article !== comments) {
			linkCommentText = "Link + Comments";
		}
		else {
			linkCommentText = "Link = Comments";
		}

		linkAndComment.appendChild(document.createTextNode(linkCommentText));
		linkAndComment.addEventListener("click", e => {
			e.preventDefault();
			let commentsWindow = window.open(comments);
			/*
			 * Load the article _after_ the comments; this isn't useful unless
			 * certain extensions are in use such as Tree Style Tab, which
			 * messes up the tab order if there isn't a delay between opening
			 * the comments and the article
			 */
			commentsWindow.onload = () => {
				if (article !== comments) {
					// We only want to open the article if it's not the same
					// page as the comments
					window.open(article);
				}
			}
		});

		// Use a wrapper span so we get a nice little pipe before the anchor
		let wrapper = document.createElement("span");
		wrapper.appendChild(document.createTextNode(" | "));
		wrapper.appendChild(linkAndComment);
		return wrapper;
	}

	let stories = document.getElementsByClassName("athing");
	// Loop through each story
	for (const story of stories) {
		var linkRow = story.nextSibling;

		var articleLink = story.querySelector("td.title > a").href;
		var comments = linkRow.querySelector("td > a[href^=item\\?id\\=]");

		// Only add a comments link if we actually have comments on this post
		if (comments) {
			// Append the "Link + Comments" href after the existing link's
			// subtext for the story
			linkRow.querySelector(".subtext")
				.appendChild(buildMultiLink(articleLink, comments.href));
		}
	}
})();

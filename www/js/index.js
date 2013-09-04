/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
        console.log('Received Event: ' + id);
        
    },
    blog: function() {
		function getBlogs() {
			$('#page-loader').fadeIn(600);
			var dfd = $.Deferred();
			$.ajax({
				url: 'http://rbe.it/news/api/get_recent_posts/',
				type: 'GET',
				dataType: 'json',
				success: function(data) {
					var allposts = data.posts,
						buffy = '';
					$.each(allposts, function(postid, postcontent) {
						var basedate = new Date(postcontent.date),
							basemonth = basedate.getMonth() + 1,
							post_thumbnail = '';
						var itadate = basedate.getDate() + ' ';
						switch (basemonth) {
						case 1:
							itadate += 'gennaio';
							break;
						case 2:
							itadate += 'febbraio';
							break;
						case 3:
							itadate += 'marzo';
							break;
						case 4:
							itadate += 'aprile';
							break;
						case 5:
							itadate += 'maggio';
							break;
						case 6:
							itadate += 'giugno';
							break;
						case 7:
							itadate += 'luglio';
							break;
						case 8:
							itadate += 'agosto';
							break;
						case 9:
							itadate += 'settembre';
							break;
						case 10:
							itadate += 'ottobre';
							break;
						case 11:
							itadate += 'novembre';
							break;
						case 12:
							itadate += 'dicembre';
							break;
						}
						itadate += ' ' + basedate.getFullYear();
						$.each(postcontent.attachments, function(attid, attcontent) {
							if (attcontent.mime_type == 'image/jpeg') {
								post_image = attcontent.url;
								return false;
							}
						});
						if (post_image == '') {
							post_thumbnail = 'img/noimage.png';
						} else {
							post_thumbnail = post_image.replace('.jpg', '-150x150.jpg');
						}
						buffy += '<li><a data-transition="slide" href="rbe-detail.html?' + postid + '">';
						buffy += '<img class="post_thumbnail" src="' + post_thumbnail + '" width="100" height="100" title="' + postcontent.title + '" />';
						buffy += '<h2 class="entry-title">' + postcontent.title + '</h2>';
						buffy += '<span class="listingmeta">' + itadate + ' - ' + postcontent.comment_count + ' commenti</span>';
						buffy += '</a></li>';
					});
					$('#all-posts').html(buffy);
					dfd.resolve(data);
				},
				error: function(data) {
					$('#page-loader').fadeOut(600);
					$('#all-posts').html("<br /><br /><h3>La connessione � assente. Riprova pi� tardi.</h3>");
				}
			});
			return dfd.promise();
		};
		getBlogs().then(function(data) {
			$('#page-loader').fadeOut(600);
			$('#all-posts').on('click', 'li', function(e) {
				localStorage.setItem('postData', JSON.stringify(data.posts[$(this).index()]));
			});
		});
	},
	VPblog: function() {
	
		function getVPBlogs() {
			$('#page-loader').fadeIn(600);
			var dfd = $.Deferred();
			$.ajax({
				url: 'http://vociprotestanti.it/api/get_recent_posts/',
				type: 'GET',
				dataType: 'json',
				success: function(data) {
					var allposts = data.posts,
						buffy = '';
					$.each(allposts, function(postid, postcontent) {
						var basedate = new Date(postcontent.date),
							basemonth = basedate.getMonth() + 1,
							post_thumbnail = '';
						var itadate = basedate.getDate() + ' ';
						switch (basemonth) {
						case 1:
							itadate += 'gennaio';
							break;
						case 2:
							itadate += 'febbraio';
							break;
						case 3:
							itadate += 'marzo';
							break;
						case 4:
							itadate += 'aprile';
							break;
						case 5:
							itadate += 'maggio';
							break;
						case 6:
							itadate += 'giugno';
							break;
						case 7:
							itadate += 'luglio';
							break;
						case 8:
							itadate += 'agosto';
							break;
						case 9:
							itadate += 'settembre';
							break;
						case 10:
							itadate += 'ottobre';
							break;
						case 11:
							itadate += 'novembre';
							break;
						case 12:
							itadate += 'dicembre';
							break;
						}
						itadate += ' ' + basedate.getFullYear();
						$.each(postcontent.attachments, function(attid, attcontent) {
							if (attcontent.mime_type == 'image/jpeg') {
								post_image = attcontent.url;
								return false;
							}
						});
						if (post_image == '') {
							post_thumbnail = 'img/noimage.png';
						} else {
							post_thumbnail = post_image.replace('.jpg', '-150x150.jpg');
						}
						buffy += '<li><a data-transition="slide" href="vp-detail.html?' + postid + '">';
						buffy += '<img class="post_thumbnail" src="' + post_thumbnail + '" width="100" height="100" title="' + postcontent.title + '" />';
						buffy += '<h2 class="entry-title">' + postcontent.title + '</h2>';
						buffy += '<span class="listingmeta">' + itadate + ' - ' + postcontent.comment_count + ' commenti</span>';
						buffy += '</a></li>';
					});
					$('#all-posts').html(buffy);
					dfd.resolve(data);
				},
				error: function(data) {
					console.log(data);
				}
			});
			return dfd.promise();
		};
		getVPBlogs().then(function(data) {
			$('#page-loader').fadeOut(600);
			$('#all-posts').on('click', 'li', function(e) {
				localStorage.setItem('postData', JSON.stringify(data.posts[$(this).index()]));
			});
		});
	},
	single: function() {
		var postDataStorage = localStorage.getItem('postData'),
			postData = JSON.parse(postDataStorage),
			buffy = '',
			content = postData.content.replace('<a ', '<a target="_blank" ');
		var post_thumbnail = postData.thumbnail;
		if (post_image != null) {
			var post_image = post_thumbnail.replace('-150x150.jpg', '.jpg');
		}
		var basedate = new Date(postData.date),
			basemonth = basedate.getMonth() + 1,
			post_thumbnail = '',
			itadate = basedate.getDate() + ' ';
		switch (basemonth) {
		case 1:
			itadate += 'gennaio';
			break;
		case 2:
			itadate += 'febbraio';
			break;
		case 3:
			itadate += 'marzo';
			break;
		case 4:
			itadate += 'aprile';
			break;
		case 5:
			itadate += 'maggio';
			break;
		case 6:
			itadate += 'giugno';
			break;
		case 7:
			itadate += 'luglio';
			break;
		case 8:
			itadate += 'agosto';
			break;
		case 9:
			itadate += 'settembre';
			break;
		case 10:
			itadate += 'ottobre';
			break;
		case 11:
			itadate += 'novembre';
			break;
		case 12:
			itadate += 'dicembre';
			break;
		}

		itadate += ' ' + basedate.getFullYear();
		buffy += '<h1 class="entry-title">' + postData.title + '</h1>';
		buffy += '<span class="entry-date">' + itadate + '</span>';
		if (post_thumbnail != '' && post_thumbnail != null) {
			buffy += '<img src="' + post_image + '" class="post_thumbnail" />';
		}
		buffy += '<div class="entry-content">' + content + '</div>';
		$('#single-data').html(buffy);
	},
	VPsingle: function() {
		var postDataStorage = localStorage.getItem('postData'),
			postData = JSON.parse(postDataStorage),
			buffy = '',
			content = postData.content.replace('<a ', '<a target="_blank" ');
		var post_thumbnail = postData.thumbnail,
			post_image = post_thumbnail.replace('-150x150.jpg', '.jpg');
		var basedate = new Date(postData.date),
			basemonth = basedate.getMonth() + 1,
			post_thumbnail = '',
			itadate = basedate.getDate() + ' ';
		switch (basemonth) {
		case 1:
			itadate += 'gennaio';
			break;
		case 2:
			itadate += 'febbraio';
			break;
		case 3:
			itadate += 'marzo';
			break;
		case 4:
			itadate += 'aprile';
			break;
		case 5:
			itadate += 'maggio';
			break;
		case 6:
			itadate += 'giugno';
			break;
		case 7:
			itadate += 'luglio';
			break;
		case 8:
			itadate += 'agosto';
			break;
		case 9:
			itadate += 'settembre';
			break;
		case 10:
			itadate += 'ottobre';
			break;
		case 11:
			itadate += 'novembre';
			break;
		case 12:
			itadate += 'dicembre';
			break;
		}
		itadate += ' ' + basedate.getFullYear();
		buffy += '<h1 class="entry-title">' + postData.title + '</h1>';
		buffy += '<span class="entry-date">' + itadate + '</span>';
		if (post_thumbnail != '') {
			buffy += '<img src="' + post_image + '" class="post_thumbnail" />';
		}
		buffy += '<div class="entry-content">' + content + '</div>';
		$('#single-data').html(buffy);
	}
};

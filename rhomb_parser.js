// rhomb_parser.js
// 
// This is a simple template parser. You can define your own 
// parsing methods. The methods go into the methods object. Just 
// follow these simple rules:
//
// the placeholder in the link 
// starts with a #
// and 
//		can be followed by a string as a valid JavaScript function name
// 			and has then to be followed by a _
//			and has then to be followed by a string as the value for the method
//		or can be followed by a string as the placeholder
// and ends with a #
//
// If using the first variant this would be something like 
//		#url_www.google.com#
// or
//		#mailto_andy@nms.de#
//
// If using the simple placeholder variant, the method text() will be called.
// The placeholder itself looks like
//		#fist_name#
// or
//		#last_name#
//
// The matching has to be provided as an object to parseContent() like so:
//		data = {
//			first_name: "Andy",
//			last_name: "Wenk"
//		}
//
// author: Andy Wenk <andy@nms.de>
// license: BSD
// date: December 2010
 
var RhombParser = function() {
  var methods = {
    url: function(hit) {
      return this.createLink(hit);
    },

    urldata: function(item) {
      var text = this.data[hit.toLowerCase()];

      if(!text) {return '';}

      return this.createLink(text);
    },

    mailto: function(hit) {
      return this.createLink(hit, 'mailto:' + hit);
    },

    text: function(item) {
      var hit = item.match(/#(.+)#/i);

      if(!hit) {return '';}

      return this.data[hit[1].toLowerCase()];
    }
  }
	
	return {
    setDoParse: function(parse) {
      this.doParse = parse;
    },

    parseContent: function(body, data) {
      this.data = data;

      if (!this.doParse) {
        return body;
      } else {
        var placeholder = body.match(/#.[^\s]+#/ig),
            i = placeholder.length,
            item, fun;

        while(i > 0) {
          --i;
          item = placeholder[i];
          fun = item.replace(/#/g, '').split('_')[0];

          if(typeof methods[fun] === "function") {
            hit = this.getHit(fun, item);
            if(!hit) {continue;}

            match = methods[fun].call(this, hit);
            body = this.replacePlaceholder(item, match, body);
          } else {
            match = methods['text'].call(this, item);
            body = this.replacePlaceholder(item, match, body);
          }
        }
      }
      return body.replace(/\n/g, '<br />');
    },

    createLink: function(text, url) {
      if(!text) {return '';}

      if(!url) {
        var host = text.match(/(http)|(https)/) || '';
        url = (host[1]) ? text : ['http://', text].join('');
      }

      return '<a href="' + url + '">' + text + '</a>';
    },

    getHit: function(fun, item) {
      var regex = new RegExp('#' + fun + '_(.+)#', 'i'),
      hit = item.match(regex)[1];

      return hit || '';
    },

    // adapted from https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/String/substring
    // Example: Replacing a substring within a string
    replacePlaceholder: function(item, match, body) {
      var i = 0, len = body.length;

      for (i; i < len; i++) {
        if (body.substring(i, i + item.length) == item) {
          body = body.substring(0, i) + match + body.substring(i + item.length, body.length);
        }
      }

      return body;
    }
  }	
}();
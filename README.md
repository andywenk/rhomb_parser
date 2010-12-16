# Rhomb Parser

This is a simple template parser. You can define your own 
parsing methods. The methods go into the methods object. Just 
follow these simple rules:

the placeholder in the link 
starts with a `#`
  and 
    can be followed by a string as a valid JavaScript function name
	and has then to be followed by a `_`
	and has then to be followed by a string as the value for the method
    or can be followed by a string as the placeholder
  and ends with a `#`

If using the first variant this would be something like 
  `#url_www.google.com#`
or
  `#mailto_andy@nms.de#`

If using the simple placeholder variant, the method `text()` will be called.
The placeholder itself looks like
  `#fist_name#`
or
  `#last_name#`

The matching has to be provided as an object to `parseContent()` like so:
  data = {
    first_name: "Andy",
    last_name: "Wenk"
  }

## Why another template parser?

First of all, if you are looking for a template engin, please use Jan Lehnardt's mustache.js
<https://github.com/janl/mustache.js>.

I wrote Rhomb Parser because I wanted to make life easier for people who are not familiar with
HTML but have to write snippets of text e.g. in a CMS like system. The only thing these 
people have to know ist the simple convention for writing placeholders. Means just write text 
and Rhomb Parser will convert it to HTML including to generate URL's. 

It is easy to extend the parser by simply adding new methods. Let's say you want to have a 
placeholder which is producing a bold word, just add a method "bold" and the placeholder 
would look like `#bold_sometext#`. The result will be `<strong>sometext</strong>` or `<b>sometext</b>`.

Got it? Cool.

## What means Rhomb?

For the ones how doesn't know yet - this sign # is a rhomb. And it does not sound too stupid.

## TODO

- add tag style like `#url_www.google.com#Text Text Text #/url#`
 
## License BSD

Use it if you find it useful! 

_      = require('underscore')
_.str  = require('underscore.string');
moment = require 'moment'
fs     = require 'fs'
color  = require('ansi-color').set


_.mixin(_.str.exports());
_.str.include('Underscore.string', 'string');

scripts =  
  "file://"+__dirname+"/d3.min.js",
  ...
           
             
html-stub = (d) ->
  "<!DOCTYPE html><body>#{d.toString()}</div></body></html>"

get-arrays-in-svg = (window) ->
  return window.d3.selectAll('[id*="Element"]')?[0]

inject-ng-repeat = (window) ->
  arrays = get-arrays-in-svg(window)

  if not arrays? 
    return null

  for a in arrays
    matches = (/([a-zA-Z]+)Element_(\w+)/g).exec(a.id)
    if matches? 
      array-name = matches[1]
      element = matches[2]
      window.d3.select("\##{a.id}").attr('ng-repeat', "#element in #{array-name}")

  for a in arrays
    x1 = window.d3.select("\##{a.id} [id*='PosA']").attr(\x)
    x2 = window.d3.select("\##{a.id} [id*='PosB']").attr(\x)
    y1 = window.d3.select("\##{a.id} [id*='PosA']").attr(\y)
    y2 = window.d3.select("\##{a.id} [id*='PosB']").attr(\y)

    dx = x2 - x1
    dy = y2 - y1

    window.d3.selectAll("\##{a.id}").attr('transform', "translate({{$index * #dx}},{{$index * #dy}})")

differentiate-ids = (window) ->
  # differentiate IDs that have to be selected singularly
  to-be-centered = window.d3.selectAll("[id*='CenteredText']")[0]
  for c in to-be-centered
    id = window.d3.select(c).attr(\id)
    window.d3.select(c).attr(\id, "#{id}_{{$index}}")

output-svg = (window) ->
  console.log window.d3.select('svg')[0][0].parentNode.innerHTML

dom-manip = (window) ->
  inject-ng-repeat window
  differentiate-ids window
  output-svg window

fs.readFile './assets/svg/main.svg', (err, data) ->
    
  config = { scripts: scripts, html: html-stub(data)}
    
  require("jsdom").jsdom.env( 
    scripts:    scripts, 
    html:       html-stub(data), 
    done:       (err, window) ->
      dom-manip(window)						
    )

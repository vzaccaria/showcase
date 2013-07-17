

webcode-toolkit = {}

webcode-toolkit.set-color-of-box = (identifier, color) ->
        d3.select("\##identifier").attr('fill', color)

webcode-toolkit.set-mouseover-appear = (mouse-on-node, to-appear-node) ->
    d3.select(to-appear-node).style(\opacity, 0.0)
    d3.select(mouse-on-node).on 'mouseover', ->
        d3.select(to-appear-node).transition().duration(100).style(\opacity, 1.0)
        
    d3.select(mouse-on-node).on 'mouseout', ->
        d3.select(to-appear-node).transition().duration(100).style(\opacity, 0.0)

# Link (*)Hover and (*)Info siblings with appear animations
# Center text for label with (*)CenteredText
# Hide *Hidden blocks

webcode-toolkit.automate-svg = ~>
    d3.select('svg').on 'DOMSubtreeModified', ->
        hovered = d3.selectAll('[id*="Hover"]')
        for h in hovered[0]
            infotag = d3.select(h.parent-node).select('[id*="Info"]')[0]
            webcode-toolkit.set-mouseover-appear(h, infotag[0])

        centered = d3.selectAll('[id*="CenteredText"]')
        for h in centered[0]
            cent = h.id 
            console.log "Setting centered text #cent"
            webcode-toolkit.set-alignment-of-text(cent, {+center})



webcode-toolkit.set-alignment-of-text = (identifier, opts) ->
        tspan = d3.select("\##identifier + text > tspan") 
        box   = d3.select("\##identifier")
        ttext = d3.select("\##identifier + text") 
        ww          = parseInt(box.attr(\width))
        xx          = parseInt(box.attr(\x))
        other-side  = xx+ww
        
        ll    = tspan[0][0].getComputedTextLength()      
         
        if opts?.right? == true 
            x = parseInt(tspan.attr(\x))
            x = xx + ww - ll
            tspan.attr("x", Math.floor(x))
            
        if opts?.center? == true 
            x = parseInt(tspan.attr(\x))
            x = xx + (ww - ll)/2
            tspan.attr("x", Math.floor(x))
 

## d3.select('#vCLabel + text > tspan')
window.webcode-toolkit = webcode-toolkit
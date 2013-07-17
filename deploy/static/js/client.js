(function(){
  var webcodeToolkit, this$ = this;
  webcodeToolkit = {};
  webcodeToolkit.setColorOfBox = function(identifier, color){
    return d3.select("#" + identifier).attr('fill', color);
  };
  webcodeToolkit.setMouseoverAppear = function(mouseOnNode, toAppearNode){
    d3.select(toAppearNode).style('opacity', 0.0);
    d3.select(mouseOnNode).on('mouseover', function(){
      return d3.select(toAppearNode).transition().duration(100).style('opacity', 1.0);
    });
    return d3.select(mouseOnNode).on('mouseout', function(){
      return d3.select(toAppearNode).transition().duration(100).style('opacity', 0.0);
    });
  };
  webcodeToolkit.automateSvg = function(){
    return d3.select('svg').on('DOMSubtreeModified', function(){
      var hovered, i$, ref$, len$, h, infotag, centered, cent, results$ = [];
      hovered = d3.selectAll('[id*="Hover"]');
      for (i$ = 0, len$ = (ref$ = hovered[0]).length; i$ < len$; ++i$) {
        h = ref$[i$];
        infotag = d3.select(h.parentNode).select('[id*="Info"]')[0];
        webcodeToolkit.setMouseoverAppear(h, infotag[0]);
      }
      centered = d3.selectAll('[id*="CenteredText"]');
      for (i$ = 0, len$ = (ref$ = centered[0]).length; i$ < len$; ++i$) {
        h = ref$[i$];
        cent = h.id;
        console.log("Setting centered text " + cent);
        results$.push(webcodeToolkit.setAlignmentOfText(cent, {
          center: true
        }));
      }
      return results$;
    });
  };
  webcodeToolkit.setAlignmentOfText = function(identifier, opts){
    var tspan, box, ttext, ww, xx, otherSide, ll, x;
    tspan = d3.select("#" + identifier + " + text > tspan");
    box = d3.select("#" + identifier);
    ttext = d3.select("#" + identifier + " + text");
    ww = parseInt(box.attr('width'));
    xx = parseInt(box.attr('x'));
    otherSide = xx + ww;
    ll = tspan[0][0].getComputedTextLength();
    if (((opts != null ? opts.right : void 8) != null) === true) {
      x = parseInt(tspan.attr('x'));
      x = xx + ww - ll;
      tspan.attr("x", Math.floor(x));
    }
    if (((opts != null ? opts.center : void 8) != null) === true) {
      x = parseInt(tspan.attr('x'));
      x = xx + (ww - ll) / 2;
      return tspan.attr("x", Math.floor(x));
    }
  };
  window.webcodeToolkit = webcodeToolkit;
}).call(this);
(function(){
  var rg, renderTextAt, replaceMarkdownLinkAt, splitAtSeparator, convertIndex, renderText, loadTtyRecording;
  rg = /(\[[\t]*read((?:\[[^\]]*\]|[^\[\]])*)\]\([\t]*()<?((?:\([^)]*\)|[^()\s])*?)>?[\t]*((['"])(.*?)\6[\t]*)?\))/;
  renderTextAt = function(url, suffix, cb){
    var this$ = this;
    return $.get(url, function(data){
      renderText(data, suffix);
      if (cb != null) {
        return cb();
      }
    });
  };
  replaceMarkdownLinkAt = function(text, cb){
    var mt, type, link, this$ = this;
    mt = rg.exec(text);
    if (mt != null) {
      type = window._.string.trim(mt[2]);
      link = window._.string.trim(mt[4]);
      return $.get(link, function(data){
        var newText, toBeReplaced;
        newText = "```" + type + "\n" + data + "\n```";
        toBeReplaced = text.replace(rg, newText);
        return cb(toBeReplaced, true);
      });
    } else {
      return cb(text, false);
    }
  };
  splitAtSeparator = function(text){
    return window._.string.words(text, '---');
  };
  convertIndex = function(converter, index, txt, suffix){
    return (function(index, txt){
      return replaceMarkdownLinkAt(txt, function(txt, isCode){
        var ht;
        ht = converter.makeHtml(txt);
        $(ht).appendTo("#" + suffix + index);
        return $("table").attr('class', 'table table-bordered');
      });
    }.call(this, index, txt));
  };
  renderText = function(text, suffix){
    var converter, textBoxes, index, txt, results$ = [];
    converter = new Showdown.converter({
      extensions: ['table']
    });
    textBoxes = splitAtSeparator(text);
    for (index in textBoxes) {
      txt = textBoxes[index];
      results$.push(convertIndex(converter, index, txt, suffix));
    }
    return results$;
  };
  loadTtyRecording = function(url, id){
    var this$ = this;
    return $.getJSON(url, function(data){
      playterm_player.data = data;
      return playterm_player.init(id);
    });
  };
  window.renderTextAt = renderTextAt;
}).call(this);
(function(){
  var application;
  application = angular.module('application', []);
  application.controller('appCtrl', function($scope, $http){
    $scope.status = 'ok';
    window.mainScope = $scope;
    return angular.element(document).ready(function(){
      $scope.nameProject = 'wmake';
      $scope.lastUpdated = '6 minutes ago';
      $scope.descriptionCoverage = 'Actual coverage';
      $scope.vC = '77%';
      $scope.who = 'V';
      $scope.commitStatus = [{}, {}, {}];
      $scope.commitStatus[0].messageCommit = 'Changed x y z';
      $scope.commitStatus[0].timeCommit = '20 min';
      $scope.commitStatus[1].messageCommit = 'x y z';
      $scope.commitStatus[1].timeCommit = '10 min';
      $scope.commitStatus[2].messageCommit = 'x y z';
      $scope.commitStatus[2].timeCommit = '10 min';
      return $scope.renderAfterInclude = function(){
        return webcodeToolkit.automateSvg();
      };
    });
  });
}).call(this);

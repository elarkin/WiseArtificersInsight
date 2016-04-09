function fetchResultsJS(theForm,event) {
  event.preventDefault();

  var formIntegerArray = ["craftAbility", "craftArtifact", "craftAttribute", "stuntDice", "stuntSuccesses", "numAttempts", "terminus", "targetThreshold", "essence"];
  var formBooleanArray = ["craftSpeciality", "fullExcellency", "willpowerSpend", "flawlessHandiworkMethod", "flawlessHandiworkRepurchase"];

  var returnFloatArray = ["meanSuc", "stdDevSuc", "percentSuc"];
  var returnIntegerArray = ["medianSuc","initialPoolSize"];

  var hash = {};

  $.each(formIntegerArray, function(index, item) { hash[item] = parseInt(theForm.elements.namedItem(item).value); });
  $.each(formBooleanArray, function(index, item) { hash[item] = (~~theForm.elements.namedItem(item).checked); });

  var attemptArray = collectAttemptStatistics(hash);

  var data = {};

  data.meanSuc = arrayMean(attemptArray);
  data.medianSuc = arrayMedian(attemptArray);
  data.stdDevSuc = arrayStdDev(attemptArray);
  data.percentSuc = arrayPercentAboveThreshold(attemptArray,parseInt(hash.targetThreshold));
  data.initialPoolSize = (Math.min(parseInt(hash.craftAbility), parseInt(hash.craftArtifact)) + parseInt(hash.craftAttribute))*(1 + parseInt(hash.fullExcellency))
                      + parseInt(hash.stuntDice) + parseInt(hash.craftSpeciality);
  data.hist = arrayHistogram(attemptArray);

  $.each(returnFloatArray, function(index, item) { document.getElementById(item).innerHTML = data[item].toFixed(2); });
  $.each(returnIntegerArray, function(index, item) { document.getElementById(item).innerHTML = data[item]; });

  renderHistogram(data, hash, theForm);

  // $.ajax({
  //   type: 'GET',
  //   url: '/exaltedcraftingdieroller',
  //   data: hash,
  //   dataType: 'json',
  //   success: function(data) {
  //     $.each(returnFloatArray, function(index, item) { document.getElementById(item).innerHTML = data[item].toFixed(2); });
  //     $.each(returnIntegerArray, function(index, item) { document.getElementById(item).innerHTML = data[item]; });
  //     renderHistogram(data, hash, theForm);
  //   }
  // });
}

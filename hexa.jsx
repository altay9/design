var doc = app.documents.add(); 

var artLayer = doc.layers[0]; 
app.defaultStroked = true;
app.defaultFilled = true;
 

  createHexPattern();
  makeClippingMask();
   
 function makeClippingMask(){ 
 
 artLayer.hasSelectedArtwork = true;
var selection = activeDocument.selection;
var group = artLayer.groupItems.add();
var count = selection.length;
for(var i = 0; i < count; i++) {
    var item = selection[i];
    item.moveToBeginning(group);
}
   

var rect = artLayer.pathItems.rectangle(760,3, 610,790);
rect.moveToBeginning(group);


group.clipped = true; // <-- Add this after adding your paths to the group.
   group.translate(0, 30);
  }
 function createHexPattern(){
 var hex = artLayer.pathItems.polygon(0, 760, 30, 6, false);
   hex.translate(-30, 0);

 var hexHeight = hex.height / 2
  var hexWidth = hex.width / 2
  var orientation = 'horizontal'
  if (hexHeight > hexWidth) {
    orientation = 'vertical'
  }
 

  // This is all horrifying magic numbers
  // I am so sorry
  // I blame the terrible environment I had to work in
  var size = hexHeight / 2
  var rows = doc.height / (size * 4)
  var cols = doc.width / (size * 3)

  var rowStep, colStep
  if (orientation == 'vertical') {
    rowStep = -size * 1.5 * 2
    colStep = size * 1.73 * 2
  } else {
    rowStep = -size * 2 * 2
    colStep = size * 1.73 * 2
  }
  var offset = 1.73 * -size * 2

  var tooFarRight = false
  var tooFatDown = false
  var previouslyTooFarRight = false

  for (var colCount = 0; colCount <= cols; colCount++) {
    for (var rowCount = 0; rowCount <= rows; rowCount++) {
      previouslyTooFarRight = false
      var added = hex.duplicate()
 
      if (orientation == 'vertical') {
        added.translate(colCount * colStep + (rowCount % 2 == 1 ? colStep * 0.5 : 0), rowCount * rowStep)
      } else {
        added.translate(colCount * colStep, rowCount * rowStep + (colCount % 2 == 1 ? rowStep * 0.5 : 0))
      }
      // Let's see if it's off of the artboard
      tooFarRight = Math.abs(added.left) > doc.width
      tooFarDown = Math.abs(added.top) > doc.height
      if (tooFarDown) {
        // if it is, remove the hexagon we just added and exit the loop
        added.remove()
        break
      }
      if (tooFarRight) added.remove()
      if (tooFarRight && previouslyTooFarRight) break
    }
    // If two in a row are too far right, time to escape
    if (tooFarRight && previouslyTooFarRight) {
      break
    }
  }
  // Remove the original hexagon
  hex.remove()
 }
 
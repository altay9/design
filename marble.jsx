docRef = activeDocument;
rulerUnits = app.preferences.rulerUnits;
app.preferences.rulerUnits = Units.PIXELS;
 
 app.doAction("Marble this!", "Marble Texture Generator.atn");
 

app.preferences.rulerUnits = rulerUnits;


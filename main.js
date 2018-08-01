var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

function initFrets(fretLength){
    this.fretLength = fretLength;
}
//first zero added for drawing left vertical line of first fret
var fretsByPercentage = [0,0.08,0.07,0.07,0.07,0.07,0.06,0.06,0.06,0.06,0.05,0.05,0.05,0.04,0.03,0.03,0.03,0.03,0.03,0.03,0.03];
var fretWidth = 0.05;

var neck_length = 1250;
var neck_width = 300;
var number_of_strings = 6;

var x_offset = 40;
var y_offset = 60;
var number_of_frets = 20;

var space_between_strings = neck_width/number_of_strings;

function drawStrings(){
   for(var i=0; i < number_of_strings; i++){
    ctx.moveTo(x_offset+neck_length,y_offset+i*space_between_strings);
    ctx.lineTo(x_offset, y_offset+i*space_between_strings);
    ctx.stroke();
   }
}
drawStrings();

function drawFrets(){
    var x1 = x_offset+neck_length;
    for (var i=0; i <= number_of_frets; i++){
        if(i == 0){
            ctx.moveTo(x1,y_offset);
            ctx.lineTo(x1,y_offset+neck_width-space_between_strings);
            ctx.stroke();
            continue;
        }
        x1 -= fretWidth*neck_length;
        var y1 = y_offset;
        ctx.moveTo(x1,y1);
        ctx.lineTo(x1,y1+neck_width-space_between_strings);
        ctx.stroke();
    }
}

drawFrets();

var a  = {name : 'A', next : null};
var a_ = {name : 'A#', next : null};
var b = {name : 'B', next : null};
var c = {name : 'C', next : null};
var c_ = {name : 'C#', next : null};
var d = {name : 'D', next : null};
var d_ = {name : 'D#', next : null};
var e = {name : 'E', next : null};
var f = {name : 'F', next : null};
var f_ = {name : 'F#', next : null};
var g = {name : 'G', next : null};
var g_ = {name : 'G#', next : null};
a.next = a_;
a_.next = b;
b.next = c;
c.next = c_;
c_.next = d;
d.next = d_;
d_.next = e;
e.next = f;
f.next = f_;
f_.next = g;
g.next = g_;
g_.next = a;

ctx.font = '20px Verdana';

function drawOpenNotesAndNumerize(){
    var openNotes = ['E','A','D','G','B','E'];
    for(var i=0; i < openNotes.length; i++){
        ctx.fillText(openNotes[i],x_offset+neck_length+10, y_offset+(i*space_between_strings));
        ctx.fillText(openNotes.length-i,x_offset-20, y_offset+(i*space_between_strings));
    }
}

drawOpenNotesAndNumerize();

function drawNotes(clickedNote, color){
    //go through all strings
    var arc_r = 15;
    var starting_notes = [f,a_,d_,g_,c,f];
    for( var i = 0; i < starting_notes.length; i++){
        //go through all notes on string
        var note = starting_notes[i];
        var x_ = x_offset+neck_length-(fretWidth*neck_length)/2 - 10;
        var y_ = y_offset+i*space_between_strings - 10;
        for( var j = 1; j <= number_of_frets; j++){
            ctx.fillStyle = (clickedNote === note.name) ? color : "black";
            ctx.clearRect(x_-arc_r,y_-arc_r*2, arc_r*3, arc_r*2+8);
            ctx.fillText(note.name, x_,y_);
            note = note.next;
            x_ -= fretWidth*neck_length;
        }
    }
}
drawNotes();

function numberizeFrets(){
    var xPos = x_offset + neck_length - (fretWidth*neck_length)/2;
    for( i = 1; i <= number_of_frets; i++){
        ctx.fillText(i, xPos, y_offset + neck_width);
        xPos -= fretWidth*neck_length;
    }
}

numberizeFrets();
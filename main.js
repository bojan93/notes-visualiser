var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

var x_offset = 20;
var y_offset = 60;

function initFrets(fretLength){
    this.fretLength = fretLength;
}
//first zero added for drawing left line of first fret
var fretsByPercentage = [0,0.08,0.07,0.07,0.07,0.07,0.06,0.06,0.06,0.06,0.05,0.05,0.05,0.04,0.03,0.03,0.03,0.03,0.03,0.03,0.03];

var neck_length = 1250;
var neck_width = 300;
var number_of_strings = 6;

function drawStrings(){
   for(var i=0; i < number_of_strings; i++){
    ctx.moveTo(x_offset,y_offset+(i*(neck_width/number_of_strings)));
    ctx.lineTo(x_offset+neck_length, y_offset+(i*(neck_width/number_of_strings)));
    ctx.stroke();
   }
}
drawStrings();

function drawFrets(){
    var x1 = x_offset;
    for (var i=0; i < fretsByPercentage.length; i++){
        x1 += fretsByPercentage[i]*neck_length;
        var y1 = y_offset;
        ctx.moveTo(x1,y1);
        ctx.lineTo(x1,y1+neck_width-neck_width/number_of_strings);
        ctx.stroke();
        console.log(i);
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

ctx.font = '18px Verdana';

var starting_notes = [f,a_,d_,g_,c,f];

function drawNotes(clickedNote, color){
    //go through all strings
    for( var i = 0; i < starting_notes.length; i++){
        //go through all notes on string
        var note = starting_notes[i];
        var x_ = x_offset;
        var y_ = y_offset-10+(i*(neck_width/number_of_strings));
        for( var j = 1; j <= fretsByPercentage.length; j++){
            x_ += fretsByPercentage[j]*neck_length;
            let x_pos = x_ - (fretsByPercentage[j]*neck_length)/2
            if(note.name.includes('#')){
                x_pos -= 10;
            }
            ctx.fillStyle = (clickedNote === note.name) ? color : "black";
            ctx.fillText(note.name, x_pos,y_);
            if(clickedNote === note.name){
                ctx.beginPath();
                ctx.arc(x_pos,y_, 20, 0,360);
                ctx.strokeStyle = color;
                ctx.stroke();
            }
            note = note.next;
        }
    }
}
drawNotes();
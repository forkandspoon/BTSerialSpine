/* start drawSpline library */

/*
    Copyright 2010 by Robin W. Spencer

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You can find a copy of the GNU General Public License
    at http://www.gnu.org/licenses/.

*/


function hexToCanvasColor(hexColor,opacity){
    // Convert #AA77CC to rbga() format for Firefox
    opacity=opacity || "1.0";
    hexColor=hexColor.replace("#","");
    var r=parseInt(hexColor.substring(0,2),16);
    var g=parseInt(hexColor.substring(2,4),16);
    var b=parseInt(hexColor.substring(4,6),16);
    return "rgba("+r+","+g+","+b+","+opacity+")";
}
function drawPoint(ctx,x,y,r,color){
    ctx.save();  
    ctx.beginPath();
    ctx.lineWidth=1;
    ctx.fillStyle=hexToCanvasColor(color,1);
    ctx.arc(x,y,r,0.0,2*Math.PI,false);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
    ctx.restore();
}
function getControlPoints(x0,y0,x1,y1,x2,y2,t){
    //  x0,y0,x1,y1 are the coordinates of the end (knot) pts of this segment
    //  x2,y2 is the next knot -- not connected here but needed to calculate p2
    //  p1 is the control point calculated here, from x1 back toward x0.
    //  p2 is the next control point, calculated here and returned to become the 
    //  next segment's p1.
    //  t is the 'tension' which controls how far the control points spread.
    
    //  Scaling factors: distances from this knot to the previous and following knots.
    var d01=Math.sqrt(Math.pow(x1-x0,2)+Math.pow(y1-y0,2));
    var d12=Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2));
   
    var fa=t*d01/(d01+d12);
    var fb=t-fa;
  
    var p1x=x1+fa*(x0-x2);
    var p1y=y1+fa*(y0-y2);

    var p2x=x1-fb*(x0-x2);
    var p2y=y1-fb*(y0-y2);  
    
    return [p1x,p1y,p2x,p2y]
}

function drawSpline(ctx,pts,t){
    
    ctx.lineWidth=4;
    ctx.save();
    var cp=[];   // array of control points, as x0,y0,x1,y1,...
    var n=pts.length;



        // START draw open curve

        // Draw an open curve, not connected at the ends
        for(var i=0;i<n-4;i+=2){
            cp=cp.concat(getControlPoints(pts[i],pts[i+1],pts[i+2],pts[i+3],pts[i+4],pts[i+5],t));
        }    
        for(var i=2;i<pts.length-5;i+=2){
            var color="#555555";
            ctx.strokeStyle=hexToCanvasColor(color,0.75);       
            ctx.beginPath();
            ctx.moveTo(pts[i],pts[i+1]);
            ctx.bezierCurveTo(cp[2*i-2],cp[2*i-1],cp[2*i],cp[2*i+1],pts[i+2],pts[i+3]);
            ctx.stroke();
            ctx.closePath();
        }
        //  For open curves the first and last arcs are simple quadratics.
        var color="#555555";
        ctx.strokeStyle=hexToCanvasColor(color,0.75); 
        ctx.beginPath();
        ctx.moveTo(pts[0],pts[1]);
        ctx.quadraticCurveTo(cp[0],cp[1],pts[2],pts[3]);
        ctx.stroke();
        ctx.closePath();
        
        var color="#555555";
        ctx.strokeStyle=hexToCanvasColor(color,0.75); 
        ctx.beginPath();
        ctx.moveTo(pts[n-2],pts[n-1]);
        ctx.quadraticCurveTo(cp[2*n-10],cp[2*n-9],pts[n-4],pts[n-3]);
        ctx.stroke();
        ctx.closePath();

        // END draw open curve





    ctx.restore();
    
    //   Draw the knot points.
        for(var i=0;i<n;i+=2){
            drawPoint(ctx,pts[i],pts[i+1],2.5,"#ffff00");
        }
    
}

/* end drawSpline library */






var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

/* initialise an empty array of all the angles */
var sensorAngles = [0, 0, 0, 0, 0, 0, 0, 0];

/* divide each sensor distance segment by height of screen/window for
maximum amount of canvas being used */
var sensorDistance = (ctx.height / (sensorAngles.length + 1));

function diffPos(angle){ // angles in radians
    return {
    	dx: sensorDistance*Math.sin(angle),
    	dy: sensorDistance*Math.cos(angle)
    }
};

function sensorSpline(){
	var sensorPos = [{x: (canvas.width/2), y: canvas.height - sensorDistance}];
	for (var i = 0; i < sensorAngles.length; i++){
		sensorPos.push({
			x: sensorPos[i].x - diffPos(angle).dx,
			y: sensorPos[i].y - diffPos(angle).dy
		});

	}
	for (var i = 0; i < sensorAngles.length; i++){
		console.log(sensorAngles[i]);
	}

};

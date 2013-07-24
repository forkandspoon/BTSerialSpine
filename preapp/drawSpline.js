var stage = new Kinetic.Stage({
        container: 'myCanvas',
        width: 540,
        height: 960
    }
);

var sensorLayer = new Kinetic.Layer();

/* initialise an empty array of all the angles */
var sensorAngles = [0, 0, 0, 0, 0, 0, 0, 0];
//var sensorPos = [];

/* divide each sensor distance segment by height of screen/window for
maximum amount of canvas being used */
var sensorDistance = (stage.getHeight() / (sensorAngles.length + 2));

function diffPos(angle) { // angles in radians
    return {
        dx: sensorDistance * Math.sin(angle),
        dy: sensorDistance * Math.cos(angle)
    };
};

function calcSpline(sensorAngles) {
    sensorPos = [{x: (stage.getWidth() / 2), y: (stage.getHeight() - sensorDistance)}];
    for (var i = 0; i < sensorAngles.length; i++){
        sensorPos.push({
            x: sensorPos[i].x - diffPos(sensorAngles[i]).dx,
            y: sensorPos[i].y - diffPos(sensorAngles[i]).dy
        });

    }
    return sensorPos;
    /*for (var i = 0; i < sensorAngles.length; i++){
        console.log(sensorPos[i]);
    }*/
};

calcSpline(sensorAngles);

var sensorPos = calcSpline(sensorAngles);
var spine = new Kinetic.Spline({
    points: sensorPos,
    stroke: 'red',
    strokeWidth: 2,
    lineCap: 'round',
    tension: 0.3
});

sensorLayer.add(spine);
stage.add(sensorLayer);



function updateSpline(angles) {
    calcSpline(angles)
    spine.setPoints(sensorPos);
    sensorLayer.draw();
};

//function allo(){
//    alert('hello');
//}
//setTimeout(allo, 4000);
setTimeout(updateSpline([0.1,0.2,0.1,0.1,0.1,0.1,0.1,0.1]),3000);
setTimeout(console.log('updatedpos: ' + sensorPos), 3000);


noseX = 0;
noseY = 0;
difference = 0;
RightWristX = 0;
LeftWristX = 0;

function setup()
{
    video = createCapture(VIDEO);
    video.size(550, 500);

    canvas = createCanvas(550, 500);
    canvas.position(560, 150);

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function draw()
{
    document.getElementById("square_size").innerHTML = "Width and height of a square will be = " + difference + "px";
    background('#6e7f80');
    fill ('#f90093');
    stroke ('#f90093');

   if (scoreRightWrist < 0.2)
   { 
    circle(RightWristX,rightWristY);

    if(rightWristY > 0 && rightWristY <= 100)
    {
        document.getElementById("speed").innerHTML = "Speed = 0.5x";
        song.rate(0.5);
    }
    else if (rightWristY > 100 && rightWristY <= 200)
    {
        document.getElementById("speed").innerHTML = "Speed = 1x";
        song.rate(1);
    }
    else if (rightWristY > 200 && rightWristY <= 300)
    {
        document.getElementById("speed").innerHTML = "Speed = 1.5x";
        song.rate(1.5);
    }    
    else if (rightWristY > 300 && rightWristY <= 400)
    {
        document.getElementById("speed").innerHTML = "Speed = 2x";
        song.rate(2);
    }    
    else if (rightWristY > 400 && rightWristY <= 500)
    {
        document.getElementById("speed").innerHTML = "Speed = 2x";
        song.rate(2);
    }    
   } 

    if ( scoreLeftWrist > 0.2 )
    {
      circle(LeftWristX,RightWristX,20);
      InNumberLeftWristY = Number(leftWristY);
      remove_decimals = floor(leftWristY);
      volume = remove_decimals/500;
      document.getElementById("volume").innerHTML = "Volume = " + volume;
      song.setvolume(volume);
    }
}
function modelLoaded()
{
    console.log('PoseNet is Initialized');
}
function gotPoses(results)
{
    if (results.length > 0)
    {
        console.log(results);
        scoreRightWrist = results[0].keypoints[9].score;
        scoreLeftWrist = results[0].keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist)        
        console.log("scoreRightWrist = " + scoreLeftWrist + "scoreLeftWrist = " + scoreLeftWrist);

        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        console.log("noseX = " + noseX + "noseY = " + noseY );

        LeftWristX = results[0].pose.leftWrist.x
        RightWristX = results[0].pose.rightWrist.x
        difference = LeftWristX - RightWristX

        console.log("LeftWristX = " + LeftWristX + "RightWristX = " + RightWristX )
    }
}
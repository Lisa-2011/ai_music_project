music1=""
music2=""

music1_status=""
music2_status=""

leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;

scoreLeftWrist=0;
scoreRightWrist=0;

function preload(){
    music1=loadSound("music.mp3");
    music2=loadSound("music2.mp3");
}

function setup(){
    canvas= createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose', gotPoses);

}

function draw(){
    image(video,0,0,600,500);

    fill("red");
    stroke("red");

    music1_status=music1.isPlaying();

    if(scoreLeftWrist>0.2){
        circle(rightWristX,rightWristY,20);

        music2.stop();
        if(music1_status==false){
            music1.play();
            document.getElementById("song_name").innerHTML= "Song 1";

        }
    }

    if(scoreRightWrist>0.2){
        circle(rightWristX,rightWristY,20);

        music1.stop();
        if(music2_status==false){
            music2.play();
            document.getElementById("song_name").innerHTML= "Song 2";

        }
    }

}

function modelLoaded(){
    console.log("poseNet is initialized");
}

function gotPoses(results){
    if(results.length>0){

        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;

        console.log("left wrist X = "+leftWristX+" left wrist Y = "+leftWristY);
        console.log("right wrist X = "+rightWristX+" right wrist Y = "+rightWristY);

        scoreLeftWrist= results[0].pose.keypoints[9].score;
        scoreRightWrist=results[0].pose.keypoints[10].score;

        console.log("score right wrist = "+scoreRightWrist);
        console.log("score left wrist = "+scoreLeftWrist);

    }
}

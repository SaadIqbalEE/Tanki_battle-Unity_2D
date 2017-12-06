#pragma strict
import UnityEngine;
import System.Collections.Generic;
static var result : int = -2;
static var kills : int =0;
var f1 : Rigidbody2D;
var identity : int;
var abc : GUIText;
var scori : int=0;
var namei : int;
var movefront : KeyCode;
var moveback : KeyCode;
var rotateright : KeyCode;
var rotateleft : KeyCode;
var fire : KeyCode;

var bullet : Rigidbody2D;

var bulletnum : int = 5;
var remaining : int = 0;

var speed : float = 2;
var speed_b : float = 200;
var firing_rate : float = 0.5;
var next_fire : float =0.0;
var side_wall : float = 2;
var rotation_b : float = 10;
var v_dis : float =15;
var v_s_dis : float =16;


var new_bullet_time: List.<float>;

function Start(){
	remaining = bulletnum;
	if(namei==1){
abc.text=score_shit.val1.ToString();
scori=score_shit.val1;
}
else if(namei==2){
abc.text=score_shit.val2.ToString();
scori=score_shit.val2;
}
else if(namei==3){
abc.text=score_shit.val3.ToString();
scori=score_shit.val3;
}
}

function firs(){
			if(remaining > 0 && Time.time >= next_fire){
			var instance: Rigidbody2D= Instantiate(bullet, transform.position-(transform.right*15), transform.rotation);
			instance.velocity= -1*transform.right*speed_b;
     		remaining--;
     		next_fire= Time.time + firing_rate;
     		new_bullet_time.Add(Time.time + 20);
     		Destroy(instance.gameObject,20);
     		instance.gameObject.layer=LayerMask.NameToLayer("Ignore Raycast");
     		yield WaitForSeconds (0.075);
     		instance.gameObject.layer=LayerMask.NameToLayer("Ball");
	}
}

function play_an(){
		var fire1 : Rigidbody2D= Instantiate(f1, transform.position,transform.rotation);
		Destroy(fire1.gameObject,1);
		yield WaitForSeconds (3);
}

function check_new(){
if(result >=1 && kills >=2 ){
if(identity==result){
scori++;
abc.text=scori.ToString();
result= 1*-2;
kills=0;
if(namei==1){
score_shit.val1=scori;
}
else if(namei==2){
score_shit.val2=scori;
}
else if(namei==3){
score_shit.val3=scori;
}
}
yield WaitForSeconds (3);
Application.LoadLevel("a1");
}

}

function Update () {

check_new();

var hitr: RaycastHit2D = Physics2D.Raycast(transform.position,transform.right,v_s_dis);
var hitnr: RaycastHit2D = Physics2D.Raycast(transform.position,transform.right*-1,v_s_dis);
var hitur: RaycastHit2D = Physics2D.Raycast(transform.position,transform.up+transform.right,v_dis);
var hitnur: RaycastHit2D = Physics2D.Raycast(transform.position,(transform.up*-1)+transform.right,v_dis);
var hitunr: RaycastHit2D = Physics2D.Raycast(transform.position,transform.up+(transform.right*-1),v_dis);
var hitnunr: RaycastHit2D = Physics2D.Raycast(transform.position,(transform.up+transform.right)*-1,v_dis);


if (hitr.collider != null) {

transform.position -=transform.right*side_wall;
	if(hitr.transform.name == "ball(Clone)"){
	Destroy(hitr.transform.gameObject);
	play_an();
	Destroy(this.gameObject);
	result+=namei;
	kills ++;
	}
}
if (hitnr.collider != null) {

transform.position +=transform.right*side_wall;
if(hitnr.transform.name == "ball(Clone)"){
	Destroy(hitnr.transform.gameObject);
	play_an();
	Destroy(this.gameObject);
	result+=namei;
	kills ++;
	}
}

if (hitur.collider != null) {

transform.position -=(transform.right+transform.up)*side_wall;
GetComponent.<Rigidbody2D>().rotation -= 10;
if(hitur.transform.name == "ball(Clone)"){
	Destroy(hitur.transform.gameObject);
	play_an();
	Destroy(this.gameObject);
	result+=namei;
	kills ++;
	}
}
if (hitnur.collider != null) {
transform.position +=(transform.up-transform.right)*side_wall;
GetComponent.<Rigidbody2D>().rotation += 10;
if(hitnur.transform.name == "ball(Clone)"){
	Destroy(hitnur.transform.gameObject);
	play_an();
	Destroy(this.gameObject);
	result+=namei;
	kills ++;
	}
}


if (hitunr.collider != null) {

transform.position +=(transform.right-transform.up)*side_wall;
GetComponent.<Rigidbody2D>().rotation += 10;
if(hitunr.transform.name == "ball(Clone)"){
	Destroy(hitunr.transform.gameObject);	
	play_an();
	Destroy(this.gameObject);
	result+=namei;
	kills ++;
	}
}
if (hitnunr.collider != null) {

transform.position +=(transform.right+transform.up)*side_wall;
GetComponent.<Rigidbody2D>().rotation -= 10;
if(hitnunr.transform.name == "ball(Clone)"){
	Destroy(hitnunr.transform.gameObject);
	play_an();
	Destroy(this.gameObject);
	result+=namei;
	kills ++;
	}
}

	if(remaining<5){
	var i : int;
	for(i=0; i<new_bullet_time.Count;i++){
		if(new_bullet_time[i]< Time.time){
		Debug.Log(new_bullet_time[i]);
		remaining++;
		new_bullet_time.RemoveAt(i);
		i--;
		}
	}
}

    if (Input.GetKey(movefront))
    {
        if(Input.GetKey(rotateright) ){
            GetComponent.<Rigidbody2D>().rotation -= 5;
        }
        else if(Input.GetKey(rotateleft) ){
            GetComponent.<Rigidbody2D>().rotation += 5;
        }
        if(Input.GetKey(fire)){
        	firs();
        }
   		transform.position +=-1*transform.right*speed;
    }

    else if(Input.GetKey(moveback))
    {
        if(Input.GetKey(rotateright) ){
            GetComponent.<Rigidbody2D>().rotation -= 5;
        }
        else if(Input.GetKey(rotateleft) ){
            GetComponent.<Rigidbody2D>().rotation += 5;
        }
           if(Input.GetKey(fire)){
        	firs();
        }
		transform.position += transform.right*speed;
    }
	else if(Input.GetKey(rotateright)){
	   if(Input.GetKey(fire)){
	   	firs();
	   	    
        }
        GetComponent.<Rigidbody2D>().rotation -= 5;
    }


    else if(Input.GetKey(rotateleft)){
       if(Input.GetKey(fire) && remaining>0){
		firs();
		  
        }
        GetComponent.<Rigidbody2D>().rotation += 5;
    }


    else if(Input.GetKey(fire) && remaining>0){
		firs();
		   
        }
}
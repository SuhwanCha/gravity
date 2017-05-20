// gravity constant
var G = 6.67384 * Math.pow(10, -11);

// information about earth
var EarthM = 5.9742 * Math.pow(10 , 24);
var EarthR = 6.37 * Math.pow(10, 6);

// Set arrange about time and location
var LocateXdt = [];
var LocateYdt = [];
var Timedt = [];
var VX = [];
var VY = [];

var A = 1 // 면적
var Cd = 1 // 항력계수
var rho = 1.224978; //밀도
var K = 288.15;
var P0 = 101325;


// set init value
LocateYdt[0] = 1000;
VY[0] = 0;
Timedt[0] = 0;
var time = 40;

var InEarth = class {
  constructor(){
    this.dt = 0.01;
    this.N = time / this.dt;
    this.m = 50;
    this.accel = (EarthM * G) / (EarthR * EarthR);
  }

  CalculateT(){
    for(var i=0; i<this.N; i++){
      LocateYdt[i+1] = LocateYdt[i] + (this.dt * (VY[0] - this.accel * Timedt[i]));
      Timedt[i+1] = Timedt[i] + this.dt;
      if(LocateYdt[i + 1] < 0) break;
    }
  }

  AIR(t,v){
    var AirK = (rho * A * Cd ) * (1/2);
    return (- this.accel);
  }

  Move(){
    var i = 0;
    var height;
    var Interval = setInterval(function () {
      $("#velo").html("Velocity (m/s) :  " + ((LocateYdt[i+1] - LocateYdt[i])*100));
      height = (LocateYdt[0] - LocateYdt[i]) - 25;
      $("#circle").css('top',height);
      $( "body" ).scrollTop(height + 25);
      i++;
      if(height > LocateYdt[0]) {
        clearInterval(Interval);
        $("#velo").html("Velocity (m/s) :  " + (LocateYdt[N] - LocateYdt[N-1]));
      }
    }, 1000 * this.dt);
  }

  CalculateInAir(){
    for(var i=0; i<this.N; i++){
      VY[i+1] = VY[i] + (this.dt * this.AIR(Timedt[i], VY[i]));
      LocateYdt[i+1] = LocateYdt[i] + (this.dt * VY[i]);
      Timedt[i+1] = Timedt[i] + this.dt;
      if(LocateYdt[i + 1] < 0) break;
    }
  }

  makeposition(){
    $("#position").css('height',LocateYdt[0]);
    for(var i = 0; i<=LocateYdt[0] / 100; i++){
        $("#position").append("<p class='meter' style='top:"+i*100+"px'>"
        + (LocateYdt[0] - 100 * i) + "m </p>");
    }
  }

  KeyBoard(){
  }

}

function key(){
  EarthM = parseInt($("#M1").val());
  EarthR = parseInt($("#distance").val());
  InEarth.m = parseInt($("#M2").val());
  A = parseInt($("#a").val());
  rho = parseInt($("#rho").val());
  time = parseInt($("#time").val());
  LocateYdt[0] = parseInt($("#h").val());
}
class CalculateX{

}

class CalculateY{

}

var InEarth = new InEarth();

function start(){
  key();
  InEarth.dt = 0.01;
  InEarth.N = time / InEarth.dt;
  InEarth.accel = (EarthM * G) / (EarthR * EarthR);
  InEarth.CalculateInAir();
  InEarth.makeposition();
  InEarth.Move();
}
// InEarth.KeyBoard();

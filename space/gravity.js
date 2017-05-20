// gravity constant
var G = 6.67384 * Math.pow(10, -11);

var EarthM = 5.9742 * Math.pow(10 , 24);
var EarthR = 6.37 * Math.pow(10, 6);

var SunM = 1.989 * Math.pow(10,30);

var LocateXdt= [], LocateYdt= [], VX= [], VY= [], AX= [], AY= [];

LocateXdt[0] = 150000000;
LocateYdt[0] = 0;

VX[0] = 0;
VY[0] = 30.287;


var distance = [], F = [];

distance[0] = Math.pow(LocateYdt[0],2) + Math.pow(LocateXdt[0],2);
F[0] = G*SunM / distance[0];
AY[0] = F[0] * LocateYdt[0] * -1;
AX[0] = F[0] * LocateXdt[0] * -1;

var initInfo = {
  'left' : parseInt($("#sun").css("left").replace(/[^-\d\.]/g, '')),
  'top' : parseInt($("#sun").css("top").replace(/[^-\d\.]/g, '')) + 30
};


// Default values
$(document).ready(function(){
  $('[data-toggle="tooltip"]').tooltip();
  initFunction();
});

// 처음 실행하는 함수들


function initFunction(){
  $("#earth").css('left', initInfo['left']+(LocateXdt[0]/300000));
  $("#earth").css('top', initInfo['top']+(LocateYdt[0]/300000));
}


var Space = class {
  constructor(){
    this.i = 0;
    this.dt = 1;
    for(this.i = 0; this.i<= 300; this.i++){
      this.Accel();
      this.Velocity();
      this.Position();
      console.log((Math.pow(LocateXdt[this.i]) + Math.pow(LocateYdt[this.i])))
    }
  }

  Accel(){
    AX[this.i] = F[this.i] * LocateXdt[this.i] / Math.sqrt(distance[this.i]) * (-1);
    AY[this.i] = F[this.i] * LocateYdt[this.i] / Math.sqrt(distance[this.i]) * (-1);
  }

  Velocity(){
    VX[this.i+1] = VX[this.i] + AX[this.i]*this.dt;
    VY[this.i+1] = VY[this.i] + AY[this.i]*this.dt;
  }

  Position(){
    LocateXdt[this.i+1] = LocateXdt[this.i] + VX[this.i]*this.dt;
    LocateYdt[this.i+1] = LocateYdt[this.i] + VY[this.i]*this.dt;
    distance[this.i+1] = Math.pow(LocateYdt[this.i+1],2) + Math.pow(LocateXdt[this.i+1],2);
    F[this.i+1] = G*SunM / distance[this.i+1];
  }

}

var Space = new Space();

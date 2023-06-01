  var cardBack = new Audio("audio/card_back.mp3");
  var callaudio = new Audio("audio/call.mp3");
  var loseaudio = new Audio("audio/lose.mp3");
  var winaudio = new Audio("audio/win.mp3");  /* 효과음 설정 */
  var dec = ["c", "git", "java", "python","tux","bee","eagle","dog","robot","pumpkin"];   /* 카드 데이터 값 1a ~ 5a */
  var base = "image/";
  var default_score = parseInt(0);   // score 변수 선언
  var cnt = 0;
  var card = [];
  var tmp = [];   //카드 섞을 때 사용할 배열 선언
  var losecount = 10;   //losecount 1단계 기회 3번
  var wincount = 0;
  var level=1;
  var hint=[];
  var hint_count;

  $(document).ready(function(){
  settingGame();
  });


  // 랜덤하게 추출 (array Ver)
  function getRandom(min, max) {   //랜덤으로 숫자 뽑는 함수
  return Math.floor((Math.random() * (max - min + 1)) + min);
  }

  function getRandomArray(min, max, count) {
  while (1) {
    var index = getRandom(min, max);
    // 중복 여부를 체크 img
    if (tmp.indexOf(index) > -1) {
      continue;
    }
    tmp.push(index);   //배열에 index값을 push로 계속 넣어줌
    // 원하는 배열 갯수가 되면 종료
    if (tmp.length == count) {   //count값만큼 배열이 차면 break문으로 탈출
      break;
    }
  }

  return tmp;  //rst값 반환
  }

  function shuffle() {  //카드 섞는 함수
  tmp = [];
  card = [];
  var dec_level=[];
  var score_result = document.getElementById("score_result");
  score_result.innerHTML = "현재 점수 : " + default_score;

  if(level == 1){
    for(var i=0;i<5;i++){
      dec_level.push(dec[i]);
      dec_level.push(dec[i]);
    }
    getRandomArray(0, 9, 10);   //dec 카드 데이터값만큼 숫자 랜덤 추출
    for (var i = 0; i < 10; i++) {
      card.push(dec_level[tmp.pop()]);   //card 배열에 rst배열값들을 push로 넣어줌 (카드 셔플)
    }
  }
  else if(level ==2){
    for(var i=0;i<8;i++){
      dec_level.push(dec[i]);
      dec_level.push(dec[i]);
    }
    getRandomArray(0, 15, 16);   //dec 카드 데이터값만큼 숫자 랜덤 추출
    for (var i = 0; i < 16; i++) {
      card.push(dec_level[tmp.pop()]);   //card 배열에 rst배열값들을 push로 넣어줌 (카드 셔플)
    }
  }
  else{
    for(var i=0;i<10;i++){
      dec_level.push(dec[i]);
      dec_level.push(dec[i]);
    }
    getRandomArray(0, 19, 20);   //dec 카드 데이터값만큼 숫자 랜덤 추출
    for (var i = 0; i < 20; i++) {
      card.push(dec_level[tmp.pop()]);   //card 배열에 rst배열값들을 push로 넣어줌 (카드 셔플)
    }
  }



  }

  function refresh() {  //점수, cnt 초기화
  default_score = 0;
  cnt = 0;

  shuffle();  //카드 셔플
  card_show();  //카드 보여주기

  }

  function win_print() { //이긴후(맞춘후) 점수
  var score_result = document.getElementById("score_result");
  default_score += 100;   //100점씩 추가
  score_result.innerHTML = "현재 점수 : " + default_score;  //기존 점수 + defult_score값 추가해서 출력
  card1.style.display = "none";
  card2.style.display = "none";
  callaudio.play();
  callaudio.currentTime = 0;
  ++wincount;   //win count값 증가
  if(level==1){
    if(wincount == 5) {   //1단계 5쌍 모두 맞추면
      winaudio.play();
      winaudio.currentTime = 0;
      alert("You Win !");
      level++;
      wincount=0;
      cnt=0;
      $(".cardGame").empty();
      settingGame();
    }
  } 
  else if(level==2){
    if(wincount == 8) {   //1단계 5쌍 모두 맞추면
      winaudio.play();
      winaudio.currentTime = 0;
      alert("You Win !");
      level++;
      wincount=0;
      cnt=0;
      $(".cardGame").empty();
      settingGame();
    }
  }
  else{
    if(wincount == 10) {   //1단계 5쌍 모두 맞추면
      winaudio.play();
      winaudio.currentTime = 0;
      alert("You Win !");
      wincount=0;
      cnt=0;
      $(".cardGame").empty();
      settingGame();
    }
  }
  }



  function lose_print() {  //카드 쌍 맞추기 실패
  //alert("패배");
  var score_result = document.getElementById("score_result");
  default_score -= 50;   //50점 감점
  score_result.innerHTML = "현재 점수 : " + default_score;  //기존 점수에 감점 반영해서 출력
  lose_action();    //틀렸을 때, (카드 다시 뒤집는 동작)
  //lose_action();
  }

  function lose_action() { //틀렸을때 점수가 깍인 후 실행될 것
  loseaudio.play();
  loseaudio.currentTime = 0;
  alert("남은 기회 " + (--losecount));  //남은 기회 출력
  //loseaudio.paly();
  card1.style.backgroundImage = "url('image/back.png')";    //card 1 첫번째 back 이미지로 전환
  card1.style.backgroundSize = "120px 180px";
  card2.style.backgroundImage = "url('image/back.png')";   //card 2 두번째 back 이미지로 전환 (카드 뒤집기)
  card2.style.backgroundSize = "120px 180px";  //카드 사이즈 조정
  if (losecount == 0) {  //lose count 0이 되면
    loseaudio.play();
    loseaudio.currentTime = 0;
    alert("Game Over");   //game over 출력
    cnt = 0;
    start();
  }

  }

  function card_show() { //시작버튼 누르면 카드가 뒤집혀 5초동안 보여짐
  if (cnt >= 1) {
    alert("다시 시작하시려면 다시시작 버튼을 눌러주세요! \n카드가 섞이지 않음");
    //시작 버튼 눌렀을 때 경고창 출력
  } else {
    if(level==1){
      for (var i = 0; i < 10; i++) { //사진 랜덤으로 고르기
        var ch_card = document.getElementById(i);
        ch_card.style.display = "block";
        ch_card.style.backgroundImage = "url('" + base + card[i] + ".png')";  //각 데이터 값에 해당하는 카드 이미지 출력
        ch_card.style.backgroundSize = "120px 180px";  //카드 사이즈 조정
      }
    }
    else if(level==2){
      for (var i = 0; i < 16; i++) { //사진 랜덤으로 고르기
        var ch_card = document.getElementById(i);
        ch_card.style.display = "block";
        ch_card.style.backgroundImage = "url('" + base + card[i] + ".png')";  //각 데이터 값에 해당하는 카드 이미지 출력
        ch_card.style.backgroundSize = "120px 180px";  //카드 사이즈 조정
      }
    }
    else{
      for (var i = 0; i < 20; i++) { //사진 랜덤으로 고르기
        var ch_card = document.getElementById(i);
        ch_card.style.display = "block";
        ch_card.style.backgroundImage = "url('" + base + card[i] + ".png')";  //각 데이터 값에 해당하는 카드 이미지 출력
        ch_card.style.backgroundSize = "120px 180px";  //카드 사이즈 조정
      }
    }
    
  }
  setTimeout(start, 2000); //5초동안 보여줌   (1단계)
  cnt += 1;    //count값 증가 (게임 시작)
  }

  function start() {  //게임 시작 버튼
  losecount = 10;   //1단계 기회 3번으로 설정
  wincount = 0;
  default_score = 0;  //초기 점수 0점

  var score_result = document.getElementById("score_result");
  score_result.innerHTML = "현재 점수 : " + default_score;

  if(level==1){
    for (var i = 0; i < 10; i++) {
      var ch_card = document.getElementById(i);
      ch_card.innerHTML = "";
      ch_card.style.backgroundImage = "url('image/back.png')";   //모든 카드 뒤집은 이미지 출력
    }
    hint_count=1;
  }
  else if(level==2){
    for (var i = 0; i < 16; i++) {
      var ch_card = document.getElementById(i);
      ch_card.innerHTML = "";
      ch_card.style.backgroundImage = "url('image/back.png')";   //모든 카드 뒤집은 이미지 출력
    }
    hint_count=1;
  }
  else{
    for (var i = 0; i < 20; i++) {
      var ch_card = document.getElementById(i);
      ch_card.innerHTML = "";
      ch_card.style.backgroundImage = "url('image/back.png')";   //모든 카드 뒤집은 이미지 출력
    }
    hint_count=2;
  }

  $("#hint_count").html("HINT:"+hint_count);

  }

  var check1 = 0;
  var check2 = 0;
  var card1 = 0;
  var card2 = 0;
  var card1Index;
  var card2Index;

  function turn(num) {  //카드 눌러서 뒤집는 동작
  if(cnt<1){
    return;
  }
  else{
  var ch_card = document.getElementById(num);
  //cardBack.currentTime(0.2);
  cardBack.play();
  cardBack.currentTime = 0;
  ch_card.style.backgroundImage = "url('image/" + card[num] + ".png')";   //해당하는 이미지 출력
  ch_card.style.backgroundSize = "120px 180px";
  if (check1 == 0) {  //첫번째 card open
    check1 = card[num];   //check1에 카드 데이터값 저장
    card1 = ch_card;
    card1Index=num;
  } 
  else if (check2 == 0) {    //두 번째 card open
    check2 = card[num];  //check2에 카드 데이터값 저장
    card2 = ch_card;
    card2Index=num;
    if (check1 == check2) {  //만일 두 카드가 동일한 데이터갑을 가지면
      //alert("승리");
      check1 = 0;
      check2 = 0;  //check 초기화

      hint[card1Index]=false;
      hint[card2Index]=false;
      setTimeout(win_print, 100); //0.1s 뒤 win_print함수 실행
    } else {
      setTimeout(lose_print, 100);  //카드를 못맞췄다면 lose_print함수 실행
      //lose_print();


      check1 = 0;
      check2 = 0;  //check 초기화
    }
  }
  }
  }

  function settingGame(){
  hint=[];
  shuffle();
  $("#level").html("LEVEL"+level)

  if(level==1){
      var num;
      for(num=0; num<5; num++){
          $(".cardGame").append(`
      <div class='card' onclick='turn(${num})' id='${num}' style='position : absolute; left:${num*125+5}px '></div>
      `);
      hint.push(true);
      }
      for(num=5; num<10; num++){
        $(".cardGame").append(`
    <div class='card' onclick='turn(${num})' id='${num}' style='position : absolute; left:${(num-5)*125+5}px; margin-top : 180px'></div>
    `);
    hint.push(true);
    }
    
  }
  else if(level==2){
      var num;
      for(num=0; num<4; num++){
          $(".cardGame").append(`
      <div class='card' onclick='turn(${num})' id='${num}' style='position : absolute; left:${num*125+5}px; margin-top : 180px' '></div>
      `);
      hint.push(true);
      }
      for(num=4; num<8; num++){
        $(".cardGame").append(`
      <div class='card' onclick='turn(${num})' id='${num}' style='position : absolute; left:${(num-4)*125+5}px; margin-top : 360px' '></div>
      ` );
      hint.push(true);
      }
      for(num=8; num<12; num++){
        $(".cardGame").append(`
      <div class='card' onclick='turn(${num})' id='${num}' style='position : absolute; left:${(num-8)*125+5}px; margin-top : 540px' '></div>
      `);
      hint.push(true);
      }
      for(num=12; num<16; num++){
        $(".cardGame").append(`
      <div class='card' onclick='turn(${num})' id='${num}' style='position : absolute; left:${(num-12)*125+5}px; margin-top : 720px' '></div>
      `);
      hint.push(true);
      }
  }
  else{
      var num;
      for(num=0; num<5; num++){
          $(".cardGame").append(`
      <div class='card' onclick='turn(${num})' id='${num}' style='position : absolute; left:${num*125+5}px '></div>
      `);
      hint.push(true);
      }
      for(num=5; num<10; num++){
          $(".cardGame").append(`
      <div class='card' onclick='turn(${num})' id='${num}' style='position : absolute; left:${(num-5)*125+5}px; margin-top:180px '></div>
      `);
      hint.push(true);
      }
      for(num=10; num<15; num++){
        $(".cardGame").append(`
      <div class='card' onclick='turn(${num})' id='${num}' style='position : absolute; left:${(num-10)*125+5}px; margin-top:360px '></div>
    ` );
    hint.push(true);
      }
      for(num=15; num<20; num++){
        $(".cardGame").append(`
      <div class='card' onclick='turn(${num})' id='${num}' style='position : absolute; left:${(num-15)*125+5}px;margin-top:540px '></div>
    ` );
    hint.push(true);
      }
  }
  }

  async function card_hint(){

  if(hint_count>0){
    while(1){
      var index = Math.floor((Math.random() * hint.length));
      if(hint[index]==false){continue;}
      else{
        var ch_card = document.getElementById(index);
        ch_card.style.display = "block";
        ch_card.style.backgroundImage = "url('" + base + card[index] + ".png')";  //각 데이터 값에 해당하는 카드 이미지 출력
        ch_card.style.backgroundSize = "120px 180px";  //카드 사이즈 조정
        check1 = card[index];   //check1에 카드 데이터값 저장
        card1 = ch_card;
        card1Index=index;
        
        break;
      }
    }
    hint_count=hint_count-1;
  }
  else{
    alert('힌트 전부 사용하셨습니다~!');
  }
  $("#hint_count").html("HINT:"+hint_count);
  }
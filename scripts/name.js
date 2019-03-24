/*
 * 小6〜中1の頃に作ったので、ノリがガキくさかったり
 * グローバル汚染がひどかったりしますが、まあ生温かい目で読んでください。
 * by社会人になったルファー
 */

// 定数的なもの
coName = "name=";
// 各種変数の宣言
var hoData    = "";                            // Cookieに保存された名前データ
var theCookie = window.document.cookie + ";";  // Cookieの値
var start     = theCookie.indexOf(coName);     // 名前情報の開始位置
var end, dt, h;                                // 名前情報の終了位置、日付、時間

// 名前登録関数
function entryName() {
  // 入力を求める
  var theValue = window.prompt("キミの名前は？\n(*入力された名前は通常外部には送られませんが、念のため本名は入力しないでください)", "");
  var dt, tov;
  // 入力された値が有効であれば登録
  if(theValue) {
    var expires_year;

    dt = new Date();
    expires_year = dt.getYear();
    // 今年がうるう年なら
    if(expires_year % 4 == 0 && expires_year % 100 != 0 || expires_year % 400 == 0) {
      // 4年後がうるう年なら4年後が期限
      if(expires_year % 100 != 96 || expires_year % 400 == 396)
        expires_year += 4;
      // そうでなければ8年後が期限
      else
        expires_year += 8;
    // 今年がうるう年でなければ
    } else {
      // 来年がうるう年なら再来年が期限
      if(expires_year % 4 == 3 && expires_year % 100 != 99 || expires_year % 400 == 399)
        expires_year += 2;
      // そうでなければ来年が期限
      else
        expires_year += 1;
    }
    dt.setYear(expires_year);
    tov = dt.toGMTString();
    window.document.cookie = "name=" + escape(theValue) + ";expires=" + tov;
    window.alert("教えてくれてありがとう！");
    // 書き換え
    rewriteName(theValue);
  // 現在登録中の値が有効かつ入力された値が空の場合、登録中のデータを消去
  } else if(theValue == "" && hoData) {
    if(confirm("登録した名前を消去しますか？")) {
      dt = new Date();
      tov = dt.toGMTString();
      window.document.cookie = "name=;expires=" + tov;
      window.alert("記憶喪失ドォォン");
      // 書き換え
      rewriteName("");
    }
  // 現在登録中の値が無効または入力された値がヌルの場合、何もしない
  } else window.alert("何だ、教えてくれないのか。");
}

// 名前書き換え関数
//   name : 名前
function rewriteName(name) {
  span = window.document.getElementById("visitor_name");
  if(hoData = name) {
    span.style.color = "";
    span.innerHTML = name
    .replace(/\x26/g, "\x26amp;")
    .replace(/"/g, "\x26quot;")
    .replace(/</g, "\x26lt;")
    .replace(/>/g, "\x26gt;");
  } else {
    span.style.color = "gray";
    span.innerHTML = "匿名";
  }
}


// ここから名前表示処理

// Cookieに名前情報があれば値をデコード
if(start > -1) {
  end = theCookie.indexOf(";", start);
  hoData = unescape(theCookie.substring(start + coName.length, end))
    .replace(/\x26/g, "\x26amp;")
    .replace(/"/g, "\x26quot;")
    .replace(/</g, "\x26lt;")
    .replace(/>/g, "\x26gt;");
}
// hoDataが空なら「匿名」、そうでなければhoDataの内容を表示
window.document.write('<SPAN ID="visitor_name"')
if(hoData) window.document.write('>'+hoData);
else       window.document.write(' STYLE="color:gray;">匿名');
window.document.write("</SPAN>さん、");
// 挨拶♪
dt = new Date();
h = dt.getHours();
/* Wiiの裏技                                                                   *
 * (Wiiのインターネットチャンネルでの閲覧ならスマブラXとぷよ７の友達登録申請可 *
 * ・・・になる予定)                                                           */
if(navigator.userAgent == "Opera/9.30 (Nintendo Wii; U; ; 3642; ja)") {
  window.document.write("わざわざWiiでのご訪問ありがとうございます！");
} else {
  if(h >=  0 && h <  6) window.document.write("夜更かしは良くありませんよ。");
  if(h >=  6 && h < 12) window.document.write("おはようございます。");
  if(h >= 12 && h < 18) window.document.write("こんにちは。");
  if(h >= 18 && h < 24) window.document.write("こんばんは。");
}

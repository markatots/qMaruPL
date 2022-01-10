// JavaScript
// # Author
// Katsuaki Maruno
// 
// # Copyright©
// Copyright(c) 2021-2022, Otsuka Corporation
// 
// # License
// The source code is licensed MIT. The website content is licensed CC BY 4.0,see LICENSE.

define( [ "qlik" , 'jquery', 'text!./maruTemplate.html' , 'text!./style.css', './maruProperties' , './initialProperties' ],
    function ( qlik , $, template , cssContent , props , initialProps ) {
        'use strict';
		$( "<style>" ).html( cssContent ).appendTo( "head" );// スタイルシートを読み込む

        return {
			initialProperties: initialProps,
			definition: props,
			
			snapshot: {canTakeSnapshot: true},
			
			template: template,
			
			controller: ['$scope', '$compile', '$sce', '$element','$window', function( $scope ,$compile ,$sce ,$element ,$window ) {
			


	// ========================================================================================
	// ========================================================================================
	// ========================================================================================
	// グローバル変数の初期化場所はここか？ここは1度しか呼ばれない。HTMLにバインドした場所だと何回もよばれてiteratorエラーがでる。
	$scope.sSUPERDEBUG = "■contoroller Start / ";
	$scope.sCubeRuntimeWarning = "";// デバッグ中じゃなくても実行時でも表示するメッセージ。例えばデータが多くて表示しきれていない場合など。キューブ更新時にリセット
	
	var G_nMaxMeasureSize = 100; // メジャーの最大サイズ。変えたらinitialPropertyも直せ
	var G_nMaxDimensionElementSize = 99; // ディメンションの最大サイズ。変えたらinitialPropertyも直せ
	
	var G_bUseMeasProp = true;// ハイパーキューブを生成するならtrue。確実にエラーがなくなったので、ずっとtrueでよい。
	var G_aryMeasProps = [];
	var secondHyperCube;// セカンドハイパーキューブ
	var G_bInitOK = false;// 描画の開始制御（表示するデータの中身が準備できているのか）
	if( G_bInitOK)
		G_bInitOK = false;
	var G_bUseButton = true;// AngularJSで推奨されない動的なボタンを使う。ずっと動くか保証はない

	var G_bDegubMode = false; // デバッグモードでなければコンソールを使わない

	if(G_bDegubMode)console.log('element', $element); // この一行入れると大変役立つ。Chrome→縦三点リーダ→その他のツール→デベロッパーツール→で、オブジェクトの中身を確認できます 
	if(G_bDegubMode)console.log('layout', $scope.layout); // この一行入れると大変役立つ。Chrome→縦三点リーダ→その他のツール→デベロッパーツール→で、オブジェクトの中身を確認できます 
	if(G_bDegubMode)console.log('scope', $scope); // この一行入れると大変役立つ。Chrome→縦三点リーダ→その他のツール→デベロッパーツール→で、オブジェクトの中身を確認できます 


	// --------------------------------------------------------------------------
	var G_regexpNumnerPattern = new RegExp(/^[-]?([1-9]\d*|0)(\.\d+)?$/); // 正規表現で数値入力チェックする


	// --------------------------------------------------------------------------
	$scope.G_sRandomKey = Math.floor( Math.random() * 1000000000 );// 一つのシートにこのエクステンションが複数置かれた場合
$scope.sSUPERDEBUG += "  $scope.G_sRandomKey =" + ($scope.G_sRandomKey) +" /";
	

	if( G_bUseMeasProp ){
		addSecondCube( qlik.currApp(this) );// 第2のキューブ生成
	}
	if(G_bDegubMode)console.log('controller G_bInitOK',G_bInitOK);



//this.backendApi.model.Validated.bind(function(){ // 何か秘密が隠されているようだが難しくてわからない






/*	
		var timeout_id = null;
		timeout_id = setTimeout(() => {
			if(G_bDegubMode)console.log('set2ndCubeProps'); // 数秒後にメッセージ出力

			if( G_bUseMeasProp ){
				// 2ndプロパティを使うものは、すぐに呼べない。
//				set2ndCubeProps();
			}
		
		}, 1000);
*/	

	// ========================================================================================
	// イベントの処理============================================================================
	
	// 再計算が必要な場合に呼ばれるイベント
	$scope.component.model.Validated.bind(function(){
		G_bInitOK = false; // 描画不可

		if(G_bDegubMode)console.log('$scope.component.model.Validation発生'); 

		if( G_bUseMeasProp ){
			addSecondCube( qlik.currApp(this) );// 第2のキューブ生成
		}


	});



	// ========================================================================================
	// 関数の置き場所============================================================================




	
	
	
	// --------------------------------------------------------------------------------------------
	// ディメンションボタンの呼び出し
	$scope.maruSelect = function(){
		if(G_bDegubMode)console.log('■>>>■■maruSelect: begin');


		var sRandomKey = myCookieGet( "maruKey" );// クッキーのキーを取得する
		if( sRandomKey != $scope.G_sRandomKey ){// このスコープのランダムキーと、クッキーのキーが一致したなら、コントローラとテンプレートのペアが一致している
			// 処理をスキップする
			if(G_bDegubMode)console.log('maruSelect一致しない ', "クッキー:" + sRandomKey + ' / $scope.G_sRandomKey : ' + $scope.G_sRandomKey);
		}
		else{
			// 処理を続ける		
			if(G_bDegubMode)console.log('maruSelect一致した ', "クッキー:" + sRandomKey + ' / $scope.G_sRandomKey : ' + $scope.G_sRandomKey);
		

			var sButtonNo = myCookieGet( "maruButtonNo" );// クッキーのボタン番号を取得する

			if(G_bDegubMode)console.log('maruSelect inner sButtonNo',sButtonNo);





			var nDimIdx123 = myIntegerCast( sButtonNo , -1 , 0 , $scope.aryDim1.length -1 );


			if(G_bDegubMode)console.log('maruSelect inner nDimIdx123', nDimIdx123);

			if( nDimIdx123 >= 0 ){
				if(G_bDegubMode)console.log('★★★★★★maruSelect: $scope.oDimInfo.qFallbackTitle=', $scope.oDimInfo.qFallbackTitle );
				if(G_bDegubMode)console.log('★★★★★★maruSelect: $scope.oDimInfo.qGroupFallbackTitles_0=', $scope.oDimInfo.qGroupFallbackTitles_0 );
				if(G_bDegubMode)console.log('★★★★★★maruSelect: $scope.oDimInfo.qGroupFieldDefs_0=', $scope.oDimInfo.qGroupFieldDefs_0 );
				if(G_bDegubMode)console.log('★★★★★★maruSelect: $scope.oDimInfo.title=', $scope.oDimInfo.title );
				if(G_bDegubMode)console.log('★★★★★★maruSelect: $scope.oDimInfo.qTags_0=', $scope.oDimInfo.qTags_0 );
				
				if(G_bDegubMode)console.log('★★★★★★maruSelect: $scope.aryDim1[ nDimIdx123 ].sElmNameOfDim=', $scope.aryDim1[ nDimIdx123 ].sElmNameOfDim );
				if(G_bDegubMode)console.log('★★★★★★maruSelect: $scope.aryDim1[ nDimIdx123 ].qNum=', $scope.aryDim1[ nDimIdx123 ].qNum );
				
				var sElmOfDim444 = $scope.aryDim1[ nDimIdx123 ].sElmNameOfDim;
				var oqNum444 = $scope.aryDim1[ nDimIdx123 ].qNum;
			
				
				


				var regexpQlikExpression = new RegExp(/^/); // 正規表現で数値入力チェックする
//				var sDimName112 = $scope.oDimInfo.qGroupFallbackTitles_0;
				var sDimName112 = $scope.oDimInfo.qFallbackTitle;

				if( ! ( new RegExp(/^=.*/) ).test( $scope.oDimInfo.qGroupFieldDefs_0 ) ){// ＝サインで始まっていない場合
					sDimName112 = $scope.oDimInfo.qGroupFieldDefs_0;
if(G_bDegubMode)console.log('★★★★★★maruSelect: hello3=', sDimName112 );
				}
				else{// ＝サインで始まっている場合
if(G_bDegubMode)console.log('★★★★★★maruSelect: hello2=', sDimName112 );
					// ＝サイン以外の数式表現がない場合
					if( ( new RegExp(/^=.*([&+-]|\*|\/|\(|\)).*$/) ).test( $scope.oDimInfo.qGroupFieldDefs_0 ) ){// 数式が組まれている場合
						sDimName112 = $scope.oDimInfo.qGroupFallbackTitles_0;
//						sDimName112 = $scope.oDimInfo.qFallbackTitle;
if(G_bDegubMode)console.log('★★★★★★maruSelect: hello7=', sDimName112 );

					}
					else{// 数式が組まれていない場合
						sDimName112 = $scope.oDimInfo.qGroupFieldDefs_0;
						sDimName112 = sDimName112.replace(/[=]/, '');
if(G_bDegubMode)console.log('★★★★★★maruSelect: hello1=', sDimName112 );
					}
				}

if(G_bDegubMode)console.log('★★★★★★maruSelect: FieldName=', sDimName112 );

if(G_bDegubMode)console.log('★★★★★★maruSelect: qlik.currApp(this).getObjectProperties( $scope.oDimInfo.qLibraryId )=', qlik.currApp(this).getObjectProperties( $scope.oDimInfo.qLibraryId ) );



				// 選択するメソッドを呼ぶ ここを見よ  https://help.qlik.com/en-US/sense-developer/May2021/Subsystems/APIs/Content/Sense_ClientAPIs/CapabilityAPIs/SelectionAPI/qlik-selectionState-interface.htm
				if( sDimName112 != "" ){// ディメンションがある場合


	
					if( $scope.oDimInfo.qTags_0 == "$numeric" ){//数値型のディメンション（qNum!='NaN'）には、数値で指定する必要がある。インデックスではない。。
						if(G_bDegubMode)console.log("★★★★★★maruSelect 数値型 " );
						qlik.currApp(this).field( sDimName112 ).selectValues( [ Number(oqNum444) ], true, false);//
					}
					else{
						if(G_bDegubMode)console.log("★★★★★★maruSelect 文字型 " );
						qlik.currApp(this).field( sDimName112 ).selectValues( [ {qText: sElmOfDim444} ], true, false);//
						
					}
				
//					var sRet = qlik.currApp(this).field( sDimName112 ).selectMatch(sElmOfDim, true);// データ型に関係なく動いた。しかしトグルにならない。
//					var sRet = qlik.currApp(this).field( sDimName112 ).select([nDimIdx123], false, true);// // 数値型のディメンション（qNum!='NaN'）には、数値で指定する必要がある。インデックスで選択すると見ているところが違うようだ。
//					var sRet = qlik.currApp(this).field( sDimName112 ).selectValues([sElmOfDim], true, false);// // 数値型のディメンション（qNum!='NaN'）には、数値で指定する必要がある。インデックスで選択できない。数字の場合は数値のフィールド。
//					var sRet = qlik.currApp(this).field( sDimName112 ).select([nDimIdx123], false, true);
					//var sRet = self.selectValues([nDimIdx123], false, true);
					//var sRet = self.backendApi.selectValues([nDimIdx123], false, true); 
				}
			}

		}// <<< else

		if(G_bDegubMode)console.log('■<<<■■■<<< maruSelect end');
		return;
	}

	// --------------------------------------------------------------------------------------------
	// ナビゲーションボタンの呼び出し
	$scope.maruNavigate = function(){
		if(G_bDegubMode)console.log('maruNavigate begin');

		var sRandomKey = myCookieGet( "maruKey" );// クッキーのキーを取得する
		if( sRandomKey != $scope.G_sRandomKey ){// このスコープのランダムキーと、クッキーのキーが一致したなら、コントローラとテンプレートのペアが一致している
			// 処理をスキップする
			if(G_bDegubMode)console.log('maruNavigate一致しない ', "クッキー:" + sRandomKey + ' / $scope.G_sRandomKey : ' + $scope.G_sRandomKey);
		}
		else{
			// 処理を続ける		
			if(G_bDegubMode)console.log('maruNavigate一致した ', "クッキー:" + sRandomKey + ' / $scope.G_sRandomKey : ' + $scope.G_sRandomKey);

			var sButtonNo = myCookieGet( "maruButtonNo" );// クッキーのボタン番号を取得する
			if(G_bDegubMode)console.log('maruSelect inner sButtonNo',sButtonNo);
			

			var nMeasIdx123 = myIntegerCast( sButtonNo , -1 , 0 , G_aryMeasProps.length - 1 );

			if( nMeasIdx123 >= 0 ){
				var sURL = G_aryMeasProps[ nMeasIdx123 ].sMeasSheetID1;
				if(G_bDegubMode)console.log('maruNavigate inner sURL', sURL );

				qlik.navigation.gotoSheet(sURL);// シートを移動する ここを見よ　https://help.qlik.com/en-US/sense-developer/May2021/Subsystems/APIs/Content/Sense_ClientAPIs/CapabilityAPIs/NavigationAPI/gotoSheet-method.htm

			}
		} // <<< else

		if(G_bDegubMode)console.log('maruNavigate end');
		return;
	}



	// --------------------------------------------------------------------------------------------
	// テンプレテストボタン（ここは、ちゃんと呼ばれる。ただし、シート内に複数のこのエクステンションがあれば、２つの正規のボタンがあって見分けがつかない）
	$scope.maruTest = function( s1 ){// この引数をng-clickに埋め込むことはできなかった

		// jQueryの良いサンプルになった
		//		var aryMaruDiv = $( "maruno" );// jQueryを使ってエレメントを検索させる。タグが maruno なのでいくつか返ってくる
		//		if(G_bDegubMode)console.log('maruTest inner aryMaruDiv 2 ', aryMaruDiv );
		//		var aryMaruDiv = $( "maruno[maruAttr1=" + $scope.G_sRandomKey + "]" );// jQueryを使ってエレメントを検索させる。IDと属性でヒットする。
		//		if(G_bDegubMode)console.log('maruTest inner aryMaruDiv 3 ', aryMaruDiv );
		//		var aryMaruDiv = $( "#marunoId" + $scope.G_sRandomKey );// jQueryを使ってエレメントを検索させる。IDが一つなので一つヒットするはず
		//		if(G_bDegubMode)console.log('maruTest inner aryMaruDiv 1 ', aryMaruDiv );
		//	if( aryMaruDiv.length > 0 ){
		//		if(G_bDegubMode)console.log('maruTest inner aryMaruDiv',aryMaruDiv[0].innerHTML);
		//	}


		var sRandomKey = myCookieGet( "maruKey" );// クッキーのキーを取得する
		if( sRandomKey != $scope.G_sRandomKey ){// このスコープのランダムキーと、クッキーのキーが一致したなら、コントローラとテンプレートのペアが一致している
			// 処理をスキップする
			if(G_bDegubMode)console.log('maruTest一致しない ', "クッキー:" + sRandomKey + ' / $scope.G_sRandomKey : ' + $scope.G_sRandomKey);
		}
		else{
			// 処理を続ける		
			if(G_bDegubMode)console.log('maruTest一致した ', "クッキー:" + sRandomKey + ' / $scope.G_sRandomKey : ' + $scope.G_sRandomKey);


		
		}




		return s1;// テンプレートに関数のに戻り値を渡すこともできない
	}

	// --------------------------------------------------------------------------------------------
	// 動的生成テストボタン（ここは絶対に呼ばれない。戒めのためにロジックは残しておく）
	$scope.maruDynamicGenerate = function( s1 ){
	}

	// --------------------------------------------------------------------------------------------


	// クッキーの値を読み取る。
	function myCookieGet( sKey , sDefault="" ){
		var s1000 = sDefault;
		
		//document.cookie = "key=value";
		var cookies1;
		cookies1 = document.cookie;
		if(G_bDegubMode)console.log( 'Angular側cookies1読み取り' , cookies1 );

		//クッキーの文字列をパーシングする
		var sCookieAll = cookies1.split(";");
		if(G_bDegubMode)console.log( 'sCookieAll' , sCookieAll );

		for ( var i1 = 0; i1 < sCookieAll.length; i1++) {
			var cookie_KeyEqValue = sCookieAll[i1].split("=");
			if(G_bDegubMode)console.log( 'cookie_KeyEqValue['+i1+']' , cookie_KeyEqValue );
			if (cookie_KeyEqValue[0].trim() == sKey ) {// キー名を比較する
				// 一致したのでそれを拾って終了
				s1000 = unescape( cookie_KeyEqValue[1] );
				if(G_bDegubMode)console.log( 'myCookieGet' , s1000 );
				break;
			} 
		}

		return s1000;
	}



	// 文字列のTrue、FalseをBooelanで返す。この場合、文字列に変換して true になるもの以外だったら、オブジェクトがあろうがなかろうがfalseでいい。デフォルトはfalseということで
	function myBoolCast( s999 ){
		var s1000;
		s1000 = String(s999).toLowerCase();
		if( s1000 == "true" )
			return true;
		else
			return false;
	}


	// 実数で返す。ダメなら２番目の引数を返す。最大最小を超えていたらそこで張り付く
	function myRealCast( s999 , nDefault, nMin=-65535.0, nMax=65535.0 ){
		var n1000;

		nDefault = String(nDefault);
		if( String(s999)=="NaN" || String(s999)=="undefined" ){
			n1000 = parseFloat(nDefault)*1.0;
			return n1000;
		}

		var sPatternReal1 = new RegExp(/^[+\-]?[0-9]+\.?[0-9]*[0-9%]?$/); // 正規表現で実数入力チェックする
		if( sPatternReal1.test( s999 ) ){
			n1000 = parseFloat( s999 )*1.0;
		}
		else{
			n1000 = parseFloat(nDefault)*1.0;
			return n1000;
		}

		if( n1000 < nMin ) n1000 = parseFloat(nMin)*1.0;

		if( n1000 > nMax ) n1000 = parseFloat(nMax)*1.0;

		return n1000*1.0;
	}


	// 整数で返す。少数なら整数に変換する。ダメなら２番目の引数を返す。最大最小を超えていたらそこで張り付く。Defaultの方が優先される。
	function myIntegerCast( s999 , nDefault, nMin=-65535, nMax=65535 ){
		var n1000;

		nDefault = String(nDefault);
		if( String(s999)=="NaN" || String(s999)=="undefined" ){
			n1000 = parseInt(nDefault);
			return n1000;
		}

		var sPatternInteger1 = new RegExp(/^[+-]?\d+$/); // 正規表現で整数入力チェックする。
		if( sPatternInteger1.test( s999 ) ){
			n1000 = parseInt( s999 );
		}
		else{
			n1000 = parseInt(s999);
			return n1000;
		}

		if( n1000 < nMin ) n1000 = parseInt(nMin);

		if( n1000 > nMax ) n1000 = parseInt(nMax);

		return n1000;
	}

	// 文字列で返す。ダメなら２番目の引数を返す
	function myStringCast( s999 , sDefault="" ){
		var s1000;
		if( typeof s999 == "undefined" ){
			s1000 = String(sDefault);
		}
		else{
			s1000 = String( s999 );
		}
		return s1000;
	}

	// 色を表す文字列で返す。ダメなら２番目の引数を返す
	function myColorCast( s999 , sDefault ){
		var sPatternColor = new RegExp(/[0-9A-Za-z#]+/); // 正規表現でカラー表示チェックする
		var s1000;
		
		if( typeof s999 == "undefined" ){
			s1000 = sDefault;
			return s1000;
		}
		
		if( !sPatternColor.test( s1000 ) ){
		}
		else{
			s1000 = String( s999 );
		}
		return s1000;
	}

	// --------------------------------------------------------------------------------------------
	// 最初のキューブのプロパティの値を構造体配列にする
	function set1stCubeProps(){
		$scope.aryLv1=[];
		$scope.aryLv2=[];
		$scope.aryColspan=[];


		// --------------------------------------------------------------------------
		var sPattern2 = new RegExp(/[0-9A-Za-z#]+/); // 正規表現でカラー表示チェックする
		// --------------------------------------------------------------------------
		let oLv1;
		// --------------------------------------------------------------------------


		// Lv1 グループ====================================================
		//
		oLv1 = new Object();
		oLv1.Rowspan = myIntegerCast( $scope.layout.settings.sLv1Rowspan1 , 99 , 1 , 999);
		oLv1.RowName = String( $scope.layout.settings.sLv1RowName1 );
		oLv1.Align = String( $scope.layout.settings.sLv1Align1 );
		oLv1.VertiAlign = String( $scope.layout.settings.sLv1VertiAlign1 );
		oLv1.BGC = String( $scope.layout.settings.sLv1BGC1 );
			if( ! sPattern2.test( oLv1.BGC ) ) oLv1.BGC = "#EEEEEE" ;
		oLv1.FGC = String( $scope.layout.settings.sLv1FGC1 );
			if( ! sPattern2.test( oLv1.FGC ) ) oLv1.FGC = "#111111" ;
		oLv1.Summary = myBoolCast( $scope.layout.settings.sLv1Summary1 );
		oLv1.StandOut = myBoolCast( $scope.layout.settings.sLv1StandOut1 );
		oLv1.Blink = myBoolCast( $scope.layout.settings.sLv1Blink1 );
		oLv1.RangesumRS = 0;
		$scope.aryLv1.push( oLv1 );

		// 
		oLv1 = new Object();
		oLv1.Rowspan = myIntegerCast( $scope.layout.settings.sLv1Rowspan2 ,99 , 1 , 999);
		oLv1.RowName = String( $scope.layout.settings.sLv1RowName2 );
		oLv1.Align = String( $scope.layout.settings.sLv1Align2 );
		oLv1.VertiAlign = String( $scope.layout.settings.sLv1VertiAlign2 );
		oLv1.BGC = String( $scope.layout.settings.sLv1BGC2 );
			if( ! sPattern2.test( oLv1.BGC ) ) oLv1.BGC = "#EEEEEE" ;
		oLv1.FGC = String( $scope.layout.settings.sLv1FGC2 );
			if( ! sPattern2.test( oLv1.FGC ) ) oLv1.FGC = "#111111" ;
		oLv1.Summary = myBoolCast( $scope.layout.settings.sLv1Summary2 );
		oLv1.StandOut = myBoolCast( $scope.layout.settings.sLv1StandOut2 );
		oLv1.Blink = myBoolCast( $scope.layout.settings.sLv1Blink2 );
		oLv1.RangesumRS = 0;
		$scope.aryLv1.push( oLv1 );

		// 
		oLv1 = new Object();
		oLv1.Rowspan = myIntegerCast( $scope.layout.settings.sLv1Rowspan3 ,99 , 1 , 999);
		oLv1.RowName = String( $scope.layout.settings.sLv1RowName3 );
		oLv1.Align = String( $scope.layout.settings.sLv1Align3 );
		oLv1.VertiAlign = String( $scope.layout.settings.sLv1VertiAlign3 );
		oLv1.BGC = String( $scope.layout.settings.sLv1BGC3 );
			if( ! sPattern2.test( oLv1.BGC ) ) oLv1.BGC = "#EEEEEE" ;
		oLv1.FGC = String( $scope.layout.settings.sLv1FGC3 );
			if( ! sPattern2.test( oLv1.FGC ) ) oLv1.FGC = "#111111" ;
		oLv1.Summary = myBoolCast( $scope.layout.settings.sLv1Summary3 );
		oLv1.StandOut = myBoolCast( $scope.layout.settings.sLv1StandOut3 );
		oLv1.Blink = myBoolCast( $scope.layout.settings.sLv1Blink3 );
		oLv1.RangesumRS = 0;
		$scope.aryLv1.push( oLv1 );

		// 
		oLv1 = new Object();
		oLv1.Rowspan = myIntegerCast( $scope.layout.settings.sLv1Rowspan4 ,99 , 1 , 999);
		oLv1.RowName = String( $scope.layout.settings.sLv1RowName4 );
		oLv1.Align = String( $scope.layout.settings.sLv1Align4 );
		oLv1.VertiAlign = String( $scope.layout.settings.sLv1VertiAlign4 );
		oLv1.BGC = String( $scope.layout.settings.sLv1BGC4 );
			if( ! sPattern2.test( oLv1.BGC ) ) oLv1.BGC = "#EEEEEE" ;
		oLv1.FGC = String( $scope.layout.settings.sLv1FGC4 );
			if( ! sPattern2.test( oLv1.FGC ) ) oLv1.FGC = "#111111" ;
		oLv1.Summary = myBoolCast( $scope.layout.settings.sLv1Summary4 );
		oLv1.StandOut = myBoolCast( $scope.layout.settings.sLv1StandOut4 );
		oLv1.Blink = myBoolCast( $scope.layout.settings.sLv1Blink4 );
		oLv1.RangesumRS = 0;
		$scope.aryLv1.push( oLv1 );

		// 
		oLv1 = new Object();
		oLv1.Rowspan = myIntegerCast( $scope.layout.settings.sLv1Rowspan5 ,99 , 1 , 999);
		oLv1.RowName = String( $scope.layout.settings.sLv1RowName5 );
		oLv1.Align = String( $scope.layout.settings.sLv1Align5 );
		oLv1.VertiAlign = String( $scope.layout.settings.sLv1VertiAlign2 );
		oLv1.BGC = String( $scope.layout.settings.sLv1BGC5 );
			if( ! sPattern2.test( oLv1.BGC ) ) oLv1.BGC = "#EEEEEE" ;
		oLv1.FGC = String( $scope.layout.settings.sLv1FGC5 );
			if( ! sPattern2.test( oLv1.FGC ) ) oLv1.FGC = "#111111" ;
		oLv1.Summary = myBoolCast( $scope.layout.settings.sLv1Summary5 );
		oLv1.StandOut = myBoolCast( $scope.layout.settings.sLv1StandOut5 );
		oLv1.Blink = myBoolCast( $scope.layout.settings.sLv1Blink5 );
		oLv1.RangesumRS = 0;
		$scope.aryLv1.push( oLv1 );

		// 
		oLv1 = new Object();
		oLv1.Rowspan = myIntegerCast( $scope.layout.settings.sLv1Rowspan6 ,99 , 1 , 999);
		oLv1.RowName = String( $scope.layout.settings.sLv1RowName6 );
		oLv1.Align = String( $scope.layout.settings.sLv1Align6 );
		oLv1.VertiAlign = String( $scope.layout.settings.sLv1VertiAlign6 );
		oLv1.BGC = String( $scope.layout.settings.sLv1BGC6 );
			if( ! sPattern2.test( oLv1.BGC ) ) oLv1.BGC = "#EEEEEE" ;
		oLv1.FGC = String( $scope.layout.settings.sLv1FGC6 );
			if( ! sPattern2.test( oLv1.FGC ) ) oLv1.FGC = "#111111" ;
		oLv1.Summary = myBoolCast( $scope.layout.settings.sLv1Summary6 );
		oLv1.StandOut = myBoolCast( $scope.layout.settings.sLv1StandOut6 );
		oLv1.Blink = myBoolCast( $scope.layout.settings.sLv1Blink6 );
		oLv1.RangesumRS = 0;
		$scope.aryLv1.push( oLv1 );

		// 
		oLv1 = new Object();
		oLv1.Rowspan = myIntegerCast( $scope.layout.settings.sLv1Rowspan7 ,99 , 1 , 999);
		oLv1.RowName = String( $scope.layout.settings.sLv1RowName7 );
		oLv1.Align = String( $scope.layout.settings.sLv1Align7 );
		oLv1.VertiAlign = String( $scope.layout.settings.sLv1VertiAlign7 );
		oLv1.BGC = String( $scope.layout.settings.sLv1BGC7 );
			if( ! sPattern2.test( oLv1.BGC ) ) oLv1.BGC = "#EEEEEE" ;
		oLv1.FGC = String( $scope.layout.settings.sLv1FGC7 );
			if( ! sPattern2.test( oLv1.FGC ) ) oLv1.FGC = "#111111" ;
		oLv1.Summary = myBoolCast( $scope.layout.settings.sLv1Summary7 );
		oLv1.StandOut = myBoolCast( $scope.layout.settings.sLv1StandOut7 );
		oLv1.Blink = myBoolCast( $scope.layout.settings.sLv1Blink7 );
		oLv1.RangesumRS = 0;
		$scope.aryLv1.push( oLv1 );

		// 
		oLv1 = new Object();
		oLv1.Rowspan = myIntegerCast( $scope.layout.settings.sLv1Rowspan8 ,99 , 1 , 999);
		oLv1.RowName = String( $scope.layout.settings.sLv1RowName8 );
		oLv1.Align = String( $scope.layout.settings.sLv1Align8 );
		oLv1.VertiAlign = String( $scope.layout.settings.sLv1VertiAlign8 );
		oLv1.BGC = String( $scope.layout.settings.sLv1BGC8 );
			if( ! sPattern2.test( oLv1.BGC ) ) oLv1.BGC = "#EEEEEE" ;
		oLv1.FGC = String( $scope.layout.settings.sLv1FGC8 );
			if( ! sPattern2.test( oLv1.FGC ) ) oLv1.FGC = "#111111" ;
		oLv1.Summary = myBoolCast( $scope.layout.settings.sLv1Summary8 );
		oLv1.StandOut = myBoolCast( $scope.layout.settings.sLv1StandOut8 );
		oLv1.Blink = myBoolCast( $scope.layout.settings.sLv1Blink8 );
		oLv1.RangesumRS = 0;
		$scope.aryLv1.push( oLv1 );

		// 
		oLv1 = new Object();
		oLv1.Rowspan = myIntegerCast( $scope.layout.settings.sLv1Rowspan9 ,99 , 1 , 999);
		oLv1.RowName = String( $scope.layout.settings.sLv1RowName9 );
		oLv1.Align = String( $scope.layout.settings.sLv1Align9 );
		oLv1.VertiAlign = String( $scope.layout.settings.sLv1VertiAlign9 );
		oLv1.BGC = String( $scope.layout.settings.sLv1BGC9 );
			if( ! sPattern2.test( oLv1.BGC ) ) oLv1.BGC = "#EEEEEE" ;
		oLv1.FGC = String( $scope.layout.settings.sLv1FGC9 );
			if( ! sPattern2.test( oLv1.FGC ) ) oLv1.FGC = "#111111" ;
		oLv1.Summary = myBoolCast( $scope.layout.settings.sLv1Summary9 );
		oLv1.StandOut = myBoolCast( $scope.layout.settings.sLv1StandOut9 );
		oLv1.Blink = myBoolCast( $scope.layout.settings.sLv1Blink9 );
		oLv1.RangesumRS = 0;
		$scope.aryLv1.push( oLv1 );

		// 
		oLv1 = new Object();
		oLv1.Rowspan = myIntegerCast( $scope.layout.settings.sLv1Rowspan10 ,99 , 1 , 999);
		oLv1.RowName = String( $scope.layout.settings.sLv1RowName10 );
		oLv1.Align = String( $scope.layout.settings.sLv1Align10 );
		oLv1.VertiAlign = String( $scope.layout.settings.sLv1VertiAlign10 );
		oLv1.BGC = String( $scope.layout.settings.sLv1BGC10 );
			if( ! sPattern2.test( oLv1.BGC ) ) oLv1.BGC = "#EEEEEE" ;
		oLv1.FGC = String( $scope.layout.settings.sLv1FGC10 );
			if( ! sPattern2.test( oLv1.FGC ) ) oLv1.FGC = "#111111" ;
		oLv1.Summary = myBoolCast( $scope.layout.settings.sLv1Summary10 );
		oLv1.StandOut = myBoolCast( $scope.layout.settings.sLv1StandOut10 );
		oLv1.Blink = myBoolCast( $scope.layout.settings.sLv1Blink10 );
		oLv1.RangesumRS = 0;
		$scope.aryLv1.push( oLv1 );

		// 
		oLv1 = new Object();
		oLv1.Rowspan = myIntegerCast( $scope.layout.settings.sLv1Rowspan11 ,99 , 1 , 999);
		oLv1.RowName = String( $scope.layout.settings.sLv1RowName11 );
		oLv1.Align = String( $scope.layout.settings.sLv1Align11 );
		oLv1.VertiAlign = String( $scope.layout.settings.sLv1VertiAlign11 );
		oLv1.BGC = String( $scope.layout.settings.sLv1BGC11 );
			if( ! sPattern2.test( oLv1.BGC ) ) oLv1.BGC = "#EEEEEE" ;
		oLv1.FGC = String( $scope.layout.settings.sLv1FGC11 );
			if( ! sPattern2.test( oLv1.FGC ) ) oLv1.FGC = "#111111" ;
		oLv1.Summary = myBoolCast( $scope.layout.settings.sLv1Summary11 );
		oLv1.StandOut = myBoolCast( $scope.layout.settings.sLv1StandOut11 );
		oLv1.Blink = myBoolCast( $scope.layout.settings.sLv1Blink11 );
		oLv1.RangesumRS = 0;
		$scope.aryLv1.push( oLv1 );

		// 
		oLv1 = new Object();
		oLv1.Rowspan = myIntegerCast( $scope.layout.settings.sLv1Rowspan12 ,99 , 1 , 999);
		oLv1.RowName = String( $scope.layout.settings.sLv1RowName12 );
		oLv1.Align = String( $scope.layout.settings.sLv1Align12 );
		oLv1.VertiAlign = String( $scope.layout.settings.sLv1VertiAlign12 );
		oLv1.BGC = String( $scope.layout.settings.sLv1BGC12 );
			if( ! sPattern2.test( oLv1.BGC ) ) oLv1.BGC = "#EEEEEE" ;
		oLv1.FGC = String( $scope.layout.settings.sLv1FGC12 );
			if( ! sPattern2.test( oLv1.FGC ) ) oLv1.FGC = "#111111" ;
		oLv1.Summary = myBoolCast( $scope.layout.settings.sLv1Summary12 );
		oLv1.StandOut = myBoolCast( $scope.layout.settings.sLv1StandOut12 );
		oLv1.Blink = myBoolCast( $scope.layout.settings.sLv1Blink12 );
		oLv1.RangesumRS = 0;
		$scope.aryLv1.push( oLv1 );

		// 
		oLv1 = new Object();
		oLv1.Rowspan = myIntegerCast( $scope.layout.settings.sLv1Rowspan13 ,99 , 1 , 999);
		oLv1.RowName = String( $scope.layout.settings.sLv1RowName13 );
		oLv1.Align = String( $scope.layout.settings.sLv1Align13 );
		oLv1.VertiAlign = String( $scope.layout.settings.sLv1VertiAlign13 );
		oLv1.BGC = String( $scope.layout.settings.sLv1BGC13 );
			if( ! sPattern2.test( oLv1.BGC ) ) oLv1.BGC = "#EEEEEE" ;
		oLv1.FGC = String( $scope.layout.settings.sLv1FGC13 );
			if( ! sPattern2.test( oLv1.FGC ) ) oLv1.FGC = "#111111" ;
		oLv1.Summary = myBoolCast( $scope.layout.settings.sLv1Summary13 );
		oLv1.StandOut = myBoolCast( $scope.layout.settings.sLv1StandOut13 );
		oLv1.Blink = myBoolCast( $scope.layout.settings.sLv1Blink13 );
		oLv1.RangesumRS = 0;
		$scope.aryLv1.push( oLv1 );

		// 
		oLv1 = new Object();
		oLv1.Rowspan = myIntegerCast( $scope.layout.settings.sLv1Rowspan14 ,99 , 1 , 999);
		oLv1.RowName = String( $scope.layout.settings.sLv1RowName14 );
		oLv1.Align = String( $scope.layout.settings.sLv1Align14 );
		oLv1.VertiAlign = String( $scope.layout.settings.sLv1VertiAlign14 );
		oLv1.BGC = String( $scope.layout.settings.sLv1BGC14 );
			if( ! sPattern2.test( oLv1.BGC ) ) oLv1.BGC = "#EEEEEE" ;
		oLv1.FGC = String( $scope.layout.settings.sLv1FGC14 );
			if( ! sPattern2.test( oLv1.FGC ) ) oLv1.FGC = "#111111" ;
		oLv1.Summary = myBoolCast( $scope.layout.settings.sLv1Summary14 );
		oLv1.StandOut = myBoolCast( $scope.layout.settings.sLv1StandOut14 );
		oLv1.Blink = myBoolCast( $scope.layout.settings.sLv1Blink14 );
		oLv1.RangesumRS = 0;
		$scope.aryLv1.push( oLv1 );

		// 
		oLv1 = new Object();
		oLv1.Rowspan = myIntegerCast( $scope.layout.settings.sLv1Rowspan15 ,99 , 1 , 999);
		oLv1.RowName = String( $scope.layout.settings.sLv1RowName15 );
		oLv1.Align = String( $scope.layout.settings.sLv1Align15 );
		oLv1.VertiAlign = String( $scope.layout.settings.sLv1VertiAlign15 );
		oLv1.BGC = String( $scope.layout.settings.sLv1BGC15 );
			if( ! sPattern2.test( oLv1.BGC ) ) oLv1.BGC = "#EEEEEE" ;
		oLv1.FGC = String( $scope.layout.settings.sLv1FGC15 );
			if( ! sPattern2.test( oLv1.FGC ) ) oLv1.FGC = "#111111" ;
		oLv1.Summary = myBoolCast( $scope.layout.settings.sLv1Summary15 );
		oLv1.StandOut = myBoolCast( $scope.layout.settings.sLv1StandOut15 );
		oLv1.Blink = myBoolCast( $scope.layout.settings.sLv1Blink15 );
		oLv1.RangesumRS = 0;
		$scope.aryLv1.push( oLv1 );

		// 
		oLv1 = new Object();
		oLv1.Rowspan = myIntegerCast( $scope.layout.settings.sLv1Rowspan16 ,99 , 1 , 999);
		oLv1.RowName = String( $scope.layout.settings.sLv1RowName16 );
		oLv1.Align = String( $scope.layout.settings.sLv1Align16 );
		oLv1.VertiAlign = String( $scope.layout.settings.sLv1VertiAlign16 );
		oLv1.BGC = String( $scope.layout.settings.sLv1BGC16 );
			if( ! sPattern2.test( oLv1.BGC ) ) oLv1.BGC = "#EEEEEE" ;
		oLv1.FGC = String( $scope.layout.settings.sLv1FGC16 );
			if( ! sPattern2.test( oLv1.FGC ) ) oLv1.FGC = "#111111" ;
		oLv1.Summary = myBoolCast( $scope.layout.settings.sLv1Summary16 );
		oLv1.StandOut = myBoolCast( $scope.layout.settings.sLv1StandOut16 );
		oLv1.Blink = myBoolCast( $scope.layout.settings.sLv1Blink16 );
		oLv1.RangesumRS = 0;
		$scope.aryLv1.push( oLv1 );

		// 
		oLv1 = new Object();
		oLv1.Rowspan = myIntegerCast( $scope.layout.settings.sLv1Rowspan17 ,99 , 1 , 999);
		oLv1.RowName = String( $scope.layout.settings.sLv1RowName17 );
		oLv1.Align = String( $scope.layout.settings.sLv1Align17 );
		oLv1.VertiAlign = String( $scope.layout.settings.sLv1VertiAlign17 );
		oLv1.BGC = String( $scope.layout.settings.sLv1BGC17 );
			if( ! sPattern2.test( oLv1.BGC ) ) oLv1.BGC = "#EEEEEE" ;
		oLv1.FGC = String( $scope.layout.settings.sLv1FGC17 );
			if( ! sPattern2.test( oLv1.FGC ) ) oLv1.FGC = "#111111" ;
		oLv1.Summary = myBoolCast( $scope.layout.settings.sLv1Summary17 );
		oLv1.StandOut = myBoolCast( $scope.layout.settings.sLv1StandOut17 );
		oLv1.Blink = myBoolCast( $scope.layout.settings.sLv1Blink17 );
		oLv1.RangesumRS = 0;
		$scope.aryLv1.push( oLv1 );


		// fin
		oLv1 = new Object();
		oLv1.Rowspan = 100;
		oLv1.RowName = "　";
		oLv1.Align = "center";
		oLv1.VertiAlign = "middle";
		oLv1.BGC = "#EEEEEE" ;
		oLv1.FGC = "#111111" ;
		oLv1.Summary = false;
		oLv1.StandOut = false;
		oLv1.Blink = "false";
		oLv1.RangesumRS = 0;
		$scope.aryLv1.push( oLv1 );

		var nRageSum1 = 0;
//$scope.sCUBEDEBUG += " $scope.aryLv1.length=" + $scope.aryLv1.length +" /";
//$scope.sCUBEDEBUG += " Boolean=" + myBoolCast(true) +" /";
		for( var i1=0 ; i1 < $scope.aryLv1.length ; i1++ ){
			nRageSum1 += $scope.aryLv1[i1].Rowspan;
			$scope.aryLv1[i1].RangesumRS = nRageSum1;
//$scope.sCUBEDEBUG += " $scope.aryLv1["+i1+"].Rowspan=" + $scope.aryLv1[i1].Rowspan 
//	$scope.sCUBEDEBUG += " $scope.aryLv1["+i1+"].RowName=" + $scope.aryLv1[i1].RowName 
//	$scope.sCUBEDEBUG += " $scope.aryLv1["+i1+"].RangesumRS=" + $scope.aryLv1[i1].RangesumRS + " /";
		}



		// Lv2 グループ====================================================

		//
		oLv1 = new Object();
		oLv1.Rowspan = myIntegerCast( $scope.layout.settings.sLv2Rowspan1 ,99 , 1 , 999);
		oLv1.RowName = String( $scope.layout.settings.sLv2RowName1 );
		oLv1.Align = String( $scope.layout.settings.sLv2Align1 );
		oLv1.VertiAlign = String( $scope.layout.settings.sLv2VertiAlign1 );
		oLv1.BGC = String( $scope.layout.settings.sLv2BGC1 );
			if( ! sPattern2.test( oLv1.BGC ) ) oLv1.BGC = "#EEEEEE" ;
		oLv1.FGC = String( $scope.layout.settings.sLv2FGC1 );
			if( ! sPattern2.test( oLv1.FGC ) ) oLv1.FGC = "#111111" ;
		oLv1.Summary = myBoolCast( $scope.layout.settings.sLv2Summary1 );
		oLv1.StandOut = myBoolCast( $scope.layout.settings.sLv2StandOut1 );
		oLv1.Blink = myBoolCast( false );
		oLv1.RangesumRS = 0;
		$scope.aryLv2.push( oLv1 );

		//
		oLv1 = new Object();
		oLv1.Rowspan = myIntegerCast( $scope.layout.settings.sLv2Rowspan2 ,99 , 1 , 999);
		oLv1.RowName = String( $scope.layout.settings.sLv2RowName2 );
		oLv1.Align = String( $scope.layout.settings.sLv2Align2 );
		oLv1.VertiAlign = String( $scope.layout.settings.sLv2VertiAlign2 );
		oLv1.BGC = String( $scope.layout.settings.sLv2BGC2 );
			if( ! sPattern2.test( oLv1.BGC ) ) oLv1.BGC = "#EEEEEE" ;
		oLv1.FGC = String( $scope.layout.settings.sLv2FGC2 );
			if( ! sPattern2.test( oLv1.FGC ) ) oLv1.FGC = "#111111" ;
		oLv1.Summary = myBoolCast( $scope.layout.settings.sLv2Summary2 );
		oLv1.StandOut = myBoolCast( $scope.layout.settings.sLv2StandOut2 );
		oLv1.Blink = myBoolCast( false );
		oLv1.RangesumRS = 0;
		$scope.aryLv2.push( oLv1 );

		//
		oLv1 = new Object();
		oLv1.Rowspan = myIntegerCast( $scope.layout.settings.sLv2Rowspan3 ,99 , 1 , 999);
		oLv1.RowName = String( $scope.layout.settings.sLv2RowName3 );
		oLv1.Align = String( $scope.layout.settings.sLv2Align3 );
		oLv1.VertiAlign = String( $scope.layout.settings.sLv2VertiAlign3 );
		oLv1.BGC = String( $scope.layout.settings.sLv2BGC3 );
			if( ! sPattern2.test( oLv1.BGC ) ) oLv1.BGC = "#EEEEEE" ;
		oLv1.FGC = String( $scope.layout.settings.sLv2FGC3 );
			if( ! sPattern2.test( oLv1.FGC ) ) oLv1.FGC = "#111111" ;
		oLv1.Summary = myBoolCast( $scope.layout.settings.sLv2Summary3 );
		oLv1.StandOut = myBoolCast( $scope.layout.settings.sLv2StandOut3 );
		oLv1.Blink = myBoolCast( false );
		oLv1.RangesumRS = 0;
		$scope.aryLv2.push( oLv1 );

		//
		oLv1 = new Object();
		oLv1.Rowspan = myIntegerCast( $scope.layout.settings.sLv2Rowspan4 ,99 , 1 , 999);
		oLv1.RowName = String( $scope.layout.settings.sLv2RowName4 );
		oLv1.Align = String( $scope.layout.settings.sLv2Align4 );
		oLv1.VertiAlign = String( $scope.layout.settings.sLv2VertiAlign4 );
		oLv1.BGC = String( $scope.layout.settings.sLv2BGC4 );
			if( ! sPattern2.test( oLv1.BGC ) ) oLv1.BGC = "#EEEEEE" ;
		oLv1.FGC = String( $scope.layout.settings.sLv2FGC4 );
			if( ! sPattern2.test( oLv1.FGC ) ) oLv1.FGC = "#111111" ;
		oLv1.Summary = myBoolCast( $scope.layout.settings.sLv2Summary4 );
		oLv1.StandOut = myBoolCast( $scope.layout.settings.sLv2StandOut4 );
		oLv1.Blink = myBoolCast( false );
		oLv1.RangesumRS = 0;
		$scope.aryLv2.push( oLv1 );

		//
		oLv1 = new Object();
		oLv1.Rowspan = myIntegerCast( $scope.layout.settings.sLv2Rowspan5 ,99 , 1 , 999);
		oLv1.RowName = String( $scope.layout.settings.sLv2RowName5 );
		oLv1.Align = String( $scope.layout.settings.sLv2Align5 );
		oLv1.VertiAlign = String( $scope.layout.settings.sLv2VertiAlign5 );
		oLv1.BGC = String( $scope.layout.settings.sLv2BGC5 );
			if( ! sPattern2.test( oLv1.BGC ) ) oLv1.BGC = "#EEEEEE" ;
		oLv1.FGC = String( $scope.layout.settings.sLv2FGC5 );
			if( ! sPattern2.test( oLv1.FGC ) ) oLv1.FGC = "#111111" ;
		oLv1.Summary = myBoolCast( $scope.layout.settings.sLv2Summary5 );
		oLv1.StandOut = myBoolCast( $scope.layout.settings.sLv2StandOut5 );
		oLv1.Blink = myBoolCast( false );
		oLv1.RangesumRS = 0;
		$scope.aryLv2.push( oLv1 );

		// lv2 fin
		oLv1 = new Object();
		oLv1.Rowspan = 1000;
		oLv1.RowName = "　";
		oLv1.Align = "center";
		oLv1.VertiAlign = "middle";
		oLv1.BGC = "#EEEEEE" ;
		oLv1.FGC = "#111111" ;
		oLv1.Summary = myBoolCast( false );
		oLv1.StandOut = myBoolCast( false );
		oLv1.Blink = myBoolCast( false );
		oLv1.RangesumRS = 0;
		$scope.aryLv2.push( oLv1 );


		nRageSum1 = 0;
//$scope.sCUBEDEBUG += " $scope.aryLv2.length=" + $scope.aryLv2.length +" /";
//$scope.sCUBEDEBUG += " Boolean=" + myBoolCast(false) +" /";
		for( var i1=0 ; i1 < $scope.aryLv2.length ; i1++ ){
			nRageSum1 += $scope.aryLv2[i1].Rowspan;
			$scope.aryLv2[i1].RangesumRS = nRageSum1;
//$scope.sCUBEDEBUG += " $scope.aryLv2["+i1+"].Rowspan=" + $scope.aryLv2[i1].Rowspan 
//	$scope.sCUBEDEBUG += " $scope.aryLv2["+i1+"].RowName=" + $scope.aryLv2[i1].RowName 
//	$scope.sCUBEDEBUG += " $scope.aryLv2["+i1+"].RangesumRS=" + $scope.aryLv2[i1].RangesumRS + " /";
		}





		// Colspan グループ====================================================

		//
		oLv1 = new Object();
		oLv1.nColspan = myIntegerCast( $scope.layout.settings.nColspan1 , 1 , 1 , 5);
		oLv1.sColspanText = myStringCast( $scope.layout.settings.sColspanText1 , "Measure Group1" );
		oLv1.sAlign = myStringCast( $scope.layout.settings.sColspanAlign1 , "center" );
		oLv1.sColspanBGC = myStringCast( $scope.layout.settings.sColspanBGC1 , "midnightblue" );
		$scope.aryColspan.push( oLv1 );

		oLv1 = new Object();
		oLv1.nColspan = myIntegerCast( $scope.layout.settings.nColspan2 , 1 , 1 , 4);
		oLv1.sColspanText = myStringCast( $scope.layout.settings.sColspanText2 , "Measure Group2" );
		oLv1.sAlign = myStringCast( $scope.layout.settings.sColspanAlign2 , "center" );
		oLv1.sColspanBGC = myStringCast( $scope.layout.settings.sColspanBGC2 , "midnightblue" );
		$scope.aryColspan.push( oLv1 );

		oLv1 = new Object();
		oLv1.nColspan = myIntegerCast( $scope.layout.settings.nColspan3 , 1 , 1 , 3);
		oLv1.sColspanText = myStringCast( $scope.layout.settings.sColspanText3 , "Measure Group3" );
		oLv1.sAlign = myStringCast( $scope.layout.settings.sColspanAlign3 , "center" );
		oLv1.sColspanBGC = myStringCast( $scope.layout.settings.sColspanBGC3 , "midnightblue" );
		$scope.aryColspan.push( oLv1 );

		oLv1 = new Object();
		oLv1.nColspan = myIntegerCast( $scope.layout.settings.nColspan4 , 1 , 1 , 2);
		oLv1.sColspanText = myStringCast( $scope.layout.settings.sColspanText4 , "Measure Group4" );
		oLv1.sAlign = myStringCast( $scope.layout.settings.sColspanAlign4 , "center" );
		oLv1.sColspanBGC = myStringCast( $scope.layout.settings.sColspanBGC4 , "midnightblue" );
		$scope.aryColspan.push( oLv1 );

		oLv1 = new Object();
		oLv1.nColspan = myIntegerCast( $scope.layout.settings.nColspan5 , 1 , 1 , 1);
		oLv1.sColspanText = myStringCast( $scope.layout.settings.sColspanText5 , "Measure Group5" );
		oLv1.sAlign = myStringCast( $scope.layout.settings.sColspanAlign5 , "center" );
		oLv1.sColspanBGC = myStringCast( $scope.layout.settings.sColspanBGC5 , "midnightblue" );
		$scope.aryColspan.push( oLv1 );

		oLv1 = new Object();
		oLv1.nColspan = 1;
		oLv1.sColspanText = "dummy";
		oLv1.sAlign = "center";
		oLv1.sColspanBGC = "darkgray";
		$scope.aryColspan.push( oLv1 );

		// colspanの累計値を取得しておく
		nRageSum1 = 0;
		for( var i1=0 ; i1 < $scope.aryColspan.length ; i1++ ){
			nRageSum1 += $scope.aryColspan[i1].nColspan;
			$scope.aryColspan[i1].RangesumCS = nRageSum1;
		}

		// Table Overall
		$scope.prop_nLineWidthMagnification1 = myIntegerCast( $scope.layout.settings.nLineWidthMagnification1 , 1 , 1 , 10 );
		$scope.prop_sLineColorGrid1 = myColorCast( $scope.layout.settings.sLineColorGrid1 , 'black' );
		$scope.prop_sLineColorHeader1 = myColorCast( $scope.layout.settings.sLineColorHeader1 , 'darkgray' );

		$scope.prop_nAbsoluteMagnification1 = myRealCast( $scope.layout.settings.nAbsoluteMagnification1 , 1.0, 0.0, 2.0 );
//var bBackup = G_bDegubMode;
//G_bDegubMode=true;
//if(G_bDegubMode)console.log('set1stCubeProps: hello1' );
//if(G_bDegubMode)console.log('set1stCubeProps: ' + $scope.layout.settings.nAbsoluteMagnification1 + ' into ' + $scope.prop_nAbsoluteMagnification1 );
//if(G_bDegubMode)console.log('set1stCubeProps: hello2' );
//G_bDegubMode=bBackup;


		$scope.prop_bVerticalDimension = myBoolCast( $scope.layout.settings.bVerticalDimension );
		
		
		
		$scope.prop_bHideMeasName = myBoolCast( $scope.layout.settings.bHideMeasName );
		$scope.prop_bHideLv1 = myBoolCast( $scope.layout.settings.bHideLv1  );
		$scope.prop_bHideLv2 = myBoolCast( $scope.layout.settings.bHideLv2  );
		



		// どうもプロパティのデータ型を信用できない・・・
		$scope.prop_nMeasureCols = 1;
		if( $scope.layout.settings.bRepeatName == true){
			$scope.prop_nMeasureCols = 2;
		}



		$scope.prop_sHeaderBGC1 = myColorCast( $scope.layout.settings.sHeaderBGC1 , 'white');
		$scope.prop_sHeaderFGC1 = myColorCast( $scope.layout.settings.sHeaderFGC1 , 'black');
		$scope.prop_sHeaderBGC2 = myColorCast( $scope.layout.settings.sHeaderBGC2 , 'white');
		$scope.prop_sHeaderFGC2 = myColorCast( $scope.layout.settings.sHeaderFGC2 , 'black');

		$scope.prop_sLineV1 = myStringCast( $scope.layout.settings.sLineV1 ,'dotted' );
		$scope.prop_sLineHorizon1 = myStringCast( $scope.layout.settings.sLineHorizon1 ,'dotted' );

		$scope.prop_nFontSize1 = myIntegerCast(myIntegerCast( $scope.layout.settings.nFontSize1 , 18 , 1 ) * $scope.prop_nAbsoluteMagnification1, 0 );
		$scope.prop_nMeasureLabelFontSize = myIntegerCast(myIntegerCast( $scope.layout.settings.nFontSize2 , 16, 1, 100) * $scope.prop_nAbsoluteMagnification1, 0 );
		$scope.prop_nFontSize4 = myIntegerCast(myIntegerCast( $scope.layout.settings.nFontSize4 , 18 , 1 ) * $scope.prop_nAbsoluteMagnification1, 0 );
		$scope.prop_nFontSize5 = myIntegerCast(myIntegerCast( $scope.layout.settings.nFontSize5 , 18 , 1 ) * $scope.prop_nAbsoluteMagnification1, 0 );
		$scope.prop_nFontSize6 = myIntegerCast(myIntegerCast( $scope.layout.settings.nFontSize6 , 14 , 1 ) * $scope.prop_nAbsoluteMagnification1, 0 );
//var bBackup = G_bDegubMode;
//G_bDegubMode=true;
//if(G_bDegubMode)console.log('set1stCubeProps: ' + myIntegerCast( $scope.layout.settings.nFontSize1 , 18 , 1 ) + ' * ' + $scope.prop_nAbsoluteMagnification1 + ' into ' + $scope.prop_nFontSize1 );
//if(G_bDegubMode)console.log('set1stCubeProps: ( -- ) =' + (myIntegerCast( $scope.layout.settings.nFontSize1 , 18 , 1 ) * $scope.prop_nAbsoluteMagnification1 ) );
//if(G_bDegubMode)console.log('set1stCubeProps: ( ++ ) =' + (myIntegerCast( $scope.layout.settings.nFontSize1 , 18 , 1 ) * $scope.prop_nAbsoluteMagnification1 ) );
//G_bDegubMode=bBackup;



		$scope.prop_nRowBreak1 = myIntegerCast( $scope.layout.settings.nRowBreak1 , 1 , 1 , 5 );

		if( $scope.prop_bHideLv2 ){
			$scope.prop_nHeaderWidth0 = 0;
		}
		else{
			$scope.prop_nHeaderWidth0 = myIntegerCast(myIntegerCast( $scope.layout.settings.sHeaderWidth0 ,120,0) * $scope.prop_nAbsoluteMagnification1, 0 );
		}
		
		if( $scope.prop_bHideLv1 ){
			$scope.prop_nHeaderWidth1 = 0;
		}
		else{
			$scope.prop_nHeaderWidth1 = myIntegerCast(myIntegerCast( $scope.layout.settings.sHeaderWidth1 ,120,0) * $scope.prop_nAbsoluteMagnification1, 0 );
		}

		if( $scope.prop_bHideMeasName ){
			$scope.prop_nHeaderWidth2 = 0;
		}
		else{
			$scope.prop_nHeaderWidth2 = myIntegerCast(myIntegerCast( $scope.layout.settings.sHeaderWidth2 ,120,0) * $scope.prop_nAbsoluteMagnification1, 0 );
		}

		$scope.prop_nHeaderWidth3 = myIntegerCast(myIntegerCast( $scope.layout.settings.sHeaderWidth3 ,120,0) * $scope.prop_nAbsoluteMagnification1, 0 );


		$scope.prop_sMeasureNameAlign1 = myStringCast( $scope.layout.settings.sMeasureNameAlign1 , "left" );


		$scope.prop_styleWritingMode1;// 縦書きか否か
		if( myBoolCast( $scope.layout.settings.bLv2WritingMode ) ){
			$scope.prop_styleWritingMode1 = "writing-mode: vertical-rl; display: inline-block; ";
		}else{$scope.prop_styleWritingMode1="";}


		//
		$scope.prop_TopTotalHeaderText = $scope.layout.settings.sHeaderTextTopTotal;
		$scope.prop_aryTotalHeaderText = [];
		$scope.prop_aryTotalHeaderText.push( $scope.layout.settings.sHeaderText3 );
		$scope.prop_aryTotalHeaderText.push( $scope.layout.settings.sHeaderTextTotal2 );
		$scope.prop_aryTotalHeaderText.push( $scope.layout.settings.sHeaderTextTotal3 );
		$scope.prop_aryTotalHeaderText.push( $scope.layout.settings.sHeaderTextTotal4 );
		$scope.prop_aryTotalHeaderText.push( $scope.layout.settings.sHeaderTextTotal5 );


		$scope.prop_bUseColspan;
		$scope.prop_bUseColspan = myBoolCast( $scope.layout.settings.bUseColspan );
//$scope.sCUBEDEBUG += " $scope.prop_bUseColspan=" + $scope.prop_bUseColspan; 




//		$scope.prop_sTableMode = "horizontal";//"vertical"


	}
	// --------------------------------------------------------------------------------------------
	
	// --------------------------------------------------------------------------------------------
	// セカンドキューブのプロパティの値を構造体配列にする
	// ついでに、ナビゲーション先もディメンションが関係ないので構造体配列にしちゃう。
	function set2ndCubeProps(){
		$scope.aryDim1 = [];	
		
//		$scope.sDimName = "";

		$scope.oDimInfo = new Object();
		$scope.oDimInfo.qFallbackTitle ="";
		$scope.oDimInfo.qGroupFallbackTitles_0 ="";
		$scope.oDimInfo.qGroupFieldDefs_0 ="";
		$scope.oDimInfo.title ="";
		$scope.oDimInfo.qTags_0 = "";
		$scope.oDimInfo.qLibraryId = "";
		$scope.oDimInfo.qGroupPos = 0;

		
		if(G_bDegubMode)console.log('■>>>■set2ndCubeProps start');

					// --------------------------------------------------------------------------
					// ディメンションの中身の配列を作る
					
					// 部分的な結果を返すため、エラーメッセが先
					// ディメンションの要素が多過ぎます（G_nMaxDimensionElementSize)以下にしてください）
					if( $scope.layout.qHyperCube.qDimensionInfo.length>0 // ディメンションがそもそもあって
						&& $scope.layout.qHyperCube.qSize.qcy > G_nMaxDimensionElementSize ){
						$scope.sCubeRuntimeWarning += " Warning. Now,some limited cells are shown. There're " + $scope.layout.qHyperCube.qSize.qcy + " elements in the dimension, and too many to show. ";
						$scope.sCubeRuntimeWarning += " The number must be less than or equal to "+G_nMaxDimensionElementSize+". ディメンションの要素が多過ぎます（"+G_nMaxDimensionElementSize+"以下にしてください）";
					}
					
					
					if( $scope.layout.qHyperCube.qDimensionInfo.length==0 ){
					}
					else{
						// qFallbackTitle。数式のラベルが設定されているとそれが入る。数式のラベルが設定されていないとマスターアイテムの名前が入る。
						// qGroupFallbackTitles[]。配列。マスターアイテムの名前が入っている。
						// qGroupFieldDefs[]。配列。マスターアイテムの数式そのものが入っている。
						// title。マスターアイテムの名前。数式のラベルが省略されると、titleにマスターアイテムの名前が入っている
						$scope.oDimInfo.qFallbackTitle = myStringCast( $scope.layout.qHyperCube.qDimensionInfo[0].qFallbackTitle , '' );
						$scope.oDimInfo.qGroupFallbackTitles_0 = myStringCast( $scope.layout.qHyperCube.qDimensionInfo[0].qGroupFallbackTitles[$scope.layout.qHyperCube.qDimensionInfo[0].qGroupPos] , '' );
						$scope.oDimInfo.qGroupFieldDefs_0 = myStringCast( $scope.layout.qHyperCube.qDimensionInfo[0].qGroupFieldDefs[$scope.layout.qHyperCube.qDimensionInfo[0].qGroupPos] , '' );
						$scope.oDimInfo.title = myStringCast( $scope.layout.qHyperCube.qDimensionInfo[0].title , '' );
						$scope.oDimInfo.qTags_0 = $scope.layout.qHyperCube.qDimensionInfo[0].qTags[0];
						$scope.oDimInfo.qLibraryId = $scope.layout.qHyperCube.qDimensionInfo[0].qLibraryId;
						$scope.oDimInfo.qGroupPos = $scope.layout.qHyperCube.qDimensionInfo[0].qGroupPos;
						
if(G_bDegubMode)console.log("set2ndCubeProps: $scope.oDimInfo.qFallbackTitle=", $scope.oDimInfo.qFallbackTitle );
if(G_bDegubMode)console.log("set2ndCubeProps: $scope.oDimInfo.qGroupFallbackTitles_0=", $scope.oDimInfo.qGroupFallbackTitles_0 );
if(G_bDegubMode)console.log("set2ndCubeProps: $scope.oDimInfo.qGroupFieldDefs_0=", $scope.oDimInfo.qGroupFieldDefs_0 );
if(G_bDegubMode)console.log("set2ndCubeProps: $scope.oDimInfo.title=", $scope.oDimInfo.title );
if(G_bDegubMode)console.log("set2ndCubeProps: $scope.oDimInfo.qTags_0=", $scope.oDimInfo.qTags_0 );
if(G_bDegubMode)console.log("set2ndCubeProps: $scope.oDimInfo.qLibraryId=", $scope.oDimInfo.qLibraryId );
if(G_bDegubMode)console.log("set2ndCubeProps: $scope.oDimInfo.qGroupPos=", $scope.oDimInfo.qGroupPos );


//						$scope.sDimName = myStringCast( $scope.layout.qHyperCube.qDimensionInfo[0].qFallbackTitle , '' );
//						$scope.sDimName = myStringCast( $scope.layout.qHyperCube.qDimensionInfo[0].qGroupFallbackTitles[0] , '' );// 一番よく当たる
//						$scope.sDimName = myStringCast( $scope.layout.qHyperCube.qDimensionInfo[0].qGroupFieldDefs[0] , '' );// イコールサインで始まらない場合はこれ
//						$scope.sDimName = myStringCast( $scope.layout.qHyperCube.qDimensionInfo[0].title , '' );

//if(G_bDegubMode)console.log('set2ndCubeProps $scope.layout.qHyperCube.qSize.qcy', $scope.layout.qHyperCube.qSize.qcy );
						for( var iy1 = 0 ; iy1 < $scope.layout.qHyperCube.qDataPages[ 0 ].qMatrix.length && iy1 < G_nMaxDimensionElementSize ; iy1++ ){// ディメンション1のループ
//if(G_bDegubMode)console.log('set2ndCubeProps iy1', iy1 );
//$scope.sCUBEDEBUG += "■iy1=" + iy1 + " / ";
//$scope.sCUBEDEBUG += "■qDataPages=" + $scope.layout.qHyperCube.qDataPages[ 0 ].qMatrix[iy1][0].qText + " / ";
							//var sDim = myStringCast( $scope.layout.qHyperCube.qDataPages[ 0 ].qMatrix[iy1][0].qText , "");
							var oDim = new Object();
							oDim.sElmNameOfDim = myStringCast( $scope.layout.qHyperCube.qDataPages[ 0 ].qMatrix[iy1][0].qText , "");
							oDim.qNum = $scope.layout.qHyperCube.qDataPages[ 0 ].qMatrix[iy1][0].qNum;
							oDim.qText = $scope.layout.qHyperCube.qDataPages[ 0 ].qMatrix[iy1][0].qText;
							
//$scope.sCUBEDEBUG += "■sDim=" + sDim + " / ";
							//var sqNum = myStringCast( $scope.layout.qHyperCube.qDataPages[ 0 ].qMatrix[iy1][0].qNum , "");// 、数値じゃない場合NaN, 数値の場合はqNumにその数字が入る
							var bFind = false;
							for( var iDim1=0 ; iDim1<$scope.aryDim1.length ; iDim1++ ){
								if( $scope.aryDim1[iDim1].sElmNameOfDim == oDim.sElmNameOfDim ){
									bFind = true;
									break;
								} 
							}
							if( ! bFind ){
								$scope.aryDim1.push( oDim );
							}
						}// <<< while( iy1 < $scope.
					}
					if(G_bDegubMode)console.log('set2ndCubeProps: aryDim1 after reading dimesion ',$scope.aryDim1);

 
				
				// 部分的な結果を返すため、エラーメッセが先
				// メジャーが多過ぎます（G_nMaxMeasureSize)以下にしてください）
				var nNumberOfMeasures = $scope.layout.qHyperCube.qSize.qcx; // メジャーの数
				if( $scope.aryDim1.length > 0 ){
					nNumberOfMeasures = $scope.layout.qHyperCube.qSize.qcx - 1;
				}
				
				if( nNumberOfMeasures > G_nMaxMeasureSize ){
					$scope.sCubeRuntimeWarning += " Warning. Now, some limited cells are shown. There're " + (nNumberOfMeasures)  + " measures, and too many to show. ";
					$scope.sCubeRuntimeWarning += " The number of measures must be less than or equal to "+G_nMaxMeasureSize+". メジャーが多過ぎます（"+G_nMaxMeasureSize+"以下にしてください）";
					nNumberOfMeasures = G_nMaxMeasureSize; //制限する
				}
				


				if(G_bDegubMode)console.log("set2ndCubeProps: 全パラメータ>>> ");
				if(G_bDegubMode)console.log("- G_nMaxMeasureSize=",G_nMaxMeasureSize);
				if(G_bDegubMode)console.log(" nNumberOfMeasures=",nNumberOfMeasures);
				if(G_bDegubMode)console.log(" secondHyperCube.qMeasureInfo.length=",secondHyperCube.qMeasureInfo.length);
				if(G_bDegubMode)console.log(" $scope.layout.qHyperCube.qMeasureInfo.length=",secondHyperCube.qMeasureInfo.length);
				if(G_bDegubMode)console.log(" $scope.layout.qHyperCube.qSize.qcx=",$scope.layout.qHyperCube.qSize.qcx);
				if(G_bDegubMode)console.log("- G_nMaxDimensionElementSize=",G_nMaxDimensionElementSize);
				if(G_bDegubMode)console.log(" $scope.aryDim1.length=",$scope.aryDim1.length);
				if(G_bDegubMode)console.log(" $scope.layout.qHyperCube.qDimensionInfo.length=", $scope.layout.qHyperCube.qDimensionInfo.length );
				if(G_bDegubMode)console.log(" $scope.layout.qHyperCube.qSize.qcy=",$scope.layout.qHyperCube.qSize.qcy);
				if(G_bDegubMode)console.log("set2ndCubeProps: <<<全パラメータ ");


					// --------------------------------------------------------------------------
					// 追加したハイパーキューブを安全のため読み出す。
				if( G_bUseMeasProp ){
				
//$scope.sCUBEDEBUG += " ■secondHyperCube=" + ( typeof secondHyperCube.qDataPages ) + " / ";

//$scope.sCUBEDEBUG += " ■メジャーの長さ$scope.layout.qHyperCube.qSize.qcx=" + $scope.layout.qHyperCube.qSize.qcx  + " / ";
//$scope.sCUBEDEBUG += " ■メジャーの長さsecondHyperCube.qMeasureInfo.length=" + secondHyperCube.qMeasureInfo.length  + " / ";
					
					// セカンドキューブのセクション
					G_aryMeasProps = [];
					for( var iMeasureIndex1=0 
						; iMeasureIndex1 < secondHyperCube.qMeasureInfo.length && iMeasureIndex1 < nNumberOfMeasures // メジャーの限界
						; iMeasureIndex1 ++	// メジャーがインクリメントされる 
					){// メジャー分ループ
						let oMeasProps;
						oMeasProps = new Object();
//$scope.sCUBEDEBUG += " ■iMeasureIndex1=" + iMeasureIndex1  + " / ";

//if(G_bDegubMode)console.log("set2ndCubeProps: hello1?" + iMeasureIndex1);
						oMeasProps.sMeasBGColor = 'white';
						oMeasProps.sMeasFontColor = 'black';
						oMeasProps.bBlink = false;
						oMeasProps.sMeasName = iMeasureIndex1 +"番目のメジャー";
						oMeasProps.sMeasSheetID1 = "";
//if(G_bDegubMode)console.log("set2ndCubeProps: hello2?" + iMeasureIndex1);
						if( typeof secondHyperCube == "undefined" ){
						}
						else if( typeof secondHyperCube.qDataPages[ 0 ].qMatrix[0][iMeasureIndex1].qAttrExps == "undefined" ){
						}
						else{
//if(G_bDegubMode)console.log("set2ndCubeProps: hello3?" + iMeasureIndex1);
							if( secondHyperCube.qDataPages[0].qMatrix[0][iMeasureIndex1].qAttrExps.qValues.length>=3 ){
								oMeasProps.sMeasBGColor = myColorCast( secondHyperCube.qDataPages[0].qMatrix[0][iMeasureIndex1].qAttrExps.qValues[0].qText , 'white' );
							} 
							if( secondHyperCube.qDataPages[0].qMatrix[0][iMeasureIndex1].qAttrExps.qValues.length>=3 ){
								oMeasProps.sMeasFontColor = myColorCast( secondHyperCube.qDataPages[0].qMatrix[0][iMeasureIndex1].qAttrExps.qValues[1].qText , 'black' );
							} 
							if( secondHyperCube.qDataPages[0].qMatrix[0][iMeasureIndex1].qAttrExps.qValues.length>=3 ){
								oMeasProps.bBlink = myBoolCast( secondHyperCube.qDataPages[0].qMatrix[0][iMeasureIndex1].qAttrExps.qValues[2].qText , 'black' );
							} 
							oMeasProps.sMeasName = secondHyperCube.qMeasureInfo[iMeasureIndex1];
						}
						
						// シートID
						oMeasProps.sMeasSheetID1 = myStringCast( $scope.layout.qHyperCube.qMeasureInfo[iMeasureIndex1].sMeasSheetID1 , "" );
					

//if(G_bDegubMode)console.log("set2ndCubeProps: hello4?" + iMeasureIndex1);


						// ファーストキューブにしかないディメンションを取得するセクション
						// ディメンション分ループ
						var aryDimProps = [];
						for( var iy1=0 ; iy1 < $scope.aryDim1.length  && $scope.aryDim1.length > 0 ; iy1++ ){
//$scope.sCUBEDEBUG += " ■iy1=" + iy1  + " / ";
							let oDimProps;
							oDimProps = new Object();
							oDimProps.sMeasBGColor = 'white';
							oDimProps.sMeasFontColor = 'black';
							oDimProps.bBlink = false;
							oDimProps.sDimName = myStringCast( $scope.layout.qHyperCube.qDataPages[ 0 ].qMatrix[iy1][0].qText , "");
							
//if(G_bDegubMode)console.log("set2ndCubeProps: iy1=" + iy1);
							// qAttrExps オブジェクトが存在するかtypeofでチェック。メジャーのプロパティなので、デフォルトで生成されなければ、存在しないメジャーもたくさんある。
							if( typeof $scope.layout.qHyperCube.qDataPages[ 0 ].qMatrix[iy1][iMeasureIndex1+1].qAttrExps == "undefined" ){
							}else{
								// それぞれのメジャーのプロパティが存在するかチェック必要。配列なので長さをチェックする。
								// キューブの先頭にディメンションがあるから、＋１する。メジャーの数がはみ出すと原因不明のエラーになるので注意
								if( $scope.layout.qHyperCube.qDataPages[ 0 ].qMatrix[iy1][iMeasureIndex1+1].qAttrExps.qValues.length>=3 ){
									oDimProps.sMeasBGColor = myColorCast( $scope.layout.qHyperCube.qDataPages[ 0 ].qMatrix[iy1][iMeasureIndex1+1].qAttrExps.qValues[0].qText , 'white' );
								}
								if( $scope.layout.qHyperCube.qDataPages[ 0 ].qMatrix[iy1][iMeasureIndex1+1].qAttrExps.qValues.length>=3 ){
									oDimProps.sMeasFontColor = myColorCast( $scope.layout.qHyperCube.qDataPages[ 0 ].qMatrix[iy1][iMeasureIndex1+1].qAttrExps.qValues[1].qText , 'black' );
								}
								if( $scope.layout.qHyperCube.qDataPages[ 0 ].qMatrix[iy1][iMeasureIndex1+1].qAttrExps.qValues.length>=3 ){
									oDimProps.bBlink = myBoolCast( $scope.layout.qHyperCube.qDataPages[ 0 ].qMatrix[iy1][iMeasureIndex1+1].qAttrExps.qValues[2].qText , 'black' );
								}
							}
							aryDimProps.push( oDimProps );
//if(G_bDegubMode)console.log("set2ndCubeProps: iy1=" + iy1);
//$scope.sCUBEDEBUG += " oDimProps=" + oDimProps.sMeasBGColor + " / ";
						} // <<< for( var iy1=0 ; iy1 <
						
						oMeasProps.aryDimProps = aryDimProps;
						G_aryMeasProps.push( oMeasProps )	;
						
					} // <<< for( var iMeasureIndex1=0 
					
				} // <<< if( G_bUseMeasProp )
				else{
					G_aryMeasProps = [];
					for( var iMeasureIndex1=0 
						; iMeasureIndex1 < $scope.layout.qHyperCube.qMeasureInfo.length 
						; iMeasureIndex1 ++	// メジャーがインクリメントされる 
					){// メジャー分ループ
						let oMeasProps;
						oMeasProps = new Object();
						oMeasProps.sMeasBGColor = 'white';
						oMeasProps.sMeasFontColor = 'black';
						oMeasProps.bBlink = false;
						oMeasProps.sMeasName = $scope.layout.qHyperCube.qMeasureInfo[iMeasureIndex1];
				
						// ディメンション分ループ
						var aryDimProps = [];
						for( var iy1=0 ; iy1 < $scope.aryDim1.length  && $scope.aryDim1.length > 0 ; iy1++ ){
							let oDimProps;
							oDimProps = new Object();
							oDimProps.sMeasBGColor = 'white';
							oDimProps.sMeasFontColor = 'black';
							oDimProps.bBlink = false;
							oDimProps.sDimName = myStringCast( $scope.layout.qHyperCube.qDataPages[ 0 ].qMatrix[iy1][0].qText , "");
							aryDimProps.push( oDimProps );
						} // <<< for( var iy1=0 ; iy1 <
						
						oMeasProps.aryDimProps = aryDimProps;
						G_aryMeasProps.push( oMeasProps )	;
						
					} // <<< for( var iMeasureIndex1=0 
				} // <<< else	


				if(G_bDegubMode)console.log('set2ndCubeProps: G_aryMeasProps after reading all dimesions and measures ',$scope.G_aryMeasProps);


		if(G_bDegubMode)console.log('■<<<■set2ndCubeProps end<<<');

		G_bInitOK = true;// 準備完了
		return G_bInitOK;
	}// <<<$scope.setPropAry = function()

				





	// --------------------------------------------------------------------------------------------
	// --------------------------------------------------------------------------------------------
	// --------------------------------------------------------------------------------------------
	// --------------------------------------------------------------------------------------------
	// --------------------------------------------------------------------------------------------
	// --------------------------------------------------------------------------------------------
	// --------------------------------------------------------------------------------------------
	function makeTopHeader(){
		var sHTML ="";
	
		var nBorderWidth = 1 * $scope.prop_nLineWidthMagnification1;
		var nBorderMiddleWidth = 1 * $scope.prop_nLineWidthMagnification1;

		// Lv2
		if( $scope.prop_nHeaderWidth0 > 0 ){
			sHTML += "<td style=' ' > </td>";
		}
		// Lv1
		if( $scope.prop_nHeaderWidth1 > 0 ){
			sHTML += "<td style='text-align:center;  '> </td>";
		}
		// ヘッダ列ループ $scope.prop_nRowBreak1
		if( $scope.prop_nHeaderWidth2 > 0 ){
			// メジャーのセット
			sHTML += "<td colspan=" + (2 * $scope.prop_nRowBreak1) + " bgcolor=" + $scope.prop_sHeaderBGC1 
				+ " style='text-align:center; border-left: "+nBorderWidth+"px solid "+$scope.prop_sLineColorHeader1+"; border-top: "+nBorderWidth+"px solid "+$scope.prop_sLineColorHeader1+"; border-bottom: 0px solid "+$scope.prop_sLineColorHeader1+"; ' ><p style='font-weight:bold; color:"
				+ $scope.prop_sHeaderFGC2 + "; font-size:" + $scope.prop_nFontSize4 + "px; '>"+$scope.prop_TopTotalHeaderText+"</p></td>"; 
		}
		else{
			// メジャーのセット
			sHTML += "<td colspan=" + (1 * $scope.prop_nRowBreak1) + " bgcolor=" + $scope.prop_sHeaderBGC1 
				+ " style='text-align:center; border-left: "+nBorderWidth+"px solid "+$scope.prop_sLineColorHeader1+"; border-top: "+nBorderWidth+"px solid "+$scope.prop_sLineColorHeader1+"; border-bottom: 0px solid "+$scope.prop_sLineColorHeader1+"; ' ><p style='font-weight:bold; color:"
				+ $scope.prop_sHeaderFGC2 + "; font-size:" + $scope.prop_nFontSize4 + "px; '>"+$scope.prop_TopTotalHeaderText+"</p></td>"; 
		}
		// 真ん中お尻						
		sHTML += "<td style='width: "+($scope.prop_nLineWidthMagnification1*2)+"px; border-left:"+nBorderWidth+"px solid "+$scope.prop_sLineColorHeader1+";'><p> </p></td>";



		return sHTML;
	}


	// --------------------------------------------------------------------------------------------
	// --------------------------------------------------------------------------------------------
	// --------------------------------------------------------------------------------------------
	// --------------------------------------------------------------------------------------------
	// --------------------------------------------------------------------------------------------
	// --------------------------------------------------------------------------------------------
	// --------------------------------------------------------------------------------------------
	function makeDimHeader( iDim1 ){
		var sHTML ="";

		var nBorderWidth = 1 * $scope.prop_nLineWidthMagnification1;
		var nBorderMiddleWidth = 1 * $scope.prop_nLineWidthMagnification1;



		// ディメンションヘッダ
		var sColSpan22 = "";
		if( ! $scope.prop_bVerticalDimension ){
		
			if( $scope.prop_nRowBreak1 > 1  ){ // 改行する場合、
				if( $scope.prop_nHeaderWidth2 > 0 ){ // かつ、項目び幅が０じゃない場合、のみColSpan変更
					sColSpan22 = " colspan=" + ($scope.prop_nRowBreak1 * $scope.prop_nMeasureCols ) + " ";
				}
				else{
					sColSpan22 = " colspan=" + ($scope.prop_nRowBreak1  ) + " ";
				}// <<< 改行する場合、
			}
			else{
				if( $scope.prop_nHeaderWidth2 > 0 ){ // かつ、項目び幅が０じゃない場合、のみColSpan変更
					sColSpan22 = " colspan=" + ($scope.prop_nMeasureCols ) + " ";
				}
				else{
					sColSpan22 = " colspan=" + ($scope.prop_nRowBreak1  ) + " ";
				}// <<< 改行する場合、
			}
		}
		else{
			sColSpan22 = " colspan=1 rowspan=99 ";
		}
		// 
		var iy1;
		iy1 = 0;
		while( iy1 < $scope.aryDim1.length  && $scope.aryDim1.length > 0 ){// ディメンションが一つある場合
		
			var sVLineMeasName4,sVLineMeasValue4;// 縦罫線の種類
			if( $scope.prop_sLineV1 == "none" ){// 縦罫線
				sVLineMeasName4 = ""; // 縦罫線
				sVLineMeasValue4 ="";
			}
			//
			{// dimension
				var sVKindOfLine = " solid ";
				if( $scope.prop_nHeaderWidth2 > 0 && $scope.prop_nMeasureCols >=2 ){
					nBorderMiddleWidth = 1 * $scope.prop_nLineWidthMagnification1;
					sVKindOfLine = " double ";
				}
				else{
					nBorderMiddleWidth = 1 * $scope.prop_nLineWidthMagnification1;
					sVKindOfLine = " solid ";
				}
			
				sVLineMeasName4 = " border-left: "+nBorderMiddleWidth+"px "+sVKindOfLine+" " + $scope.prop_sLineColorHeader1 
					+ "; border-right: 0px solid " +$scope.prop_sLineColorHeader1 
					+ "; border-top: "+nBorderWidth+"px solid " +$scope.prop_sLineColorHeader1;
				if( $scope.prop_nRowBreak1 > 1  ){ // 改行する場合、
					sVLineMeasName4 += "; border-bottom: "+0+"px solid " +$scope.prop_sLineColorHeader1 ;
				}
				else{
					sVLineMeasName4 += "; border-bottom: "+nBorderWidth+"px solid " +$scope.prop_sLineColorHeader1 ;
				}
				sVLineMeasName4 += "; "; // 縦罫線
				sVLineMeasValue4 = " border-left: "+nBorderMiddleWidth+"px "+sVKindOfLine+" " +$scope.prop_sLineColorHeader1+ "; "; // 縦罫線
			}
		
			if( $scope.prop_bVerticalDimension ){
				sVLineMeasName4 = " border: "+nBorderMiddleWidth+"px solid " +$scope.prop_sLineColorHeader1+ "; "; // 縦罫線
			}


			if( iDim1 == iy1 ){// 読み込むディメンションとスキップするディメンションの判断
				sHTML += "<td " + sColSpan22 + " bgcolor=" + $scope.prop_sHeaderBGC2 + " style='text-align:center; " + sVLineMeasName4 + "  '>";
				if( G_bUseButton ){// AngularJSで推奨されない動的なボタンを使う。ずっと動くか保証はない
				    //  ボタンでディメンションを押せるようにする
					sHTML += "<button id='maruSelect" + (iDim1) + "' onclick='innerclickSelect1(" + ($scope.G_sRandomKey) + ", " + (iDim1) + ")'" 
						+ " style='width: " + $scope.prop_nHeaderWidth3 + "px; padding: 0px; background: transparent; border: 0 dotted white; border-color: rgba(255,125,212,0.5); cursor: pointer; font-weight:bold; color:" + $scope.prop_sHeaderFGC2 + "; font-size:" + $scope.prop_nFontSize4 + "px;'>";
					sHTML += $scope.aryDim1[iDim1].sElmNameOfDim;

					sHTML += "</button>";
				}
				else{
					sHTML += "<p style='font-weight:bold; color:" + $scope.prop_sHeaderFGC2 + "; font-size:" + $scope.prop_nFontSize4 + "px; '>";
					sHTML += $scope.aryDim1[iDim1].sElmNameOfDim;
					sHTML += "</p>";
				}
				sHTML += "</td>";

				
				
			}
			iy1 = iy1 + 1;
		}
		// 右端お尻						
		if( ! $scope.prop_bVerticalDimension ){
			sHTML += "<td style='width: 1px; border-left:"+nBorderWidth+"px solid "+$scope.prop_sLineColorHeader1+";'><p> </p></td>";
		}
		else{
			sHTML += "<td style='width: 1px; border-left:0px solid "+$scope.prop_sLineColorHeader1+";'><p> </p></td>";
		}

		return sHTML;
	}
	// --------------------------------------------------------------------------------------------
	// --------------------------------------------------------------------------------------------
	// --------------------------------------------------------------------------------------------
	// --------------------------------------------------------------------------------------------
	// --------------------------------------------------------------------------------------------
	// --------------------------------------------------------------------------------------------
	// --------------------------------------------------------------------------------------------
	// 2行目ヘッダ　メジャーのヘッダ
	function makeMeasureHeader( sMode1 /*grand dimension */, iDim1 /*ディメンションインデックス*/){
		var sHTML ="";


		var nBorderWidth = 1 * $scope.prop_nLineWidthMagnification1;
		var nBorderMiddleWidth = 1 * $scope.prop_nLineWidthMagnification1;

		if( sMode1 == "grand" || $scope.prop_bVerticalDimension ){// グランドのみ表示
			// Lv2
			if( $scope.prop_nHeaderWidth0 > 0 ){
				sHTML += "<td  bgcolor=" + $scope.prop_sHeaderBGC1 
					+ " style='text-align:center;  border-left: "+nBorderWidth+"px solid "+$scope.prop_sLineColorHeader1+";  border-bottom: "+nBorderWidth+"px solid "+$scope.prop_sLineColorHeader1+";  border-top: "+nBorderWidth+"px solid "+$scope.prop_sLineColorHeader1+"; '><p style='font-weight:bold; color:" 
					+ $scope.prop_sHeaderFGC1 + "; font-size:" + $scope.prop_nFontSize5 + "px; '>" + $scope.layout.settings.sHeaderText0
					+ "</p></td>";
			}
			// Lv1
			if( $scope.prop_nHeaderWidth1 > 0 ){
				sHTML += "<td  bgcolor=" + $scope.prop_sHeaderBGC1 
					+ " style='text-align:center; border-left:"+nBorderWidth+"px solid "+$scope.prop_sLineColorHeader1+";  border-bottom: "+nBorderWidth+"px solid "+$scope.prop_sLineColorHeader1+";  border-top: "+nBorderWidth+"px solid "+$scope.prop_sLineColorHeader1+"; '><p style='font-weight:bold; color:" 
					+ $scope.prop_sHeaderFGC1 + "; font-size:" + $scope.prop_nFontSize5 + "px; '>" + $scope.layout.settings.sHeaderText1
					+ "</p></td>";
			}
		}

//$scope.sDEBUG += " nRowBreak1=" + $scope.prop_nRowBreak1 + " /";
					
		// ヘッダ列ループ nRowBreak1
		for( var iMCol1=0 ; iMCol1 < $scope.prop_nRowBreak1 ; iMCol1++ ){
		
		
			var sVLineMeasName4,sVLineMeasValue4;// 縦罫線の種類
			if( $scope.prop_sLineV1 == "none" ){// 縦罫線
				sVLineMeasName4 = ""; // 縦罫線
				sVLineMeasValue4 ="";
			}
			//
			if( sMode1 == "grand" ){
				if( $scope.prop_nHeaderWidth2 > 0 ){
					sVLineMeasName4 = " border-left: "+nBorderMiddleWidth+"px double " + $scope.prop_sLineColorHeader1 + "; "; // 縦罫線
					sVLineMeasValue4 = " border-left: "+nBorderWidth+"px " + $scope.prop_sLineV1 + " " + $scope.prop_sLineColorHeader1 + "; "; // 
				}
				else if( iMCol1 > 0 ){
					sVLineMeasValue4 = " border-left: "+nBorderMiddleWidth+"px double " + $scope.prop_sLineColorHeader1 + "; "; // 縦罫線
				}
				else{
					sVLineMeasValue4 = " border-left: "+nBorderMiddleWidth+"px solid " + $scope.prop_sLineColorHeader1 + "; "; // 縦罫線
				}
			}
			else{// dimension
				var sVKindOfLine = " solid ";
				if( $scope.prop_nHeaderWidth2 > 0 && ( $scope.prop_nMeasureCols >=2  || $scope.prop_bVerticalDimension ) ){
					nBorderMiddleWidth = 1 * $scope.prop_nLineWidthMagnification1;
					sVKindOfLine = " double ";
				}
				else if( iMCol1 > 0 ){
					nBorderMiddleWidth = 1 * $scope.prop_nLineWidthMagnification1;
					sVKindOfLine = " double ";
				}
				
				if( $scope.prop_nHeaderWidth2 > 0 && ( $scope.prop_nMeasureCols >= 2 || $scope.prop_bVerticalDimension ) ){
					sVLineMeasName4 = " border-left: "+nBorderMiddleWidth+"px "+sVKindOfLine+" " + $scope.prop_sLineColorHeader1 + "; "; // 縦罫線
					sVLineMeasValue4 = " border-left: "+nBorderWidth+"px " + $scope.prop_sLineV1 + " " + $scope.prop_sLineColorHeader1 + "; "; // 
				}
				else{
					if( iMCol1==0 ){
						sVLineMeasValue4 = " border-left: "+nBorderMiddleWidth+"px "+sVKindOfLine+" " + $scope.prop_sLineColorHeader1 + "; "; // 縦罫線
					}
					else{
						sVLineMeasValue4 = " border-left: "+nBorderWidth+"px " + sVKindOfLine + " " + $scope.prop_sLineColorHeader1 + "; "; // 
					}
				}
			}
		
		
			// メジャー名
			if( ( $scope.prop_nHeaderWidth2 > 0 && sMode1 == "grand" ) 
				|| ( $scope.prop_nHeaderWidth2 > 0 && ( $scope.prop_nMeasureCols >= 2 || $scope.prop_bVerticalDimension ) ) ){
				sHTML += "<td bgcolor=" + $scope.prop_sHeaderBGC1 
					+ " style='text-align:center; " + sVLineMeasName4 + " border-top:"+nBorderWidth+"px solid "+$scope.prop_sLineColorHeader1+"; border-bottom:"+nBorderWidth+"px solid "+$scope.prop_sLineColorHeader1+";'>" 
					+ "<p style='font-weight:bold; color:" 
					+ $scope.prop_sHeaderFGC1 + "; font-size:" + $scope.prop_nFontSize5 + "px; '>" + $scope.layout.settings.sHeaderText2
					+ "</p></td>";
			}

			// メジャー値
			var sMeasureValueHeaderBGC = $scope.prop_sHeaderBGC2; // メジャー値のヘッダーは、Measure Groupの背景色を踏襲する
			var nCountColspanIdx = 0;// 現在のColspanのインデックスを調べる
			for( var i45 = 0 ; i45<=iMCol1 && i45<10/*永久ループ防止*/ ; i45++ ){
				if( i45 >= $scope.aryColspan[nCountColspanIdx].RangesumCS ){
					nCountColspanIdx ++ ;
				}
			}
			sMeasureValueHeaderBGC = $scope.aryColspan[nCountColspanIdx].sColspanBGC; 

			sHTML += "<td bgcolor=" + sMeasureValueHeaderBGC 
				+ " style='text-align:center; " + sVLineMeasValue4 + " border-top:"+nBorderWidth+"px solid "+$scope.prop_sLineColorHeader1+"; border-bottom:"+nBorderWidth+"px solid "+$scope.prop_sLineColorHeader1+"; '>"
				+ "<p style='font-weight:bold; color:" 
				+ $scope.prop_sHeaderFGC2 + "; font-size:" + $scope.prop_nFontSize5 + "px; '>" + $scope.prop_aryTotalHeaderText[iMCol1] + "</p></td>";

		}	// <<< for( var iMCol1 
	
		if( sMode1 == "grand" ){// グランドのみ表示
			// 真ん中お尻						
			sHTML += "<td style='width: "+($scope.prop_nLineWidthMagnification1*2)+"px; border-left:"+nBorderWidth+"px solid "+$scope.prop_sLineColorHeader1+";'><p> </p></td>";
		}
		else{// ディメンションのみ表示
			// 右端お尻						
			sHTML += "<td style='width: "+($scope.prop_nLineWidthMagnification1*2)+"px; border-left:"+nBorderWidth+"px solid "+$scope.prop_sLineColorHeader1+";'><p> </p></td>";
		}
		
		
		return sHTML;
	}
	
	// --------------------------------------------------------------------------------------------
	// --------------------------------------------------------------------------------------------
	// --------------------------------------------------------------------------------------------
	// --------------------------------------------------------------------------------------------
	// --------------------------------------------------------------------------------------------
	// --------------------------------------------------------------------------------------------
	// --------------------------------------------------------------------------------------------
	// メジャーグループのヘッダ
	function makeMeasureGroup( sMode1 /*grand dimension */, iDim1 /*ディメンションインデックス*/){
		var sHTML ="";


		var nBorderWidth = 1 * $scope.prop_nLineWidthMagnification1;
		var nBorderMiddleWidth = 1 * $scope.prop_nLineWidthMagnification1;



		if( sMode1 == "grand" || $scope.prop_bVerticalDimension ){// グランドのみ表示
			// Lv2
			if( $scope.prop_nHeaderWidth0 > 0 ){
				sHTML += "<td style=' ' > </td>";
			}
			// Lv1
			if( $scope.prop_nHeaderWidth1 > 0 ){
				sHTML += "<td style='text-align:center;  '> </td>";
			}
		}
		
		// M
		for( var iMCol1=0 , iRunsumColspan=0 ; iMCol1 < $scope.prop_nRowBreak1 && iRunsumColspan < $scope.prop_nRowBreak1 ; iMCol1++ ){
			var nColspanHead1 = $scope.aryColspan[iMCol1].nColspan;
			// Colspan メジャー名とメジャー値は一緒くた
			var nBairitsu = 1;


			var sVKindOfLine = " solid ";
			if( iMCol1==0 ){
				sVKindOfLine = " solid ";
			}
			else{
				sVKindOfLine = " double ";
			}

			var sVLineMeasValue4;// 縦罫線の種類
			if( $scope.prop_sLineV1 == "none" ){// 縦罫線
				sVLineMeasValue4 ="";
			}
			//
			if( sMode1 == "grand" ){
				sVLineMeasValue4 = " border-left: "+nBorderMiddleWidth+"px "+sVKindOfLine+" " +$scope.prop_sLineColorHeader1+ "; "; // 縦罫線
			}
			else{// dimension
				//
				if( $scope.prop_nHeaderWidth2 > 0 && ( $scope.prop_nMeasureCols >= 2 || $scope.prop_bVerticalDimension ) ){
					sVLineMeasValue4 = " border-left: "+nBorderWidth+"px " + sVKindOfLine + " " + $scope.prop_sLineColorHeader1 + "; "; // 
				}
				else{
					if( iMCol1==0 ){
						sVLineMeasValue4 = " border-left: "+nBorderMiddleWidth+"px "+sVKindOfLine+" " +$scope.prop_sLineColorHeader1+ "; "; // 縦罫線
					}
					else{
						sVLineMeasValue4 = " border-left: "+nBorderWidth+"px " + sVKindOfLine + " " + $scope.prop_sLineColorHeader1 + "; "; // 
					}
				}
			}


			if( sMode1 == "grand" || $scope.prop_bVerticalDimension ){// グランドの場合
				if( $scope.prop_nHeaderWidth2 > 0 ){
					nBairitsu = 2 ;
				}
				sHTML += "<td colspan=" + nColspanHead1 * nBairitsu + " bgcolor=" + $scope.aryColspan[iMCol1].sColspanBGC  
					+ " style='text-align: " +$scope.aryColspan[iMCol1].sAlign + "; " + sVLineMeasValue4 + " "+$scope.prop_sLineColorHeader1+"; border-top:"+nBorderWidth+"px solid "+$scope.prop_sLineColorHeader1+"; border-bottom:0px solid "+$scope.prop_sLineColorHeader1+";'>" 
					+ "<p style='font-weight:bold; color:" 
					+ $scope.prop_sHeaderFGC2 + "; font-size:" + $scope.prop_nFontSize5 + "px; '>" + $scope.aryColspan[iMCol1].sColspanText
					+ "</p></td>";
			}
			else{// ディメンションの場合
				if( $scope.prop_nHeaderWidth2 > 0 || $scope.prop_bVerticalDimension ){
					nBairitsu *= $scope.prop_nMeasureCols;
				}
				if( iMCol1 == 0 ){// ディメンションの切り替えでなおかつ、メジャー項目が隠されている場合は、メジャー値が 2重太線
					sHTML += "<td colspan=" + nColspanHead1 * nBairitsu + " bgcolor=" + $scope.aryColspan[iMCol1].sColspanBGC 
						+ " style='text-align:"+$scope.aryColspan[iMCol1].sAlign+"; " + sVLineMeasValue4 + " "+$scope.prop_sLineColorHeader1+"; border-top:"+nBorderWidth+"px solid "+$scope.prop_sLineColorHeader1+"; border-bottom:0px solid "+$scope.prop_sLineColorHeader1+";'>" 
						+ "<p style='font-weight:bold; color:" 
						+ $scope.prop_sHeaderFGC2 + "; font-size:" + $scope.prop_nFontSize5 + "px; '>" + $scope.aryColspan[iMCol1].sColspanText
						+ "</p></td>";
				}
				else{
					sHTML += "<td colspan=" + nColspanHead1 * nBairitsu + " bgcolor=" + $scope.aryColspan[iMCol1].sColspanBGC 
						+ " style='text-align:"+$scope.aryColspan[iMCol1].sAlign+"; " + sVLineMeasValue4 + " "+$scope.prop_sLineColorHeader1+"; border-top:"+nBorderWidth+"px solid "+$scope.prop_sLineColorHeader1+"; border-bottom:0px solid "+$scope.prop_sLineColorHeader1+";'>" 
						+ "<p style='font-weight:bold; color:" 
						+ $scope.prop_sHeaderFGC2 + "; font-size:" + $scope.prop_nFontSize5 + "px; '>" + $scope.aryColspan[iMCol1].sColspanText
						+ "</p></td>";
				}

			}

			iRunsumColspan += nColspanHead1;
		}// for( var iMCol1=0 , iRunsumColspan=

		if( sMode1 == "grand" ){// グランドのみ表示
			// 真ん中お尻						
			sHTML += "<td style='width: "+($scope.prop_nLineWidthMagnification1*2)+"px; border-left:"+nBorderWidth+"px solid "+$scope.prop_sLineColorHeader1+";'><p> </p></td>";
		}
		else{// ディメンションのみ表示
			// 右端お尻						
			sHTML += "<td style='width: "+($scope.prop_nLineWidthMagnification1*2)+"px; border-left:"+nBorderWidth+"px solid "+$scope.prop_sLineColorHeader1+";'><p> </p></td>";
		}

		return sHTML;
	}

//	// --------------------------------------------------------------------------------------------
//	// --------------------------------------------------------------------------------------------
//	// --------------------------------------------------------------------------------------------
//	// --------------------------------------------------------------------------------------------
//	// --------------------------------------------------------------------------------------------
//	// --------------------------------------------------------------------------------------------
//	// --------------------------------------------------------------------------------------------
//	function makeMatrix( sMode1 /*grand dimension */, iDim1 /*ディメンションインデックス*/
//		, iMeasureIndex1, iRowspanLv1, iRowspanLv2, iCurrentRow1 ,iRangesumRowspanLv1, iRangesumRowspanLv2 
//	){
//		var sHTML ="";
//
//		var nBorderWidth = 1 * $scope.prop_nLineWidthMagnification1;
//		var nBorderMiddleWidth = 1 * $scope.prop_nLineWidthMagnification1;
//
//		var sBdBottom3="";
//		if( $scope.prop_sLineHorizon1 == "none" ){// 横罫線
//			sBdBottom3 = ""; // 横罫線
//		}
//		else{
//			sBdBottom3 = " border-bottom: "+nBorderWidth+"px " + $scope.prop_sLineHorizon1 + " "+$scope.prop_sLineColorGrid1+"; "; // 横罫線
//		}
//		
//		if( G_aryMeasProps.length - iMeasureIndex1 < $scope.prop_nRowBreak1 + 1 ){// 最終行
//			sBdBottom3 = " border-bottom: "+nBorderWidth+"px solid "+$scope.prop_sLineColorGrid1+"; "; // 横罫線
//		}
//
//		if( iCurrentRow1 == G_aryMeasProps.length -1 || iCurrentRow1 == $scope.aryLv1[iRowspanLv1].RangesumRS-1 ){// アンダーラインが絶対に必要
//			sBdBottom3 = " border-bottom:"+nBorderWidth+"px solid "+$scope.prop_sLineColorGrid1+"; ";
//		}
//		if( sMode1 == "grand" || $scope.prop_bVerticalDimension ){// グランドのみ表示
//			// 大区分
//			if( iRangesumRowspanLv2 < $scope.aryLv2[iRowspanLv2].RangesumRS ){
//				if( $scope.prop_nHeaderWidth0 > 0 ){
//					sHTML += "<td rowspan=" + $scope.aryLv2[iRowspanLv2].Rowspan + " bgcolor=" + $scope.aryLv2[iRowspanLv2].BGC ;
//					sHTML +=  " style='text-align:" + $scope.aryLv2[iRowspanLv2].Align + "; border-left: "+nBorderWidth+"px solid "+$scope.prop_sLineColorGrid1+"; border-top: 0px solid "+$scope.prop_sLineColorGrid1+"; border-right: 0px solid "+$scope.prop_sLineColorGrid1+"; border-bottom: "+nBorderWidth+"px solid "+$scope.prop_sLineColorGrid1+";" ;
//					sHTML +=  " vertical-align:"+ $scope.aryLv2[iRowspanLv2].VertiAlign ;
//					sHTML +=  "; '><p style='" + $scope.prop_styleWritingMode1 + " padding:0px 0px 0px 0px; font-weight:bold; font-size:" ;
//					sHTML +=  $scope.prop_nFontSize1 + "px; color:"+ $scope.aryLv2[iRowspanLv2].FGC +"' >" ;
//					sHTML +=  $scope.aryLv2[iRowspanLv2].RowName +"</p></td>" ;
//				}
//			}
//			// 合計科目
//			// 点滅条件
//			var sBlink="";
//			if( $scope.aryLv1[iRowspanLv1].Blink ){
//				sBlink = " class='blink' ";
//			}
//			
//			if( iRangesumRowspanLv1 < $scope.aryLv1[iRowspanLv1].RangesumRS ){
//				if( $scope.prop_nHeaderWidth1 > 0 ){
//					sHTML += "<td "+ sBlink +" rowspan=" + $scope.aryLv1[iRowspanLv1].Rowspan + " bgcolor=" + $scope.aryLv1[iRowspanLv1].BGC ;
//					sHTML += " style='text-align:" + $scope.aryLv1[iRowspanLv1].Align + "; border-left: "+nBorderWidth+"px solid "+$scope.prop_sLineColorGrid1+"; border-top: 0px solid "+$scope.prop_sLineColorGrid1+"; border-bottom: "+nBorderWidth+"px solid "+$scope.prop_sLineColorGrid1+"; border-right: 0px solid "+$scope.prop_sLineColorGrid1+"; " ;
//					sHTML +=  " vertical-align:"+ $scope.aryLv1[iRowspanLv1].VertiAlign ;
//					sHTML +=  ";'><p style='font-weight:bold; font-size:" + $scope.prop_nFontSize1 + "px; color:"+ $scope.aryLv1[iRowspanLv1].FGC +"' >" ;
//					sHTML +=  $scope.aryLv1[iRowspanLv1].RowName +"</p></td>";
//				}
//			}
//		} // <<< sMode1
//
//
//
//		var sSummaryLineMeasNameAlign = $scope.prop_sMeasureNameAlign1; // メジャー値のAlign
//		var sSummaryLineBorderMeasName,sSummaryLineBorderMeasValue,sMeasureNameFont1,sMeasureValueFont2;
//		sSummaryLineBorderMeasName="";
//		sMeasureNameFont1="font-weight:normal; color:black; ";
//		sMeasureValueFont2="font-weight:normal; color:black; ";
//		sSummaryLineBorderMeasValue=" text-align: right; ";
//
//		// 最終行の場合は下に線
//		if( iMeasureIndex1 + $scope.prop_nRowBreak1 >= G_aryMeasProps.length ){
//			sSummaryLineBorderMeasName = " border-bottom:"+nBorderWidth+"px solid "+$scope.prop_sLineColorGrid1+"; ";
//			sSummaryLineBorderMeasValue = " border-bottom:"+nBorderWidth+"px solid "+$scope.prop_sLineColorGrid1+"; ";
//		}
//
//		if( $scope.aryLv1[iRowspanLv1].Summary ){// 横線
//			sSummaryLineBorderMeasName = " border-top:"+nBorderWidth+"px solid "+$scope.prop_sLineColorGrid1+"; border-bottom:"+nBorderWidth+"px solid "+$scope.prop_sLineColorGrid1+"; ";
//			sSummaryLineBorderMeasValue = " border-top:"+nBorderWidth+"px solid "+$scope.prop_sLineColorGrid1+"; border-bottom:"+nBorderWidth+"px solid "+$scope.prop_sLineColorGrid1+"; ";
//		}
//
//		if( $scope.aryLv1[iRowspanLv1].StandOut ){// 色帯＋太字
//			sSummaryLineBorderMeasName += "background-color:" + $scope.aryLv1[iRowspanLv1].BGC + "; ";
////			sSummaryLineBorderMeasValue += "background-color:" + $scope.aryLv1[iRowspanLv1].BGC + "; ";
//			sSummaryLineMeasNameAlign = $scope.aryLv1[iRowspanLv1].Align;
//			sMeasureNameFont1 = "font-weight:bold; color:"+ $scope.aryLv1[iRowspanLv1].FGC +"; ";
//			sMeasureValueFont2 = "font-weight:bold; color:"+ $scope.aryLv1[iRowspanLv1].FGC +"; ";
//		}
//
//
//
//		var sVKindOfLine = " solid ";
//		if( $scope.prop_nHeaderWidth2 > 0 && ( $scope.prop_nMeasureCols >=2 || $scope.prop_bVerticalDimension ) ){
//			nBorderMiddleWidth = 1 * $scope.prop_nLineWidthMagnification1;
//			sVKindOfLine = " double ";
//		}
//		else{
//			nBorderMiddleWidth = 1 * $scope.prop_nLineWidthMagnification1;
//			sVKindOfLine = " solid ";
//		}
//
//		// 中身列ループ $scope.prop_nRowBreak1
//		for( var iMCol1=0 ; iMCol1 < $scope.prop_nRowBreak1  ; iMCol1++ ){
//			if( iMCol1 < $scope.prop_nRowBreak1 && iMeasureIndex1 + iMCol1 < G_aryMeasProps.length ){
//			
//				var nInnerMeasureIndex = (iMeasureIndex1 + iMCol1);
//
//				var sVLineMeasName4,sVLineMeasValue4;// 縦罫線の種類
//				if( $scope.prop_sLineV1 == "none" ){// 縦罫線
//					sVLineMeasName4 = ""; // 縦罫線
//					sVLineMeasValue4 ="";
//				}
//				//
//				if( sMode1 == "grand" ){
//					if( $scope.prop_nHeaderWidth2 > 0 ){
//						sVLineMeasName4 = " border-left: "+nBorderMiddleWidth+"px double "+$scope.prop_sLineColorGrid1+"; "; // 縦罫線
//						sVLineMeasValue4 = " border-left: "+nBorderWidth+"px " + $scope.prop_sLineV1 + " "+$scope.prop_sLineColorGrid1+"; "; // 
//					}
//					else{
//						sVLineMeasValue4 = " border-left: "+nBorderMiddleWidth+"px double "+$scope.prop_sLineColorGrid1+"; "; // 縦罫線
//					}
//				}
//				else{// dimension
//					if( $scope.prop_nHeaderWidth2 > 0 && ( $scope.prop_nMeasureCols >= 2 || $scope.prop_bVerticalDimension ) ){
//						sVLineMeasName4 = " border-left: "+nBorderMiddleWidth+"px "+sVKindOfLine+" "+$scope.prop_sLineColorGrid1+"; "; // 縦罫線
//						sVLineMeasValue4 = " border-left: "+nBorderWidth+"px " + $scope.prop_sLineV1 + " "+$scope.prop_sLineColorGrid1+"; "; // 
//					}
//					else{
//						if( iMCol1==0 ){
//							sVLineMeasValue4 = " border-left: "+nBorderMiddleWidth+"px "+sVKindOfLine+" "+$scope.prop_sLineColorGrid1+"; "; // 縦罫線
//						}
//						else{
//							sVLineMeasValue4 = " border-left: "+nBorderWidth+"px double "+$scope.prop_sLineColorGrid1+"; "; // 
//						}
//					}
//				}
//
//
//
//
//
//				// メジャーのプロパティによってアラート（フォントの色や背景色を変化させる）
//
//
////$scope.sDEBUG += " iMeasureIndex1=" + iMeasureIndex1 + " <hr> ";
////$scope.sDEBUG += " iMCol1=" + iMCol1 + " <hr> ";
//
//				var sMeasBGColor="";
//				var sMeasFontColor="";
//				var sMeasBlink = "";
////$scope.sDEBUG += " G_aryMeasProps.length " + G_aryMeasProps.length + " <hr> ";
////$scope.sDEBUG += " sMode1=" + sMode1 + " <hr> ";
//
//				if( sMode1 == "grand" ){// グランドの場合
////$scope.sDEBUG += " grandメジャーの背景色 " + G_aryMeasProps[ iMeasureIndex1+ iMCol1 ].sMeasBGColor + " / "
////$scope.sDEBUG += " grandメジャーのフォント色 " + G_aryMeasProps[ iMeasureIndex1 + iMCol1 ].sMeasFontColor + " / "
//
//					
//					// それぞれのメジャーのプロパティが存在するかチェック必要。配列なので長さをチェックする。
//					sMeasBGColor = myColorCast( G_aryMeasProps[ nInnerMeasureIndex ].sMeasBGColor , 'white' );
////$scope.sDEBUG += "Bg:"+	sMeasBGColor;
//
//					sMeasFontColor = myColorCast( G_aryMeasProps[ nInnerMeasureIndex ].sMeasFontColor , 'black' );
////$scope.sDEBUG += "Font:"+	sMeasFontColor;
//
//					if( G_aryMeasProps[ nInnerMeasureIndex ].bBlink ){
//						sMeasBlink = " class='blink' ";
//					}
//
//				}
//				else{// ディメンション毎に評価する必要がある場合
//					// それぞれのメジャーのプロパティが存在するかチェック必要。配列なので長さをチェックする。
//					sMeasBGColor = myColorCast( G_aryMeasProps[ nInnerMeasureIndex ].aryDimProps[ iDim1 ].sMeasBGColor , 'white' );
//					sMeasFontColor = myColorCast( G_aryMeasProps[ nInnerMeasureIndex ].aryDimProps[ iDim1 ].sMeasFontColor , 'black' );
//					if( G_aryMeasProps[ nInnerMeasureIndex ].aryDimProps[ iDim1 ].bBlink ){
//						sMeasBlink = " class='blink' ";
//					}
//				}
//				
////$scope.sDEBUG += " sMeasBlink " + sMeasBlink + " <hr> ";
//				
//				
//				var sMeasNameBGColor = "white";
//				if( ! $scope.aryLv1[iRowspanLv1].StandOut ){// Stand Out Band　でなければ
//					sMeasureValueFont2 = " font-weight:normal; color:"+ sMeasFontColor +"; ";
//				}
//				else{// // Stand Out Bandの場合
//					if( sMeasBGColor.toLowerCase()=='white' ){// アラートが設定されていないと思われる
//						sMeasBGColor = $scope.aryLv1[iRowspanLv1].BGC;
//						sMeasureValueFont2 = "font-weight:bold; color:"+ $scope.aryLv1[iRowspanLv1].FGC +"; ";
//					}
//					else{// アラートが設定されていると思われる
//						sMeasNameBGColor = $scope.aryLv1[iRowspanLv1].BGC;
//						sMeasureValueFont2 = " font-weight:bold; color:"+ sMeasFontColor +"; ";
//					}
//				}
//
//
//				// Totalメジャー名 
//				if( ( $scope.prop_nHeaderWidth2 > 0 && sMode1 == "grand" ) 
//				|| ( $scope.prop_nHeaderWidth2 > 0 && ( $scope.prop_nMeasureCols >= 2 || $scope.prop_bVerticalDimension ) ) ){
//					sHTML += "<td style='background-color:" + sMeasNameBGColor + "; border-left:"+nBorderMiddleWidth+"px double "+$scope.prop_sLineColorGrid1+"; " 
//						+ sSummaryLineBorderMeasName + sBdBottom3 +" text-align:"+sSummaryLineMeasNameAlign+"; "
//						+ "' >";
//					sHTML += "<p style='" + sMeasureNameFont1 + " font-size:" + $scope.prop_nMeasureLabelFontSize + "px; ' >";
//					sHTML += $scope.layout.qHyperCube.qMeasureInfo[ nInnerMeasureIndex ].qFallbackTitle;
//					sHTML += "</p></td>";
//						
////$scope.sDEBUG += " ( $scope.layout.qHyperCube.qMeasureInfo[ nInnerMeasureIndex ].qFallbackTitle=" + $scope.layout.qHyperCube.qMeasureInfo[ nInnerMeasureIndex ].qFallbackTitle + " / "; 
////$scope.sDEBUG += " sMeasureNameFont1=" + sMeasureNameFont1 + " ) "; 
//
//					// Totalメジャー値<td>
//					sHTML += "<td " + sMeasBlink + " style=' text-align: right;  " + sSummaryLineBorderMeasValue + " " + sBdBottom3 + sVLineMeasValue4 
//						+ " background-color:" + sMeasBGColor + "; ' >";
//						
//				}
//				else if( $scope.prop_nHeaderWidth2 > 0 && sMode1 != "grand" && $scope.prop_nMeasureCols == 1 ){
//					// Totalメジャー値<td>
//					sHTML += "<td  " + sMeasBlink + " style=' text-align: right;  " + sSummaryLineBorderMeasValue + " " + sBdBottom3 + sVLineMeasValue4 
//						+ " background-color:" + sMeasBGColor + "; ' >";
//						
//				}
//				else{
//					// Totalメジャー値<td>
//					sHTML += "<td  " + sMeasBlink + " style=' text-align: right;  " + sSummaryLineBorderMeasValue + " " + sBdBottom3 + sVLineMeasValue4 
//						+ " background-color:" + sMeasBGColor + "; ' >";
//				}
//
//
//				// Totalメジャー値表示
//				if( G_bUseButton && G_aryMeasProps[ nInnerMeasureIndex ].sMeasSheetID1 != "" ){// AngularJSで推奨されない動的なボタンを使う。ずっと動くか保証はない
//				    //  桁が他のセルとずれないようにしないといけない。枠線を表示するのはやめたほうが良い
//					sHTML += "<button id='maruNavi" + (nInnerMeasureIndex) + "' onclick='innerclickNavi1(" + ($scope.G_sRandomKey) + ", " + (nInnerMeasureIndex) + ")'" 
//						+ " style='padding: 0px; background: transparent; border: 0 dotted white; border-color: rgba(255,125,212,0.5); cursor: pointer; " + sMeasureValueFont2 + " font-size:" + $scope.prop_nFontSize6 + "px;'>";
//				}
//				else{
//					sHTML += "<p style='" + sMeasureValueFont2 + " font-size:" + $scope.prop_nFontSize6 + "px;'>";
//				}
//
//				// -----------------------------------------------------------------------------------------------
//				// ハイパーキューブのメジャー値表示
//				if( sMode1 == "grand" ){// グランド
//					sHTML += $scope.layout.qHyperCube.qGrandTotalRow[ nInnerMeasureIndex ].qText;
//				}
//				else{// ディメンション
//					sHTML += $scope.layout.qHyperCube.qDataPages[ 0 ].qMatrix[iDim1][nInnerMeasureIndex+1].qText
//				}
//				// -----------------------------------------------------------------------------------------------
//				
//				
//				
//				if( G_bUseButton  && G_aryMeasProps[ nInnerMeasureIndex ].sMeasSheetID1 != "" ){// AngularJsで推奨されない動的なボタンを使う。ずっと動くか保証はない
//					sHTML += "</button></td>";
//				}
//				else{
//					sHTML += "</p></td>";
//				}
//				
//				
//			} // <<< if( iMCol1 < $scope.prop_nRowBreak1 && iMeasureIndex1 +
//			else{// お尻の半端セル
//				//
//				if( sMode1 == "grand" ){
//					if( $scope.prop_nHeaderWidth2 > 0 ){
//						sVLineMeasName4 = " border-left: "+nBorderMiddleWidth+"px double "+$scope.prop_sLineColorGrid1+"; "; // 縦罫線
//						sVLineMeasValue4 = " border-left: "+nBorderWidth+"px " + $scope.prop_sLineV1 + " "+$scope.prop_sLineColorGrid1+"; "; // 
//					}
//					else{
//						sVLineMeasValue4 = " border-left: "+nBorderMiddleWidth+"px double "+$scope.prop_sLineColorGrid1+"; "; // 縦罫線
//					}
//				}
//				else{// dimension
//				
//					if( $scope.prop_nHeaderWidth2 > 0 && ( $scope.prop_nMeasureCols >= 2 || $scope.prop_bVerticalDimension ) ){
//						sVLineMeasName4 = " border-left: "+nBorderMiddleWidth+"px "+sVKindOfLine+" "+$scope.prop_sLineColorGrid1+"; "; // 縦罫線
//						sVLineMeasValue4 = " border-left: "+nBorderWidth+"px " + $scope.prop_sLineV1 + " "+$scope.prop_sLineColorGrid1+"; "; // 
//					}
//					else{
//						if( iMCol1==0 ){
//							sVLineMeasValue4 = " border-left: "+nBorderMiddleWidth+"px "+sVKindOfLine+" "+$scope.prop_sLineColorGrid1+"; "; // 縦罫線
//						}
//						else{
//							sVLineMeasValue4 = " border-left: "+nBorderWidth+"px " + $scope.prop_sLineV1 + " "+$scope.prop_sLineColorGrid1+"; "; // 
//						}
//					}
//				}
//
//
//				// お尻の半端　Totalメジャー名 
//				if( ( $scope.prop_nHeaderWidth2 > 0 && sMode1 == "grand" ) 
//					|| ( $scope.prop_nHeaderWidth2 > 0 && ( $scope.prop_nMeasureCols >= 2 || $scope.prop_bVerticalDimension ) ) 
//				){
//					sHTML += "<td style='border-left:"+nBorderMiddleWidth+"px "+sVKindOfLine+" "+$scope.prop_sLineColorGrid1+"; " + sSummaryLineBorderMeasName 
//						+ sBdBottom3 +" text-align:"+sSummaryLineMeasNameAlign+"; "
//						+ "' ><p style='" + sMeasureNameFont1 + " font-size:" + $scope.prop_nMeasureLabelFontSize + "px; ' > ";
//					sHTML += "</p></td>";
//
//					// Totalメジャー値
//					sHTML += "<td style=' text-align: right;  " + sSummaryLineBorderMeasValue + " " + sBdBottom3 + sVLineMeasValue4 + sSummaryLineBorderMeasName
//						+ "' ><p style='" + sMeasureValueFont2 + " font-size:" 
//						+ $scope.prop_nFontSize6 + "px;'>";
//				}
//				else if( $scope.prop_nHeaderWidth2 > 0 && sMode1 != "grand" && $scope.prop_nMeasureCols == 1 ){
//					// Totalメジャー値
//					sHTML += "<td style=' text-align: right;  " + sSummaryLineBorderMeasValue + " " + sBdBottom3 + sVLineMeasValue4 
//						+ "' ><p style='" + sMeasureValueFont2 + " font-size:" 
//						+ $scope.prop_nFontSize6 + "px;'>";
//				}
//				else{
//					// Totalメジャー値
//					sHTML += "<td style=' text-align: right;  " + sSummaryLineBorderMeasValue + " " + sBdBottom3 + sVLineMeasValue4 
//						+ " border-left: "+nBorderMiddleWidth+"px double "+$scope.prop_sLineColorGrid1+"; ' ><p style='" + sMeasureValueFont2 + " font-size:" 
//						+ $scope.prop_nFontSize6 + "px;'>";
//				}
//				sHTML += "</p></td>";
//			}
//
//		}	// <<< for( var iMCol1 
//
//		if( sMode1 == "grand" ){// グランドのみ表示
//			// 真ん中お尻						
//			sHTML += "<td style='width: 1px; border-left:"+nBorderWidth+"px solid "+$scope.prop_sLineColorGrid1+";'><p> </p></td>";
//		}
//		else{// ディメンションのみ表示
//			// 右端お尻						
//			sHTML += "<td style='width: 1px; border-left:"+nBorderWidth+"px solid "+$scope.prop_sLineColorGrid1+";'><p> </p></td>";
//		}
//
//
//
////$scope.sDEBUG += " iMeasureIndex1+$scope.prop_nRowBreak1=" + (iMeasureIndex1 + $scope.prop_nRowBreak1) + " /";						
//		return sHTML;
//	}

	// --------------------------------------------------------------------------------------------
	// --------------------------------------------------------------------------------------------
	// --------------------------------------------------------------------------------------------
	// --------------------------------------------------------------------------------------------
	// --------------------------------------------------------------------------------------------
	// --------------------------------------------------------------------------------------------
	// --------------------------------------------------------------------------------------------
	function makeMatrix( sMode1 /*grand dimension */, iDim1 /*ディメンションインデックス*/
		, iMeasureIndex1, iRowspanLv1, iRowspanLv2, iCurrentRow1 ,iRangesumRowspanLv1, iRangesumRowspanLv2 
	){
		var sHTML ="";

		var nBorderWidth = 1 * $scope.prop_nLineWidthMagnification1;
		var nBorderMiddleWidth = 1 * $scope.prop_nLineWidthMagnification1;


		var sBdBottom3=" ";
		var sBdTop3=" ";
		var sBdLeftMeasName3=" ";
		var sBdLeftMeasValue3=" ";
		var sAlignMeasName3=" ";
		
		// アンダーライン
		if( $scope.prop_sLineHorizon1 == "none" ){// 横罫線
			sBdBottom3 = " "; // 横罫線
		}
		else{
			sBdBottom3 = " border-bottom: "+nBorderWidth+"px " + $scope.prop_sLineHorizon1 + " "+$scope.prop_sLineColorGrid1+"; "; // 横罫線
		}
		
		if( G_aryMeasProps.length - iMeasureIndex1 < $scope.prop_nRowBreak1 + 1 ){// 最終行
			sBdBottom3 = " border-bottom: "+nBorderWidth+"px solid "+$scope.prop_sLineColorGrid1+"; "; // 横罫線
		}

		if( iCurrentRow1 == G_aryMeasProps.length -1 || iCurrentRow1 == $scope.aryLv1[iRowspanLv1].RangesumRS-1 
			|| $scope.aryLv1[iRowspanLv1].StandOut
		){// アンダーラインが絶対に必要
			sBdBottom3 = " border-bottom:"+nBorderWidth+"px solid "+$scope.prop_sLineColorGrid1+"; ";
		}

		// トップライン
		if( $scope.aryLv1[iRowspanLv1].Summary ){// 集計行横線
			sBdTop3 = " border-top:"+nBorderWidth+"px solid "+$scope.prop_sLineColorGrid1+"; ";
		}
		if( $scope.aryLv1[iRowspanLv1].StandOut ){// 色帯＋太字
			sBdTop3	 = " border-top:"+nBorderWidth+"px solid "+$scope.prop_sLineColorGrid1+"; ";	
		}

		// レフトライン
		
		sBdLeftMeasName3 = " border-left: "+nBorderWidth+"px double "+$scope.prop_sLineColorGrid1+"; "; 

		if( $scope.prop_sLineV1 == "none" ){
			sBdLeftMeasValue3 = " "; 
		}
		else{
			sBdLeftMeasValue3 = " border-left: "+nBorderWidth+"px " + $scope.prop_sLineV1 + " "+$scope.prop_sLineColorGrid1+"; "; // 
		}

		if( $scope.prop_nHeaderWidth2 <= 0 
			|| ( $scope.prop_nMeasureCols ==1 && sMode1=="dimension" )  
		){
			sBdLeftMeasValue3 = sBdLeftMeasName3;
		}

		// アライン
		sAlignMeasName3 = " text-align: " + $scope.prop_sMeasureNameAlign1 + "; ";  // メジャー名のAlign
		if( $scope.aryLv1[iRowspanLv1].Summary || $scope.aryLv1[iRowspanLv1].StandOut ){
			sAlignMeasName3 = " text-align: " + $scope.aryLv1[iRowspanLv1].Align + "; ";
		}


		if( sMode1 == "grand" || $scope.prop_bVerticalDimension ){// グランドのみ表示
			// 大区分
			if( iRangesumRowspanLv2 < $scope.aryLv2[iRowspanLv2].RangesumRS ){
				if( $scope.prop_nHeaderWidth0 > 0 ){
					sHTML += "<td rowspan=" + $scope.aryLv2[iRowspanLv2].Rowspan + " bgcolor=" + $scope.aryLv2[iRowspanLv2].BGC ;
					sHTML +=  " style='text-align:" + $scope.aryLv2[iRowspanLv2].Align + "; border-left: "+nBorderWidth+"px solid "+$scope.prop_sLineColorGrid1+"; border-top: 0px solid "+$scope.prop_sLineColorGrid1+"; border-right: 0px solid "+$scope.prop_sLineColorGrid1+"; border-bottom: "+nBorderWidth+"px solid "+$scope.prop_sLineColorGrid1+";" ;
					sHTML +=  " vertical-align:"+ $scope.aryLv2[iRowspanLv2].VertiAlign ;
					sHTML +=  "; '><p style='" + $scope.prop_styleWritingMode1 + " padding:0px 0px 0px 0px; font-weight:bold; font-size:" ;
					sHTML +=  $scope.prop_nFontSize1 + "px; color:"+ $scope.aryLv2[iRowspanLv2].FGC +"' >" ;
					sHTML +=  $scope.aryLv2[iRowspanLv2].RowName +"</p></td>" ;
				}
			}
			// 合計科目
			// 点滅条件
			var sBlink="";
			if( $scope.aryLv1[iRowspanLv1].Blink ){
				sBlink = " class='blink' ";
			}
			
			if( iRangesumRowspanLv1 < $scope.aryLv1[iRowspanLv1].RangesumRS ){
				if( $scope.prop_nHeaderWidth1 > 0 ){
					sHTML += "<td "+ sBlink +" rowspan=" + $scope.aryLv1[iRowspanLv1].Rowspan + " bgcolor=" + $scope.aryLv1[iRowspanLv1].BGC ;
					sHTML += " style='text-align:" + $scope.aryLv1[iRowspanLv1].Align + "; border-left: "+nBorderWidth+"px solid "+$scope.prop_sLineColorGrid1+"; border-top: 0px solid "+$scope.prop_sLineColorGrid1+"; border-bottom: "+nBorderWidth+"px solid "+$scope.prop_sLineColorGrid1+"; border-right: 0px solid "+$scope.prop_sLineColorGrid1+"; " ;
					sHTML +=  " vertical-align:"+ $scope.aryLv1[iRowspanLv1].VertiAlign ;
					sHTML +=  ";'><p style='font-weight:bold; font-size:" + $scope.prop_nFontSize1 + "px; color:"+ $scope.aryLv1[iRowspanLv1].FGC +"' >" ;
					sHTML +=  $scope.aryLv1[iRowspanLv1].RowName +"</p></td>";
				}
			}
		} // <<< sMode1






		// 中身列ループ $scope.prop_nRowBreak1
		for( var iMCol1=0 ; iMCol1 < $scope.prop_nRowBreak1  ; iMCol1++ ){
			if( iMCol1 < $scope.prop_nRowBreak1 && iMeasureIndex1 + iMCol1 < G_aryMeasProps.length ){
			
				var nInnerMeasureIndex = (iMeasureIndex1 + iMCol1);

				// メジャーのプロパティによってアラート（フォントの色や背景色を変化させる）

				var sMeasBGColor="";
				var sMeasFontColor="";
				var sMeasBlink = "";

				if( sMode1 == "grand" ){// グランドの場合
					
					// それぞれのメジャーのプロパティが存在するかチェック必要。配列なので長さをチェックする。
					sMeasBGColor = myColorCast( G_aryMeasProps[ nInnerMeasureIndex ].sMeasBGColor , 'white' );

					sMeasFontColor = myColorCast( G_aryMeasProps[ nInnerMeasureIndex ].sMeasFontColor , 'black' );

					if( G_aryMeasProps[ nInnerMeasureIndex ].bBlink ){
						sMeasBlink = " class='blink' ";
					}

				}
				else{// ディメンション毎にアラートの色を評価する必要がある場合
					// それぞれのメジャーのプロパティが存在するかチェック必要。配列なので長さをチェックする。
					sMeasBGColor = myColorCast( G_aryMeasProps[ nInnerMeasureIndex ].aryDimProps[ iDim1 ].sMeasBGColor , 'white' );
					sMeasFontColor = myColorCast( G_aryMeasProps[ nInnerMeasureIndex ].aryDimProps[ iDim1 ].sMeasFontColor , 'black' );
					if( G_aryMeasProps[ nInnerMeasureIndex ].aryDimProps[ iDim1 ].bBlink ){
						sMeasBlink = " class='blink' ";
					}
				}
				
				
				var sMeasNameBGColor = "white";
				var sMeasureNameFont2 = "";
				var sMeasureValueFont2 = "";
				if( ! $scope.aryLv1[iRowspanLv1].StandOut ){// Stand Out Band　でなければ
					sMeasureNameFont2 = " font-weight:normal; color:"+ sMeasFontColor +"; ";
					sMeasureValueFont2 = " font-weight:normal; color:"+ sMeasFontColor +"; ";
				}
				else{// // Stand Out Bandの場合でも、アラートが効いてるなら塗りつぶされない
					if( sMeasBGColor == 'white' ){
						sMeasNameBGColor = $scope.aryLv1[iRowspanLv1].BGC;
						sMeasBGColor = $scope.aryLv1[iRowspanLv1].BGC;
						sMeasureNameFont2 = " font-weight:normal; color:"+ $scope.aryLv1[iRowspanLv1].FGC +"; ";
						sMeasureValueFont2 = "font-weight:bold; color:"+ $scope.aryLv1[iRowspanLv1].FGC +"; ";
					}
					else{
						sMeasNameBGColor = $scope.aryLv1[iRowspanLv1].BGC;
						sMeasureNameFont2 = " font-weight:normal; color:"+ $scope.aryLv1[iRowspanLv1].FGC +"; ";
						sMeasureValueFont2 = "font-weight:bold; color:"+ $scope.aryLv1[iRowspanLv1].FGC +"; ";
					}
				}


				// Totalメジャー名 
				if( ( $scope.prop_nHeaderWidth2 > 0 && sMode1 == "grand" ) 
					|| ( $scope.prop_nHeaderWidth2 > 0 && ( $scope.prop_nMeasureCols >= 2 || $scope.prop_bVerticalDimension ) ) 
				){
					sHTML += "<td style='background-color:" + sMeasNameBGColor + "; " + sBdLeftMeasName3 
						+ sBdBottom3 + sAlignMeasName3+"; "
						+ "' >";
					sHTML += "<p style='" + sMeasureNameFont2 + " font-size:" + $scope.prop_nMeasureLabelFontSize + "px; ' >";
					sHTML += $scope.layout.qHyperCube.qMeasureInfo[ nInnerMeasureIndex ].qFallbackTitle;
					sHTML += "</p></td>";

					// Totalメジャー値<td>
					sHTML += "<td " + sMeasBlink + " style=' text-align: right; " + sBdBottom3 + sBdLeftMeasValue3 
						+ " background-color:" + sMeasBGColor + "; ' >";
						
				}
				else if( $scope.prop_nHeaderWidth2 > 0 && sMode1 != "grand" && $scope.prop_nMeasureCols == 1 ){
					// Totalメジャー値<td>
					sHTML += "<td " + sMeasBlink + " style=' text-align: right; " + sBdBottom3 + sBdLeftMeasValue3 
						+ " background-color:" + sMeasBGColor + "; ' >";
						
				}
				else{
					// Totalメジャー値<td>
					sHTML += "<td " + sMeasBlink + " style=' text-align: right; " + sBdBottom3 + sBdLeftMeasValue3 
						+ " background-color:" + sMeasBGColor + "; ' >";
				}


				// Totalメジャー値表示
				if( G_bUseButton && G_aryMeasProps[ nInnerMeasureIndex ].sMeasSheetID1 != "" ){// AngularJSで推奨されない動的なボタンを使う。ずっと動くか保証はない
				    //  桁が他のセルとずれないようにしないといけない。枠線を表示するのはやめたほうが良い
					sHTML += "<button id='maruNavi" + (nInnerMeasureIndex) + "' onclick='innerclickNavi1(" + ($scope.G_sRandomKey) + ", " + (nInnerMeasureIndex) + ")'" 
						+ " style='padding: 0px; background: transparent; border: 0 dotted white; border-color: rgba(255,125,212,0.5); cursor: pointer; " 
						+ sMeasureValueFont2 + " font-size:" + $scope.prop_nFontSize6 + "px;'>";
				}
				else{
					sHTML += "<p style='" + sMeasureValueFont2 + " font-size:" + $scope.prop_nFontSize6 + "px;'>";
				}

				// -----------------------------------------------------------------------------------------------
				// ハイパーキューブのメジャー値表示
				if( sMode1 == "grand" ){// グランド
					sHTML += $scope.layout.qHyperCube.qGrandTotalRow[ nInnerMeasureIndex ].qText;
				}
				else{// ディメンション
					sHTML += $scope.layout.qHyperCube.qDataPages[ 0 ].qMatrix[iDim1][nInnerMeasureIndex+1].qText
				}
				// -----------------------------------------------------------------------------------------------
				
				if( G_bUseButton  && G_aryMeasProps[ nInnerMeasureIndex ].sMeasSheetID1 != "" ){// AngularJsで推奨されない動的なボタンを使う。ずっと動くか保証はない
					sHTML += "</button></td>";
				}
				else{
					sHTML += "</p></td>";
				}
				
				
			} // <<< if( iMCol1 < $scope.prop_nRowBreak1 && iMeasureIndex1 +
			else{// お尻の半端セル

				// お尻の半端　Totalメジャー名 
				if( ( $scope.prop_nHeaderWidth2 > 0 && sMode1 == "grand" ) 
					|| ( $scope.prop_nHeaderWidth2 > 0 && ( $scope.prop_nMeasureCols >= 2 || $scope.prop_bVerticalDimension ) ) 
				){
					sHTML += "<td style='background-color:" + sMeasNameBGColor + "; " + sBdLeftMeasName3 
						+ sBdBottom3 + sAlignMeasName3+"; "
						+ "' >";
					sHTML += "<p style='" + sMeasureNameFont2 + " font-size:" + $scope.prop_nMeasureLabelFontSize + "px; ' > ";
					sHTML += "</p></td>";

					// Totalメジャー値<td>
					sHTML += "<td " + sMeasBlink + " style=' text-align: right; " + sBdBottom3 + sBdLeftMeasValue3 
						+ " background-color:" + sMeasBGColor + "; ' >";
				}
				else if( $scope.prop_nHeaderWidth2 > 0 && sMode1 != "grand" && $scope.prop_nMeasureCols == 1 ){
					// Totalメジャー値
					sHTML += "<td " + sMeasBlink + " style=' text-align: right; " + sBdBottom3 + sBdLeftMeasValue3 
						+ " background-color:" + sMeasBGColor + "; ' >";
				}
				else{
					// Totalメジャー値
					sHTML += "<td " + sMeasBlink + " style=' text-align: right; " + sBdBottom3 + sBdLeftMeasValue3 
						+ " background-color:" + sMeasBGColor + "; ' >";
				}
				sHTML += "</p></td>";
			}

		}	// <<< for( var iMCol1 

		if( sMode1 == "grand" ){// グランドのみ表示
			// 真ん中お尻						
			sHTML += "<td style='width: 1px; border-left:"+nBorderWidth+"px solid "+$scope.prop_sLineColorGrid1+";'><p> </p></td>";
		}
		else{// ディメンションのみ表示
			// 右端お尻						
			sHTML += "<td style='width: 1px; border-left:"+nBorderWidth+"px solid "+$scope.prop_sLineColorGrid1+";'><p> </p></td>";
		}




//$scope.sDEBUG += " iMeasureIndex1+$scope.prop_nRowBreak1=" + (iMeasureIndex1 + $scope.prop_nRowBreak1) + " /";						
		return sHTML;
	}

	// --------------------------------------------------------------------------------------------
	// --------------------------------------------------------------------------------------------
	// --------------------------------------------------------------------------------------------
	// --------------------------------------------------------------------------------------------
	// --------------------------------------------------------------------------------------------
	// --------------------------------------------------------------------------------------------
	// --------------------------------------------------------------------------------------------
	function makeHTML2(){
		var sHTML ="";

		if( ! G_bInitOK ){// 描画準備が完了していない
			return sHTML;
		}


	//$scope.sDEBUG += " ■$scope.prop_sTableMode=" + $scope.prop_sTableMode + " / ";
	//$scope.sDEBUG += " ■$scope.layout.qHyperCube.qDimensionInfo.length=" + $scope.layout.qHyperCube.qDimensionInfo.length + " / ";

		$element.css("overflow", "auto"); // スクロールバーを自動で表示

	//$scope.sDEBUG += " ウインドウサイズが知りたい " ;
	//$scope.sDEBUG += " $(window).width()=" + $window.innerWidth ;
	//$scope.sDEBUG += " $(window).height()=" + $(window).innerHeight() ;
	//				$(window).height();

		sHTML = ""; // HTMLを初期化すること。あとでディメンションがテーブルごとにループして追加される

		if( ! $scope.prop_bVerticalDimension ){

//		if( $scope.prop_sTableMode=='horizontal' ){

//$scope.sDEBUG += "■ディメンション１ $scope.layout.qHyperCube.qDimensionInfo.length=" + $scope.layout.qHyperCube.qDimensionInfo.length + " / ";
			if( $scope.layout.qHyperCube.qDimensionInfo.length < 2 ){// ディメンションが0か1っこの場合


				// ここからHTML
				sHTML += "<table style='empty-cells: hide; table-layout: fixed;  border-collapse: separate; border:0px solid #223333;'>";

				// ホライゾンモード
				// td のwidthは廃止されたのでcolgroupで列幅を調整する
				
				sHTML += "<colgroup>";
					if( $scope.prop_nHeaderWidth0 > 0 ){
						sHTML += "<col style='width: " + $scope.prop_nHeaderWidth0 + "px;' >";
					}
					if( $scope.prop_nHeaderWidth1 > 0 ){
						sHTML += "<col style='text-align:center; width: " + $scope.prop_nHeaderWidth1 + "px; ' >";
					}
					if( $scope.prop_nRowBreak1 > 1 ){
						for( var iMCol1=0 ; iMCol1 < $scope.prop_nRowBreak1 ; iMCol1++ ){
							if( $scope.prop_nHeaderWidth2 > 0  ){
								sHTML += "<col style='width: "+$scope.prop_nHeaderWidth2+"px; ' >";
							}
							sHTML += "<col style='width: "+$scope.prop_nHeaderWidth3+"px; ' >";
						}
					}
					else{
						if( $scope.prop_nHeaderWidth2 > 0 ){
							sHTML += "<col style=' width: " + $scope.prop_nHeaderWidth2 + "px; '>" 
						}
						// メジャー値
						sHTML += "<col style=' width: " + $scope.prop_nHeaderWidth3 + "px; ' >"
					}
					sHTML += "<col style='width: "+($scope.prop_nLineWidthMagnification1*2)+"px; ' >";

					if( $scope.prop_nRowBreak1 > 1 ){// 改行する場合
						for( var iDim1=0 ; iDim1 < $scope.aryDim1.length ; iDim1++ ){// ディメンション1のループ
							for( var iMCol1=0 ; iMCol1 < $scope.prop_nRowBreak1 ; iMCol1++ ){
								// メジャー名ヘッダ
								if( $scope.prop_nHeaderWidth2 > 0 && $scope.prop_nMeasureCols >= 2 ){
									sHTML += "<col style='width: "+$scope.prop_nHeaderWidth2+"px; ' >";
								}
								sHTML += "<col style='width: "+$scope.prop_nHeaderWidth3+"px; ' >";
							}
							sHTML += "<col style='width: "+($scope.prop_nLineWidthMagnification1*2)+"px; ' >";
						}
					} // <<< if( $scope.prop_nRowBreak1 > 1 ){// 改行する場合
					else{
						for( var iDim1=0 ; iDim1 < $scope.aryDim1.length ; iDim1++ ){// ディメンション1のループ
							if( $scope.prop_nHeaderWidth2 > 0 && $scope.prop_nMeasureCols >= 2 ){// メジャー名を出す場合
								sHTML += "<col style='width: "+$scope.prop_nHeaderWidth2+"px; ' >";
							}
							// メジャー値
							sHTML += "<col style='width: "+$scope.prop_nHeaderWidth3+"px; ' >";
							sHTML += "<col style='width: "+($scope.prop_nLineWidthMagnification1*2)+"px; ' >";
						}
					}
				sHTML += "<col>";// dummy
				sHTML += "</colgroup>";


				// ヘッダ部分/////////////////////////////////////////////////////////////////////
				// 最上位ヘッダ。改行する場合のみ($scope.prop_nRowBreak1>=2)この処理が必要
				if( $scope.prop_nRowBreak1 >=2 ){
					sHTML += "<tr>";
					// グランド部分
					sHTML += makeTopHeader();
					// ディメンション部分
					for( var iDim1=0 ; iDim1 < $scope.aryDim1.length ; iDim1++ ){// ディメンション1のループ
						sHTML += makeDimHeader( iDim1 );
					}
					sHTML += "</tr>";
				}


				// メジャーグループColSpan対応  /////////////////////////////////////////////////////////////////////
				if( $scope.prop_bUseColspan && $scope.prop_nRowBreak1>=2 ){
					sHTML += "<tr>";// Measure Groupのヘッダを作る
					sHTML += makeMeasureGroup( "grand"/*grand/dimension*/ );
					// ディメンション部分
					for( var iDim1=0 ; iDim1 < $scope.aryDim1.length ; iDim1++ ){// ディメンション1のループ
						sHTML += makeMeasureGroup( "dimension"/*grand/dimension*/, iDim1 );
					}
					sHTML += "</tr>";
				}// <<<if( $scope.prop_bUseColspan ){

	
		
				// メジャーのヘッダ部分（通称２行目ヘッダ）	/////////////////////////////////////////////////////////////////////
				sHTML += "<tr>";
				// グランド部分
				sHTML += makeMeasureHeader( "grand"/*grand/dimension*/, 0 );
				// ディメンション部分
				if( $scope.aryDim1.length > 0 ){ // ディメンションがある
					if( $scope.prop_nRowBreak1 >=2 ){ // 改行される
						for( var iDim1=0 ; iDim1 < $scope.aryDim1.length ; iDim1++ ){// ディメンション1のループ
							sHTML += makeMeasureHeader( "dimension"/*grand/dimension*/, iDim1 );
						}
					}
					else{
						for( var iDim1=0 ; iDim1 < $scope.aryDim1.length ; iDim1++ ){// ディメンション1のループ
							sHTML += makeDimHeader( iDim1 );
						}
					}
				}
				else{// ディメンションがない
					for( var iDim1=0 ; iDim1 < $scope.aryDim1.length ; iDim1++ ){// ディメンション1のループ
						sHTML += makeMeasureHeader( "dimension"/*grand/dimension*/, iDim1 );
					}
				}
				sHTML += "</tr>";


				// 本体/////////////////////////////////////////////////////////////////////
				for( var iMeasureIndex1=0, iCurrentRow1=0, iRowspanLv1=0, iRowspanLv2=0, iRangesumRowspanLv1=0, iRangesumRowspanLv2=0
					; iMeasureIndex1 < G_aryMeasProps.length 
					; iMeasureIndex1 = iMeasureIndex1 + $scope.prop_nRowBreak1	// メジャーがインクリメントされる 
				){// メジャー分ループ
					sHTML += "<tr>";

					// 本体グランド部分
					sHTML += makeMatrix( "grand"/*grand/dimension*/, 0, iMeasureIndex1, iRowspanLv1, iRowspanLv2, iCurrentRow1, iRangesumRowspanLv1, iRangesumRowspanLv2 );
					
					
					// ディメンション部分
					for( var iDim1=0 ; iDim1 < $scope.aryDim1.length ; iDim1++ ){// ディメンション1のループ
						sHTML += makeMatrix( "dimension"/*grand/dimension*/, iDim1, iMeasureIndex1, iRowspanLv1, iRowspanLv2, iCurrentRow1, iRangesumRowspanLv1, iRangesumRowspanLv2 );
					}	



					// 一行分の作成終了
					// 大区分のインクリメント
					if( iRangesumRowspanLv2 < $scope.aryLv2[iRowspanLv2].RangesumRS ){
						iRangesumRowspanLv2 = $scope.aryLv2[iRowspanLv2].RangesumRS;
					}

					// 合計科目のインクリメント
					if( iRangesumRowspanLv1 < $scope.aryLv1[iRowspanLv1].RangesumRS ){
						iRangesumRowspanLv1 = $scope.aryLv1[iRowspanLv1].RangesumRS;
					}

					
					iCurrentRow1++ // 現在の行をインクリメントする
					// RowSpanをインクリメントする
					if( iCurrentRow1 >= $scope.aryLv1[iRowspanLv1].RangesumRS && iRowspanLv1 < $scope.aryLv1.length ){
						iRowspanLv1++;
					}
					if( iCurrentRow1 >= $scope.aryLv2[iRowspanLv2].RangesumRS && iRowspanLv2 < $scope.aryLv2.length ){
						iRowspanLv2++;
					}
					sHTML += "</tr>";

				} // <<< for( var iMeasureIndex1=0, iCurrentRow1					

			}	
			else if( $scope.layout.qHyperCube.qDimensionInfo.length == 2 ){// ディメンションが2この場合

			}

			// しめくくり。テーブル完成
			sHTML += "</table>";
		}// <<< if( ! $scope.prop_bVerticalDimension ){
		// 縦型ディメンション///////////////////////////////////////////////////////////////
		// 縦型ディメンション///////////////////////////////////////////////////////////////
		// 縦型ディメンション///////////////////////////////////////////////////////////////
		else{// 縦型ディメンション
			if( $scope.layout.qHyperCube.qDimensionInfo.length < 2 ){// ディメンションが0か1っこの場合



				// ディメンション部分
				for( var iDim1=-1 /*-1の場合グランド*/ ; iDim1 < $scope.aryDim1.length ; iDim1++ ){// ディメンション1のループ
				
					var nCols = 0;


					// ここからHTML
					sHTML += "<table style='empty-cells: hide; table-layout: fixed;  border-collapse: separate; border:0px solid #223333;'>";

					// ヴァーティカルモード
					// td のwidthは廃止されたのでcolgroupで列幅を調整する

					sHTML += "<colgroup>";
						sHTML += "<col style='width: " + $scope.prop_nHeaderWidth3 + "px;' ><col style='width: 5px;' >";// 縦型ディメンションとお尻の分
						nCols++;
						
						if( $scope.prop_nHeaderWidth0 > 0 ){
							sHTML += "<col style='width: " + $scope.prop_nHeaderWidth0 + "px;' >";
							nCols++;
						}
						if( $scope.prop_nHeaderWidth1 > 0 ){
							sHTML += "<col style='text-align:center; width: " + $scope.prop_nHeaderWidth1 + "px; ' >";
							nCols++;
						}
						if( $scope.prop_nRowBreak1 > 1 ){
							for( var iMCol1=0 ; iMCol1 < $scope.prop_nRowBreak1 ; iMCol1++ ){
								if( $scope.prop_nHeaderWidth2 > 0  ){
									sHTML += "<col style='width: "+$scope.prop_nHeaderWidth2+"px; ' >";
									nCols++;
								}
								sHTML += "<col style='width: "+$scope.prop_nHeaderWidth3+"px; ' >";
								nCols++;
							}
						}
						else{
							if( $scope.prop_nHeaderWidth2 > 0 ){
								sHTML += "<col style=' width: " + $scope.prop_nHeaderWidth2 + "px; '>" 
								nCols++;
							}
							// メジャー値
							sHTML += "<col style=' width: " + $scope.prop_nHeaderWidth3 + "px; ' >"
							nCols++;
						}
						sHTML += "<col style='width: "+($scope.prop_nLineWidthMagnification1*2)+"px; ' >";
						nCols++;

					sHTML += "<col>";// dummy
					
					sHTML += "</colgroup>";





					// Grandを先に作る
					// ヘッダ部分/////////////////////////////////////////////////////////////////////
					// 最上位ヘッダ。改行する場合のみ($scope.prop_nRowBreak1>=2)この処理が必要
//					if( $scope.prop_nRowBreak1 >=2 ){
//						sHTML += "<tr>";
//						sHTML += "<td> <p>ディメンション</p> </td><td><p></p></td>";
//						sHTML += makeTopHeader();
//						sHTML += "</tr>";
//					}

					// メジャーグループColSpan対応  /////////////////////////////////////////////////////////////////////
					if( $scope.prop_bUseColspan && $scope.prop_nRowBreak1>=2 ){
						sHTML += "<tr>";// Measure Groupのヘッダを作る
						if( iDim1 < 0 ){
							// グランド
							sHTML += "<td> <p> </p> </td><td><p></p></td>";
							sHTML += makeMeasureGroup( "grand"/*grand/dimension*/ );
						}
						else{
							// ディメンション
							sHTML += "<td> <p> </p> </td><td><p></p></td>";
							sHTML += makeMeasureGroup( "dimension"/*grand/dimension*/, iDim1 );
						}
						sHTML += "</tr>";
					}// <<<if( $scope.prop_bUseColspan ){

					// メジャーのヘッダ部分（通称２行目ヘッダ）	/////////////////////////////////////////////////////////////////////
					if( iDim1 < 0 ){
						// グランド
						sHTML += "<tr>";
						var nBorderWidth = 1;
						sHTML += "<td rowspan=99 bgcolor=" + $scope.prop_sHeaderBGC1 
							+ " style='text-align:center; border-left: "+nBorderWidth+"px solid "+$scope.prop_sLineColorHeader1+"; border-top: "+nBorderWidth+"px solid "+$scope.prop_sLineColorHeader1+"; border-bottom: 0px solid "+$scope.prop_sLineColorHeader1+"; ' ><p style='font-weight:bold; color:"
							+ $scope.prop_sHeaderFGC2 + "; font-size:" + $scope.prop_nFontSize4 + "px; '>"+$scope.prop_TopTotalHeaderText+"</p></td><td></td>"; 
						
						sHTML += makeMeasureHeader( "grand"/*grand/dimension*/, 0 );
						sHTML += "</tr>";
					}
					else if( $scope.prop_nMeasureCols >=2 ){
						// ディメンション
						sHTML += "<tr>";
						sHTML += makeDimHeader( iDim1 );
						sHTML += makeMeasureHeader( "grand"/*grand/dimension*/, 0 );
						sHTML += "</tr>";
					}
					else{
						// ディメンション（ヘッダ省略）
						sHTML += "<tr>";
						sHTML += makeDimHeader( iDim1 );
						var nBorderWidth = 1 * $scope.prop_nLineWidthMagnification1;
						sHTML += "<td colspan="+(nCols-2)+" style='height: "+0+"px; border-bottom: "+nBorderWidth+"px solid "+$scope.prop_sLineColorHeader1
							+"; border-left: "+nBorderWidth+"px solid "+$scope.prop_sLineColorHeader1+"; '><p></p></td>" ;
						sHTML += "<td style='height: "+1+"px; border-left: "+nBorderWidth+"px solid "+$scope.prop_sLineColorHeader1
							+";  '><p></p></td>" ;
						sHTML += "</tr>";
					}

					// 本体/////////////////////////////////////////////////////////////////////
					for( var iMeasureIndex1=0, iCurrentRow1=0, iRowspanLv1=0, iRowspanLv2=0, iRangesumRowspanLv1=0, iRangesumRowspanLv2=0
						; iMeasureIndex1 < G_aryMeasProps.length 
						; iMeasureIndex1 = iMeasureIndex1 + $scope.prop_nRowBreak1	// メジャーがインクリメントされる 
					){// メジャー分ループ
						sHTML += "<tr>";
						sHTML += "<td> </td>";
							

						if( iDim1 < 0 ){
							// 本体グランド部分
							sHTML += makeMatrix( "grand"/*grand/dimension*/, 0, iMeasureIndex1, iRowspanLv1, iRowspanLv2, iCurrentRow1, iRangesumRowspanLv1, iRangesumRowspanLv2 );
						}
						else{
							// 本体ディメンション部分
							sHTML += makeMatrix( "dimension"/*grand/dimension*/, iDim1, iMeasureIndex1, iRowspanLv1, iRowspanLv2, iCurrentRow1, iRangesumRowspanLv1, iRangesumRowspanLv2 );
						}

						// 一行分の作成終了
						// 大区分のインクリメント
						if( iRangesumRowspanLv2 < $scope.aryLv2[iRowspanLv2].RangesumRS ){
							iRangesumRowspanLv2 = $scope.aryLv2[iRowspanLv2].RangesumRS;
						}

						// 合計科目のインクリメント
						if( iRangesumRowspanLv1 < $scope.aryLv1[iRowspanLv1].RangesumRS ){
							iRangesumRowspanLv1 = $scope.aryLv1[iRowspanLv1].RangesumRS;
						}


						iCurrentRow1++ // 現在の行をインクリメントする
						// RowSpanをインクリメントする
						if( iCurrentRow1 >= $scope.aryLv1[iRowspanLv1].RangesumRS && iRowspanLv1 < $scope.aryLv1.length ){
							iRowspanLv1++;
						}
						if( iCurrentRow1 >= $scope.aryLv2[iRowspanLv2].RangesumRS && iRowspanLv2 < $scope.aryLv2.length ){
							iRowspanLv2++;
						}
						sHTML += "</tr>";

					} // <<< for( var iMeasureIndex1=0, iCurrentRow1					




					// ディメンション毎にしめくくり。テーブル完成
					sHTML += "</table>";
					sHTML += "<table><tr><td style=' height: 3px'></td></tr></table>";

				} // <<< for( var iDim1=-1 /*-1の場合グランド*/ ; iDim1 < $scope.aryDim1.length ; iDim1++ )








			}	
			else if( $scope.layout.qHyperCube.qDimensionInfo.length == 2 ){// ディメンションが2この場合

			}
		
		}



		// ワーニングメッセージ
		if( $scope.sCubeRuntimeWarning != ""){
			sHTML += "<table><tr>";
			sHTML += "<td>";
			sHTML += "<p style={font-size:1px; }>" + $scope.sCubeRuntimeWarning +"</p> ";
			sHTML += "</td>";
			sHTML += "</tr><table>";
		}


		return sHTML;
	}
	// --------------------------------------------------------------------------------------------
	// -------------------------------------------------------------------------------------------
	// --------------------------------------------------------------------------------------------
	// --------------------------------------------------------------------------------------------
	// --------------------------------------------------------------------------------------------
	// --------------------------------------------------------------------------------------------
	// この中で$scopeを使ってはいけない	
	function callbackCreateCube(reply,app2){
if(G_bDegubMode)console.log('callbackCreateCube begin: G_bInitOK',G_bInitOK);
if(G_bDegubMode)console.log('callbackCreateCube begin: > layout', $scope.layout); 

		secondHyperCube = reply.qHyperCube;
		
//if(G_bDegubMode)console.log('callbackCreateCube middle: > secondHyperCube',secondHyperCube);

		set1stCubeProps();
		set2ndCubeProps();

		G_bInitOK = true;

if(G_bDegubMode)console.log('callbackCreateCube end: G_bInitOK',G_bInitOK);

	}
	// --------------------------------------------------------------------------------------------
	function addSecondCube( currApp ){
if(G_bDegubMode)console.log('addSecondCube begin G_bInitOK',G_bInitOK);
		$scope.sCUBEDEBUG = "";// キューブが更新されるたびに初期化されるデバッグ情報
		$scope.sCubeRuntimeWarning = "";// キューブが更新されるたびに初期化されるデバッグ情報デバッグ中じゃなくても実行時でも表示するメッセージ。例えばデータが多くて表示しきれていない場合など。

				////////////////////////////////////////////////////////////////////
				// ハイパーキューブを追加 /////////////////////////////////////////////
				
				// テーブルサンプルを見ろ　https://qlik.dev/libraries-and-tools/visualizations/table
				var qHyperCubeDef2 = {
					qDimensions : [],
					qMeasures : [
//						{ qDef : 
//							{	qDef : $scope.layout.qHyperCube.qMeasureInfo[ 0 ].qFallbackTitle //"M01"
//								//, qLabel : $scope.layout.qHyperCube.qMeasureInfo[ 0 ].qFallbackTitle //"M01の名前"
//							}
//						}
					],
					qInitialDataFetch: [
						{// 最大１万セルまで。こちらはグランドにしか使わないのでディメンション（Height）は小さい
							qWidth: 105, // メジャー
							qHeight: 3 // ディメンション
						}
					]
				};

				// ここをみろ https://help.qlik.com/en-US/sense-developer/April2020/Subsystems/Mashups/Content/Sense_Mashups/Create/Visualizations/Table/create-table.htm
				// JSONのメジャーにプッシュする
				{
					var i1 = 0;
					while( i1 < $scope.layout.qHyperCube.qMeasureInfo.length ){
						// qAttrExprInfo[0].qFallbackTitleの存在確認
						var sqAttrExprInfo0 = "='white'";
						var sqAttrExprInfo1 = "='black'";
						var sqAttrExprInfo2 = "='false'";
						if( typeof $scope.layout.qHyperCube.qMeasureInfo[i1].qAttrExprInfo == "undefined" ){
						}
						else{
							if( $scope.layout.qHyperCube.qMeasureInfo[i1].qAttrExprInfo.length >= 3 ){// BGcolor
								sqAttrExprInfo0 = myColorCast( $scope.layout.qHyperCube.qMeasureInfo[i1].qAttrExprInfo[0].qFallbackTitle , 'white' ) ;
							}
							if( $scope.layout.qHyperCube.qMeasureInfo[i1].qAttrExprInfo.length >= 3 ){// FontColor
								sqAttrExprInfo1 = myColorCast( $scope.layout.qHyperCube.qMeasureInfo[i1].qAttrExprInfo[1].qFallbackTitle , 'black' ) ;
							}
							if( $scope.layout.qHyperCube.qMeasureInfo[i1].qAttrExprInfo.length >= 3 ){// Blink
								sqAttrExprInfo2 = String( $scope.layout.qHyperCube.qMeasureInfo[i1].qAttrExprInfo[2].qFallbackTitle ) ;
							}
						}
						// JSONのメジャーにプッシュするメジャー１ノード分
						qHyperCubeDef2.qMeasures.push( 
							{	
								"qDef": {
									"qDef": $scope.layout.qHyperCube.qMeasureInfo[ i1 ].qFallbackTitle
									, "qLabel" : $scope.layout.qHyperCube.qMeasureInfo[ i1 ].qFallbackTitle
								},
								"qAttributeExpressions": [
									{
									  "qExpression": sqAttrExprInfo0
									},
									{
									  "qExpression": sqAttrExprInfo1
									},
									{
									  "qExpression": sqAttrExprInfo2
									},
								]
							} 
						);
						i1 = i1 + 1;
					}
				}


				currApp.createCube(
					qHyperCubeDef2, callbackCreateCube
				);
				// <<< ハイパーキューブを追加 /////////////////////////////////////////////
				////////////////////////////////////////////////////////////////////

if(G_bDegubMode)console.log('addSecondCube end G_bInitOK',G_bInitOK);

		return;
	}
	
	// --------------------------------------------------------------------------------------------
	// --------------------------------------------------------------------------------------------
	// --------------------------------------------------------------------------------------------
	// --------------------------------------------------------------------------------------------
	// --------------------------------------------------------------------------------------------
	// --------------------------------------------------------------------------------------------
	// --------------------------------------------------------------------------------------------



				// --------------------------------------------------------------------------------------------
				$scope.mytable = function(){
					$scope.sDEBUG = "■ mytable START /"; // 描画されるたびに初期化されるデバッグ。ｈｔｍｌ生成時用。

					var sHTML="";
					

					// 新バージョン

					sHTML += makeHTML2(); 





					
					// ここで自分でサニタイジングして不要なタグを消去する処理をいれること
					if( G_bUseButton ){// AngularJsで推奨されない動的なボタンを使う。ずっと動くか保証はない
						sHTML = $sce.trustAsHtml(sHTML);// buttonタグがサニタイズされないように信頼済みとマークする
					}
					
					return sHTML ;	// VIEWにHTMLを戻す
				}// <<<$scope.mytable = function
				
				// --------------------------------------------------------------------------------------------
				<!-- $scopeは、HTMLのテンプレートとcontrollerの橋渡しをする。 -->
			}]	// <<<controller: ['
		
        };	// <<<return
    } // <<<function ( qlik , template , props )
);	// <<<define



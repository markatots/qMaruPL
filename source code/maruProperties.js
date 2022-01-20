// # Author
// Katsuaki Maruno
// 
// # Copyright©
// Copyright(c) 2021-2022, Otsuka Corporation
// 
// # License
// The source code is licensed MIT. The website content is licensed CC BY 4.0,see LICENSE.



// JavaScript
define(
	[]
	,function(){
		return{


			// ヘルプはここ https://help.qlik.com/en-US/sense-developer/May2021/Subsystems/Extensions/Content/Sense_Extensions/extensions-add-custom-properties.htm
			// https://help.qlik.com/en-US/sense-developer/August2021/Subsystems/Extensions/Content/Sense_Extensions/Howtos/custom-dropdown-properties.htm
			// プロパティパネルに表示するアイテムを指定する

				type: "items",
				component: "accordion",
				items: {
					dimensions: {
						uses: "dimensions",
						min:0,
						max:1
					},
					
					// 参照せよ：https://community.qlik.com/t5/Integration-Extension-APIs/Qliksense-custom-measure-property-for-extension-with-expression/td-p/966110
					// 参照せよ：https://community.qlik.com/t5/Integration-Extension-APIs/qAttributeDimensions-Expressions-explanation-needed/m-p/56660
					measures: {
						uses: "measures",
						// メジャーのグランドトータルは qHyperCube.qMeasureInfo[0].sMeasAlertFontColor（ref:名）にてアクセスできる
						// メジャーのディメンション毎の値は qHyperCube.qDataPages[0].qMatrix[0][1].qAttrExps.qValues[0].qText にてアクセスできる
						items: {

							MeasBGColor1: {
								type: "string",
								label: "●Measure BG Color Expr. =if([Meas1]<1,'red','green')  ",
								ref: "qAttributeExpressions.0.qExpression",
								component: "expression",
								defaultValue: "='white'",
							},
							MeasFontColor1: {
								type: "string",
								label: "〇Measure Font Color Expr. =if([Meas1]<1,'red','green')  ",
								ref: "qAttributeExpressions.1.qExpression",
								component: "expression",
								defaultValue: "='black'",
							},
							MeasBlink1: {
								type: "string",
								label: "☆Measure Blink Expr.('true' or 'false' string) =if([Meas1]<1,'true','false')  ",
								ref: "qAttributeExpressions.2.qExpression",
								component: "expression",
								defaultValue: "='false'",
							},
							MeasSheetID1:{
								ref: "qDef.sMeasSheetID1",// qDef.で始めるとHyperCube>MeasureInfoに出てくる
								type: "string",
//								component: "expression",
								label: "Sheet ID for navigation",
								expression: "optional",
								defaultValue: ""
							},

						},// <<< items
						
						min:1,
						max:300
					},
					sorting: {
						uses: "sorting"
					},
					

					// プロパティのrefを変更すると、変な風になる。エクステンションを張り付けなおさないとダメ
					appearancePanel: {
						uses: "settings",
						items: {	
							
									
							maruProp73: {
								type: "items",
								label: "Table Overall",
								items: {
									maru73_nAbsoluteMagnification1: {
										type: "number",
										component: "slider",
										label: "◆Magnificate (0x-2x, step 0.1) Table Width and Font size",
										ref: "settings.nAbsoluteMagnification1",
										min: 0,
										max: 2,
										step: 0.1,
										defaultValue: 1
									},
									
									maru73_nLineWidthMagnification1: {
										type: "number",
										component: "slider",
										label: "Line Width Magnification",
										ref: "settings.nLineWidthMagnification1",
										min: 1,
										max: 10,
										step: 1,
										defaultValue: 1
									},
									maru73_bAllowClipboard:{
										ref: "settings.bAllowClipboard", // クリップボードにコピーできる
										type: "boolean",
										label: "Allow TSV Copy to Clipboard",
										component: "switch",
										options: [{value: true,label: "On"}, {value: false,label: "Not on"}],
										defaultValue: false
									},
									
									maru73_sLineColorHeader1: {
										ref: "settings.sLineColorHeader1", // 罫線の色（ヘッダ）
										type: "string",
										label: "●Header Line Color ",
										defaultValue: "gray",
										expression: "optional"
									},
									maru73_sLineColorGrid1: {
										ref: "settings.sLineColorGrid1", // 罫線の色（ヘッダ以外）
										type: "string",
										label: "●Grid Line Color ",
										defaultValue: "black",
										expression: "optional"
									},
									maru73_1:{
										ref: "settings.sLineHorizon1",
										type: "string",
										component: "radiobuttons",
										label: "horizontal line style",
										options: [{value: "none",label: "none"}, {value: "dotted",label: "dotted"}, {value: "solid",label: "solid"}],
										defaultValue: "dotted"
									},
									maru73_2:{
										ref: "settings.sLineV1",
										type: "string",
										component: "radiobuttons",
										label: "vertical line style",
										options: [{value: "none",label: "none"}, {value: "dotted",label: "dotted"}, {value: "solid",label: "solid"}],
										defaultValue: "dotted"
									},
									
									
									maru73_bVerticalDimension:{
										ref: "settings.bVerticalDimension", // ディメンションを縦にする
										type: "boolean",
										label: "Vertical Dimension",
										component: "switch",
										options: [{value: true,label: "On"}, {value: false,label: "Not on"}],
										defaultValue: false
									},
									
									maru73_bHideMeasName:{
										ref: "settings.bHideMeasName", // メジャー名を隠す
										type: "string",
										component: "radiobuttons",
										label: "◆Hide or Show Measure Name",
										options: [{value: "true",label: "hide all"}, {value: "false",label: "show all"}, {value: "left",label: "hide except very left"}],
										defaultValue: "false"
									},
									maru73_bHideLv1:{
										ref: "settings.bHideLv1", // Lv1を隠す
										type: "boolean",
										label: "◆Hide Lv1 Column",
										component: "switch",
										options: [{value: true,label: "On"}, {value: false,label: "Not on"}],
										defaultValue: false
									},
									maru73_bHideLv2:{
										ref: "settings.bHideLv2", // Lv2を隠す
										type: "boolean",
										label: "◆Hide Lv2 Column",
										component: "switch",
										options: [{value: true,label: "On"}, {value: false,label: "Not on"}],
										defaultValue: false
									},
									maru73_30:{
										ref: "settings.sMeasureNameAlign1",
										type: "string",
										component: "radiobuttons",
										label: "Measure Label Align",
										options: [{value: "left",label: "left"}, {value: "center",label: "center"}, {value: "right",label: "right"}],
										defaultValue: "left"
									},
									maru73_3:{
										ref: "settings.nRowBreak1", // APIで使える名前になる
										type: "integer",
										label: "■Row Break Col(From 1 To 7)",
										
										component: "slider",
										min: 1,
										max: 7,
										step: 1,
										defaultValue: 1
										
									},
									maru73_4:{
										ref: "settings.bRepeatName",
										type: "boolean",
										component: "switch",
										label: "Repeat Measure Name or header in dimension.",
										options: [{value: true,label: "On"}, {value: false,label: "Not on"}],
										defaultValue: false
									},
									
									
									maruy200:{// colspanを使用するか？
										ref: "settings.bUseColspan",
										type: "boolean",
										component: "switch",
										label: "■ Use Measure Groups",
										options: [{value: true,label: "On"}, {value: false,label: "Not on"}],
										defaultValue: false
									},

									maruyyy1i:{
										ref: "settings.nColspan1", // APIで使える名前になる
										type: "integer",
										label: "1.===★Colspan1 (1-4) of measures1★=======",
										defaultValue: "1",
										expression: "optional",
										max: 4,
										min: 1
									},
									maruyyy1t:{
										ref: "settings.sColspanText1", // テキスト
										type: "string",
										label: "Caption1",
										defaultValue: "Measure Group1",
										expression: "optional"
									},
									maruyyy1c:{
										ref: "settings.sColspanAlign1",
										type: "string",
										component: "radiobuttons",
										label: "align1",
										options: [{value: "left",label: "left"}, {value: "center",label: "center"}, {value: "right",label: "right"}],
										defaultValue: "center"
									},
									maruyyy1bgc:{
										ref: "settings.sColspanBGC1", // APIで使える名前になる
										type: "string",
										label: "●BackGroundColor1",
										defaultValue: "mediumblue",
										expression: "optional"
									},
									
									maruyyy2i:{
										ref: "settings.nColspan2", // APIで使える名前になる
										type: "integer",
										label: "2.===★Colspan2 (1-3) of measures2★=======",
										defaultValue: "1",
										expression: "optional",
										max:3,
										min:1
									},
									maruyyy2t:{
										ref: "settings.sColspanText2", // テキスト
										type: "string",
										label: "Caption2",
										defaultValue: "Measure Group2",
										expression: "optional"
									},
									maruyyy2c:{
										ref: "settings.sColspanAlign2",
										type: "string",
										component: "radiobuttons",
										label: "align2",
										options: [{value: "left",label: "left"}, {value: "center",label: "center"}, {value: "right",label: "right"}],
										defaultValue: "center"
									},
									maruyyy2bgc:{
										ref: "settings.sColspanBGC2", // APIで使える名前になる
										type: "string",
										label: "●BackGroundColor2",
										defaultValue: "mediumblue",
										expression: "optional"
									},
									
									maruyyy3i:{
										ref: "settings.nColspan3", // APIで使える名前になる
										type: "integer",
										label: "3.===★Colspan3 (1-2) of measures3★=======",
										defaultValue: "1",
										expression: "optional",
										max:2,
										min:1
									},
									maruyyy3t:{
										ref: "settings.sColspanText3", // テキスト
										type: "string",
										label: "Caption3",
										defaultValue: "Measure Group3",
										expression: "optional"
									},
									maruyyy3c:{
										ref: "settings.sColspanAlign3",
										type: "string",
										component: "radiobuttons",
										label: "align3",
										options: [{value: "left",label: "left"}, {value: "center",label: "center"}, {value: "right",label: "right"}],
										defaultValue: "center"
									},
									maruyyy3bgc:{
										ref: "settings.sColspanBGC3", // APIで使える名前になる
										type: "string",
										label: "●BackGroundColor3",
										defaultValue: "mediumblue",
										expression: "optional"
									},
									
									maruyyy4i:{
										ref: "settings.nColspan4", // APIで使える名前になる
										type: "integer",
										label: "4.===★Colspan4 (1-1) of measures4★=======",
										defaultValue: "1",
										expression: "optional",
										max:1,
										min:1
									},
									maruyyy4t:{
										ref: "settings.sColspanText4", // テキスト
										type: "string",
										label: "Caption4",
										defaultValue: "Measure Group4",
										expression: "optional"
									},
									maruyyy4c:{
										ref: "settings.sColspanAlign4",
										type: "string",
										component: "radiobuttons",
										label: "align4",
										options: [{value: "left",label: "left"}, {value: "center",label: "center"}, {value: "right",label: "right"}],
										defaultValue: "center"
									},
									maruyyy4bgc:{
										ref: "settings.sColspanBGC4", // APIで使える名前になる
										type: "string",
										label: "●BackGroundColor4",
										defaultValue: "mediumblue",
										expression: "optional"
									},

									
									maruyyy5i:{
										ref: "settings.nColspan5", // APIで使える名前になる
										type: "integer",
										label: "5.===★Colspan5(1-1) of measures5★=======",
										defaultValue: "1",
										expression: "optional",
										max:1,
										min:1
									},
									maruyyy5t:{
										ref: "settings.sColspanText5", // テキスト
										type: "string",
										label: "Caption5",
										defaultValue: "Measure Group5",
										expression: "optional"
									},
									maruyyy5c:{
										ref: "settings.sColspanAlign5",
										type: "string",
										component: "radiobuttons",
										label: "align5",
										options: [{value: "left",label: "left"}, {value: "center",label: "center"}, {value: "right",label: "right"}],
										defaultValue: "center"
									},
									maruyyy5bgc:{
										ref: "settings.sColspanBGC5", // APIで使える名前になる
										type: "string",
										label: "●BackGroundColor5",
										defaultValue: "mediumblue",
										expression: "optional"
									},

								}
							},
							
							maruProp20: {
								type: "items",
								label: "Font size",
								items: {
									maruh6s5:{
										ref: "settings.nFontSize5", // APIで使える名前になる
										type: "integer",
										label: "Header Font Size(Measures'header)",
										defaultValue: "15",
										expression: "optional"
									},
									maruh6s1:{
										ref: "settings.nFontSize1", // APIで使える名前になる
										type: "integer",
										label: "Lv2, Lv1 captions(1st,2nd cols)",
										defaultValue: "18",
										expression: "optional"
									},
									maruh6s2:{
										ref: "settings.nFontSize2", // APIで使える名前になる
										type: "integer",
										label: "Measure's Labels(3rd col)",
										defaultValue: "16",
										expression: "optional"
									},
									maruh6s6:{
										ref: "settings.nFontSize6", // APIで使える名前になる
										type: "integer",
										label: "Measure's Total values(4th col)",
										defaultValue: "14",
										expression: "optional"
									},
									maruh6s4:{
										ref: "settings.nFontSize4", // APIで使える名前になる
										type: "integer",
										label: "Dimension labels(from 5th col to the right)",
										defaultValue: "18",
										expression: "optional"
									},
									maruh6s3:{
										ref: "settings.nFontSize3", // APIで使える名前になる
										type: "integer",
										label: "現在未使用",
										defaultValue: "14",
										expression: "optional"
									},

								}
							},

							// === HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH
							// === HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH
							// === HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH
							// === HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH
							// === HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH
							// === HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH
							// ===========================================================================================
							// == Header
							// ===========================================================================================
							maruProp10: {
								type: "items",
								label: "Header for Measure text, width, color",
								items: {
									
									maruh2:{
										ref: "settings.sHeaderText2", // APIで使える名前になる
										type: "string",
										label: "===★Header Text Measure(3rd)col★=======",
										defaultValue: "Measure label",
										expression: "optional"
									},
									maruh2b:{
										ref: "settings.sHeaderWidth2", // APIで使える名前になる
										type: "integer",
										label: "◆Width(px) of Meas label if 0 then hidden",
										defaultValue: "140",
										expression: "optional"
									},
									
									maruh3b:{
										ref: "settings.sHeaderWidth3", // メジャー値の幅
										type: "integer",
										label: "◆Width(px) of Meas Value, 'Total' Col",
										defaultValue: "130",
										expression: "optional"
									},
									
									maruh4:{
										ref: "settings.sHeaderBGC1", // APIで使える名前になる
										type: "string",
										label: "●BackGroundColor for Title(1st-3rd)col",
										defaultValue: "midnightblue",
										expression: "optional"
									},
									maruh4c:{
										ref: "settings.sHeaderFGC1", // APIで使える名前になる
										type: "string",
										label: "〇FontColor for left 1st-3rd cols",
										defaultValue: "white",
										expression: "optional"
									},
									
									maruh5:{
										ref: "settings.sHeaderBGC2", // APIで使える名前になる
										type: "string",
										label: "●BackGroundColor fr 4th to right cols",
										defaultValue: "mediumblue",
										expression: "optional"
									},
									maruh5c:{
										ref: "settings.sHeaderFGC2", // APIで使える名前になる
										type: "string",
										label: "〇FontColor fr 4th to right cols",
										defaultValue: "lemonchiffon",
										expression: "optional"
									},
									
									maruh6:{
										ref: "settings.sHeaderTextTopTotal", // APIで使える名前になる
										type: "string",
										label: "===★Header Text Top Total(3-4th)col★=======",
										defaultValue: "Top Total",
										expression: "optional"
									},
									maruh3:{
										ref: "settings.sHeaderText3", // APIで使える名前になる
										type: "string",
										label: "Header Text Total 1st",
										defaultValue: "Total",
										expression: "optional"
									},
									maruh6b:{
										ref: "settings.sHeaderTextTotal2", // APIで使える名前になる
										type: "string",
										label: "Header Text Total 2nd",
										defaultValue: "Total 2ndCol",
										expression: "optional"
									},
									maruh6c:{
										ref: "settings.sHeaderTextTotal3", // APIで使える名前になる
										type: "string",
										label: "Header Text Total 3rd",
										defaultValue: "Total 3rdCol",
										expression: "optional"
									},
									maruh6d:{
										ref: "settings.sHeaderTextTotal4", // APIで使える名前になる
										type: "string",
										label: "Header Text Total 4th",
										defaultValue: "Total 4thCol",
										expression: "optional"
									},
									maruh6e:{
										ref: "settings.sHeaderTextTotal5", // APIで使える名前になる
										type: "string",
										label: "Header Text Total 5th",
										defaultValue: "Total 5thCol",
										expression: "optional"
									},

								}
							},
							
							// ===========================================================================================
							// ===========================================================================================
							// ===========================================================================================
							// ===========================================================================================
							// ===========================================================================================
							// ===========================================================================================
							// ===========================================================================================
							// == Lv1
							// ===========================================================================================
							maruProp01: {
								type: "items",
								label: "Lv-1 Groups",
								items: {
									maruh1:{
										ref: "settings.sHeaderText1", // APIで使える名前になる
										type: "string",
										label: "■Header Text Lv1(2nd col)★=======",
										defaultValue: "Lv1",
										expression: "optional"
									},
									maruh1b:{
										ref: "settings.sHeaderWidth1", // APIで使える名前になる
										type: "integer",
										label: "◆Width(px) of Lv-1 Col if 0 then hidden",
										defaultValue: "200",
										expression: "optional"
									},
									
									marux1:{
										ref: "settings.sLv1Rowspan1", // APIで使える名前になる
										type: "integer",
										label: "1.===★rowspan1★============",
										defaultValue: "99",
										min: 1,
										max: 100,
										expression: "optional"
									},
									marux1b:{
										ref: "settings.sLv1RowName1", // APIで使える名前になる
										type: "string",
										label: "Lv-1 caption 1st row",
										defaultValue: "Lv1 1st",
										expression: "optional"
									},
									marux1c:{
										type: "string",
										component: "radiobuttons",
										label: "align",
										ref: "settings.sLv1Align1",
										options: [{value: "left",label: "left"}, {value: "center",label: "center"}, {value: "right",label: "right"}],
										defaultValue: "center"
									},
									marux1v:{
										type: "string",
										component: "radiobuttons",
										label: "valign",
										ref: "settings.sLv1VertiAlign1",
										options: [{value: "top",label: "top"}, {value: "middle",label: "middle"}, {value: "bottom",label: "bottom"}],
										defaultValue: "middle"
									},
									marux1d:{
										ref: "settings.sLv1BGC1", // APIで使える名前になる
										type: "string",
										label: "●BackGroundColor",
										defaultValue: "aliceblue",
										expression: "optional"
									},
									marux1f:{
										ref: "settings.sLv1FGC1", // APIで使える名前になる
										type: "string",
										label: "〇FontColor",
										defaultValue: "black",
										expression: "optional"
									},
									marux1e:{
										type: "boolean",
										component: "switch",
										label: "has horizontal line",
										ref: "settings.sLv1Summary1",
										options: [{value: true,label: "On"}, {value: false,label: "Not on"}],
										defaultValue: false
									},
									marux1s:{
										ref: "settings.sLv1StandOut1",
										type: "boolean",
										component: "switch",
										label: "Stand Out Band",
										options: [{value: true,label: "On"}, {value: false,label: "Not on"}],
										defaultValue: false
									},
									marux1blink:{
										ref: "settings.sLv1Blink1", // APIで使える名前になる
										type: "string",
										label: "Blink Condition true/false(alert)",
										defaultValue: "false",
										expression: "optional"
									},
//									marux1u:{
//										ref: "settings.sLv1SheetId1", // シートIDを指定できる
//										type: "string",
//										label: "Sheet ID",
//										defaultValue: "",
//										expression: "optional"
//									},
									
									marux2:{
										ref: "settings.sLv1Rowspan2", // APIで使える名前になる
										type: "integer",
										label: "2.===★rowspan2★============",
										defaultValue: "99",
										min: 1,
										max: 100,
										expression: "optional"
									},
									marux2b:{
										ref: "settings.sLv1RowName2", // APIで使える名前になる
										type: "string",
										label: "Lv-1 caption 2nd row",
										defaultValue: "Lv1 2nd",
										expression: "optional"
									},
									marux2c:{
										type: "string",
										component: "radiobuttons",
										label: "align",
										ref: "settings.sLv1Align2",
										options: [{value: "left",label: "left"}, {value: "center",label: "center"}, {value: "right",label: "right"}],
										defaultValue: "center"
									},
									marux2v:{
										type: "string",
										component: "radiobuttons",
										label: "valign",
										ref: "settings.sLv1VertiAlign2",
										options: [{value: "top",label: "top"}, {value: "middle",label: "middle"}, {value: "bottom",label: "bottom"}],
										defaultValue: "middle"
									},
									marux2d:{
										ref: "settings.sLv1BGC2", // APIで使える名前になる
										type: "string",
										label: "●BackGroundColor",
										defaultValue: "lightyellow",
										expression: "optional"
									},
									marux2f:{
										ref: "settings.sLv1FGC2", // APIで使える名前になる
										type: "string",
										label: "〇FontColor",
										defaultValue: "black",
										expression: "optional"
									},
									marux2e:{
										type: "boolean",
										component: "switch",
										label: "has horizontal line",
										ref: "settings.sLv1Summary2",
										options: [{value: true,label: "On"}, {value: false,label: "Not on"}],
										defaultValue: false
									},
									marux2s:{
										ref: "settings.sLv1StandOut2",
										type: "boolean",
										component: "switch",
										label: "Stand Out Band",
										options: [{value: true,label: "On"}, {value: false,label: "Not on"}],
										defaultValue: false
									},
									marux2blink:{
										ref: "settings.sLv1Blink2", // APIで使える名前になる
										type: "string",
										label: "Blink Condition true/false(alert)",
										defaultValue: "false",
										expression: "optional"
									},
//									marux2u:{
//										ref: "settings.sLv1SheetId2", // シートIDを指定できる
//										type: "string",
//										label: "Sheet ID",
//										defaultValue: "",
//										expression: "optional"
//									},
									
									marux3:{
										ref: "settings.sLv1Rowspan3", // APIで使える名前になる
										type: "integer",
										label: "3.===★rowspan3★============",
										defaultValue: "99",
										min: 1,
										max: 100,
										expression: "optional"
									},
									marux3b:{
										ref: "settings.sLv1RowName3", // APIで使える名前になる
										type: "string",
										label: "Lv-1 caption 3rd row",
										defaultValue: "Lv1 3rd",
										expression: "optional"
									},
									marux3c:{
										type: "string",
										component: "radiobuttons",
										label: "align",
										ref: "settings.sLv1Align3",
										options: [{value: "left",label: "left"}, {value: "center",label: "center"}, {value: "right",label: "right"}],
										defaultValue: "center"
									},
									marux3v:{
										type: "string",
										component: "radiobuttons",
										label: "valign",
										ref: "settings.sLv1VertiAlign3",
										options: [{value: "top",label: "top"}, {value: "middle",label: "middle"}, {value: "bottom",label: "bottom"}],
										defaultValue: "middle"
									},
									marux3d:{
										ref: "settings.sLv1BGC3", // APIで使える名前になる
										type: "string",
										label: "●BackGroundColor",
										defaultValue: "aliceblue",
										expression: "optional"
									},
									marux3f:{
										ref: "settings.sLv1FGC3", // APIで使える名前になる
										type: "string",
										label: "〇FontColor",
										defaultValue: "black",
										expression: "optional"
									},
									marux3e:{
										type: "boolean",
										component: "switch",
										label: "has horizontal line",
										ref: "settings.sLv1Summary3",
										options: [{value: true,label: "On"}, {value: false,label: "Not on"}],
										defaultValue: false
									},
									marux3s:{
										ref: "settings.sLv1StandOut3",
										type: "boolean",
										component: "switch",
										label: "Stand Out Band",
										options: [{value: true,label: "On"}, {value: false,label: "Not on"}],
										defaultValue: false
									},
									marux3blink:{
										ref: "settings.sLv1Blink3", // APIで使える名前になる
										type: "string",
										label: "Blink Condition true/false(alert)",
										defaultValue: "false",
										expression: "optional"
									},
//									marux3u:{
//										ref: "settings.sLv1SheetId3", // シートIDを指定できる
//										type: "string",
//										label: "Sheet ID",
//										defaultValue: "",
//										expression: "optional"
//									},
									
									marux4:{
										ref: "settings.sLv1Rowspan4", // APIで使える名前になる
										type: "integer",
										label: "4.===★rowspan4★============",
										defaultValue: "99",
										min: 1,
										max: 100,
										expression: "optional"
									},
									marux4b:{
										ref: "settings.sLv1RowName4", // APIで使える名前になる
										type: "string",
										label: "Lv-1 caption 4th row",
										defaultValue: "Lv1 4th",
										expression: "optional"
									},
									marux4c:{
										type: "string",
										component: "radiobuttons",
										label: "align",
										ref: "settings.sLv1Align4",
										options: [{value: "left",label: "left"}, {value: "center",label: "center"}, {value: "right",label: "right"}],
										defaultValue: "center"
									},
									marux4v:{
										type: "string",
										component: "radiobuttons",
										label: "valign",
										ref: "settings.sLv1VertiAlign4",
										options: [{value: "top",label: "top"}, {value: "middle",label: "middle"}, {value: "bottom",label: "bottom"}],
										defaultValue: "middle"
									},
									marux4d:{
										ref: "settings.sLv1BGC4", // APIで使える名前になる
										type: "string",
										label: "●BackGroundColor",
										defaultValue: "lightyellow",
										expression: "optional"
									},
									marux4f:{
										ref: "settings.sLv1FGC4", // APIで使える名前になる
										type: "string",
										label: "〇FontColor",
										defaultValue: "black",
										expression: "optional"
									},
									marux4e:{
										type: "boolean",
										component: "switch",
										label: "has horizontal line",
										ref: "settings.sLv1Summary4",
										options: [{value: true,label: "On"}, {value: false,label: "Not on"}],
										defaultValue: false
									},
									marux4s:{
										ref: "settings.sLv1StandOut4",
										type: "boolean",
										component: "switch",
										label: "Stand Out Band",
										options: [{value: true,label: "On"}, {value: false,label: "Not on"}],
										defaultValue: false
									},
									marux4blink:{
										ref: "settings.sLv1Blink4", // APIで使える名前になる
										type: "string",
										label: "Blink Condition true/false(alert)",
										defaultValue: "false",
										expression: "optional"
									},
//									marux4u:{
//										ref: "settings.sLv1SheetId4", // シートIDを指定できる
//										type: "string",
//										label: "Sheet ID",
//										defaultValue: "",
//										expression: "optional"
//									},
									
									marux5:{
										ref: "settings.sLv1Rowspan5", // APIで使える名前になる
										type: "integer",
										label: "5.===★rowspan5★============",
										defaultValue: "99",
										min: 1,
										max: 100,
										expression: "optional"
									},
									marux5b:{
										ref: "settings.sLv1RowName5", // APIで使える名前になる
										type: "string",
										label: "Lv-1 caption 5th row",
										defaultValue: "Lv1 5th",
										expression: "optional"
									},
									marux5c:{
										type: "string",
										component: "radiobuttons",
										label: "align",
										ref: "settings.sLv1Align5",
										options: [{value: "left",label: "left"}, {value: "center",label: "center"}, {value: "right",label: "right"}],
										defaultValue: "center"
									},
									marux5v:{
										type: "string",
										component: "radiobuttons",
										label: "valign",
										ref: "settings.sLv1VertiAlign5",
										options: [{value: "top",label: "top"}, {value: "middle",label: "middle"}, {value: "bottom",label: "bottom"}],
										defaultValue: "middle"
									},
									marux5d:{
										ref: "settings.sLv1BGC5", // APIで使える名前になる
										type: "string",
										label: "●BackGroundColor",
										defaultValue: "aliceblue",
										expression: "optional"
									},
									marux5f:{
										ref: "settings.sLv1FGC5", // APIで使える名前になる
										type: "string",
										label: "〇FontColor",
										defaultValue: "black",
										expression: "optional"
									},
									marux5e:{
										type: "boolean",
										component: "switch",
										label: "has horizontal line",
										ref: "settings.sLv1Summary5",
										options: [{value: true,label: "On"}, {value: false,label: "Not on"}],
										defaultValue: false
									},
									marux5s:{
										ref: "settings.sLv1StandOut5",
										type: "boolean",
										component: "switch",
										label: "Stand Out Band",
										options: [{value: true,label: "On"}, {value: false,label: "Not on"}],
										defaultValue: false
									},
									marux5blink:{
										ref: "settings.sLv1Blink5", // APIで使える名前になる
										type: "string",
										label: "Blink Condition true/false(alert)",
										defaultValue: "false",
										expression: "optional"
									},
//									marux5u:{
//										ref: "settings.sLv1SheetId5", // シートIDを指定できる
//										type: "string",
//										label: "Sheet ID",
//										defaultValue: "",
//										expression: "optional"
//									},
									
									marux6:{
										ref: "settings.sLv1Rowspan6", // APIで使える名前になる
										type: "integer",
										label: "6.===★rowspan6★============",
										defaultValue: "99",
										min: 1,
										max: 100,
										expression: "optional"
									},
									marux6b:{
										ref: "settings.sLv1RowName6", // APIで使える名前になる
										type: "string",
										label: "Lv-1 caption 6th row",
										defaultValue: "Lv1 6th",
										expression: "optional"
									},
									marux6c:{
										type: "string",
										component: "radiobuttons",
										label: "align",
										ref: "settings.sLv1Align6",
										options: [{value: "left",label: "left"}, {value: "center",label: "center"}, {value: "right",label: "right"}],
										defaultValue: "center"
									},
									marux6v:{
										type: "string",
										component: "radiobuttons",
										label: "valign",
										ref: "settings.sLv1VertiAlign6",
										options: [{value: "top",label: "top"}, {value: "middle",label: "middle"}, {value: "bottom",label: "bottom"}],
										defaultValue: "middle"
									},
									marux6d:{
										ref: "settings.sLv1BGC6", // APIで使える名前になる
										type: "string",
										label: "●BackGroundColor",
										defaultValue: "lightyellow",
										expression: "optional"
									},
									marux6f:{
										ref: "settings.sLv1FGC6", // APIで使える名前になる
										type: "string",
										label: "〇FontColor",
										defaultValue: "black",
										expression: "optional"
									},
									marux6e:{
										type: "boolean",
										component: "switch",
										label: "has horizontal line",
										ref: "settings.sLv1Summary6",
										options: [{value: true,label: "On"}, {value: false,label: "Not on"}],
										defaultValue: false
									},
									marux6s:{
										ref: "settings.sLv1StandOut6",
										type: "boolean",
										component: "switch",
										label: "Stand Out Band",
										options: [{value: true,label: "On"}, {value: false,label: "Not on"}],
										defaultValue: false
									},
									marux6blink:{
										ref: "settings.sLv1Blink6", // APIで使える名前になる
										type: "string",
										label: "Blink Condition true/false(alert)",
										defaultValue: "false",
										expression: "optional"
									},
//									marux6u:{
//										ref: "settings.sLv1SheetId6", // シートIDを指定できる
//										type: "string",
//										label: "Sheet ID",
//										defaultValue: "",
//										expression: "optional"
//									},
									
									marux7:{
										ref: "settings.sLv1Rowspan7", // APIで使える名前になる
										type: "integer",
										label: "7.===★rowspan7★============",
										defaultValue: "99",
										min: 1,
										max: 100,
										expression: "optional"
									},
									marux7b:{
										ref: "settings.sLv1RowName7", // APIで使える名前になる
										type: "string",
										label: "Lv-1 caption 7th row",
										defaultValue: "Lv1 7th",
										expression: "optional"
									},
									marux7c:{
										type: "string",
										component: "radiobuttons",
										label: "align",
										ref: "settings.sLv1Align7",
										options: [{value: "left",label: "left"}, {value: "center",label: "center"}, {value: "right",label: "right"}],
										defaultValue: "center"
									},
									marux7v:{
										type: "string",
										component: "radiobuttons",
										label: "valign",
										ref: "settings.sLv1VertiAlign7",
										options: [{value: "top",label: "top"}, {value: "middle",label: "middle"}, {value: "bottom",label: "bottom"}],
										defaultValue: "middle"
									},
									marux7d:{
										ref: "settings.sLv1BGC7", // APIで使える名前になる
										type: "string",
										label: "●BackGroundColor",
										defaultValue: "aliceblue",
										expression: "optional"
									},
									marux7f:{
										ref: "settings.sLv1FGC7", // APIで使える名前になる
										type: "string",
										label: "〇FontColor",
										defaultValue: "black",
										expression: "optional"
									},
									marux7e:{
										type: "boolean",
										component: "switch",
										label: "has horizontal line",
										ref: "settings.sLv1Summary7",
										options: [{value: true,label: "On"}, {value: false,label: "Not on"}],
										defaultValue: false
									},
									marux7s:{
										ref: "settings.sLv1StandOut7",
										type: "boolean",
										component: "switch",
										label: "Stand Out Band",
										options: [{value: true,label: "On"}, {value: false,label: "Not on"}],
										defaultValue: false
									},
									marux7blink:{
										ref: "settings.sLv1Blink7", // APIで使える名前になる
										type: "string",
										label: "Blink Condition true/false(alert)",
										defaultValue: "false",
										expression: "optional"
									},
//									marux7u:{
//										ref: "settings.sLv1SheetId7", // シートIDを指定できる
//										type: "string",
//										label: "Sheet ID",
//										defaultValue: "",
//										expression: "optional"
//									},
									
									marux8:{
										ref: "settings.sLv1Rowspan8", // APIで使える名前になる
										type: "integer",
										label: "8.===★rowspan8★============",
										defaultValue: "99",
										min: 1,
										max: 100,
										expression: "optional"
									},
									marux8b:{
										ref: "settings.sLv1RowName8", // APIで使える名前になる
										type: "string",
										label: "Lv-1 caption 8th row",
										defaultValue: "Lv1 8th",
										expression: "optional"
									},
									marux8c:{
										type: "string",
										component: "radiobuttons",
										label: "align",
										ref: "settings.sLv1Align8",
										options: [{value: "left",label: "left"}, {value: "center",label: "center"}, {value: "right",label: "right"}],
										defaultValue: "center"
									},
									marux8v:{
										type: "string",
										component: "radiobuttons",
										label: "valign",
										ref: "settings.sLv1VertiAlign8",
										options: [{value: "top",label: "top"}, {value: "middle",label: "middle"}, {value: "bottom",label: "bottom"}],
										defaultValue: "middle"
									},
									marux8d:{
										ref: "settings.sLv1BGC8", // APIで使える名前になる
										type: "string",
										label: "●BackGroundColor",
										defaultValue: "lightyellow",
										expression: "optional"
									},
									marux8f:{
										ref: "settings.sLv1FGC8", // APIで使える名前になる
										type: "string",
										label: "〇FontColor",
										defaultValue: "black",
										expression: "optional"
									},
									marux8e:{
										type: "boolean",
										component: "switch",
										label: "has horizontal line",
										ref: "settings.sLv1Summary8",
										options: [{value: true,label: "On"}, {value: false,label: "Not on"}],
										defaultValue: false
									},
									marux8s:{
										ref: "settings.sLv1StandOut8",
										type: "boolean",
										component: "switch",
										label: "Stand Out Band",
										options: [{value: true,label: "On"}, {value: false,label: "Not on"}],
										defaultValue: false
									},
									marux8blink:{
										ref: "settings.sLv1Blink8", // APIで使える名前になる
										type: "string",
										label: "Blink Condition true/false(alert)",
										defaultValue: "false",
										expression: "optional"
									},
//									marux8u:{
//										ref: "settings.sLv1SheetId8", // シートIDを指定できる
//										type: "string",
//										label: "Sheet ID",
//										defaultValue: "",
//										expression: "optional"
//									},
									
									marux9:{
										ref: "settings.sLv1Rowspan9", // APIで使える名前になる
										type: "integer",
										label: "9.===★rowspan9★============",
										defaultValue: "99",
										min: 1,
										max: 100,
										expression: "optional"
									},
									marux9b:{
										ref: "settings.sLv1RowName9", // APIで使える名前になる
										type: "string",
										label: "Lv-1 caption 9th row",
										defaultValue: "Lv1 9th",
										expression: "optional"
									},
									marux9c:{
										type: "string",
										component: "radiobuttons",
										label: "align",
										ref: "settings.sLv1Align9",
										options: [{value: "left",label: "left"}, {value: "center",label: "center"}, {value: "right",label: "right"}],
										defaultValue: "center"
									},
									marux9v:{
										type: "string",
										component: "radiobuttons",
										label: "valign",
										ref: "settings.sLv1VertiAlign9",
										options: [{value: "top",label: "top"}, {value: "middle",label: "middle"}, {value: "bottom",label: "bottom"}],
										defaultValue: "middle"
									},
									marux9d:{
										ref: "settings.sLv1BGC9", // APIで使える名前になる
										type: "string",
										label: "●BackGroundColor",
										defaultValue: "aliceblue",
										expression: "optional"
									},
									marux9f:{
										ref: "settings.sLv1FGC9", // APIで使える名前になる
										type: "string",
										label: "〇FontColor",
										defaultValue: "black",
										expression: "optional"
									},
									marux9e:{
										type: "boolean",
										component: "switch",
										label: "has horizontal line",
										ref: "settings.sLv1Summary9",
										options: [{value: true,label: "On"}, {value: false,label: "Not on"}],
										defaultValue: false
									},
									marux9s:{
										ref: "settings.sLv1StandOut9",
										type: "boolean",
										component: "switch",
										label: "Stand Out Band",
										options: [{value: true,label: "On"}, {value: false,label: "Not on"}],
										defaultValue: false
									},
									marux9blink:{
										ref: "settings.sLv1Blink9", // APIで使える名前になる
										type: "string",
										label: "Blink Condition true/false(alert)",
										defaultValue: "false",
										expression: "optional"
									},
//									marux9u:{
//										ref: "settings.sLv1SheetId9", // シートIDを指定できる
//										type: "string",
//										label: "Sheet ID",
//										defaultValue: "",
//										expression: "optional"
//									},
									
									marux10:{
										ref: "settings.sLv1Rowspan10", // APIで使える名前になる
										type: "integer",
										label: "10.===★rowspan10★============",
										defaultValue: "99",
										min: 1,
										max: 100,
										expression: "optional"
									},
									marux10b:{
										ref: "settings.sLv1RowName10", // APIで使える名前になる
										type: "string",
										label: "Lv-1 caption 10th row",
										defaultValue: "Lv1 10th",
										expression: "optional"
									},
									marux10c:{
										type: "string",
										component: "radiobuttons",
										label: "align",
										ref: "settings.sLv1Align10",
										options: [{value: "left",label: "left"}, {value: "center",label: "center"}, {value: "right",label: "right"}],
										defaultValue: "center"
									},
									marux10v:{
										type: "string",
										component: "radiobuttons",
										label: "valign",
										ref: "settings.sLv1VertiAlign10",
										options: [{value: "top",label: "top"}, {value: "middle",label: "middle"}, {value: "bottom",label: "bottom"}],
										defaultValue: "middle"
									},
									marux10d:{
										ref: "settings.sLv1BGC10", // APIで使える名前になる
										type: "string",
										label: "●BackGroundColor",
										defaultValue: "lightyellow",
										expression: "optional"
									},
									marux10f:{
										ref: "settings.sLv1FGC10", // APIで使える名前になる
										type: "string",
										label: "〇FontColor",
										defaultValue: "black",
										expression: "optional"
									},
									marux10e:{
										type: "boolean",
										component: "switch",
										label: "has horizontal line",
										ref: "settings.sLv1Summary10",
										options: [{value: true,label: "On"}, {value: false,label: "Not on"}],
										defaultValue: false
									},
									marux10s:{
										ref: "settings.sLv1StandOut10",
										type: "boolean",
										component: "switch",
										label: "Stand Out Band",
										options: [{value: true,label: "On"}, {value: false,label: "Not on"}],
										defaultValue: false
									},
									marux10blink:{
										ref: "settings.sLv1Blink10", // APIで使える名前になる
										type: "string",
										label: "Blink Condition true/false(alert)",
										defaultValue: "false",
										expression: "optional"
									},
//									marux10u:{
//										ref: "settings.sLv1SheetId10", // シートIDを指定できる
//										type: "string",
//										label: "Sheet ID",
//										defaultValue: "",
//										expression: "optional"
//									},
									
									marux11:{
										ref: "settings.sLv1Rowspan11", // APIで使える名前になる
										type: "integer",
										label: "11.===★rowspan11★============",
										defaultValue: "99",
										min: 1,
										max: 100,
										expression: "optional"
									},
									marux11b:{
										ref: "settings.sLv1RowName11", // APIで使える名前になる
										type: "string",
										label: "Lv-1 caption 11th row",
										defaultValue: "Lv1 11th",
										expression: "optional"
									},
									marux11c:{
										type: "string",
										component: "radiobuttons",
										label: "align",
										ref: "settings.sLv1Align11",
										options: [{value: "left",label: "left"}, {value: "center",label: "center"}, {value: "right",label: "right"}],
										defaultValue: "center"
									},
									marux11v:{
										type: "string",
										component: "radiobuttons",
										label: "valign",
										ref: "settings.sLv1VertiAlign11",
										options: [{value: "top",label: "top"}, {value: "middle",label: "middle"}, {value: "bottom",label: "bottom"}],
										defaultValue: "middle"
									},
									marux11d:{
										ref: "settings.sLv1BGC11", // APIで使える名前になる
										type: "string",
										label: "●BackGroundColor",
										defaultValue: "aliceblue",
										expression: "optional"
									},
									marux11f:{
										ref: "settings.sLv1FGC11", // APIで使える名前になる
										type: "string",
										label: "〇FontColor",
										defaultValue: "black",
										expression: "optional"
									},
									marux11e:{
										type: "boolean",
										component: "switch",
										label: "has horizontal line",
										ref: "settings.sLv1Summary11",
										options: [{value: true,label: "On"}, {value: false,label: "Not on"}],
										defaultValue: false
									},
									marux11s:{
										ref: "settings.sLv1StandOut11",
										type: "boolean",
										component: "switch",
										label: "Stand Out Band",
										options: [{value: true,label: "On"}, {value: false,label: "Not on"}],
										defaultValue: false
									},
									marux11blink:{
										ref: "settings.sLv1Blink11", // APIで使える名前になる
										type: "string",
										label: "Blink Condition true/false(alert)",
										defaultValue: "false",
										expression: "optional"
									},
//									marux11u:{
//										ref: "settings.sLv1SheetId11", // シートIDを指定できる
//										type: "string",
//										label: "Sheet ID",
//										defaultValue: "",
//										expression: "optional"
//									},
									
									
									marux12:{
										ref: "settings.sLv1Rowspan12", // APIで使える名前になる
										type: "integer",
										label: "12.===★rowspan12★============",
										defaultValue: "99",
										min: 1,
										max: 100,
										expression: "optional"
									},
									marux12b:{
										ref: "settings.sLv1RowName12", // APIで使える名前になる
										type: "string",
										label: "Lv-1 caption 12th row",
										defaultValue: "Lv1 12th",
										expression: "optional"
									},
									marux12c:{
										type: "string",
										component: "radiobuttons",
										label: "align",
										ref: "settings.sLv1Align12",
										options: [{value: "left",label: "left"}, {value: "center",label: "center"}, {value: "right",label: "right"}],
										defaultValue: "center"
									},
									marux12v:{
										type: "string",
										component: "radiobuttons",
										label: "valign",
										ref: "settings.sLv1VertiAlign12",
										options: [{value: "top",label: "top"}, {value: "middle",label: "middle"}, {value: "bottom",label: "bottom"}],
										defaultValue: "middle"
									},
									marux12d:{
										ref: "settings.sLv1BGC12", // APIで使える名前になる
										type: "string",
										label: "●BackGroundColor",
										defaultValue: "lightyellow",
										expression: "optional"
									},
									marux12f:{
										ref: "settings.sLv1FGC12", // APIで使える名前になる
										type: "string",
										label: "〇FontColor",
										defaultValue: "black",
										expression: "optional"
									},
									marux12e:{
										type: "boolean",
										component: "switch",
										label: "has horizontal line",
										ref: "settings.sLv1Summary12",
										options: [{value: true,label: "On"}, {value: false,label: "Not on"}],
										defaultValue: false
									},
									marux12s:{
										ref: "settings.sLv1StandOut12",
										type: "boolean",
										component: "switch",
										label: "Stand Out Band",
										options: [{value: true,label: "On"}, {value: false,label: "Not on"}],
										defaultValue: false
									},
									marux12blink:{
										ref: "settings.sLv1Blink12", // APIで使える名前になる
										type: "string",
										label: "Blink Condition true/false(alert)",
										defaultValue: "false",
										expression: "optional"
									},
//									marux12u:{
//										ref: "settings.sLv1SheetId12", // シートIDを指定できる
//										type: "string",
//										label: "Sheet ID",
//										defaultValue: "",
//										expression: "optional"
//									},

									marux13:{
										ref: "settings.sLv1Rowspan13", // APIで使える名前になる
										type: "integer",
										label: "13.===★rowspan13★============",
										defaultValue: "99",
										min: 1,
										max: 100,
										expression: "optional"
									},
									marux13b:{
										ref: "settings.sLv1RowName13", // APIで使える名前になる
										type: "string",
										label: "Lv-1 caption 13th row",
										defaultValue: "Lv1 13th",
										expression: "optional"
									},
									marux13c:{
										type: "string",
										component: "radiobuttons",
										label: "align",
										ref: "settings.sLv1Align13",
										options: [{value: "left",label: "left"}, {value: "center",label: "center"}, {value: "right",label: "right"}],
										defaultValue: "center"
									},
									marux13v:{
										type: "string",
										component: "radiobuttons",
										label: "valign",
										ref: "settings.sLv1VertiAlign13",
										options: [{value: "top",label: "top"}, {value: "middle",label: "middle"}, {value: "bottom",label: "bottom"}],
										defaultValue: "middle"
									},
									marux13d:{
										ref: "settings.sLv1BGC13", // APIで使える名前になる
										type: "string",
										label: "●BackGroundColor",
										defaultValue: "aliceblue",
										expression: "optional"
									},
									marux13f:{
										ref: "settings.sLv1FGC13", // APIで使える名前になる
										type: "string",
										label: "〇FontColor",
										defaultValue: "black",
										expression: "optional"
									},
									marux13e:{
										type: "boolean",
										component: "switch",
										label: "has horizontal line",
										ref: "settings.sLv1Summary13",
										options: [{value: true,label: "On"}, {value: false,label: "Not on"}],
										defaultValue: false
									},
									marux13s:{
										ref: "settings.sLv1StandOut13",
										type: "boolean",
										component: "switch",
										label: "Stand Out Band",
										options: [{value: true,label: "On"}, {value: false,label: "Not on"}],
										defaultValue: false
									},
									marux13blink:{
										ref: "settings.sLv1Blink13", // APIで使える名前になる
										type: "string",
										label: "Blink Condition true/false(alert)",
										defaultValue: "false",
										expression: "optional"
									},
//									marux13u:{
//										ref: "settings.sLv1SheetId13", // シートIDを指定できる
//										type: "string",
//										label: "Sheet ID",
//										defaultValue: "",
//										expression: "optional"
//									},

									marux14:{
										ref: "settings.sLv1Rowspan14", // APIで使える名前になる
										type: "integer",
										label: "14.===★rowspan14★============",
										defaultValue: "99",
										min: 1,
										max: 100,
										expression: "optional"
									},
									marux14b:{
										ref: "settings.sLv1RowName14", // APIで使える名前になる
										type: "string",
										label: "Lv-1 caption 14th row",
										defaultValue: "Lv1 14th",
										expression: "optional"
									},
									marux14c:{
										type: "string",
										component: "radiobuttons",
										label: "align",
										ref: "settings.sLv1Align14",
										options: [{value: "left",label: "left"}, {value: "center",label: "center"}, {value: "right",label: "right"}],
										defaultValue: "center"
									},
									marux14v:{
										type: "string",
										component: "radiobuttons",
										label: "valign",
										ref: "settings.sLv1VertiAlign14",
										options: [{value: "top",label: "top"}, {value: "middle",label: "middle"}, {value: "bottom",label: "bottom"}],
										defaultValue: "middle"
									},
									marux14d:{
										ref: "settings.sLv1BGC14", // APIで使える名前になる
										type: "string",
										label: "●BackGroundColor",
										defaultValue: "lightyellow",
										expression: "optional"
									},
									marux14f:{
										ref: "settings.sLv1FGC14", // APIで使える名前になる
										type: "string",
										label: "〇FontColor",
										defaultValue: "black",
										expression: "optional"
									},
									marux14e:{
										type: "boolean",
										component: "switch",
										label: "has horizontal line",
										ref: "settings.sLv1Summary14",
										options: [{value: true,label: "On"}, {value: false,label: "Not on"}],
										defaultValue: false
									},
									marux14s:{
										ref: "settings.sLv1StandOut14",
										type: "boolean",
										component: "switch",
										label: "Stand Out Band",
										options: [{value: true,label: "On"}, {value: false,label: "Not on"}],
										defaultValue: false
									},
									marux14blink:{
										ref: "settings.sLv1Blink14", // APIで使える名前になる
										type: "string",
										label: "Blink Condition true/false(alert)",
										defaultValue: "false",
										expression: "optional"
									},
//									marux14u:{
//										ref: "settings.sLv1SheetId14", // シートIDを指定できる
//										type: "string",
//										label: "Sheet ID",
//										defaultValue: "",
//										expression: "optional"
//									},

									marux15:{
										ref: "settings.sLv1Rowspan15", // APIで使える名前になる
										type: "integer",
										label: "15.===★rowspan15★============",
										defaultValue: "99",
										min: 1,
										max: 100,
										expression: "optional"
									},
									marux15b:{
										ref: "settings.sLv1RowName15", // APIで使える名前になる
										type: "string",
										label: "Lv-1 caption 15th row",
										defaultValue: "Lv1 15th",
										expression: "optional"
									},
									marux15c:{
										type: "string",
										component: "radiobuttons",
										label: "align",
										ref: "settings.sLv1Align15",
										options: [{value: "left",label: "left"}, {value: "center",label: "center"}, {value: "right",label: "right"}],
										defaultValue: "center"
									},
									marux15v:{
										type: "string",
										component: "radiobuttons",
										label: "valign",
										ref: "settings.sLv1VertiAlign15",
										options: [{value: "top",label: "top"}, {value: "middle",label: "middle"}, {value: "bottom",label: "bottom"}],
										defaultValue: "middle"
									},
									marux15d:{
										ref: "settings.sLv1BGC15", // APIで使える名前になる
										type: "string",
										label: "●BackGroundColor",
										defaultValue: "aliceblue",
										expression: "optional"
									},
									marux15f:{
										ref: "settings.sLv1FGC15", // APIで使える名前になる
										type: "string",
										label: "〇FontColor",
										defaultValue: "black",
										expression: "optional"
									},
									marux15e:{
										type: "boolean",
										component: "switch",
										label: "has horizontal line",
										ref: "settings.sLv1Summary15",
										options: [{value: true,label: "On"}, {value: false,label: "Not on"}],
										defaultValue: false
									},
									marux15s:{
										ref: "settings.sLv1StandOut15",
										type: "boolean",
										component: "switch",
										label: "Stand Out Band",
										options: [{value: true,label: "On"}, {value: false,label: "Not on"}],
										defaultValue: false
									},
									marux15blink:{
										ref: "settings.sLv1Blink15", // APIで使える名前になる
										type: "string",
										label: "Blink Condition true/false(alert)",
										defaultValue: "false",
										expression: "optional"
									},
//									marux15u:{
//										ref: "settings.sLv1SheetId15", // シートIDを指定できる
//										type: "string",
//										label: "Sheet ID",
//										defaultValue: "",
//										expression: "optional"
//									},

									marux16:{
										ref: "settings.sLv1Rowspan16", // APIで使える名前になる
										type: "integer",
										label: "16.===★rowspan16★============",
										defaultValue: "99",
										min: 1,
										max: 100,
										expression: "optional"
									},
									marux16b:{
										ref: "settings.sLv1RowName16", // APIで使える名前になる
										type: "string",
										label: "Lv-1 caption 16th row",
										defaultValue: "Lv1 16th",
										expression: "optional"
									},
									marux16c:{
										type: "string",
										component: "radiobuttons",
										label: "align",
										ref: "settings.sLv1Align16",
										options: [{value: "left",label: "left"}, {value: "center",label: "center"}, {value: "right",label: "right"}],
										defaultValue: "center"
									},
									marux16v:{
										type: "string",
										component: "radiobuttons",
										label: "valign",
										ref: "settings.sLv1VertiAlign16",
										options: [{value: "top",label: "top"}, {value: "middle",label: "middle"}, {value: "bottom",label: "bottom"}],
										defaultValue: "middle"
									},
									marux16d:{
										ref: "settings.sLv1BGC16", // APIで使える名前になる
										type: "string",
										label: "●BackGroundColor",
										defaultValue: "lightyellow",
										expression: "optional"
									},
									marux16f:{
										ref: "settings.sLv1FGC16", // APIで使える名前になる
										type: "string",
										label: "〇FontColor",
										defaultValue: "black",
										expression: "optional"
									},
									marux16e:{
										type: "boolean",
										component: "switch",
										label: "has horizontal line",
										ref: "settings.sLv1Summary16",
										options: [{value: true,label: "On"}, {value: false,label: "Not on"}],
										defaultValue: false
									},
									marux16s:{
										ref: "settings.sLv1StandOut16",
										type: "boolean",
										component: "switch",
										label: "Stand Out Band",
										options: [{value: true,label: "On"}, {value: false,label: "Not on"}],
										defaultValue: false
									},
									marux16blink:{
										ref: "settings.sLv1Blink16", // APIで使える名前になる
										type: "string",
										label: "Blink Condition true/false(alert)",
										defaultValue: "false",
										expression: "optional"
									},
//									marux16u:{
//										ref: "settings.sLv1SheetId16", // シートIDを指定できる
//										type: "string",
//										label: "Sheet ID",
//										defaultValue: "",
//										expression: "optional"
//									},

									marux17:{
										ref: "settings.sLv1Rowspan17", // APIで使える名前になる
										type: "integer",
										label: "17.===★rowspan17★============",
										defaultValue: "99",
										min: 1,
										max: 100,
										expression: "optional"
									},
									marux17b:{
										ref: "settings.sLv1RowName17", // APIで使える名前になる
										type: "string",
										label: "Lv-1 caption 17th row",
										defaultValue: "Lv1 17th(bottom)",
										expression: "optional"
									},
									marux17c:{
										type: "string",
										component: "radiobuttons",
										label: "align",
										ref: "settings.sLv1Align17",
										options: [{value: "left",label: "left"}, {value: "center",label: "center"}, {value: "right",label: "right"}],
										defaultValue: "center"
									},
									marux17v:{
										type: "string",
										component: "radiobuttons",
										label: "valign",
										ref: "settings.sLv1VertiAlign17",
										options: [{value: "top",label: "top"}, {value: "middle",label: "middle"}, {value: "bottom",label: "bottom"}],
										defaultValue: "middle"
									},
									marux17d:{
										ref: "settings.sLv1BGC17", // APIで使える名前になる
										type: "string",
										label: "●BackGroundColor",
										defaultValue: "aliceblue",
										expression: "optional"
									},
									marux17f:{
										ref: "settings.sLv1FGC17", // APIで使える名前になる
										type: "string",
										label: "〇FontColor",
										defaultValue: "black",
										expression: "optional"
									},
									marux17e:{
										type: "boolean",
										component: "switch",
										label: "has horizontal line",
										ref: "settings.sLv1Summary17",
										options: [{value: true,label: "On"}, {value: false,label: "Not on"}],
										defaultValue: false
									},
									marux17s:{
										ref: "settings.sLv1StandOut17",
										type: "boolean",
										component: "switch",
										label: "Stand Out Band",
										options: [{value: true,label: "On"}, {value: false,label: "Not on"}],
										defaultValue: false
									},
									marux17blink:{
										ref: "settings.sLv1Blink17", // APIで使える名前になる
										type: "string",
										label: "Blink Condition true/false(alert)",
										defaultValue: "false",
										expression: "optional"
									},
//									marux17u:{
//										ref: "settings.sLv1SheetId17", // シートIDを指定できる
//										type: "string",
//										label: "Sheet ID",
//										defaultValue: "",
//										expression: "optional"
//									},

								}
							},
							
							
							
							maruProp51: {
								type: "items",
								label: "Lv-2 Groups",
								items: {
									maruxx100:{
										ref: "settings.bLv2WritingMode",
										type: "boolean",
										component: "switch",
										label: "■ Is Vertical Writing",
										options: [{value: true,label: "On"}, {value: false,label: "Not on"}],
										defaultValue: true
									},

									maruh0:{
										ref: "settings.sHeaderText0", // APIで使える名前になる
										type: "string",
										label: "■Header Text Lv2(1st col)★=======",
										defaultValue: "Lv2",
										expression: "optional"
									},
									maruh0b:{
										ref: "settings.sHeaderWidth0", // APIで使える名前になる
										type: "integer",
										label: "◆Width(px) of Lv-2 Col if 0 then hidden",
										defaultValue: "40",
										expression: "optional"
									},
									maruxx1:{
										ref: "settings.sLv2Rowspan1", // APIで使える名前になる
										type: "integer",
										label: "1.===★Lv2 Rowspan1★=======",
										defaultValue: "99",
										min: 1,
										max: 100,
										expression: "optional"
									},
									maruxx1b:{
										ref: "settings.sLv2RowName1", // APIで使える名前になる
										type: "string",
										label: "caption1",
										defaultValue: "Lv2 1st",
										expression: "optional"
									},
									maruxx1c:{
										type: "string",
										component: "radiobuttons",
										label: "align",
										ref: "settings.sLv2Align1",
										options: [{value: "left",label: "left"}, {value: "center",label: "center"}, {value: "right",label: "right"}],
										defaultValue: "center"
									},
									maruxx1v:{
										ref: "settings.sLv2VertiAlign1",
										type: "string",
										component: "radiobuttons",
										label: "valign",
										options: [{value: "top",label: "top"}, {value: "middle",label: "middle"}, {value: "bottom",label: "bottom"}],
										defaultValue: "middle"
									},
									maruxx1d:{
										ref: "settings.sLv2BGC1", // APIで使える名前になる
										type: "string",
										label: "●BackGroundColor",
										defaultValue: "greenyellow",
										expression: "optional"
									},
									maruxx1f:{
										ref: "settings.sLv2FGC1", // APIで使える名前になる
										type: "string",
										label: "〇FontColor",
										defaultValue: "black",
										expression: "optional"
									},
									
									maruxx2:{
										ref: "settings.sLv2Rowspan2", // APIで使える名前になる
										type: "integer",
										label: "2.===★Lv2 Rowspan2★=======",
										defaultValue: "99",
										min: 1,
										max: 100,
										expression: "optional"
									},
									maruxx2b:{
										ref: "settings.sLv2RowName2", // APIで使える名前になる
										type: "string",
										label: "caption2",
										defaultValue: "Lv2 2nd",
										expression: "optional"
									},
									maruxx2c:{
										type: "string",
										component: "radiobuttons",
										label: "align",
										ref: "settings.sLv2Align2",
										options: [{value: "left",label: "left"}, {value: "center",label: "center"}, {value: "right",label: "right"}],
										defaultValue: "center"
									},
									maruxx2v:{
										ref: "settings.sLv2VertiAlign2",
										type: "string",
										component: "radiobuttons",
										label: "valign",
										options: [{value: "top",label: "top"}, {value: "middle",label: "middle"}, {value: "bottom",label: "bottom"}],
										defaultValue: "middle"
									},
									maruxx2d:{
										ref: "settings.sLv2BGC2", // APIで使える名前になる
										type: "string",
										label: "●BackGroundColor",
										defaultValue: "lavenderblush",
										expression: "optional"
									},
									maruxx2f:{
										ref: "settings.sLv2FGC2", // APIで使える名前になる
										type: "string",
										label: "〇FontColor",
										defaultValue: "black",
										expression: "optional"
									},

									maruxx3:{
										ref: "settings.sLv2Rowspan3", // APIで使える名前になる
										type: "integer",
										label: "3.===★Lv2 Rowspan3★=======",
										defaultValue: "99",
										min: 1,
										max: 100,
										expression: "optional"
									},
									maruxx3b:{
										ref: "settings.sLv2RowName3", // APIで使える名前になる
										type: "string",
										label: "caption3",
										defaultValue: "Lv2 3rd",
										expression: "optional"
									},
									maruxx3c:{
										type: "string",
										component: "radiobuttons",
										label: "align",
										ref: "settings.sLv2Align3",
										options: [{value: "left",label: "left"}, {value: "center",label: "center"}, {value: "right",label: "right"}],
										defaultValue: "center"
									},
									maruxx3v:{
										ref: "settings.sLv2VertiAlign3",
										type: "string",
										component: "radiobuttons",
										label: "valign",
										options: [{value: "top",label: "top"}, {value: "middle",label: "middle"}, {value: "bottom",label: "bottom"}],
										defaultValue: "middle"
									},
									maruxx3d:{
										ref: "settings.sLv2BGC3", // APIで使える名前になる
										type: "string",
										label: "●BackGroundColor",
										defaultValue: "greenyellow",
										expression: "optional"
									},
									maruxx3f:{
										ref: "settings.sLv2FGC3", // APIで使える名前になる
										type: "string",
										label: "〇FontColor",
										defaultValue: "black",
										expression: "optional"
									},
									
									maruxx4:{
										ref: "settings.sLv2Rowspan4", // APIで使える名前になる
										type: "integer",
										label: "4.===★Lv2 Rowspan4★=======",
										defaultValue: "99",
										min: 1,
										max: 100,
										expression: "optional"
									},
									maruxx4b:{
										ref: "settings.sLv2RowName4", // APIで使える名前になる
										type: "string",
										label: "caption4",
										defaultValue: "Lv2 4th",
										expression: "optional"
									},
									maruxx4c:{
										type: "string",
										component: "radiobuttons",
										label: "align",
										ref: "settings.sLv2Align4",
										options: [{value: "left",label: "left"}, {value: "center",label: "center"}, {value: "right",label: "right"}],
										defaultValue: "center"
									},
									maruxx4v:{
										ref: "settings.sLv2VertiAlign4",
										type: "string",
										component: "radiobuttons",
										label: "valign",
										options: [{value: "top",label: "top"}, {value: "middle",label: "middle"}, {value: "bottom",label: "bottom"}],
										defaultValue: "middle"
									},
									maruxx4d:{
										ref: "settings.sLv2BGC4", // APIで使える名前になる
										type: "string",
										label: "●BackGroundColor",
										defaultValue: "lavenderblush",
										expression: "optional"
									},
									maruxx4f:{
										ref: "settings.sLv2FGC4", // APIで使える名前になる
										type: "string",
										label: "〇FontColor",
										defaultValue: "black",
										expression: "optional"
									},
									
									
									maruxx5:{
										ref: "settings.sLv2Rowspan5", // APIで使える名前になる
										type: "integer",
										label: "5.===★Lv2 Rowspan5★=======",
										defaultValue: "99",
										min: 1,
										max: 100,
										expression: "optional"
									},
									maruxx5b:{
										ref: "settings.sLv2RowName5", // APIで使える名前になる
										type: "string",
										label: "caption5",
										defaultValue: "Lv2 5th (bottom)",
										expression: "optional"
									},
									maruxx5c:{
										type: "string",
										component: "radiobuttons",
										label: "align",
										ref: "settings.sLv2Align5",
										options: [{value: "left",label: "left"}, {value: "center",label: "center"}, {value: "right",label: "right"}],
										defaultValue: "center"
									},
									maruxx5v:{
										ref: "settings.sLv2VertiAlign5",
										type: "string",
										component: "radiobuttons",
										label: "valign",
										options: [{value: "top",label: "top"}, {value: "middle",label: "middle"}, {value: "bottom",label: "bottom"}],
										defaultValue: "middle"
									},
									maruxx5d:{
										ref: "settings.sLv2BGC5", // APIで使える名前になる
										type: "string",
										label: "●BackGroundColor",
										defaultValue: "greenyellow",
										expression: "optional"
									},
									maruxx5f:{
										ref: "settings.sLv2FGC5", // APIで使える名前になる
										type: "string",
										label: "〇FontColor",
										defaultValue: "black",
										expression: "optional"
									},
									

									
								}	// <<<items
							},// <<<maruProp



							
						}	// <<<items
					}	// <<<appearancePanel:
					
				} // <<<items
		}	// <<<return
	}	// <<<function()
)	// <<<define

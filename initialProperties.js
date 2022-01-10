// # Author
// Katsuaki Maruno
// 
// # Copyright©
// Copyright(c) 2021-2022, Otsuka Corporation
// 
// # License
// The source code is licensed MIT. The website content is licensed CC BY 4.0,see LICENSE.

// JavaScript

define([], function(){
	return {
		version: 1.0,
		qHyperCubeDef: {
			qDimensions: [],
			qMeasures: [],
			qInitialDataFetch: [
				{// 最大１万セルまで
					qWidth: (100+1), // メジャー (使いたいメジャーの数+1。先頭[0]がディメンションに使われるから)。プロパティ上はいくつでも追加できるが、ハイパーキューブのpage[0]はカットされる
					qHeight: 99 // ディメンション メジャー100個使いたいので、10000/(100+1)=99.001個だから99
				}
			]
		}

	}
})
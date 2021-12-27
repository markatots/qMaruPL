qMaruPL


# qMaruPL.

# Hello
Hi. I'm Katsuaki Maruno, Otsuka Corporation. I'm studying English now.     
This qlik extension enables you to make measures easier to see for non-bi-expert users.  
For example, you can make a sheet as below.  
![image_sampledashboard](https://user-images.githubusercontent.com/95951577/147492798-842f7ba8-a0d9-4787-975e-93b4dd5f8132.png)  



So to speak, qMaruPL helps you classify measures by decorating some ruled lines and merged cells. Small and medium-sized businesses in Japan really love such special tables which have excel like ruled lines.  
What's more, the display speed is very fast in spite of the number of measures. A hundred of measures will appeare in a second on your dashboards. I'm sure the display speed is key for successful BI.  

# Get started
Get the zip file: "qMaruPL.YYYY.MM.dd.zip"   
I recommend that you get the latest one.  
You can also get "qMaruPL extension_sample.qvf" that is a sample Qlik Sense app using qMaruPL.  
Import the zip file into Qlik Sense Server via your QMC. Then "qMaruPL" qlik extenstion will be installed in your Qlik Sense environment.  
Note that you don't need to unzip.  
You can take the advantage of qMaruPL on both Qlik Sense SaaS and Qlik Sense on-premise.   
Of course, qMaruPL can be used with 漢字.     

## Overall 
Property names are subject to change because I'm not satisfied with the names already due to my poor English. Of course, I try to avoid causing any unfavorable effect to existing apps, though.    
Anyway, I named the parts of the extension properties as follows.  
![image_description1](https://user-images.githubusercontent.com/95951577/146526354-6970e88a-0934-4ca5-9b3e-7f71ea69a646.png)  
I use these names to explain tutorials.  

## Tutorial 1
Let's make this.  
![image_tutrial_1_simple](https://user-images.githubusercontent.com/95951577/146487971-3fa654ff-8c1a-4a97-b171-c29d7fdb85ad.png)  

Create a new sheet and put a qMaruPL extension on it.  
Add 10 measures, M01-M10, to qMaruPL.  
![image_tutrial_2_simple](https://user-images.githubusercontent.com/95951577/146490833-ba9266c8-df75-43a9-adf4-a90e4ce092b5.png)  
  
Go to "Lv-1 Groups" accordion panel.  
In "Lv-1 Groups", you can set each rowspan. This property is sparated into 17 sections by "===★".   
You might not be familiar with HTML. The rowspan means several rows are merged in a row.  
Find "1.===★row span1=======" field. Enter "3" instead of the default value 99. Then "Lv1" column's top 3 cells are merged.  
Similarly find "2.===★row span2=======" field. Enter "2".    
Find the "3.===★row span3=======" field. Enter "1".  
Set "right" as "align" radio button in this "3.===★row span3" section.   
Set "On" as "has horizontal line" switch in this "3.===★row span3" section.   
Set "On" as "Stand Out Band" switch in this "3.===★row span3" section. Maybe the name is not appropriate. I wanted to say that the row is highlighted.

![image_tutrial_3_simple](https://user-images.githubusercontent.com/95951577/146493323-7c9d0c46-1835-43df-90a3-7ff22a267a97.png)  
  
Find "4.===★row span4=======" field, and Enter "3" instead of the default value 99.   
Find "5.===★row span5=======" field. Enter "1" instead of the default value 99.  
Set "right" as "align" radio button in the same section "5.===★row span5".     
Set "On" as "has horizontal line" switch in this "5.===★row span5" section.   
Set "On" as "Stand Out Band" switch in this "5.===★row span5" section.   
![image_tutrial_4_simple](https://user-images.githubusercontent.com/95951577/146491640-9dc4f26e-7547-48ef-8efc-50eb20ea372e.png)   

Good. You might want to fold "Lv-1 Groups" accordion panel. Or you would be confused as there're a lot of properties.   
  
Go to "Lv-2 Groups" accordion panel. In "Lv-2 Groups", the set of properties is separated into 5 sections by "===★Lv2 ".  
Find "1.===★Lv2 row span1=======" field. And Enter "6" instead of default value 99. Then "Lv2" column's top 6 cells are merged.  
![image_tutrial_5_simple](https://user-images.githubusercontent.com/95951577/146494043-fe6a10a2-2360-4934-999c-ea90a90912d1.png)  

Add dimention "Dim1" to the extension.  
![image_tutrial_1_simple](https://user-images.githubusercontent.com/95951577/147487574-ac17dfde-368f-4918-a37a-72b75ee89352.png)  
Completed!  
  
  
## Tutorial 2
Let's make this.  
![image_tutrial2_12](https://user-images.githubusercontent.com/95951577/147092377-e27cf084-6082-476e-b011-0682df09bc2a.png)  
    
Create a new sheet and put a qMaruPL on it.  
Add measures, [M01], [M02], [M02/M01], [M03], [M04], and [M04/M03] to qMaruPL. The order is quite important to take advantage of aMaruPL. You could imagine two sets of a budget, an actual, and the ratio. The sample data of this tutorial hasn't any business meaning, though.  
 ![image_tutrial2_1](https://user-images.githubusercontent.com/95951577/146520532-254b35fa-89a2-47cc-88f1-ea02b3ac2f76.png)  
  
Go to "Table Overall" accordion property.  
Find "■Row Break Col(From 1-5)". And enter "3".  
![image_tutrial2_2](https://user-images.githubusercontent.com/95951577/146521789-f3b082e8-62fa-4506-927a-4f17de939682.png)  
Measures get in 3 columns. The width is too wide. Let's reduce the width and narrow it down.  
  
Go to "Header for Measure text, width, color" accordion property.  
Find "Meas Name Width(px) if 0 then hidden", and enter 80.   
Find "Meas Value Width(px) 'Total' Col " and enter 60.  
  
Go to "Lv-1 Groups" accordion property.  
Find "Col Width(px) if 0 then hidden", and enter 80.  
  
Go to "Lv-2 Groups" accordion property.  
Find "Col Width(px) if 0 then hidden", and enter 0. It means the very left column becomes invisible. This function is useful. Also the other columns can be deleted by using width=0.  
![image_tutrial2_3](https://user-images.githubusercontent.com/95951577/146523743-3aef5097-58c9-47ef-9c48-3c15e3ce925e.png)  

 Add dimension "Dim1" to qMaruPL. You could imagine departments or years. You can also specify the dimension's sort order if you want to do so.  
![image_tutrial2_4](https://user-images.githubusercontent.com/95951577/147488549-ae828d22-5d16-4f40-8d70-7c7b0d957bb4.png)  

Go to the "Table Overall" accordion property again.  
Set "On" as "Repeat Measure Name in dimension cols" switch.  
![image_tutrial2_5](https://user-images.githubusercontent.com/95951577/147488681-eafabe61-ef4d-4d8b-ab90-81b55ed599e6.png)  
 
Actually if "Repeat Measure Name in dimension cols" is "On", the table become very wide. But for now, I just wanted to explain the function. If the 'Meas Name Width' property is 0, the column won't appear, anyway.
Turn the switch off.  
Now, I don't want to use the measure labels in this tutorial.  
  
Go to "Header for Measure text, width, color" accordion property again.  
Find "Meas Name Width(px) if 0 then hidden", and enter 0. Then the measure name column desappeared.  
![image_tutrial2_6](https://user-images.githubusercontent.com/95951577/147489077-26061814-c6cc-4301-a1ee-f8d8bc3ee4cf.png)  

Find "Header Text Total 1st", and enter "Budget" instead of the default value 'Total'.  
Find "Header Text Total 2nd", and enter "Actual" instead of the default value 'Total 2ndCol'.  
Find "Header Text Total 3rd", and enter "Ratio" instead of the default value 'Total 3rdCol'.  
![image_tutrial2_7](https://user-images.githubusercontent.com/95951577/147489286-c2e536ae-a0d5-4c3b-ba73-047276924a5e.png)  

Go to "Lv-1 Groups" accordion property.    
Find "1.===★rowspan1★" field, and enter "1" instead of the default value 99.  
Find "Lv1 caption 1st row", and enter "Sales" instead of the default value "Lv1 1st".  
Find "Stand Out Band" switch, and set it on.  
Find "2.===★rowspan2★" field, and enter "1" instead of the default value 99.  
Find "Lv1 caption 2nd row" field, and enter "Profit" instead of the default value "Lv1 2nd".  
Find "Stand Out Band" switch, and set it on.  
![image_tutrial2_8](https://user-images.githubusercontent.com/95951577/147489701-45ff0991-9d62-4606-b0bd-6b742d9740fa.png)  

If you want to see the original names of the measures, remember, even though you set "Repeat Measure Name in dimension cols" switch on, as long as the width of measure labels is set 0, you can't see them. You need to set around 50px as the width at "Meas Name Width(px) if 0 then hidden" field in "Header for Measure text, width, color" accordion property.      
  
Go to "Table Overall" accordion property.    
Turn "Use Measure Groups" switch on.   
Find "1.===★number(1-4) of measures1★=======" field. And enter "2" instead of the default value 1.   
![image_tutrial2_9](https://user-images.githubusercontent.com/95951577/147489827-c633ec58-d870-4d85-8242-cbeb9ad3b1b5.png)  
   
Find "BackGroudColor1" in the "1.===★number(1-4) of measures1★=======" section.   
Enter "darkred" instead of the default value "mediumblue".    
  
Find "BackGroudColor2" in the "2.===★number(1-3) of measures2★=======" section.   
Enter "darkgreen" instead of the default value "mediumblue".  
![image_tutrial2_12](https://user-images.githubusercontent.com/95951577/147490159-5673121b-3014-45ef-afaf-b9459c50fdf4.png)   

I changed the specification with regard to color with measure group, December 22th, 2021, so that a header can takes over the color of the measure group header above.  
  
Thus, you can separate measures into some groups, by ruled lines.      
Both of the top header and the left header are drawn regardless of dimensions. You can input the string directly.    
Instead, you need to prepare a good number of measures as master itmes.  

qMaruPL can set conditional back ground color, font color, and blink as measures.   
![image_tutrial2_14](https://user-images.githubusercontent.com/95951577/147491055-1248d892-b214-4b94-82f8-fa2298beef23.png)
But, in the current version, you need to set all three properties at once. I will correct the behavior.  
Anyway to manage measure's property took a lot of effort. I had to create two HyperCubes to calcurate the grand total conditional expression. I believe qMaruPL can be one of the greatest example to conduct Qlik Sense API with AngularJS. 

I need to enrich this document because qMaruPL has too many properties to explain.  Looking for a property in the narrow area is really tough.   

Even though qMaruPL supports Excel export, as you know, Qlik Sense API allows us to simply export mere a list of dimensions and measures.  
So, usually, we also take advantage of Qlik NPrinting when we need to export to Excel.   
Anyway, I beleave that we want to minimize that situation.  


# Release note
Decenber 26th,2021 - I fixed a bug that a dimension's header doesn't appear when the number of factors of a dimension equals one. 


# etc.
I'll continue to revise this document when I have time.  
Plan: Conditional alerts for measures will be available.  
Arranging dimensions verticaly will be available. Although I've understood that dealing with a hypercube consisting of two dimensions is very very tough, I would try someday.     
I'm going to write description in Japanese.     

# Copyright
Copyright ©2021 OTSUKA CORPORATION

# License
The source code is licensed MIT. The website content is licensed CC BY 4.0,see LICENSE.
 


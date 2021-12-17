# maruPL is a Qlik Sense Extension.

# Notes for me
How to edit readme: https://gist.github.com/mignonstyle/083c9e1651d7734f84c99b8cf49d57fa

# Hello
I'm Katsuaki Maruno, Otsuka Corporation. I'm studying English now. I'm afraid you would take years to get good instructioins.    
This qlik extension allows you to show custom tables.  
You can make a sheet as below.  
![image_sampledashboard](https://user-images.githubusercontent.com/95951577/146482600-010bf953-3b80-4056-b259-f1762804cda2.png)  
Small and medium-sized businesses in Japan really love such complicated tables.  


# Get started
Get the zip file: "maruPL.YYYY.MM.dd.zip"   
You can also get "maruPL extension_sample.qvf" that is a sample Qlik Sense app.  
Upload the zip file via your QMC. Then "maruPL" qlik extenstion will be installed.  


## Overall 
Property names are subject to change because I'm not satisfied with the names.  
But for now, I call the parts of the extension properties as follows.  
![image_description1](https://user-images.githubusercontent.com/95951577/146526354-6970e88a-0934-4ca5-9b3e-7f71ea69a646.png)  


## Tutrial 1
Let's make this.  
![image_tutrial_1_simple](https://user-images.githubusercontent.com/95951577/146487971-3fa654ff-8c1a-4a97-b171-c29d7fdb85ad.png)  

Create a new sheet and put a maruPL extension on it.  
Add 10 measures, M01-M10, to maruPL.  
![image_tutrial_2_simple](https://user-images.githubusercontent.com/95951577/146490833-ba9266c8-df75-43a9-adf4-a90e4ce092b5.png)  
Go to "Lv-1 Groups" accordion panel.  
In "Lv-1 Groups", you can designate each rowspan. This property is sparated into 17 sections by "===★".   
You might not be familiar with HTML. The rowspan means several rows are merged in a row.  
Find "===★row span1=======" field. Enter "3" instead of the default value 99. Then "Lv1" column's top 3 cells are merged.  
Similarly find "===★row span2=======" field. Enter "2".    
Find the "===★row span3=======" field. Enter "1".  
Set "right" as "align" radio button in this "===★row span3" section.   
Set "On" as "has horizontal line" switch in this "===★row span3" section.   
Set "On" as "Stand Out Band" switch in this "===★row span3" section. Maybe the name is not appropriate. I wanted to say that the row is highlighted.   
![image_tutrial_3_simple](https://user-images.githubusercontent.com/95951577/146493323-7c9d0c46-1835-43df-90a3-7ff22a267a97.png)

Find "===★row span4=======" field, and Enter "3".   
Find "===★row span5=======" field. Enter "1".  
Set "right" as "align" radio button in this "===★row span5" section.     
Set "On" as "has horizontal line" switch in this "===★row span5" section.   
Set "On" as "Stand Out Band" switch in this "===★row span5" section.   
![image_tutrial_4_simple](https://user-images.githubusercontent.com/95951577/146491640-9dc4f26e-7547-48ef-8efc-50eb20ea372e.png)   

Good. You might want to fold "Lv-1 Groups" accordion panel. Or you would be confused as there're a lot of properties.  
Go to "Lv-2 Groups" accordion panel. In "Lv-2 Groups", the property is sparated into 5 sections by "===★Lv2 ".  
Find "===★Lv2 row span1=======" field. And Enter "6" instead of default value 99. Then "Lv2" column's top 6 cells are merged.  
![image_tutrial_5_simple](https://user-images.githubusercontent.com/95951577/146494043-fe6a10a2-2360-4934-999c-ea90a90912d1.png)  

Add dimention "Dim1" to the extension.  
![image_tutrial_6_simple](https://user-images.githubusercontent.com/95951577/146494432-d05edfdf-fa25-441a-85fd-f16eb0c2667e.png)  
Completed!  


## Tutrial 2
Let's make this.  
![image_tutrial2_8](https://user-images.githubusercontent.com/95951577/146532628-8003d1cc-c235-4a91-b619-9c9f6f691e79.png)   
Create a new sheet and put a maruPL on it.  
Add measures, M01, M02, M02/M01, M03, M04, and M04/M03 to maruPL. You could imagine two sets of a budget, an actual, and the ratio.   
 ![image_tutrial2_1](https://user-images.githubusercontent.com/95951577/146520532-254b35fa-89a2-47cc-88f1-ea02b3ac2f76.png)  
Go to "Table Overall" accordion property.  
Find "Row Break Col(From 1-5)". And enter "3".  
![image_tutrial2_2](https://user-images.githubusercontent.com/95951577/146521789-f3b082e8-62fa-4506-927a-4f17de939682.png)  
Measures get in 3 colomns. The width is too wide. Let's reduce the width and narrow it down.  
Go to "Header for Measure text, width, color" accordion property.  
Find "Width(px) if 0 then hidden", and enter 80.   
Find "Total Col Width(px)" and enter 60.  
Go to "Lv-1 Groups" accordion property.  
Find "Col Width(px) if 0 then hidden", and enter 80.  
Go to "Lv-2 Groups" accordion property.  
Find "Col Width(px) if 0 then hidden", and enter 0. It means the very left column becomes invisible. This function is useful. Also the other columns can be deleted by using width=0.  
![image_tutrial2_3](https://user-images.githubusercontent.com/95951577/146523743-3aef5097-58c9-47ef-9c48-3c15e3ce925e.png)  
Add dimension "Dim1" to maruPL. You could imagine departments or years.  
![image_tutrial2_4](https://user-images.githubusercontent.com/95951577/146524735-a3ecc835-5b51-4d79-8daa-b378cfc1c172.png)  
Go to the "Table Overall" accordion property again.  
Set "On" as "Repeat Measure Name in dimension cols" switch.  
![image_tutrial2_5](https://user-images.githubusercontent.com/95951577/146525124-31a431bf-8828-4502-b0f9-769b72341887.png)  
Actually when "Repeat Measure Name in dimension cols" is "On", the table become very wide. But for now, I just wanted to explain the function.  
Turn the switch off.  
I don't want to use the measure labels.  
Go to "Header for Measure text, width, color" accordion property again.  
Find "Width(px) if 0 then hidden", and enter 0.   
![image_tutrial2_6](https://user-images.githubusercontent.com/95951577/146531048-6175f467-3c7a-4cf5-aaa5-f4548c3b26ce.png)   
Find "Header Text Total 1st", and enter "Budget".  
Find "Header Text Total 2nd", and enter "Actual".  
Find "Header Text Total 3rd", and enter "Ratio".  
![image_tutrial2_7](https://user-images.githubusercontent.com/95951577/146531535-2f3d6efe-6b87-408d-be87-77835b30472a.png)   
Go to "Lv-1 Groups" accordion property.    
Find "===★rowspan1★" field, and enter "1" instead of the default value 99.  
Find "Lv1 caption 1st row", and enter "Sales" instead of the default value "Lv1 1st".  
Find "Stand Out Band" switch, and set it on.  
Find "===★rowspan2★" field, and enter "1" instead of the default value 99.  
Find "Lv1 caption 2nd row" field, and enter "Profit" instead of the default value "Lv1 2nd".  
![image_tutrial2_8](https://user-images.githubusercontent.com/95951577/146532628-8003d1cc-c235-4a91-b619-9c9f6f691e79.png)  
If you want to see the original names of the measures, remember the even though you set "Repeat Measure Name in dimension cols" switch on, when the width of measure labels is set 0, you can't see them. You need to set around 100px as the width at "Width(px) if 0 then hidden" field in "Header for Measure text, width, color" accordion property.      

I'll continue to revise this document when I have time.  


# Copyright
Copyright ©2021 OTSUKA CORPORATION

# License
The source code is licensed MIT. The website content is licensed CC BY 4.0,see LICENSE.
 


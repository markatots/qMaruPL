# maruPL is a Qlik Sense Extensioin.

# Notes for me
How to edit readme: https://gist.github.com/mignonstyle/083c9e1651d7734f84c99b8cf49d57fa

# Hello
I'm Katsuaki Maruno, Otsuka Corporation. I'm studying English now, though. I'm afraid you would get good instructioins in years.   
This qlik extension allows you to show very complicate custom tables.  
You can make a sheet as below.
![image_sampledashboard](https://user-images.githubusercontent.com/95951577/146482600-010bf953-3b80-4056-b259-f1762804cda2.png)  
Small and medium-sized businesses in Japanese really love such complicated tables.  


# Get started
Get the zip file: "maruPL.YYYY.MM.dd.zip"   
You can also get "maruPL extension_sample.qvf" that is a sample Qlik Sense app.  
Upload the zip file via QMC. Then "maruPL" qlik extenstion will be installed.  


## Overall Explanation
Property names are subject to change because I'm not satisfied with the names.   
![image_description1](https://user-images.githubusercontent.com/95951577/146485052-cfa4bdc5-6bcb-4072-9f01-e05c0d9a528d.png)  


## Tutrial 1
Let's make this.
![image_tutrial_1_simple](https://user-images.githubusercontent.com/95951577/146487971-3fa654ff-8c1a-4a97-b171-c29d7fdb85ad.png)  

Add 10 measures, M01-M10 to maruPL.  
![image_tutrial_2_simple](https://user-images.githubusercontent.com/95951577/146490833-ba9266c8-df75-43a9-adf4-a90e4ce092b5.png)  
Go to "Lv-1 Groups" accordion panel.
In "Lv-1 Groups", you can designate each rowspan. So this propaty is sparated into 17 sections by "===★".   
Find "===★row span1=======" field. Then Enter "3". Then "Lv1" column's top 3 cells are merged.  
Similarly find "===★row span2=======" field. Then Enter "2".   
Find "===★row span3=======" field. Then Enter "1". 
Set "right" as "align" radio button in this "===★row span3" section.   
Set "On" as "has horizontal line" switch in this "===★row span3" section.   
Set "On" as "Stand Out Band" switch in this "===★row span3" section. Maybe the name is not appropriate. I wanted to say that the row is highlighted.   
![image_tutrial_3_simple](https://user-images.githubusercontent.com/95951577/146491141-6b82f650-4c30-46ee-a099-6afb8074831c.png)  
![image_tutrial_3_simple](https://user-images.githubusercontent.com/95951577/146493323-7c9d0c46-1835-43df-90a3-7ff22a267a97.png)

Find "===★row span4=======" field. Then Enter "3". 
Find "===★row span5=======" field. Then Enter "1". 
Set "right" as "align" radio button in this "===★row span5" section.   
Set "On" as "has horizontal line" switch in this "===★row span5" section.   
Set "On" as "Stand Out Band" switch in this "===★row span5" section.   
![image_tutrial_4_simple](https://user-images.githubusercontent.com/95951577/146491640-9dc4f26e-7547-48ef-8efc-50eb20ea372e.png)  
Go to "Lv-2 Groups" accordion panel. You might want to fold "Lv-1 Groups" accordion panel". As there're a lot of properties, you would be confused.  





 Please wait.
 


# Copyright
Copyright ©2021 OTSUKA CORPORATION

# License
The source code is licensed MIT. The website content is licensed CC BY 4.0,see LICENSE.
 


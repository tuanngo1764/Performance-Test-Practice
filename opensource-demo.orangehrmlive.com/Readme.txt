[PT] Opencart
*Websites: https://opensource-demo.orangehrmlive.com/

*Scenario: Add Employee
1. Launch homepage
2. Login admin account
3. Select PIM menu, click Add Employee
4. Enter information of Full Name, then click Save
5. Click Job link on the Left menu, then click Edit
6. Fill data for Employee Job Details, then click Save
7. Need to add 5 unique employees with different Full Name and Job information
8. Logout

*Scenario: Search Employee, View Personal Details
1. Launch homepage
2. Login admin account
3. Select PIM menu
4. Search Employee with multiples Employee Name in the data set (at least 5 different names)
5. Click on the first employee row in the results list to view the Personal Details
6. Repeat step 4 and step 5 to test the search with different criteria: Employee Status, Job Title, and Sub Unit
7. Logout

*Contents
- output folder containing the results will be exported to HTML report
- output.csv contains the results generated after executing the JMETER scripts
- "Search Employee_View Personal Details.jmx" & "AddEmployee.jmx" contains JMETER scripts

*Setting
- Download Apache JMETER: https://jmeter.apache.org/download_jmeter.cgi
- Download JDK
- Install Java
- Configure an environment variable for Java

*Generating HTML report:

**Generation after load test:
	jmeter -n -t <test JMX file> -l <test log file> -e -o <Path to output folder>

**Generation from an existing sample CSV log file
	jmeter -g <log file> -o <Path to output folder>

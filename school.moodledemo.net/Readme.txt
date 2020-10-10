[PT] Opencart
*Websites: https://school.moodledemo.net/

*Scenario: create a JMeter test to perform a scenario as follows:
1. Launch Homepage
2. Login an account
3. View a course

*Contents
- output folder containing the results will be exported to HTML report
- output.csv contains the results generated after executing the JMETER scripts
- SchoolDemo.jmx contains JMETER scripts

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

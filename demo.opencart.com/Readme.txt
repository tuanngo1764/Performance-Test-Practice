[PT] Opencart
*Websites: https://demo.opencart.com/

*Scenario: create a JMeter test to perform a scenario as follows:
1. Launch Homepage
2. Login an account
3. Loop the Search of some keywords for 5 times
4. Add to cart for 3 different products

*Contents
- output folder containing the results will be exported to HTML report
- output.csv contains the results generated after executing the JMETER scripts
- data.csv contains accounts for logging into site
- OpenCartDemo.jmx contains JMETER scripts

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
